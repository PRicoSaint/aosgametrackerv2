// import user model
const { User, Game } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
  // get a single user by either their id or their username
  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    }).populate('savedGames');
    // console.log("get singleUSer line 12: ", foundUser);
    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    res.json(foundUser);
  },
  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },
  // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
  // {body} is destructured req.body
  async login({ body }, res) {
    const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  // create new Game
  async createGame({user, body}, res) {
    console.log("this is line 48, createGame: ", body);
    const game = await Game.create(body);
    
    await User.findOneAndUpdate(
      { username: user.username },
      { $addToSet: { savedGames: game._id } },
      {new: true, runValidators: true}
    );


    if (!game) {
      return res.status(400).json({ message: 'Something went wrong with game creation!' });
    }
      return res.json(game);

  },
  // create/add new Round
  async addRound({ user, body, params}, res) {
    console.log("Line 66 addRound: ", user, body, params);
    const round = await Game.findOneAndUpdate(
      {_id: params.gameId},
      { $addToSet: {rounds: body }   },
      {new: true, runValidators: true}

    );

    if (!round) {
      return res.status(400).json({ message: 'Something went wrong with round creation!' });
    }
    
    res.json(round);
  },
  // Get single game information and display it.
  async getSingleGame({ params }, res) {
    console.log("req lone 81: ", params);
    const foundGame = await Game.findOne({ _id: params.gameId });
    console.log("get singleGame line 83: ", foundGame);
    if (!foundGame) {
      return res.status(400).json({ message: 'Cannot find a game with this id!' });
    }

    res.json(foundGame);
  },
// Look up all User games
  async getUserGames({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    }).populate('savedGames');
    // console.log("get singleUSer line 12: ", foundUser.savedGames);
    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }
    let games = foundUser.savedGames;
    // console.log(games);
    res.json(games);
  },
// Get all Games for all users
  async getAllGames(req, res) {
    Game.aggregate([
      {
          $addFields: {
              totalVPs: { $sum: "$rounds.victorypoints" },
          }
      }])
      .then(allGames => {
          console.log(allGames);
          res.json(allGames)
      })
      .catch(({ message }) => {
          console.log(message);
          res.json(message);
      });
  },


  // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
  // user comes from `req.user` created in the auth middleware function
  // async saveRound({ user, body }, res) {
  //   console.log(user);
  //   try {
  //     const updatedUser = await User.findOneAndUpdate(
  //       { _id: user._id },
  //       { $addToSet: { savedBooks: body } },
  //       { new: true, runValidators: true }
  //     );
  //     return res.json(updatedUser);
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(400).json(err);
  //   }
  // },


  // remove a game from `savedGames`
  async deleteGame({ user, params }, res) {
    console.log("This is line 141 params: ", params)
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedGames:  params.gameId  } },
      { new: true }
    );
    console.log("This is updated user info: ", updatedUser);
    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find game with this id!" });
    }
    const deletedGame = await Game.deleteOne({id: params.gameId});
    console.log(deletedGame);
    return res.json(updatedUser);
  },
};
