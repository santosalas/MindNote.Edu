# 📒 MindNote.edu

Aplicación web de **notas inteligentes con recordatorios** creada con **React + Vite**.  
Permite a cada usuario crear, editar y eliminar notas asociadas a fechas específicas, con recordatorios automáticos (notificaciones del navegador y alertas visuales).  

👉 Cada nota está vinculada al usuario que la creó, así que **solo la cuenta dueña recibe notificaciones de sus notas**.

---

## ✨ Funcionalidades principales

- 🔑 **Autenticación local** (registro e inicio de sesión guardados en `localStorage`).
- 📝 **Gestión de notas por usuario**:
  - Crear nuevas notas con fecha y hora.
  - Editar y eliminar notas.
  - Marcar notas como completadas.
- 📅 **Calendario interactivo** para filtrar notas por día.
- 🔔 **Sistema de recordatorios**:
  - Aviso **5 minutos antes** de la hora.
  - Recordatorio exacto a la hora establecida.
  - Notificación de notas atrasadas.
- 🔐 **Notas privadas**: cada nota está asociada al correo del usuario que la creó.
- 🚪 **Cierre de sesión seguro**: al salir se limpian las notificaciones programadas.

---

## 🛠️ Tecnologías utilizadas

- ⚛️ **React** (con Hooks: `useState`, `useEffect`, `useRef`)
- ⚡ **Vite** como bundler
- 🎨 **CSS** personalizado (archivo `Notas.css`)
- 📆 **React Calendar** (para seleccionar fechas)
- 🍭 **SweetAlert2** (alertas interactivas)
- 💾 **localStorage** (persistencia en el navegador)

---

## 🚀 Instalación y ejecución

1. Clona el repositorio:

   ```bash
   git clone https://github.com/BrandoMorales/MindNote.edu.git
Accede al directorio del proyecto:

bash
Copiar código
cd MindNote.edu
Instala las dependencias:

bash
Copiar código
npm install
# o con yarn
yarn
Ejecuta el servidor de desarrollo:

bash
Copiar código
npm run dev
# o con yarn
yarn dev
Abre en el navegador la URL que muestre la consola (ejemplo: http://localhost:5173).

📂 Estructura del proyecto
csharp
Copiar código
MindNote.edu/
├─ public/                 # Archivos estáticos
├─ src/
│  ├─ components/          # Componentes React
│  ├─ styles/              # Estilos CSS
│  ├─ App.jsx              # Componente raíz
│  ├─ Notas.jsx            # Lógica principal de notas
│  ├─ Login.jsx            # Pantalla de inicio de sesión
│  ├─ Register.jsx         # Pantalla de registro
│  └─ ...
├─ package.json
├─ vite.config.js
└─ README.md
⚙️ Requisitos previos
Tener instalado Node.js (v16 o superior recomendado).

Navegador moderno compatible con Notification API.

Habilitar permisos de notificaciones en el navegador.

🚧 Limitaciones actuales
Los datos se almacenan en localStorage, por lo que se borran al limpiar el navegador.

No hay backend real: el registro de usuarios no es persistente fuera del dispositivo.

No existe un sistema de seguridad avanzado (las contraseñas se almacenan en texto plano en localStorage).

🔮 Posibles mejoras
Implementar un backend con base de datos (ejemplo: Node.js + MongoDB).

Encriptar contraseñas y datos sensibles.

Añadir notificaciones push reales con Service Workers.

Mejorar la interfaz con tema oscuro y diseño más responsive.

Añadir opción de categorías o etiquetas para organizar notas.

📄 Licencia
Este proyecto está bajo la licencia MIT.
Puedes usarlo, modificarlo y distribuirlo libremente, dando crédito al autor original.

🤝 Contribuciones
¡Las contribuciones son bienvenidas! 🚀

Haz un fork del repositorio.

Crea una rama nueva:

bash
Copiar código
git checkout -b mi-nueva-funcionalidad
Realiza tus cambios y haz commit:

bash
Copiar código
git commit -m "Agregada nueva funcionalidad"
Sube los cambios:

bash
Copiar código
git push origin mi-nueva-funcionalidad
Abre un Pull Request en GitHub.

👨‍💻 Autor
Brando Morales

🌐 GitHub: BrandoMorales

📧 Correo: (añade aquí tu email si deseas compartirlo)......


|
|
|
|
|
|
|
|
|
|
21/11/2025 Personal Software Process (PSP) al proyecto

# Mindnote.edu - Sistema de Recordatorios Inteligentes

## 🎯 Descripción del Proyecto
Sistema diseñado para ayudar a los usuarios a organizar su día a día, registrando citas y compromisos con notificaciones automáticas recordatorias.

### Características Principales
- ✅ Registro rápido de citas y compromisos
- 🔔 Notificaciones automáticas 1 hora antes de cada evento
- 📱 Interfaz intuitiva y fácil de usar
- 💾 Almacenamiento seguro de datos

## 🏗️ Aplicación del Personal Software Process (PSP)

### Objetivos de Calidad PSP
| Objetivo | Meta | Estado |
|----------|------|--------|
| Densidad de defectos | < 5 defectos/KLOC | | En progreso |
| Precisión en estimaciones | ±15% error máximo | | En progreso |
| Tiempo en revisión | 25-30% del total | | En progreso |
| Productividad | 25-30 LOC/hora | | En progreso |

## 📊 Métricas y Seguimiento PSP

### Registro de Tiempos
Usamos **Clockify** para tracking detallado por fases:

| Fase | Tiempo Estimado | Tiempo Real | Desviación |
|------|-----------------|-------------|------------|
| Planificación | 10 horas | | |
| Diseño | 15 horas | | |
| Codificación | 30 horas | | |
| Revisión | 15 horas | | |
| Pruebas | 10 horas | | |
| **Total** | **80 horas** | | |

### Seguimiento de Defectos
Usamos **GitHub Issues** para gestión de defectos:

```bash
# Etiquetas configuradas para PSP
🐛-bug-crítico    🐛-bug-normal    🐛-bug-menor
✨-feature        📝-documentación  🔧-refactor
⚡-mejora-rendimiento