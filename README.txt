Medic_api
Bienvenidos a Medic_api, el backend pensado para la gestión de turnos en un consultorio con uno o más médicos. Esta API está diseñada para facilitar la reserva de turnos mediante la implementación de un proyecto frontend, permitiendo a una persona registrarse, iniciar sesión, ver los turnos disponibles y reservar un turno.

Descripción General
El proyecto está desarrollado con JavaScript en un entorno de Node.js, utilizando Express como base. Utiliza librerías como Joi para el control de datos de entrada, bcrypt y jwt para la encriptación de contraseñas y validación de usuarios logueados. Además, emplea el ORM Sequelize para manejar los modelos y realizar un trabajo eficiente sobre una base de datos relacional (PostgreSQL). Todo esto está envuelto en un manejo de errores amigable proporcionado por la librería "boom".

Se implementó una arquitectura limpia en la confección del proyecto, separando los archivos en rutas, controladores y servicios, que junto a los middlewares y utils, logran una división de responsabilidades acorde a la magnitud del proyecto.

Lógica de Uso de la Aplicación
La aplicación está diseñada para ser utilizada por diferentes tipos de usuarios:

Administrador: Usuario del sistema con "super poderes". Puede realizar un CRUD de usuarios, manejar los horarios disponibles (appointments), y gestionar la reserva de turnos (appointmentData).

Doctor: Usuario con prerrogativas similares a las del administrador.

Secretario: Usuario con poderes similares al administrador y doctor, pero sin la capacidad de editar roles.

Paciente: Usuario con limitaciones de movimientos. Puede crear su cuenta desde el endpoint "register", iniciar sesión, editar o borrar su propio usuario (no puede editar ni borrar otros usuarios) y agendar turnos a su nombre.

Entidades
Usuarios (User)
Administrador

Doctor

Secretario

Paciente

Turnos (Appointment)
Fecha y hora del turno

Historial de Turnos (AppointmentData)
Datos del turno reservado

Endpoints
Autenticación
Registro (POST /register)

Iniciar sesión (POST /login)

Usuarios
Crear usuario (POST /users)

Obtener usuarios (GET /users)

Actualizar usuario (PUT /users/:id)

Eliminar usuario (DELETE /users/:id)

Turnos (Appointments)
Crear turno (POST /appointments)

Obtener turnos disponibles (GET /appointments)

Actualizar turno (PUT /appointments/:id)

Eliminar turno (DELETE /appointments/:id)

Historial de Turnos (AppointmentData)
Crear historial de turno (POST /appointmentData)

Obtener historial de turnos (GET /appointmentData)

Instrucciones para Correr el Proyecto
Para poner en marcha este proyecto, sigue estos pasos:

Realiza un git pull del repositorio.

Implementa las variables de entorno (ver archivo .env.example).

Asegúrate de tener corriendo una base de datos PostgreSQL.

Ubícate en la carpeta api_medic_dates y ejecuta los siguientes comandos:

bash
pnpm install
pnpm run dev

---

## Auth

Concepto General
La entidad Auth es el primer paso al usar la API. Es importante entender que la entidad Auth tiene su propia tabla en la base de datos, con 4 columnas: id, userId, email, password y createdAt. Estos atributos están diseñados para asegurar la protección de datos sensibles (como contraseñas) y facilitar la separación del componente de autenticación para un manejo más eficiente como microservicio.

id: Identificador único del registro en la tabla auths.

userId: Referencia al usuario propietario del registro en Auth.

email: Correo electrónico del usuario.

password: Contraseña del usuario.

createdAt: Fecha de creación del registro.

Endpoints
Register
El endpoint REGISTER debe ser invocado por POST a través de la ruta baseApi/api/v1/auth/register y debe recibir un cuerpo (body) con la información necesaria no solo para Auth, sino también para la creación de un usuario. El cuerpo en formato JSON debería tener este contenido:

json
{
"name": "Nombre",
"lastName": "Apellido",
"email": "nombreApellido@gmail.com",
"password": "12345678",
"phone": "15123456789",
"healthInsurance": "ninguna"
}
Respuesta
La petición devolverá una respuesta similar a esta:

json
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
En la respuesta se observan dos cosas:

Password Excluido: No se incluye la contraseña por razones de seguridad.

Entidad Role: Se agrega el campo role, que por defecto será "Patient". Puede ser modificado a "Admin", "Doctor" o "Secretary" para pruebas.

Validaciones
Campos Requeridos:

name: Mínimo 3 caracteres.

lastName: Mínimo 2 caracteres.

email: Formato válido de correo electrónico.

password: Mínimo 8 caracteres.

Campos Opcionales:

phone: Solo admite números y símbolo +.

healthInsurance: String con un mínimo de 3 caracteres.

Login
El segundo endpoint de importancia es Login, necesario para usar gran parte de los endpoints de la aplicación en general. La ruta para el login es mediante POST tambien a baseApi/api/v1/auth/login.

Información Requerida
Para el login, la única información necesaria es el email y la contraseña, lo cual se verá así:

json
{
"email": "nombreApellido@gmail.com",
"password": "12345678"
}
Respuesta
Este endpoint devolverá un objeto que contiene la información del usuario logueado y el token (fundamental de aquí en adelante):

json
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
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0YWYzNzEwMi1kYWIyLTQ1ODUtOWUyYS03YjJkMzRjZjNkZTMiLCJyb2xlIjoiUGF0aWVudCIsImlhdCI6MTczODQxNTE5NiwiZXhwIjoxNzM4NTAxNTk2fQ.ZdoSUfDfhvtM0yCtFf3nHlg4vb-tG-eN2KcYtd4lztg"
}
El token tendrá una validez de 24 horas.

Otros Endpoints de Auth
Obtener Todos los Registros de Auth:

Ruta: baseApi/api/v1/auth

Respuesta: Un array de objetos

json
[
{
"id": "f1190f6b-3428-4dcc-963c-5395a5a9a8fa",
"userId": "4af37102-dab2-4585-9e2a-7b2d34cf3de3",
"email": "nombreApellido@gmail.com",
"password": "$2b$08$pyZqf/xe7ko6KJrK21JjsuUj6UsBcHO/9vZmKvGmLInH6qcIUzlUq",
"createdAt": "2025-02-01T12:48:14.009Z"
}
]
Obtener Auth por ID:

Ruta: baseApi/api/v1/auth/:id

Ejemplo: baseApi/api/v1/auth/f1190f6b-3428-4dcc-963c-5395a5a9a8fa

Buscar Auth por Email:

Ruta: baseApi/api/v1/auth?email=nombreApellido@gmail.com

Update y Delete
Para realizar operaciones de update y delete, es necesario que el usuario esté logueado. Estos endpoints solo aceptan el ingreso de "Admin", "Doctor" y "Secretary". Deben incluir un token válido en el Bearer Token de la autorización del cliente (navegador o app como Postman).

Actualizar Auth (PATCH):

Ruta: baseApi/api/v1/auth/:idbuscadoparaupdate

Información: Se pueden pasar nuevos datos de email o password, los cuales responderán a las limitaciones previamente especificadas.

Eliminar Auth (DELETE):

Ruta: baseApi/api/v1/auth/:idbuscadoparadelete

## USER

User
Concepto General
La entidad User permite gestionar los usuarios de la aplicación. A través de los endpoints de esta entidad, se puede obtener información de todos los usuarios o de un usuario en particular, ya sea por ID, apellido (lastName) o email.

Endpoints
Obtener Todos los Usuarios
Este endpoint devuelve un array con los datos de todos los usuarios registrados.

Ruta: baseApi/api/v1/user

Método: GET

Respuesta:

json
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
Nota: Este endpoint no incluye la información del Auth (como el email y la contraseña).

Obtener Usuario por ID
Este endpoint permite obtener la información de un usuario específico mediante su ID.

Ruta: baseApi/api/v1/user/:id

Método: GET

Ejemplo: baseApi/api/v1/user/e29cd687-c016-4313-8d3a-76575dccb7c1

Obtener Usuario por Apellido (lastName)
Este endpoint permite obtener la información de un usuario específico mediante su apellido.

Ruta: baseApi/api/v1/user?lastName=:lastName

Método: GET

Ejemplo: baseApi/api/v1/user?lastName=Apellido

Obtener Usuario por Email
Este endpoint permite obtener la información de un usuario específico mediante su email.

Ruta: baseApi/api/v1/user?email=:email

Método: GET

Ejemplo: baseApi/api/v1/user?email=nombreApellido@gmail.com

Respuesta
Cualquiera de las búsquedas devolverá un objeto como este:

json
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
Creación, Actualización y Eliminación de Usuarios
Para realizar operaciones de creación, actualización y eliminación de usuarios, es necesario que el usuario esté logueado y utilice un Bearer token con el contenido obtenido en el login.

Creación de Usuarios
La creación de usuarios está inhabilitada para el usuario Paciente.

Ruta: baseApi/api/v1/user

Método: POST

Cuerpo:

json
{
"name": "Nombre",
"lastName": "Apellido",
"email": "nombreApellido@gmail.com",
"password": "12345678",
"phone": "15123456789",
"healthInsurance": "ninguna"
}
Este endpoint devolverá la misma respuesta que el register, ya que internamente utilizan el mismo funcionamiento, garantizando así consistencia entre los registros de la base de datos.

Actualización de Usuarios
La actualización de usuarios se realiza utilizando el método PATCH.

Ruta: baseApi/api/v1/user/:id

Método: PATCH

Eliminación de Usuarios
La eliminación de usuarios se realiza utilizando el método DELETE.

Ruta: baseApi/api/v1/user/:id

Método: DELETE

Nota: En el caso del paciente, tendrá acceso a estos dos endpoints, pero solo podrá modificar o eliminar datos donde él mismo sea el propietario.

## Appointment

Concepto General
La entidad Appointment hace referencia a los turnos disponibles en la base de datos. Según la lógica de negocio, no hay appointments hasta que sean habilitados (creados) por un usuario logueado con permisos para hacerlo (todos menos pacientes).

Campos de la Entidad Appointment
El appointment contiene 7 campos:

id: Identificador único del turno.

date: Fecha del turno.

time: Horario del turno.

createdBy: ID del usuario que creó el turno.

ownedBy: Por defecto será null. Cuando se reserva un turno, aquí se introducirá el ID del paciente a nombre de quien está reservado el mismo.

assignedBy: ID de quien hizo la reserva, solo para tener control.

createdAt: Fecha de creación del turno.

Endpoints
Obtener Todos los Turnos
Este endpoint devuelve todos los appointments, ya sean ocupados o no. El frontend debe marcar cuáles están ocupados verificando si el campo ownedBy tiene algún valor.

Ruta: baseApi/api/v1/appointment

Método: GET

Respuesta:

json
[
{
"id": "e29cd687-c016-4313-8d3a-76575dccb7c1",
"date": "2025-01-28",
"time": "14:00",
"createdBy": "4af37102-dab2-4585-9e2a-7b2d34cf3de3",
"ownedBy": null,
"assignedBy": null,
"createdAt": "2025-01-01T13:36:22.685Z"
}
]
Buscar Turnos por Fecha Específica
Este endpoint permite buscar turnos por una fecha específica.

Ruta: baseApi/api/v1/appointment?date=:date

Método: GET

Ejemplo: baseApi/api/v1/appointment?date=2025-01-28

Buscar Turnos por Rango de Fechas
Este endpoint permite buscar turnos por un rango de fechas.

Ruta: baseApi/api/v1/appointment?startDate=:startDate&endDate=:endDate

Método: GET

Ejemplo: baseApi/api/v1/appointment?startDate=2025-01-24&endDate=2025-01-26

Respuesta
Cualquiera de las búsquedas por fecha devolverá un array con siguiente información.
[{
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
}]

Buscar Turnos por Id Específico
Este endpoint permite obetener la informacion mas detallada de toda la app, y lo hace al buscar turnos id .

Ruta: baseApi/api/v1/appointment/ae11f962-ad5d-4339-9d0a-33a2684b1e2a

obetniendo una Respuesta como esta:

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

-- Creación de Turnos
A partir de ahora, es necesario estar logueado para trabajar sobre los appointments. En cuanto a la creación, se pueden mandar por el body todos los campos que ya hemos visto que la entidad devuelve, pero como mínimo se necesitan los parámetros date y time. El createdBy lo genera la API automáticamente utilizando la información del usuario logueado.

La implementación de este endpoint permite crear un solo appointment o una lista de ellos, utilizando el mismo endpoint:

Ruta: baseApi/api/v1/appointment

Método: POST

Cuerpo:

json
[
{
"date": "2025-02-28",
"time": "12:00"
},
{
"date": "2025-02-28",
"time": "12:30"
},
{
"date": "2025-02-28",
"time": "13:00"
}
]
Nota: El endpoint no permitirá que se creen dos turnos el mismo día a la misma hora.

Edición y Borrado de Turnos
Nos regimos por las normas generales: no se le permite al paciente hacerlo y se debe especificar en el endpoint el ID del turno referido y el método (PATCH para editar y DELETE para borrar).

Ruta: baseApi/api/v1/appointment/:id

Método: PATCH o DELETE

Ejemplo de Edición:

json
{
"time": "15:30",
"ownedBy": "f49c5fdc-b8cf-4fd8-bf60-1fc0454a74ee",
"assignedBy": "6b9cf1c6-3c62-48ca-a20d-4fa10ca159b6"
}
En la edición, si se modifica el ownedBy, esto creará automáticamente el campo correspondiente de appointmentData (historial de turno). Además, si no se pasa el campo assignedBy en el body, este será inyectado automáticamente por el backend para que el registro tenga toda la información necesaria.

Reserva de Turnos por Pacientes
El paciente también puede reservar un turno, lo que creará el correspondiente appointmentData. Para hacerlo, el paciente debe estar logueado y hacer la llamada al endpoint con el método PATCH:

Ruta: baseApi/api/v1/appointment/book/:id

Método: PATCH

Nota: El ID del endpoint es el del turno que se quiere reservar, no el del paciente.

## AppointmentData

Concepto General
La entidad Appointment Data está destinada a ser creada mediante la implementación de funciones internas de la aplicación. Sin embargo, existe la posibilidad de exponer un endpoint privado para su creación y edición. Este último es de vital importancia, ya que está pensado para que el Doctor pueda insertar los pormenores de la visita, los cuales formarán parte de la historia clínica del usuario.

Endpoints
Obtener Datos de Turnos (GET)
Las peticiones GET requieren que el usuario esté logueado y no están permitidas para los pacientes, ya que contienen información sensible, con una excepción que explicaremos más adelante.

Ruta: baseApi/api/v1/appointmentData

Método: GET

Respuesta:

json
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
},
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
Excepción para Pacientes
La excepción mencionada se presenta aquí. Si el paciente está logueado, puede tener acceso a su historia clínica haciendo una búsqueda por query de paciente. El endpoint es:

Ruta: baseApi/api/v1/appointmentData?patientId=220d190b-16f3-4fe9-a11c-a27ac96916a8

Método: GET

Nota: Internamente, permitirá el acceso a cualquier rol, pero en el caso de un paciente, verificará que el patientId coincida con el del usuario logueado, dando acceso solo al propietario de la información.

Obtener Appointment Data por ID
Se requiere estar logueado para acceder a los datos de un turno específico.

Ruta: baseApi/api/v1/appointmentData/:id

Método: GET

Ejemplo: baseApi/api/v1/appointmentData/6011750a-3808-4d9d-ba7f-ebb3a31b5dc2

Creación de Appointment Data
La aplicación crea automáticamente appointmentData al asignar un appointment a un usuario. Sin embargo, también se puede crear manualmente:

Ruta: baseApi/api/v1/appointmentData

Método: POST

Cuerpo:

json
{
"appointmentId": "735c92f6-e403-4c0f-a7ea-2aac18f6741b",
"date": "2023-04-07",
"symptoms": "",
"observations": "",
"directives": "",
"patientId": "220d190b-16f3-4fe9-a11c-a27ac96916a8"
}
Campos Requeridos
Los campos obligatorios son appointmentId, date y patientId.

Edición de Appointment Data
La edición del appointmentData también reviste mucha importancia, ya que permite dejar constancia de lo que sucedió en la cita. Debe hacerse por PATCH al endpoint:

Ruta: baseApi/api/v1/appointmentData/:id

Método: PATCH

Ejemplo de Body:

json
{
"symptoms": "El paciente se presentó con mucho dolor abdominal, dijo haber sufrido diarrea y vómitos",
"observations": "Se le hicieron preguntas de estilo y dijo haber bebido mucho líquido, pero no pudo comer nada",
"directives": "Se le indicó comprar suero líquido en la farmacia, a los fines de que lo tome de a poco, y cuando ya no vomite eso pruebe con comer pechuga al horno sin condimentar y que vuelva a sacar turno en 5 días",
"doctorId": "6b9cf1c6-3c62-48ca-a20d-4fa10ca159b6"
}
Resumen de Endpoints
Obtener Datos de Turnos: GET /appointmentData

Crear Appointment Data: POST /appointmentData

Editar Appointment Data: PATCH /appointmentData/:id

Obtener Appointment Data por ID: GET /appointmentData/:id

Buscar Appointment Data por Paciente: GET /appointmentData?patientId=:patientId
