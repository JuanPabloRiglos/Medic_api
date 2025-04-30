import boom from '@hapi/boom';

//importo instancia de sequelize
import sequelize from '../libs/sequelize.js';
const models = sequelize.models;

class DoctorService {
  async getAll() {
    try {
      const db_data = await models.Doctor.findAll();
      // el models. va seguido del nombre de la clase del modelo, en este caso, User
      return db_data;
    } catch (error) {
      throw boom.internal('Error al obtener usuarios', error);
    }
  }

  async create(data) {
    const transaction = await sequelize.transaction();
    try {
      // 1. Crear el doctor
      const newDoctor = await models.Doctor.create(data, { transaction });

      // 2. Obtener el usuario asociado
      const user = await models.User.findByPk(data.userId, { transaction });
      if (!user) throw boom.notFound('Usuario asociado no encontrado');

      // 3. Si el usuario no tiene rol 'doctor', lo actualizamos
      if (user.role !== 'Doctor') {
        user.role = 'Doctor';
        await user.save({ transaction });
      }

      // 4. Obtenemos el doctor con los datos del usuario y auth
      const doctorWithUser = await models.Doctor.findByPk(newDoctor.id, {
        include: {
          model: models.User,
          as: 'user',
          include: {
            model: models.Auth,
            as: 'auth',
            attributes: ['email'], // sin password
          },
        },
        transaction,
      });

      await transaction.commit();
      return doctorWithUser;
    } catch (error) {
      await transaction.rollback();
      throw boom.internal('Error al crear doctor', error);
    }
  }
}

//   async findOne(param) {
//     try {
//       let user;
//       if (param.includes('@') && param.includes('.')) {
//         user = await models.Doctor.findOne({
//           include: {
//             model: models.Auth,
//             as: 'auth',
//             where: { email: param },
//             attributes: ['email'], // Solo traemos el email, excluimos password
//           },
//         });
//       } else {
//         user = await models.Doctor.findByPk(param, {
//           include: [
//             {
//               model: models.Auth,
//               as: 'auth',
//               attributes: ['email'], // Incluir email también si buscamos por ID
//             },
//           ],
//         }); //por ID
//       }
//       if (!user) throw boom.notFound('Usuario no encontrado');
//       return user;
//     } catch (error) {
//       if (error.isBoom) {
//         throw error;
//       } else {
//         throw boom.internal('Error al encontrar usuario', error);
//       }
//     }
//   }

//   async findByLastName(lastName) {
//     try {
//       // const query = {};
//       // if (name) query.names = name;
//       // if (lastName) query.last_name = lastName;
//       // la busqueda tensra el campo que le llegue.
//       const user = await models.Doctor.findOne({
//         // where: query,
//         where: {
//           lastName: lastName,
//         },
//         include: [
//           {
//             model: models.Auth,
//             as: 'auth',
//             attributes: ['email'], // Solo traemos el email
//           },
//         ],
//       });

//       if (!user) throw boom.notFound('Usuario no encontrado');
//       return user;
//     } catch (error) {
//       if (error.isBoom) {
//         throw error;
//       } else {
//         if (error.isBoom) {
//           throw error;
//         } else {
//           throw boom.internal('Error al encontrar usuario', error);
//         }
//       }
//     }
//   }

// async create(userData) {
//   console.log('Se crearia un doctor con la siguiente data ->', userData);
// const { email, password, authId, ...userWithoutAuthData } = userData;
// const authData = {
//   id: authId,
//   email: email,
//   password: password,
//   userId: userWithoutAuthData.id,
// };

// const transaction = await sequelize.transaction(); // Para asegurar atomicidad
// try {
//   // Crear usuario
//   const newUser = await models.Doctor.create(userWithoutAuthData, {
//     transaction,
//   });

//   // Crear autenticación vinculada
//   const newAuth = await models.Auth.create(authData, { transaction });

//   await transaction.commit(); //ok solo si los 2 se crearon
//   console.log('New User -> ', newUser, 'New Auth ->', newAuth);
//   return {
//     ...newUser.dataValues,
//     email: newAuth.dataValues.email,
//   };
// } catch (error) {
//   await transaction.rollback(); //Tira todo para atras si uno no se creo
//   throw boom.internal('Error al crear usuario', error);
// }
// }

//   async update(id, newData) {
//     try {
//       const user = await this.findOne(id);
//       if (!user) throw boom.notFound('Usuario no encontrado');
//       const updatedUser = await user.update(newData);
//       if (!updatedUser) throw boom.internal('Error al editar el Usuario');
//       return updatedUser;
//     } catch (error) {
//       if (error.isBoom) {
//         throw error;
//       } else {
//         if (error.isBoom) {
//           throw error;
//         } else {
//           throw boom.internal('Error al actualizar usuario', error);
//         }
//       }
//     }
//   }

//   async delete(id) {
//     try {
//       const user = await this.findOne(id);
//       if (!user) throw boom.notFound('Usuario no encontrado');
//       await user.destroy();
//       return `Se elimino el usuario con ID ${id}`;
//     } catch (error) {
//       if (error.isBoom) {
//         throw error;
//       } else {
//         throw boom.internal('Error al eliminar usuario', error);
//       }
//     }
//   }
//}

export default DoctorService;
