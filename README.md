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
PATCH    /user/:id                         # Actualizar usuario
DELETE /user/:id                         # Eliminar usuario
```

### 📅 **Turnos (Appointments)**

```http
POST   /appointment                                              # Crear turno
GET    /appointment                                              # Obtener turnos
GET    /appointment?date=2025-01-30                              # Obtener turno por fecha
GET    /appointment?startDate=2025-01-24&endDate=2025-01-26      # Obtener turno por rango de fechas
PATCH    /appointment/:id                                          # Actualizar turno
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

# 🔐 Auth (Autenticación)

**📌 Concepto General**

### La entidad Auth es el primer paso al usar la API. Es importante entender que la entidad Auth tiene su propia tabla en la base de datos, con 4 columnas: id, userId, email, password y createdAt.

### Estos atributos están diseñados para asegurar la protección de datos sensibles (como contraseñas) y facilitar la separación del componente de autenticación para un manejo más eficiente como microservicio.

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

### Obtener Todos los Registros de Auth:

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

### Obtener Auth por ID:

📌 **Ruta:** `GET baseApi/api/v1/auth/:id`

### _Buscar Auth por Email:_

📌 **Ruta:** `GET baseApi/api/v1/auth?email=nombreApellido@gmail.com`

## Update y Delete

**Para realizar operaciones de update y delete, es necesario que el usuario esté logueado. Estos endpoints solo aceptan el ingreso de "Admin", "Doctor" y "Secretary". Deben incluir un token válido en el Bearer Token de la autorización del cliente (navegador o app como Postman).**

### Editar Auth

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

### 🗑️ **Borrado de Auth:**

📌 **Ruta:** `GET baseApi/api/v1/auth/:id`

---

# 👤 User

**📌 Concepto General**

### La entidad User permite gestionar los usuarios de la aplicación. A través de los endpoints de esta entidad, se puede obtener información de todos los usuarios o de un usuario en particular, ya sea por ID, apellido (lastName) o email.

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

### _ID:_

📌 **Ruta:** `GET baseApi/api/v1/user/:id`

### _Email:_

📌 **Ruta:** `GET baseApi/api/v1/user?email=nombreApellido@gmail.com`

### _Apellido de usuario:_

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

### ✍️ **Creación de Usuario**

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

### ✍️ **Edición de Usuario**

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

# 🩺 Doctor

**📌 Concepto General**

### La entidad Doctor representa a un profesional de la salud dentro del sistema. No se crea como un recurso independiente, sino que se añade a un usuario previamente existente mediante un endpoint específico. Este proceso también actualiza el rol del usuario a "Doctor" automáticamente.

**📌 Requiere un token vigente de un usuario con rol "Admin", "Secretary" o "Doctor"**

### ✍️ Asignar Rol de Doctor a un Usuario Existente

📌 **Ruta**: `PATCH baseApi/api/v1/user/:userId/doctor`

(reemplazar :userId por el ID del usuario que se desea convertir en doctor)

📥 **Request:**

```json
{
  "specialty": "Ginecologa",
  "licenseNumber": "15234kdh788LP",
  "experience": "Una ginecóloga formada en la Facultad de La Plata está capacitada para brindar atención integral a la salud femenina en todas las etapas de la vida. Tiene experiencia en la prevención, diagnóstico y tratamiento de enfermedades ginecológicas, así como en el seguimiento de embarazos y salud reproductiva. Posee habilidades para realizar controles de rutina, orientar en planificación familiar y abordar temas de salud sexual con sensibilidad y profesionalismo. Además, trabaja en colaboración con otros especialistas para garantizar el bienestar integral de sus pacientes",
  "address": "Hospital Español, calle 9 entre 36 y 35, La Plata"
}
```

📌 **Importante:**

## El usuario debe existir previamente.

## El usuario puede no tener ya el rol "Doctor".

## Al completar este proceso, el rol del usuario se actualizará automáticamente a "Doctor".

📤 **Response:**

```json
{
  "id": "2a1e8799-0b63-48cf-9c68-451122fc5312",
  "specialty": "Ginecologa",
  "licenseNumber": "15234kdh788LP",
  "experience": "Una ginecóloga formada en la Facultad de La Plata está capacitada para brindar atención integral a la salud femenina...",
  "address": "Hospital Español, calle 9 entre 36 y 35, La Plata",
  "createdAt": "2025-04-29T17:04:12.000Z",
  "user": {
    "id": "4af37102-dab2-4585-9e2a-7b2d34cf3de3",
    "name": "Nombre",
    "lastName": "Apellido",
    "role": "Doctor",
    "phone": "15123456789",
    "healthInsurance": "ninguna",
    "createdAt": "2025-02-01T12:48:14.003Z",
    "auth": {
      "email": "nombreApellido@gmail.com"
    }
  }
}
```

✅ **Validaciones:**

**specialty:** mínimo 3 caracteres

**licenseNumber:** alfanumérico, único, mínimo 6 caracteres

**experience:** texto descriptivo, mínimo 20 caracteres

**address:** mínimo 5 caracteres

**userId:** debe corresponder a un usuario válido y existente que no sea ya doctor

---

# 📅 Appointments

**📌 Concepto General**

### La entidad Appointment hace referencia a los turnos disponibles en la base de datos. Según la lógica de negocio, no hay appointments hasta que sean habilitados (creados) por un usuario logueado con permisos para hacerlo (todos menos pacientes).

_El appointment tiene 7 campos, entre ellos los mas importantes son 2, a saber :_

### _El campo ownedBy: Por defecto será null. Cuando se reserva un turno, aquí se introducirá el ID del paciente a nombre de quien está reservado el mismo._

### _El campo assignedBy: ID de quien hizo la reserva, solo para tener control._

### 🔍 **Obtener Todos los Appointments**

📌 **Ruta:** `GET baseApi/api/v1/appointment`

📤 **Response:**

```json
[
  {
    "id": "ae11f962-ad5d-4339-9d0a-33a2684b1e2a",
    "date": "2025-01-30",
    "time": "11:00:00",
    "createdBy": "e29cd687-c016-4313-8d3a-76575dccb7c1",
    "ownedBy": "e29cd687-c016-4313-8d3a-76575dccb7c1",
    "assignedBy": "e29cd687-c016-4313-8d3a-76575dccb7c1",
    "createdAt": "2025-01-31T15:49:08.780Z"
  },
  {
    "id": "40057297-3e0d-4d5b-936a-6294293a3779",
    "date": "2025-02-28",
    "time": "11:00:00",
    "createdBy": "e29cd687-c016-4313-8d3a-76575dccb7c1",
    "ownedBy": null,
    "assignedBy": null,
    "createdAt": "2025-02-01T14:42:10.290Z"
  }
]
```

### 🔍 **Obtener Appointments por fechas 📅**

### _fecha especifica:_

📌 **Ruta:** `GET baseApi/api/v1/appointment?date=2025-01-30`

📤 **Response:**

```json
[
  {
    "id": "ae11f962-ad5d-4339-9d0a-33a2684b1e2a",
    "date": "2025-01-30",
    "time": "11:00:00",
    "createdBy": "e29cd687-c016-4313-8d3a-76575dccb7c1",
    "ownedBy": "e29cd687-c016-4313-8d3a-76575dccb7c1",
    "assignedBy": "e29cd687-c016-4313-8d3a-76575dccb7c1",
    "createdAt": "2025-01-31T15:49:08.780Z",
    "owner": {
      "id": "e29cd687-c016-4313-8d3a-76575dccb7c1",
      "name": "Juan Pablo"
    },
    "appointmentData": {
      "id": "6011750a-3808-4d9d-ba7f-ebb3a31b5dc2",
      "appointmentId": "ae11f962-ad5d-4339-9d0a-33a2684b1e2a",
      "date": "2025-01-30",
      "symptoms": null,
      "observations": null,
      "directives": null,
      "patientId": "e29cd687-c016-4313-8d3a-76575dccb7c1",
      "doctorId": null,
      "createdAt": "2025-01-31T16:31:37.946Z"
    }
  }
]
```

_Véase que el response de arriba implica SOLO un appointment, con la info de la otra entidad AppointmenData_

### _Por Rango de fechas:_

📌 **Ruta:** `GET baseApi/api/v1/appointment?startDate=2025-01-24&endDate=2025-02-1`

📤 **Response:**

```json
[
  {
    "id": "ae11f962-ad5d-4339-9d0a-33a2684b1e2a",
    "date": "2025-01-30",
    "time": "11:00:00",
    "createdBy": "e29cd687-c016-4313-8d3a-76575dccb7c1",
    "ownedBy": "e29cd687-c016-4313-8d3a-76575dccb7c1",
    "assignedBy": "e29cd687-c016-4313-8d3a-76575dccb7c1",
    "createdAt": "2025-01-31T15:49:08.780Z",
    "owner": {
      "id": "e29cd687-c016-4313-8d3a-76575dccb7c1",
      "name": "Juan Pablo"
    },
    "appointmentData": {
      "id": "6011750a-3808-4d9d-ba7f-ebb3a31b5dc2",
      "appointmentId": "ae11f962-ad5d-4339-9d0a-33a2684b1e2a",
      "date": "2025-01-30",
      "symptoms": null,
      "observations": null,
      "directives": null,
      "patientId": "e29cd687-c016-4313-8d3a-76575dccb7c1",
      "doctorId": null,
      "createdAt": "2025-01-31T16:31:37.946Z"
    }
  }
]
```

_Véase que el response de arriba implica SOLO un appointment, con la info de la otra entidad AppointmenData_

### 🔍 **Obtener Appointments por ID**

_"La búsqueda por ID nos da una de las respuestas más detalladas de toda la API, abarcando los nombres de la persona a quien se le asignó el turno, así como quien efectivamente hizo esa asignación, además de los datos que involucran la entidad appointmentData_

📌 **Ruta:** `GET baseApi/api/v1/appointment//ae11f962-ad5d-4339-9d0a-33a2684b1e2a`

📤 **Response:**

```json
{
  "id": "ae11f962-ad5d-4339-9d0a-33a2684b1e2a",
  "date": "2025-01-30",
  "time": "11:00:00",
  "createdBy": "e29cd687-c016-4313-8d3a-76575dccb7c1",
  "ownedBy": "e29cd687-c016-4313-8d3a-76575dccb7c1",
  "assignedBy": "e29cd687-c016-4313-8d3a-76575dccb7c1",
  "createdAt": "2025-01-31T15:49:08.780Z",
  "creator": {
    "id": "e29cd687-c016-4313-8d3a-76575dccb7c1",
    "name": "Juan Pablo"
  },
  "owner": {
    "id": "e29cd687-c016-4313-8d3a-76575dccb7c1",
    "name": "Juan Pablo"
  },
  "assigner": {
    "id": "e29cd687-c016-4313-8d3a-76575dccb7c1",
    "name": "Juan Pablo"
  },
  "appointmentData": {
    "id": "6011750a-3808-4d9d-ba7f-ebb3a31b5dc2",
    "appointmentId": "ae11f962-ad5d-4339-9d0a-33a2684b1e2a",
    "date": "2025-01-30",
    "symptoms": null,
    "observations": null,
    "directives": null,
    "patientId": "e29cd687-c016-4313-8d3a-76575dccb7c1",
    "doctorId": null,
    "createdAt": "2025-01-31T16:31:37.946Z"
  }
}
```

### ✍️ **Creación de Appointment/Appointments**

### Una de las necesidades más importantes que se presentaba al intentar entender la lógica del negocio era la posibilidad de crear turnos, la cual no se satisfacía con la mera posibilidad de crear un turno. Por ello, se trabajó para que el endpoint de creación acepte un array, el cual puede tener dentro un turno, o cuantos turnos se pretendan hacer.

_Este endpoint no permitirá la creación de un turno dado para un día y un horario si previamente ya hay uno con esos valores en la base de datos (DB)._

📌 **Ruta:** `POST baseApi/api/v1/appointment`

_Se necesita estar loggeado y con un rol distinto a 'Patient'_

📥 **Request:**

```json
[
  {
    "date": "2025-02-28",
    "time": "10:30"
  }
]
```

📤 **Response: ✅**

```json
[
  {
    "createdAt": "2025-02-04T13:23:18.874Z",
    "id": "82a551ce-97eb-45a8-9ee3-4a2d145cf5e1",
    "createdBy": "e29cd687-c016-4313-8d3a-76575dccb7c1",
    "date": "2025-02-28",
    "time": "10:30:00",
    "ownedBy": null,
    "assignedBy": null
  }
]
```

📤 **Response: Turno previamente creado ❌**

```json
{
  "statusCode": 409,
  "error": "Conflict",
  "message": "Ya existe un turno en esta fecha y horario"
}
```

### Para la creación de multiples turnos, solo hay que sumar mas fechas. El "CreatedBy" se completa por defecto en caso de no especificar.

📥 **Request:**

```json
[
  [
    {
      "date": "2025-02-03",
      "time": "11:00",
      "createdBy": "e29cd687-c016-4313-8d3a-76575dccb7c1"
    },
    {
      "date": "2025-02-03",
      "time": "11:30",
      "createdBy": "e29cd687-c016-4313-8d3a-76575dccb7c1"
    },
    {
      "date": "2025-02-03",
      "time": "12:00",
      "createdBy": "e29cd687-c016-4313-8d3a-76575dccb7c1"
    },
    {
      "date": "2025-02-03",
      "time": "12:30",
      "createdBy": "e29cd687-c016-4313-8d3a-76575dccb7c1"
    }
  ]
]
```

📤 **Response: ✅**

```json
[
  {
    "createdAt": "2025-02-04T14:02:46.742Z",
    "id": "b6767279-424d-46b4-a1f2-72a06c0168e4",
    "createdBy": "e29cd687-c016-4313-8d3a-76575dccb7c1",
    "date": "2025-02-04",
    "time": "11:00:00",
    "ownedBy": null,
    "assignedBy": null
  },
  {
    "createdAt": "2025-02-04T14:02:46.761Z",
    "id": "110fd4a0-8e38-4519-88f7-faa15ea419c0",
    "createdBy": "e29cd687-c016-4313-8d3a-76575dccb7c1",
    "date": "2025-02-04",
    "time": "11:30:00",
    "ownedBy": null,
    "assignedBy": null
  },
  {
    "createdAt": "2025-02-04T14:02:46.768Z",
    "id": "679d5817-7979-43e2-8378-ccca64879902",
    "createdBy": "e29cd687-c016-4313-8d3a-76575dccb7c1",
    "date": "2025-02-04",
    "time": "12:00:00",
    "ownedBy": null,
    "assignedBy": null
  },
  {
    "createdAt": "2025-02-04T14:02:46.775Z",
    "id": "96465ce6-0987-4dd1-9f50-3d90f2d83b1d",
    "createdBy": "e29cd687-c016-4313-8d3a-76575dccb7c1",
    "date": "2025-02-04",
    "time": "12:30:00",
    "ownedBy": null,
    "assignedBy": null
  }
]
```

_Si se va a usar el createdBy, asegurarse de que el mismo exista en la db_

### ✍️ **Edición y Borrado de Appointment/Appointments**

### Nos regimos por las normas generales: no se le permite al paciente hacerlo y se debe especificar en el endpoint el ID del turno referido y el método (PATCH para editar y DELETE para borrar).

📌 **Ruta:** `PATCH/DELETE baseApi/api/v1/appointment/:id`

## Ejemplo de edición

```json
{
  "time": "15:30",
  "ownedBy": "f49c5fdc-b8cf-4fd8-bf60-1fc0454a74ee",
  "assignedBy": "6b9cf1c6-3c62-48ca-a20d-4fa10ca159b6"
}
```

## IMPORTANTE

_En la edición, si se modifica el ownedBy, esto creará automáticamente el campo correspondiente de appointmentData (historial de turno). Además, si no se pasa el campo assignedBy en el body, este será inyectado automáticamente por el backend para que el registro tenga toda la información necesaria._

### Además

## Reserva de Turnos por Pacientes

_El paciente también puede reservar un turno, lo que creará el correspondiente appointmentData. Para hacerlo, el paciente debe estar logueado y hacer la llamada al endpoint_

📌 **Ruta:** `PATCH baseApi/api/v1/appointment/book/:id`

## _Nota: El ID del endpoint es el del turno que se quiere reservar, no el del paciente.No deberá pasar ningun otro dato_

# 🗂️ AppointmentData

**📌 Concepto General**

### La entidad Appointment Data está destinada a ser creada mediante la implementación de funciones internas de la aplicación. Sin embargo, existe la posibilidad de exponer un endpoint privado para su creación y edición. Este último es de vital importancia, ya que está pensado para que el Doctor pueda insertar los pormenores de la visita, los cuales formarán parte de la historia clínica del usuario.

_Las peticiones GET requieren que el usuario esté logueado y no están permitidas para los pacientes, ya que contienen información sensible, con una excepción que explicaremos más adelante._

### 🔍 **Obtener Todos los AppointmentData**

📌 **Ruta:** `GET baseApi/api/v1/appoinmentdata`

📤 **Response:**

```json
[
  {
    "id": "6011750a-3808-4d9d-ba7f-ebb3a31b5dc2",
    "appointmentId": "ae11f962-ad5d-4339-9d0a-33a2684b1e2a",
    "date": "2025-01-30",
    "symptoms": null,
    "observations": null,
    "directives": null,
    "patientId": "e29cd687-c016-4313-8d3a-76575dccb7c1",
    "doctorId": null,
    "createdAt": "2025-01-31T16:31:37.946Z"
  }
]
```

### 🔍 **Obtener Todos los AppointmentData de un Paciente en particular**

**_Excepción para Pacientes_**

_La excepción mencionada se presenta aquí. Si el paciente está logueado, puede tener acceso a su historia clínica haciendo una búsqueda por query de paciente. El endpoint es:_

📌 **Ruta:** `GET baseApi/api/v1/appoinmentdata?patientId=220d190b-16f3-4fe9-a11c-a27ac96916a8`

_Internamente, permitirá el acceso a cualquier rol, pero en el caso de un paciente, verificará que el patientId coincida con el del usuario logueado, dando acceso solo al propietario de la información._

### 🔍 **Obtener AppointmentData por Id**

📌 **Ruta:** `GET baseApi/api/v1/appoinmentdata/6011750a-3808-4d9d-ba7f-ebb3a31b5dc2`

📤 **Response:**

```json
{
  "id": "6011750a-3808-4d9d-ba7f-ebb3a31b5dc2",
  "appointmentId": "ae11f962-ad5d-4339-9d0a-33a2684b1e2a",
  "date": "2025-01-30",
  "symptoms": null,
  "observations": null,
  "directives": null,
  "patientId": "e29cd687-c016-4313-8d3a-76575dccb7c1",
  "doctorId": null,
  "createdAt": "2025-01-31T16:31:37.946Z"
}
```

### ✍️ **Creación de AppointmentData**

_La aplicación crea automáticamente appointmentData al asignar un appointment a un usuario. Sin embargo, también se puede crear manualmente._

📌 **Ruta:** `POST baseApi/api/v1/appoinmentdata`

_Se necesita estar loggeado y con un rol distinto a 'Patient'_

📥 **Request:**

```json
{
  "appointmentId": "40057297-3e0d-4d5b-936a-6294293a3779",
  "date": "2025-02-28",
  "symptoms": "",
  "observations": "",
  "directives": "",
  "patientId": "4af37102-dab2-4585-9e2a-7b2d34cf3de3"
}
```

📤 **Response: ✅**

```json
{
  "createdAt": "2025-02-05T12:22:08.236Z",
  "id": "b8856527-05ef-474d-a434-196289af2cb9",
  "appointmentId": "40057297-3e0d-4d5b-936a-6294293a3779",
  "date": "2025-02-28",
  "symptoms": "",
  "observations": "",
  "directives": "",
  "patientId": "4af37102-dab2-4585-9e2a-7b2d34cf3de3",
  "doctorId": null
}
```

✅ **Validaciones minimas requeridas:**

- **appointmentId**: Un id valido y existente
- **date**: formato yyyy-mm-dd
- **patientId**: formato válido

### ✍️ **Edición de AppointmentData**

### La edición del appointmentData reviste mucha importancia, ya que permite dejar constancia de lo que sucedió en la cita.

📌 **Ruta:** `PATCH baseApi/api/v1/appoinmentdata/b8856527-05ef-474d-a434-196289af2cb9`

_Se necesita estar loggeado y con un rol distinto a 'Patient'_

📥 **Request:**

```json
{
  "symptoms": "El paciente se presento con mucho dolor abdominal, dijo haber sufrido diarrea y vomitos",
  "observations": "Se le hicieron preguntas de estilo y dijo haber bebido mucho liquido, pero no pudo comer nada",
  "directives": "Se le indico comprar suero liquido en la farmacia, a los fines de que lo tome de a poco, y cuando ya no vomite eso pruebe con comer pechuga al horno sin condimentar y que vuela a sacar turno en 5 dias",
  "doctorId": "de1a40d2-269f-4819-b857-bc4e401f015b"
}
```

📤 **Response: ✅**

```json
{
  "id": "b8856527-05ef-474d-a434-196289af2cb9",
  "appointmentId": "40057297-3e0d-4d5b-936a-6294293a3779",
  "date": "2025-02-28",
  "symptoms": "El paciente se presento con mucho dolor abdominal, dijo haber sufrido diarrea y vomitos",
  "observations": "Se le hicieron preguntas de estilo y dijo haber bebido mucho liquido, pero no pudo comer nada",
  "directives": "Se le indico comprar suero liquido en la farmacia, a los fines de que lo tome de a poco, y cuando ya no vomite eso pruebe con comer pechuga al horno sin condimentar y que vuela a sacar turno en 5 dias",
  "patientId": "4af37102-dab2-4585-9e2a-7b2d34cf3de3",
  "doctorId": "de1a40d2-269f-4819-b857-bc4e401f015b",
  "createdAt": "2025-02-05T12:22:08.236Z"
}
```

### 🗑️ **Borrado de AppointmentData**

### La idea es no tener que utilizarlo, pero por fines de prolijidad, nos regimos por las normas generales: no se le permite al paciente hacerlo y se debe especificar en el endpoint el ID del turno referido.

📌 **Ruta:** `DELETE baseApi/api/v1/appoinmentdata/b8856527-05ef-474d-a434-196289af2cb9`

---

🎯 **¡Gracias por usar Medic_api!** 🎯
Si tienes preguntas o mejoras, abre un issue o contribuye en el repositorio. 🚀
