import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Register.css";

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("Usuario"); // Cambiado a "Usuario" (con mayúscula)
  const [claveAdmin, setClaveAdmin] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      Swal.fire({
        icon: "info",
        title: "Ya tienes sesión activa",
        text: "Si quieres registrarte otra vez cierra sesión primero.",
      }).then(() => {
        if (user.rol === "Administrador") {
          navigate("/admin");
        } else {
          navigate("/notas");
        }
      });
    }
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!nombre.trim() || !email.trim() || !password.trim()) {
      Swal.fire("Error", "Todos los campos son obligatorios.", "error");
      setLoading(false);
      return;
    }

    if (!aceptaTerminos) {
      Swal.fire("Error", "Debes aceptar los términos y condiciones.", "error");
      setLoading(false);
      return;
    }

    if (rol === "Administrador" && claveAdmin !== "MindNote.edu") {
      Swal.fire("Error", "La clave especial de administrador es incorrecta.", "error");
      setLoading(false);
      return;
    }

    try {
      // 📝 REGISTRO EN EL BACKEND
      const userData = {
        nombre: nombre.trim(),
        email: email.trim(),
        password: password.trim(),
        rol: rol // "Usuario" o "Administrador" (con mayúscula)
      };

      const response = await fetch('http://localhost:9000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire("Registro exitoso", `Bienvenido ${nombre}`, "success").then(() => {
          // Redirigir al login para que inicie sesión
          navigate("/login");
        });
      } else {
        Swal.fire("Error", data.message || "Error al registrar el usuario", "error");
      }

    } catch (error) {
      console.error("Error en registro:", error);
      Swal.fire("Error", "No se pudo conectar con el servidor. Verifica que el backend esté corriendo.", "error");
    } finally {
      setLoading(false);
    }
  };

  const openTerminos = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Términos y Condiciones de MindNote",
      html: `
        <p><strong>1. Aceptación de los Términos:</strong> Al registrarte y utilizar MindNote, aceptas cumplir con estos términos y condiciones en su totalidad.</p>
        <p><strong>2. Uso Personal:</strong> Esta aplicación está destinada únicamente para uso personal y educativo. No se permite el uso con fines comerciales sin autorización previa.</p>
        <p><strong>3. Privacidad:</strong> La información que nos proporcionas (nombre, correo, etc.) se almacena localmente en tu navegador y no se comparte con terceros.</p>
        <p><strong>4. Seguridad de la Cuenta:</strong> Eres responsable de mantener la confidencialidad de tus credenciales. No compartas tu contraseña.</p>
        <p><strong>5. Rol de Administrador:</strong> El acceso como administrador requiere una clave especial. Este rol tiene permisos adicionales, como visualizar y gestionar usuarios.</p>
        <p><strong>6. Propiedad Intelectual:</strong> Todo el contenido de MindNote, incluyendo textos, diseños e interfaz, es propiedad del desarrollador y no puede ser copiado sin permiso.</p>
        <p><strong>7. Cambios:</strong> Estos términos pueden ser modificados en cualquier momento. Se notificará a los usuarios registrados si hay cambios relevantes.</p>
        <p><strong>8. Contacto:</strong> Si tienes dudas o comentarios, puedes escribirnos a <a href="mailto:soporte@mindnote.com">soporte@mindnote.com</a>.</p>
      `,
      width: 600,
      confirmButtonText: "Cerrar",
    });
  };

  return (
    <div className="register-page">
      <form className="register-card" onSubmit={handleRegister}>
        <h2 className="register-title">Crear cuenta</h2>

        <label className="field-label">
          Nombre completo
          <input
            className="input"
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            disabled={loading}
          />
        </label>

        <label className="field-label">
          Correo
          <input
            className="input"
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </label>

        <label className="field-label">
          Contraseña
          <input
            className="input"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </label>

        <div className="role-row">
          <span className="role-label">Registrarme como:</span>
          <label className="role-option">
            <input
              type="radio"
              name="rol"
              value="Usuario"
              checked={rol === "Usuario"}
              onChange={(e) => setRol(e.target.value)}
              disabled={loading}
            />
            Usuario
          </label>
          <label className="role-option">
            <input
              type="radio"
              name="rol"
              value="Administrador"
              checked={rol === "Administrador"}
              onChange={(e) => setRol(e.target.value)}
              disabled={loading}
            />
            Administrador
          </label>
        </div>

        {rol === "Administrador" && (
          <label className="field-label">
            Clave especial (administrador)
            <input
              className="input"
              type="password"
              placeholder="Clave especial"
              value={claveAdmin}
              onChange={(e) => setClaveAdmin(e.target.value)}
              required={rol === "Administrador"}
              disabled={loading}
            />
            <small className="hint">
              Introduce la clave especial para registrar administradores.
            </small>
          </label>
        )}

        <label className="terms-row">
          <input
            type="checkbox"
            checked={aceptaTerminos}
            onChange={(e) => setAceptaTerminos(e.target.checked)}
            disabled={loading}
          />
          <span>
            Acepto los{" "}
            <a href="#" onClick={openTerminos} className="link-terminos">
              términos y condiciones
            </a>
          </span>
        </label>

        <button className="btn-register" type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrar"}
        </button>

        <div className="login-link">
          ¿Ya tienes cuenta? <a href="/login">Iniciar sesión</a>
        </div>
      </form>
    </div>
  );
}

export default Register;