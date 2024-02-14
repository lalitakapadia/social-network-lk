const { Thought, User} = require('../models');
const { Types } = require('mongoose');
const { ObjectId } = require('mongodb');

module.exports = {
  // Function to get all of the thoughts by invoking the find() method with no arguments.
  // Then we return the results as JSON, and catch any errors.
  // Errors are sent as JSON with a message and a 500 status code
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
        // Gets a single thought using the findOne method.
        // We pass in the ID of the thought and then respond with thought, or an error if not found
        async getThoughtById(req,res) {
            try {
                const thought = await Thought.findById(new ObjectId(req.params.thoughtId ));

                if(!thought){
                    return res.status(404).json({error: 'Thought not found with that id'});
                }
                res.status(200).json(thought);                
            } catch(err) {
                console.log(err);
                response.status(500).json(err);
            }
        },
          // Creates a new thought. Accepts a request body with the entire Thought object.
          // Because thoughts are associated with Users,
          // we then update the User who created the app and add the ID of the application
          // to the thoughts array / subdocument.
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
        // Updates an thought using the findOneAndUpdate method.
        // Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
        async findAndUpdateThought(req, res) {
            try {
                const thought = await Thought.findOneAndUpdate(
                    {_id: new Types.ObjectId(req.params.thoughtId)},
                    req.body, {new: true}
                );
                if(!thought) {
                    return res.status(404).json({error: 'Thought not found'})
                }
                res.status(200).json(thought);
            }  catch(err) {
               console.error(err);
               res.status(500).json(err);
            }
        },
       // Deletes an thoguht from the database. Looks for an app by ID.
       // Then if the app exists, we look for any users associated with the app based on he app ID
       // and update the thoughts array for the User.
        async deleteThought(req, res) {
            try {
              const thoughtId = req.params.thoughtId;
              const thought = await Thought.findOneAndDelete({ _id: thoughtId });
        
              if (!thought) {
                return res.status(404).json({ message: 'Thought not found!' });
              }
        
              await User.updateMany(
                { thoughts: thoughtId },
                { $pull: { thoughts: thoughtId } });
       
              res.status(200).json({ message: 'Thought successfully deleted!' });
            } catch (err) {
              console.log(err);
              res.status(500).json(err);
            }
        },
        // Adds a reaction to an thought. This method is unique in that we add the entire body
       // of the tag rather than the ID with the mongodb $push operator.
          async createReaction(req, res) {
            try {
              const thought = await Thought.findOneAndUpdate(
                { _id: new Types.ObjectId(req.params.thoughtId) },
                { $push: { reactions: req.body } },
                { new: true }
              );
          
              if (!thought) {
                return res.status(404).json({ error: 'Thought not found' });
              }
          
              res.status(200).json(thought);
            } catch (err) {
              res.status(500).json(err);
            }
        },
        // Remove thought reaction. This method finds the thought based on ID.
        // It then updates the reaction array associated with the app in question by removing it's thoughtId
        // from the reactions array / subdocument list
          async deleteReaction(req, res) {
            try {
              const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: new ObjectId(req.params.reactionId) } } }
              );
        
              if (!thought) {
                return res.status(404).json({ error: 'Thought not found' });
              }
        
              res.status(200).json({ message: "Successfully Deleted!" })
            } catch (err) {
              res.status(500).json(err);
            }
        }
    };
