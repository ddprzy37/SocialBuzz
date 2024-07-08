const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../controllers/userController');

// Define routes for users
router.route('/')
  .get(getAllUsers)      // GET all users
  .post(createUser);     // POST create a new user

router.route('/:userId')
  .get(getUserById)      // GET a single user by id
  .put(updateUser)       // PUT update a user by id
  .delete(deleteUser);   // DELETE remove a user by id

router.route('/:userId/friends/:friendId')
  .post(addFriend)       // POST add a friend to a user's friend list
  .delete(removeFriend); // DELETE remove a friend from a user's friend list

module.exports = router;


