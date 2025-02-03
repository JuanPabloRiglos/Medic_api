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
📁 API_MEDIC_DATES/
 ├── 📂 config
 ├── 📂 controllers
 ├── 📂 db
 ├── 📂 dtos
 ├── 📂 libs
 ├── 📂 middlewares
 ├── 📂 routes
 ├── 📂 services
 ├── 📂 utils
 ├ 📜 docker-compose.yml
 ├ 📜 index.js

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
- **Autorizacion (Auth)** 🆔
- **Turnos (Appointment)** 📅
- **Historial de Turnos (AppointmentData)** 📜

---

## 🔗 Endpoints principales

### 🔑 **Autenticación**

```http
POST /register  # Registro de usuario
POST /login     # Inicio de sesión
```

### 👥 **Usuarios**

```http
POST   /user                             # Crear usuario
GET    /user                             # Obtener usuarios
GET    /user?email=user@gmail.com        # Obtener usuarios por email
PUT    /user/:id                         # Actualizar usuario
DELETE /user/:id                         # Eliminar usuario
```

### 📅 **Turnos (Appointments)**

```http
POST   /appointment                                              # Crear turno
GET    /appointment                                              # Obtener turnos
GET    /appointment?date=2025-01-30                              # Obtener turno por fecha
GET    /appointment?startDate=2025-01-24&endDate=2025-01-26      # Obtener turno por rango de fechas
PUT    /appointment/:id                                          # Actualizar turno
DELETE /appointment/:id                                          # Eliminar turno
```

### 🗂️ **Historial de Turnos (AppointmentData)**

```http
POST /appointmentdata                                            # Crear historial de turno
GET  /appointmentdata                                            # Obtener toda la data de turnos
GET  /appointmentdata/:id                                        # Obtener historial de un usuario
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

**📌 Concepto General**

## La entidad Auth es el primer paso al usar la API. Es importante entender que la entidad Auth tiene su propia tabla en la base de datos, con 4 columnas: id, userId, email, password y createdAt.

# Estos atributos están diseñados para asegurar la protección de datos sensibles (como contraseñas) y facilitar la separación del componente de autenticación para un manejo más eficiente como microservicio.

<!-- 📌 **Modelo de la tabla `auth` en la base de datos:**

```sql
CREATE TABLE auth (
    id UUID PRIMARY KEY,
    userId UUID REFERENCES users(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT now()
);
``` -->

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

📌 **El endpoint register de`auth` introduce por default el rol de "Patient"**

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

🕒 **El token tiene una validez de 24 horas y será requerido en gran parte de los proximos endpoints** ⏳

**Otros endpoints de la entidad 🔐 Auth**

# Obtener Todos los Registros de Auth:

📌 **Ruta:** `GET baseApi/api/v1/auth`

📤 **Response:**

```json
[
  {
    "id": "f1190f6b-3428-4dcc-963c-5395a5a9a8fa",
    "userId": "4af37102-dab2-4585-9e2a-7b2d34cf3de3",
    "email": "nombreApellido@gmail.com",
    "password": "$2b$08$pyZqf/xe7ko6KJrK21JjsuUj6UsBcHO/9vZmKvGmLInH6qcIUzlUq",
    "createdAt": "2025-02-01T12:48:14.009Z"
  }
]
```

# Obtener Auth por ID:

📌 **Ruta:** `GET baseApi/api/v1/auth/:id`

# Buscar Auth por Email::

📌 **Ruta:** `GET baseApi/api/v1/auth?email=nombreApellido@gmail.com`

**Update y Delete**

## Para realizar operaciones de update y delete, es necesario que el usuario esté logueado. Estos endpoints solo aceptan el ingreso de "Admin", "Doctor" y "Secretary". Deben incluir un token válido en el Bearer Token de la autorización del cliente (navegador o app como Postman).

## Editar Auth

📌 **Ruta:** `POST baseApi/api/v1/auth/:idbuscadoparaupdate`

📥 **Request:**

```json
{
  "email": "nuevoemail@gmail.com",
  "password": "12345678"
}
```

📤 **Response:**

```json
{
  "id": "4af37102-dab2-4585-9e2a-7b2d34cf3de3",
  "name": "Nombre",
  "lastName": "Apellido",
  "role": "Patient",
  "phone": "15123456789",
  "healthInsurance": "ninguna",
  "createdAt": "2025-02-01T12:48:14.003Z",
  "auth": {
    "email": "nuevoemail@gmail.com"
  }
}
```

# Eliminar Auth:

📌 **Ruta:** `GET baseApi/api/v1/auth/:id`

---

## 👤 User

**📌 Concepto General**

## La entidad User permite gestionar los usuarios de la aplicación. A través de los endpoints de esta entidad, se puede obtener información de todos los usuarios o de un usuario en particular, ya sea por ID, apellido (lastName) o email.

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

### 🔍 **Obtener Usuarios por...**

## ID:

📌 **Ruta:** `GET baseApi/api/v1/user/:id`

## Email:

📌 **Ruta:** `GET baseApi/api/v1/user?email=nombreApellido@gmail.com`

## Apellido de usuario:

📌 **Ruta:** `GET baseApi/api/v1/user?lastName=Apellido`

📤 **Response de cualquiera de los 3 endpoints:**

```json
{
  "id": "4af37102-dab2-4585-9e2a-7b2d34cf3de3",
  "name": "Nombre",
  "lastName": "Apellido",
  "role": "Patient",
  "phone": "15123456789",
  "healthInsurance": "ninguna",
  "createdAt": "2025-02-01T12:48:14.003Z",
  "auth": {
    "email": "nombreApellido@gmail.com"
  }
}
```

### ✍️ **Creacion de Usuario**

**El endpoint presupone la existencia de un usuario loggeado que no tenga el rol "Patient"**
_El paciente solo puede crear su usuario registrandose_
📌 **Ruta:** `POST baseApi/api/v1/user`

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

📌 **El endpoint register de`auth` introduce por default el rol de "Patient"**

✅ **Validaciones:**

- **name**: mínimo 3 caracteres
- **lastName**: mínimo 2 caracteres
- **email**: formato válido
- **password**: mínimo 8 caracteres
- **Roles** : admite cualquiera de los 4 'Patient' (por defecto) , 'Secretary', 'Doctor', 'Admin'
- **phone** : admite solo numeros
- **healthInsurance** : admite un string de minimo 3 caracteres

### ✍️ **Edicion de Usuario**

**El endpoint presupone la existencia de un usuario loggeado**
_El paciente solo puede editar su usuario, no otros, para ello se requiere estar loggeado_
📌 **Ruta:** `PATCH baseApi/api/v1/user/:id`

📥 **Request:**

```json
{
  "password": "12345678",
  "phone": "15123456789",
  "healthInsurance": "OSDE"
}
```

📤 **Response:**

```json
{
  "id": "4af37102-dab2-4585-9e2a-7b2d34cf3de3",
  "name": "Nombre",
  "lastName": "Apellido",
  "role": "Patient",
  "phone": "15123456789",
  "healthInsurance": "OSDE",
  "createdAt": "2025-02-01T12:48:14.003Z",
  "auth": {
    "email": "nombreApellido@gmail.com"
  }
}
```

### 🗑️ **Borrado de Usuario**

**El endpoint presupone la existencia de un usuario loggeado**
_El paciente solo puede eliminat su usuario, no otros, para ello se requiere estar loggeado_
📌 **Ruta:** `DELETE baseApi/api/v1/user/:id`

---

🎯 **¡Gracias por usar Medic_api!** 🎯
Si tienes preguntas o mejoras, abre un issue o contribuye en el repositorio. 🚀
