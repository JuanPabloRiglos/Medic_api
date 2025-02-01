# 🚑 Medic_api

¡Bienvenido a **Medic_api**! Un backend diseñado para la gestión de turnos en un consultorio con uno o más médicos. 🏥📅

Esta API facilita la reserva de turnos mediante la implementación de un frontend, permitiendo a los pacientes registrarse, iniciar sesión, ver los turnos disponibles y reservar uno.

---

## 📜 Descripción General

🛠️ **Tecnologías utilizadas:**

- **Node.js** con **Express** 🚀
- **PostgreSQL** con **Sequelize** 🗄️
- **Joi** para validaciones ✅
- **bcrypt & JWT** para autenticación 🔐
- **Boom** para manejo de errores ⚠️

📂 **Estructura del proyecto:**

```
📁 src/
 ├── 📂 routes
 ├── 📂 controllers
 ├── 📂 services
 ├── 📂 middlewares
 ├── 📂 utils
```

Esta arquitectura asegura una **separación de responsabilidades** clara y eficiente. ✅

---

## 🏗️ Lógica de Uso de la Aplicación

👤 **Tipos de usuarios:**

| Rol                  | Permisos                                        |
| -------------------- | ----------------------------------------------- |
| 🛠️ **Administrador** | CRUD de usuarios, manejo de turnos              |
| 🩺 **Doctor**        | Similar al admin                                |
| 🗂️ **Secretario**    | Similar al admin, sin gestión de roles          |
| 👨‍⚕️ **Paciente**      | Registro, login, gestión de su usuario y turnos |

### 📌 **Entidades**

- **Usuarios (User)** 🆔
- **Turnos (Appointment)** 📅
- **Historial de Turnos (AppointmentData)** 📜

---

## 🔗 Endpoints

### 🔑 **Autenticación**

```http
POST /register  # Registro de usuario
POST /login     # Inicio de sesión
```

### 👥 **Usuarios**

```http
POST   /users        # Crear usuario
GET    /users        # Obtener usuarios
PUT    /users/:id    # Actualizar usuario
DELETE /users/:id    # Eliminar usuario
```

### 📅 **Turnos (Appointments)**

```http
POST   /appointments      # Crear turno
GET    /appointments      # Obtener turnos disponibles
PUT    /appointments/:id  # Actualizar turno
DELETE /appointments/:id  # Eliminar turno
```

### 🗂️ **Historial de Turnos (AppointmentData)**

```http
POST /appointmentData      # Crear historial de turno
GET  /appointmentData      # Obtener historial de turnos
```

---

## 🚀 Instrucciones para Correr el Proyecto

1️⃣ Clona el repositorio y accede a la carpeta del proyecto:

```bash
git clone https://github.com/tu-repo.git
cd api_medic_dates
```

2️⃣ Crea un archivo `.env` a partir del `.env.example` 📝
3️⃣ Asegúrate de tener **PostgreSQL** corriendo 🛢️
4️⃣ Instala dependencias y ejecuta el servidor:

```bash
pnpm install
pnpm run dev
```

---

## 🔐 Auth (Autenticación)

📌 **Modelo de la tabla `auth` en la base de datos:**

```sql
CREATE TABLE auth (
    id UUID PRIMARY KEY,
    userId UUID REFERENCES users(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT now()
);
```

### ✍️ **Registro de Usuario**

📌 **Ruta:** `POST baseApi/api/v1/auth/register`

📥 **Request:**

```json
{
  "name": "Nombre",
  "lastName": "Apellido",
  "email": "nombreApellido@gmail.com",
  "password": "12345678",
  "phone": "15123456789",
  "healthInsurance": "ninguna"
}
```

📤 **Response:**

```json
{
  "role": "Patient",
  "createdAt": "2025-02-01T12:48:14.003Z",
  "id": "4af37102-dab2-4585-9e2a-7b2d34cf3de3",
  "name": "Nombre",
  "lastName": "Apellido",
  "phone": "15123456789",
  "healthInsurance": "ninguna",
  "email": "nombreApellido@gmail.com"
}
```

✅ **Validaciones:**

- **name**: mínimo 3 caracteres
- **lastName**: mínimo 2 caracteres
- **email**: formato válido
- **password**: mínimo 8 caracteres

### 🔑 **Login de Usuario**

📌 **Ruta:** `POST baseApi/api/v1/auth/login`

📥 **Request:**

```json
{
  "email": "nombreApellido@gmail.com",
  "password": "12345678"
}
```

📤 **Response:**

```json
{
  "userLogged": {
    "id": "4af37102-dab2-4585-9e2a-7b2d34cf3de3",
    "name": "Nombre",
    "lastName": "Apellido",
    "role": "Patient",
    "phone": "15123456789",
    "healthInsurance": "ninguna",
    "createdAt": "2025-02-01T12:48:14.003Z",
    "email": "nombreApellido@gmail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

🕒 **El token tiene una validez de 24 horas** ⏳

---

## 👤 User

### 🔍 **Obtener Todos los Usuarios**

📌 **Ruta:** `GET baseApi/api/v1/user`

📤 **Response:**

```json
[
  {
    "id": "e29cd687-c016-4313-8d3a-76575dccb7c1",
    "name": "Juan Pablo",
    "lastName": "Apellido",
    "role": "Admin",
    "phone": "15123456789",
    "healthInsurance": "ninguna",
    "createdAt": "2025-01-30T13:36:22.685Z"
  }
]
```

📌 **Otros Endpoints:**

```http
GET baseApi/api/v1/user/:id         # Obtener usuario por ID
GET baseApi/api/v1/user?lastName=:lastName # Obtener usuario por apellido
GET baseApi/api/v1/user?email=:email       # Obtener usuario por email
```

---

🎯 **¡Gracias por usar Medic_api!** 🎯
Si tienes preguntas o mejoras, abre un issue o contribuye en el repositorio. 🚀
