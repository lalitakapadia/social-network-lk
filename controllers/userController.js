const User = require('../models/User');

module.exports = {
    async getUsers(res, res) {
        try {
            const users = await User.findOne().populate('thoughts');
            res.json(users);
        }   catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

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

    async createNewUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

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
}