const router = require('express').Router();
const { getAllCards, getCardById, getUserCards, createNewCard, deleteCard, updateCard, likedCardUpdated } = require('../controllers/cardsControllers');
const {mustLogin, allowedRoles} = require("../controllers/authControllers")

  //  base path = "/cards"
  
  // unprotected Routes :
  router.get('/', getAllCards)
  router.get('/my-cards', mustLogin, allowedRoles(['loggedIn']), getUserCards )
  router.get('/:id', getCardById)

  // PROTECTEC ROUTES:
  // mustLogin: the user must be logged in to view this content (any type of logged-in user)
  // allowedRoles: the user must also have ONE of the following roles (admin, business,registedUser, loggedIn, owner, isLiked)
  router.post('/' ,mustLogin, allowedRoles(['business']) ,createNewCard);
  router.put('/:id',mustLogin, allowedRoles(["owner"]), updateCard);
  router.patch('/:id',mustLogin, allowedRoles(["isLiked"]), likedCardUpdated);
  router.delete('/:id',mustLogin, allowedRoles(["owner",'admin']), deleteCard);
  
module.exports = router;