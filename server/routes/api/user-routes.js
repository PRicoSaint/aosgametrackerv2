const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  createGame,
  addRound,
  login,
  getSingleGame,
  getUserGames,
  getAllGames,
  deleteGame,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/mygames').get(authMiddleware, getUserGames);


router.route('/deletegame/:gameId').delete(authMiddleware, deleteGame);

router.route('/games').put(authMiddleware, createGame);

router.route('/games/:gameId').put(authMiddleware, addRound);

router.route('/games/:gameId').get(getSingleGame);

router.route('/alldata').get(getAllGames);


module.exports = router;
