import boom from '@hapi/boom';

//importo instancia de sequelize
import sequelize from '../libs/sequelize.js';
const models = sequelize.models;

class AuthService {
  async getAll() {
    try {
      const db_data = await models.Auth.findAll();
      // el models. va seguido del nombre de la clase del modelo, en este caso, User
      return db_data;
    } catch (error) {
      throw boom.internal(
        'Error al obtener la información del usuarios',
        error
      );
    }
  }

  async findOne(param) {
    try {
      let user;
      if (param.includes('@') && param.includes('.')) {
        user = await models.Auth.findOne({
          where: { email: param },
        });
      } else {
        user = await models.Auth.findByPk(param); //por ID
      }
      if (!user)
        throw boom.notFound(
          'No hay información del usuario que coincida con los parametros de busqueda'
        );
      return user;
    } catch (error) {
      if (error.isBoom) {
        throw error;
      } else {
        throw boom.internal(
          'Error al encontrar la información del usuario',
          error
        );
      }
    }
  }

  //LOGIN -> Traigo la data del usuario

  async getUserData(email) {
    try {
      const totalUserData = await models.Auth.findOne({
        where: { email: email },
        include: [{ model: models.User, as: 'user' }],
      });
      if (!totalUserData)
        throw boom.notFound(
          'No hay información del usuario que coincida con los parametros de busqueda'
        );
      let userLogged = {};
      userLogged = { ...totalUserData.dataValues.user.dataValues };
      userLogged.email = email;
      return { userLogged };
    } catch (error) {
      if (error.isBoom) {
        throw error;
      } else {
        throw boom.internal(
          'Error al encontrar la información del usuario',
          error
        );
      }
    }
  }
  //Create lo maneja el userService.

  async update(id, newData) {
    try {
      const user = await this.findOne(id);
      if (!user) throw boom.notFound('Info. del usuario no encontrada');
      const updatedUser = await user.update(newData);
      if (!updatedUser)
        throw boom.badImplementation('Error al editar la info. del Usuario');
      return updatedUser;
    } catch (error) {
      throw boom.internal(
        'Error al actualizar la información del usuario',
        error
      );
    }
  }

  async delete(id) {
    try {
      const user = await this.findOne(id);
      if (!user) throw boom.notFound('Info. del usuario no encontrada');
      await user.destroy();
      return `Se elimino la información con ID ${id}`;
    } catch (error) {
      throw boom.internal(
        'Error al eliminar la información del usuario',
        error
      );
    }
  }
}

export default AuthService;
