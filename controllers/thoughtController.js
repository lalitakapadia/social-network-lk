const { Thought, User} = require('../models');
const { Types } = require('mongoose');
const { ObjectId } = require('mongodb');

module.exports = {
    //Get all thoughts
    async getAllThoughts(req,res) {
        try {
            const thoughts = await Thought.find()
            .populate('thoughts');

            if(!thoughts) {
                return res.status(404).json({error: 'No thoughts found'});
            } 
            res.status(200).json(thoughts);
        }   catch(err) {
                console.log(err);
                response.status(500).json(err);
            }
        },
        // get thought by id
        async getThoughtById(req,res) {
            try {
                const thought = await Thought.findById({ _id: req.params.thoughtById })
                .populate('thought')
                if(!thought){
                    return res.status(404).json({error: 'Thought not found'});
                }
                res.status(200).json(thought);                
            } catch(err) {
                console.log(err);
                response.status(500).json(err);
            }
        },
        // craete a thought
        async cteateThought(req, res) {
            try {
                const createThoyght = await thought.create(req.body);
                await User.findOneAndUpdate(
                    {username: req.body.username},
                    {$push: {thoughts: thought}}
                );
                res.json(createThoyght);
            } catch(err) {
                console.log(err);
                return res.status(500).json(err);
            }
        },
    }
