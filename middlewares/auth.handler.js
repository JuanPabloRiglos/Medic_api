import boom from '@hapi/boom';

//Valida que el rol sea de los permitidos
//Si el rol paciente esta entre los permitidos, valida que sea el que esta logueado
//Evitando que cualquiera pueda modificar datos de otros.

export function rolesHandler(...roles) {
  return (req, res, next) => {
    //se retorna el middleware entero.
    const { user } = req;
    //Al user en el req, lo pone passport
    //aplicar eso, siempre que se haya usado passport primero
    const reqId = req.params.id;
    console.log('USER EN ROLES', user, 'REQID', reqId, 'roles', roles);

    if (roles.includes(user.role) && user.role !== 'Patient') {
    } else if (roles.includes('Patient') && user.role === 'Patient') {
      if (user.sub === reqId) {
        next();
      } else {
        next(
          boom.unauthorized(
            'La acción pretendida no se condice con el usuario logueado'
          )
        );
      }
    } else {
      next(boom.unauthorized('Esta acción requiere permisos especiales'));
    }
  };
}
