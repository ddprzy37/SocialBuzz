const { Thought, User } = require('../models');

const thoughtController = {
  // GET all thoughts
  getAllThoughts(_, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // GET a single thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

// POST create a new thought
createThought({ body }, res) {
  console.log('Received request body:', body);
  Thought.create(body)
    .then(({ _id }) => {
      console.log('Created thought with ID:', _id);
      return User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );
    })
    .then(dbUserData => {
      if (!dbUserData) {
        console.log('No user found with ID:', body.userId);
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      console.log('Updated user data:', dbUserData);
      res.json(dbUserData);
    })
    .catch(err => {
      console.error('Error creating thought:', err); 
      res.status(400).json(err);
    });
},


  // PUT update a thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // DELETE remove a thought by id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(deletedThought);
      })
      .catch(err => res.status(400).json(err));
  },

  // POST create a reaction for a thought
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // DELETE remove a reaction from a thought
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = thoughtController;

// const { Thought, User } = require('../models/Tought');

// module.exports = {
//   // GET all thoughts
//   async getAllThoughts(_, res) {
//     try {
//       const dbThoughtData = await Thought.find({})
//         .populate({
//           path: 'reactions',
//           select: '-__v'
//         })
//         .select('-__v');
//       res.json(dbThoughtData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },

//   // GET a single thought by id
//   async getThoughtById({ params }, res) {
//     try {
//       const dbThoughtData = await Thought.findOne({ _id: params.thoughtId })
//         .populate({
//           path: 'reactions',
//           select: '-__v'
//         })
//         .select('-__v');
//       if (!dbThoughtData) {
//         res.status(404).json({ message: 'No thought found with this id!' });
//         return;
//       }
//       res.json(dbThoughtData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },

//   // POST create a new thought
//   async createThought({ body }, res) {
//     try {
//       console.log('Received request body:', body);
//       const { _id } = await Thought.create(body);
//       console.log('Created thought with ID:', _id);
//       const dbUserData = await User.findOneAndUpdate(
//         { _id: body.userId },
//         { $push: { thoughts: _id } },
//         { new: true }
//       );
//       if (!dbUserData) {
//         console.log('No user found with ID:', body.userId);
//         res.status(404).json({ message: 'No user found with this id!' });
//         return;
//       }
//       console.log('Updated user data:', dbUserData);
//       res.json(dbUserData);
//     } catch (err) {
//       console.error('Error creating thought:', err);
//       res.status(400).json(err);
//     }
//   },

//   // PUT update a thought by id
//   async updateThought({ params, body }, res) {
//     try {
//       const dbThoughtData = await Thought.findOneAndUpdate(
//         { _id: params.thoughtId },
//         body,
//         { new: true, runValidators: true }
//       );
//       if (!dbThoughtData) {
//         res.status(404).json({ message: 'No thought found with this id!' });
//         return;
//       }
//       res.json(dbThoughtData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },

//   // DELETE remove a thought by id
//   async deleteThought({ params }, res) {
//     try {
//       const deletedThought = await Thought.findOneAndDelete({ _id: params.thoughtId });
//       if (!deletedThought) {
//         res.status(404).json({ message: 'No thought found with this id!' });
//         return;
//       }
//       res.json(deletedThought);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },

//   // POST create a reaction for a thought
//   async createReaction({ params, body }, res) {
//     try {
//       const dbThoughtData = await Thought.findOneAndUpdate(
//         { _id: params.thoughtId },
//         { $push: { reactions: body } },
//         { new: true, runValidators: true }
//       );
//       if (!dbThoughtData) {
//         res.status(404).json({ message: 'No thought found with this id!' });
//         return;
//       }
//       res.json(dbThoughtData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },

//   // DELETE remove a reaction from a thought
//   async deleteReaction({ params }, res) {
//     try {
//       const dbThoughtData = await Thought.findOneAndUpdate(
//         { _id: params.thoughtId },
//         { $pull: { reactions: { reactionId: params.reactionId } } },
//         { new: true }
//       );
//       if (!dbThoughtData) {
//         res.status(404).json({ message: 'No thought found with this id!' });
//         return;
//       }
//       res.json(dbThoughtData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
// };





