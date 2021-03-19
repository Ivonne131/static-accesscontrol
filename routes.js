const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');

router.get('/', userController.home);

//Se envia solo 'read' porque como es un OWN solo los que sean propietarios
//del objeto y los que puedan leer todo (ANY) pueden ver el perfil de un usuario
router.get('/user/:userId', userController.allowIfLoggedin, userController.ownGrantAccess('read', 'profile') ,userController.getUser);

//Esta es una ruta donde se checa si se tienen todos los permisos para leer (ANY)
router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);


module.exports = router;