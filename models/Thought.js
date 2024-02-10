const {Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

// Schema to create thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: `You need to leave a thought!`,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]

    }, 
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

    // Create a virtual property `reaction` that gets the amount of reactoion per thought
thoughtSchema
    .virtual('reactionCount')
    .get(function(){
        return this.reactions.length;
    });

// Initialize our Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
