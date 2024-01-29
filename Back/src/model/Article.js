const mongoose = require('mongoose');
const { authorSchema } = require('./Author');
const Article = mongoose.model('Article',
    new mongoose.Schema({
        title: {
            type: String,
            required: true,
            minlength: 3
        },
        text: {
            type: String,
            required: true,
            minlength: 15
        },
        author: {
            type: authorSchema,
            required: true
        },
        likes: {
            type: Number,
            required: true
        },
        arrayId: [{
            type: String,
            required: false
        }],
        createdAt: {
            type: Date,
            required: true
        },
        updatedAt: {
            type: Date,
            required: false
        },
        removedAt: {
            type: Date,
            required: false
        },
    }));
module.exports = Article