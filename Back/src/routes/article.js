const express = require('express');
const ArticleController = require('../controller/ArticleController');
const route = express.Router();
route
.post('/', ArticleController.create)
.post('/like/:id', ArticleController.likeArticle)
.post('/reply', ArticleController.replyArticle)
.get('/:page', ArticleController.getAll)

module.exports = route;