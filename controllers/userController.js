const User = require('../models/User');

module.exports = {
    // function for get all users
    async getUsers(req, res) {
        try {
            const users = await User.find().populate('thoughts');
            res.json(users);
        }   catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // function for get user by id
    async getUserById(req, res) {
        try {
            const user = await User.findOne({_id: req.params.userId});
            if(!user) {
                return res.status(404).json({message: 'User not found with that id'});
            }
            res.json(user);
        }   catch (err) {
            res.status(500).json(err);
        }
    },
     // function for create User
    async createNewUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // function for update user
    async updateUser(req,res) {
        try {
            const updateUser = await User.findOneAndUpdate(
                {_id:req.params.userId},
                req.body, {new: true});

                if(!updateUser) {
                  return res.status(404).json({message:'No User with that Id'});
                }
                res.json('User updated');
            }   catch(err) {
                res.status(500).json(err);
        }
    },
    // function for delete user
    async deleteUser (req, res) {
        try {
            const user = await User.findOneAndDelete({_id: req.params.userId});
            if(!user) {
              return res.status(404).json({message: 'No User with that Id'});
            }
            res.status(200).json('User has been deleted');
        }   catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
   // function for add friend or post friend
    async addFriend(req, res) {
        try {
            const addFriend = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: req.params.friendIds}},
                {new: true});
                res.json(addFriend);
        }   catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
     // function for delete friend
    async deleteFriend (req, res) {
        try {
        const deleteFriend = await User.findOneAndDelete(
        { _id: req.params.userId},
        {$pull: {friends: req.body.friendIds}},
        {new: true});

        res.json('That friend has been deleted');
      } catch (err) {
        res.status(500).json(err);
      }
    } 
};