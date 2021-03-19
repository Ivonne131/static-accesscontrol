const { roles } = require('../roles')
const { profiles } = require('../data')


exports.home =  (req, res) => {
    res.json({
        message: "En home"
      })
}

//Checa si inicio sesion en el middleware de server.js
exports.allowIfLoggedin = (req, res, next) => {
    try {
        const user = res.locals.loggedInUser;
        if (!user)
          return res.status(401).json({
            error: "You need to be logged in to access this route"
          });
        req.user = user;
        next();
      } catch (error) {
        next(error);
    }
}

//Acceso a un usuario con ANY permisos
exports.grantAccess = function(action, resource) {
    return  (req, res, next) => {
      try {
        const permission = roles.can(req.user.role)[action](resource);
        if (!permission.granted ) {
          return res.status(401).json({
            error: "You don't have enough permission to perform this action"
          });
        }
        next()
      } catch (error) {
        next(error)
      }
    }
}

//Acceso a un usuario con OWN permisos o ANY
exports.ownGrantAccess = function(action, resource) {
    return  (req, res, next) => {
      try {
        actionOwn = action + "Own";
        paramId = parseInt(req.params.userId);
        let permission = roles.can(req.user.role)[actionOwn](resource);
       // console.log(`${req.user.role} -- ${permission.granted} --- idparam:${paramId} idlogin:${req.user.id}`)
        if (!permission.granted || paramId !== req.user.id) {
            actionAny = action + "Any";
            permission = roles.can(req.user.role)[actionAny](resource);
            if (!permission.granted ) {
                return res.status(401).json({
                  error: "You don't have enough permission to perform this action"
                });
              }
        }
        next()
      } catch (error) {
        next(error)
      }
    }
}

//Obtiene el perfil del usuario si es que existe
exports.getUser =  (req, res, next) => {
    try {
      const userId = req.params.userId;
      const user =  profiles.find(prof => prof.userId == userId)
      if (!user) return next(new Error('User does not exist'));
      res.status(200).json({
        data: user
      });
    } catch (error) {
      next(error)
    }
  }

//Obtiene todos los perfiles 
exports.getUsers =  (req, res, next) => {
    res.status(200).json({
        data:profiles
    });
}