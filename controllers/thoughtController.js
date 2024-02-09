const { Thought, User} = require('../models');
const { Types } = require('mongoose');
const { ObjectId } = require('mongodb');

module.exports = {
    //Get all thoughts
    async getAllThoughts(req,res) {
        try {
            const thoughts = await Thought.find()
            .populate('users');

            if(!thoughts) {
                return res.status(404).json({error: 'No thoughts found'});
            } 
            res.status(200).json(thoughts);
        }   catch(err) {
                console.log(err);
                response.status(500).json(err);
            }
        }
    }
