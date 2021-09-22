const { Schema, model } = require('mongoose');
const moment = require('moment');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/.+@.+\..+/, 'Must be a valid email address.']
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: { virtuals: true }
    }
);

userSchema.virtual('friendCount').get(() => {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;