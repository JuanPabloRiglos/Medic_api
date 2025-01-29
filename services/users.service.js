import boom from '@hapi/boom';

//importo instancia de sequelize
import sequelize from '../libs/sequelize.js';
const models = sequelize.models;

class UserService {
  async getAll() {
    try {
      const db_data = await models.User.findAll();
      // el models. va seguido del nombre de la clase del modelo, en este caso, User
      return db_data;
    } catch (error) {
      throw boom.internal('Error al obtener usuarios', error);
    }
  }

  async findOne(param) {
    try {
      let user;
      if (param.includes('@') && param.includes('.')) {
        user = await models.User.findOne({
          include: {
            model: models.Auth,
            as: 'auth',
            where: { email: param },
            attributes: ['email'], // Solo traemos el email, excluimos password
          },
        });
      } else {
        user = await models.User.findByPk(param, {
          include: [
            {
              model: models.Auth,
              as: 'auth',
              attributes: ['email'], // Incluir email también si buscamos por ID
            },
          ],
        }); //por ID
      }
      if (!user) throw boom.notFound('Usuario no encontrado');
      return user;
    } catch (error) {
      throw boom.internal('Error al encontrar usuario', error);
    }
  }

  async findByLastName(lastName) {
    try {
      // const query = {};
      // if (name) query.names = name;
      // if (lastName) query.last_name = lastName;
      // la busqueda tensra el campo que le llegue.
      const user = await models.User.findOne({
        // where: query,
        where: {
          lastName: lastName,
        },
        include: [
          {
            model: models.Auth,
            as: 'auth',
            attributes: ['email'], // Solo traemos el email
          },
        ],
      });

      if (!user) throw boom.notFound('Usuario no encontrado');
      return user;
    } catch (error) {
      if (error.isBoom) {
        throw error;
      } else {
        throw boom.internal('Error al encontrar usuario', error);
      }
    }
  }

  async create(userData) {
    const { email, password, authId, ...userWithoutAuthData } = userData;
    const authData = {
      id: authId,
      email: email,
      password: password,
      userId: userWithoutAuthData.id,
    };

    const transaction = await models.sequelize.transaction(); // Para asegurar atomicidad
    try {
      // Crear usuario
      const newUser = await models.User.create(userWithoutAuthData, {
        transaction,
      });

      // Crear autenticación vinculada
      const newAuth = await models.Auth.create(authData, { transaction });

      await transaction.commit(); //ok solo si los 2 se crearon
      return { user: newUser, emal: newAuth.email };
    } catch (error) {
      await transaction.rollback(); //Tira todo para atras si uno no se creo
      throw boom.internal('Error al crear usuario', error);
    }
  }

  async update(id, newData) {
    try {
      const user = await this.findOne(id);
      if (!user) throw boom.notFound('Usuario no encontrado');
      const updatedUser = await user.update(newData);
      if (!updatedUser)
        throw boom.badImplementation('Error al editar el Usuario');
      return updatedUser;
    } catch (error) {
      throw boom.internal('Error al actualizar usuario', error);
    }
  }

  async delete(id) {
    try {
      const user = await this.findOne(id);
      if (!user) throw boom.notFound('Usuario no encontrado');
      await user.destroy();
      return `Se elimino el usuario con ID ${id}`;
    } catch (error) {
      throw boom.internal('Error al eliminar usuario', error);
    }
  }
}

export default UserService;
