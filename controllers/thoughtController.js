const { Thought, User} = require('../models');
const { Types } = require('mongoose');
const { ObjectId } = require('mongodb');

module.exports = {
    //Get all thoughts
    async getAllThoughts(req,res) {
        try {
            const thoughts = await Thought.find();
           
            

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
                const thought = await Thought.findById(new ObjectId(req.params.thoughtById ));

                if(!thought){
                    return res.status(404).json({error: 'Thought not found with that id'});
                }
                res.status(200).json(thought);                
            } catch(err) {
                console.log(err);
                response.status(500).json(err);
            }
        },
        // create a new thought
        async createThought(req, res) {
            try {
                const newThought = await Thought.create(req.body);
                await User.findOneAndUpdate(
                    {username: req.body.username},
                    {$push: {thoughts: newThought}}
                );
                res.status(200).json(newThought);
            } catch(err) {
                console.log(err);
                return res.status(500).json(err);
            }
        },
        //update thought function
        async findAndUpdateThought(req, res) {
            try {
                const thought = await Thought.findOneAndUpdate(
                    {_id: new Types.ObjectId(req.params.thoughtId)},
                    req.body, {new: true}
                );
                if(!thought) {
                    return res.status(404).json({erro: 'Thought not found'})
                }
                res.status(200).json(thought);
            }  catch(err) {
               console.error(err);
               res.status(500).json(err);
            }
        },
        // delete thought function
        async deleteThought(req, res) {
            try {
              const thoughtId = req.params.thoughtId;
              const thought = await Thought.findOneAndDelete({ _id: thoughtId });
        
              if (!thought) {
                return res.status(404).json({ message: 'Thought not found!' });
              }
        
              await User.updateMany(
                { thoughts: thoughtId },
                { $pull: { thoughts: thoughtId } },
              );
       
              res.status(200).json({ message: 'Thought successfully deleted!' });
            } catch (err) {
              console.log(err);
              res.status(500).json(err);
            }
          },
    }
