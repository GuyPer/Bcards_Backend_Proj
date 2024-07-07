const router = require('express').Router();
const { getAllUsers, getUserById, deleteUser, updateUser, businesUserUpdated } = require('../controllers/usersControllers');
const { register, login, mustLogin, allowedRoles } = require('../controllers/authControllers');

  // base path = "/users"
  router.post('/', register)
  router.post('/login', login);

  // PROTECTEC ROUTES:
  // mustLogin: the user must be logged in to view this content (any type of logged-in user)
  // allowedRoles: the user must also have ONE of the following roles (admin, isBusiness, registedUser)

  router.get('/', mustLogin, allowedRoles(['admin']), getAllUsers);
  router.get('/:id', mustLogin,allowedRoles(['registedUser','admin']), getUserById);
  router.delete('/:id',mustLogin , allowedRoles(['registedUser','admin']), deleteUser);
  router.put('/:id', mustLogin, allowedRoles(['registedUser']), updateUser);
  router.patch('/:id', mustLogin, allowedRoles(['isBusiness']), businesUserUpdated);
module.exports = router;