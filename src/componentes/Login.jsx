import React, { useEffect, useState } from "react";
import "../styles/login.css";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [locked, setLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ⏳ Revisar bloqueo en localStorage al cargar
  useEffect(() => {
    const lockInfo = JSON.parse(localStorage.getItem("loginLock"));
    if (lockInfo && lockInfo.expiry > Date.now()) {
      setLocked(true);
      setTimeLeft(Math.ceil((lockInfo.expiry - Date.now()) / 1000));
    }
  }, []);

  // ⏱️ Contador regresivo si está bloqueado
  useEffect(() => {
    if (!locked) return;

    const interval = setInterval(() => {
      const lockInfo = JSON.parse(localStorage.getItem("loginLock"));
      if (lockInfo && lockInfo.expiry > Date.now()) {
        setTimeLeft(Math.ceil((lockInfo.expiry - Date.now()) / 1000));
      } else {
        // 🔓 Se acabó el bloqueo
        localStorage.removeItem("loginLock");
        setLocked(false);
        setTimeLeft(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [locked]);

  // 🚫 Evitar que un usuario logueado vuelva a entrar aquí
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      Swal.fire({
        icon: "info",
        title: "Ya tienes sesión activa",
        text: `Ya has iniciado sesión como ${user.rol}.`
      }).then(() => {
        if (user.rol === "Administrador") {
          navigate("/admin");
        } else {
          navigate("/notas");
        }
      });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (locked) {
      Swal.fire({
        icon: "error",
        title: "Bloqueado",
        text: `Has excedido los intentos. Intenta nuevamente en ${Math.ceil(
          timeLeft / 60
        )} minutos.`,
      });
      setLoading(false);
      return;
    }

    try {
      // 🔐 CONEXIÓN CON EL BACKEND - LOGIN
      const response = await fetch('http://localhost:9000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        // ✅ LOGIN EXITOSO
        // Limpiar intentos fallidos y bloqueo
        localStorage.removeItem("loginAttempts");
        localStorage.removeItem("loginLock");

        // Guardar usuario y token en localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        Swal.fire({
          icon: "success",
          title: `Bienvenido, ${data.user.nombre}`,
          text: `Has iniciado como ${data.user.rol}.`,
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          if (data.user.rol === "Administrador") {
            navigate("/admin");
          } else {
            navigate("/notas");
          }
        });

      } else {
        // ❌ CREDENCIALES INCORRECTAS
        let attempts = parseInt(localStorage.getItem("loginAttempts") || "0");
        attempts += 1;
        localStorage.setItem("loginAttempts", attempts);

        if (attempts >= 3) {
          // 🔒 Bloqueo por 5 minutos
          const lockInfo = {
            expiry: Date.now() + 5 * 60 * 1000, // 5 minutos
          };
          localStorage.setItem("loginLock", JSON.stringify(lockInfo));
          localStorage.removeItem("loginAttempts");
          setLocked(true);
          setTimeLeft(5 * 60);

          Swal.fire({
            icon: "error",
            title: "Demasiados intentos",
            text: "Has sido bloqueado por 5 minutos.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Credenciales incorrectas",
            text: `Verifica tu correo y contraseña. Intento ${attempts} de 3.`,
          });
        }
      }

    } catch (error) {
      // 🔌 ERROR DE CONEXIÓN
      console.error("Error en login:", error);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor. Verifica que el backend esté corriendo en puerto 9000.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {locked && (
        <p className="lock-msg">
          🚫 Has excedido los intentos. Intenta de nuevo en{" "}
          <b>{Math.ceil(timeLeft / 60)} min {timeLeft % 60} seg</b>.
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={locked || loading}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={locked || loading}
        />
        <button type="submit" disabled={locked || loading}>
          {loading ? "Iniciando sesión..." : "Entrar"}
        </button>
      </form>
      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
};

export default Login;