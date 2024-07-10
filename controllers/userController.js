const { Thought, User } = require('../models');

const userController = {
  // GET all users
  getAllUsers(_, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // GET a single user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // POST create a new user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },

 // PUT update a user by id
updateUser({ params, body }, res) {
  console.log('Updating user with ID:', params.userId);
  console.log('New user data:', body);

  User.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidators: true })
    .then(dbUserData => {
      if (!dbUserData) {
        console.log('User not found with ID:', params.userId);
        return res.status(404).json({ message: 'No user found with this id!' });
      }
      console.log('Updated user data:', dbUserData);
      res.json(dbUserData);
    })
    .catch(err => {
      console.error('Error updating user:', err);
      res.status(400).json(err);
    });
},


// DELETE remove a user by id
deleteUser({ params }, res) {
  console.log('Deleting user with ID:', params.userId);

  User.findOneAndDelete({ _id: params.userId })
    .then(deletedUser => {
      if (!deletedUser) {
        console.log('User not found with ID:', params.userId);
        return res.status(404).json({ message: 'No user found with this id!' });
      }
      console.log('Deleted user:', deletedUser);

      // Remove user's thoughts from Thoughts collection
      return Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
    })
    .then(() => {
      res.json({ message: 'User and associated thoughts deleted!' });
    })
    .catch(err => {
      console.error('Error deleting user:', err);
      res.status(400).json(err);
    });
},


  // POST add a new friend to a user's friend list
  addFriend({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: body.friendId } },
      { new: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  // DELETE remove a friend from a user's friend list
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = userController;


