const path = require('path');
const fs = require('fs')
const Article = require('../model/Article')
const authorController = require('../controller/AuthorController');
const { count } = require('console');

class ArticleController {
    static createLog(error) {
        const timestamp = Date.now();
        const archivePath = path.resolve(__dirname, '..', `logs-${timestamp}.txt`);
        const errorString = JSON.stringify(error.message)
        fs.writeFile(archivePath, errorString, function (err, result) {
            if (err) console.log(err)
        })
    }
    static async create(req, res) {
        const { title, text, authorid } = req.body;
        if (!title || !text || !authorid)
            return res.status(400).send({ message: "os campos não podem estarem vazios " });
        if (title.length < 3)
            return res.status(400).send({ message: "o titulo não pode ser menor que 3 caracteres" });
        if (text.length < 15)
            return res.status(400).send({ message: "o artigo não pode ser menor que 15 caracteres" });
        try {
            const author = await authorController.getAuthor(authorid);
            const article = {
                title,
                text,
                likes: 0,
                author,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                removedAt: null,
            }
            await Article.create(article)
            return res.status(201).send({ message: "Artigo criado com sucesso" })
        } catch (error) {
            ArticleController.createLog(error);
            console.log(error.message);
            return res.status(500).send({ error: "Falha ao salvar o artigo", data: error.message });
        }
    };

    static async likeArticle(req, res) {
        const { id } = req.params;
        const { idUser } = req.body;
        if (!id)
            return res.status(400).send({ message: "No id provider" })
        try {
            const article = await Article.findById(id);
            if (article.arrayId.includes(idUser)) {
                article.arrayId = article.arrayId.filter(c => c != idUser)

                await Article.findByIdAndUpdate({ _id: id }, { likes: article.arrayId.length })
                await article.save()
                return res.status(200).send();
            }

            article.arrayId.push(idUser);

            await article.save()
            await Article.findByIdAndUpdate({ _id: id }, { likes: article.arrayId.length })

            return res.status(200).send();
        } catch (error) {
            ArticleController.createLog(error);
            return res.status(500).send({ error: "Falha ao curtir", data: error.message })
        }
    }

    static async getAll(req, res) {
        let page = req.params.page;
        let limit = 5;
        let skip = limit * (page - 1);
        try {
            const articles = await Article.find().skip(skip).limit(limit);
            return res.status(200).send(articles);
        } catch (error) {
            ArticleController.createLog(error);
            return res.status(500).send({ message: "Falha ao carregar os Artigos" })
        }
    };

    static async create(req, res) {
        const { title, text, authorid } = req.body;
        if (!title || !text || !authorid)
            return res.status(400).send({ message: "os campos não podem estarem vazios " });

        if (title.length < 3)
            return res.status(400).send({ message: "o titulo não pode ser menor que 3 caracteres" });

        if (text.length < 15)
            return res.status(400).send({ message: "o artigo não pode ser menor que 15 caracteres" });
        if (authorid.length < 3)
            return res.status(400).send({ message: "O autor não pode ser menor que 3 caracteres" })
        try {
            const author = await authorController.getAuthor(authorid);
            const article = {
                title,
                text,
                likes: 0,
                author,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                removedAt: null,
            }
            await Article.create(article)
            return res.status(201).send({ message: "Artigo criado com sucesso" })
        } catch (error) {
            ArticleController.createLog(error);
            return res.status(500).send({ error: "Falha ao salvar o artigo", data: error.message });
        }
    };

    static async likeArticle(req, res) {
        const { id } = req.params;
        if (!id) return res.status(400).send({ message: "No id provider" })
        try {
            const article = await Article.findById(id);
            await Article.findByIdAndUpdate({ _id: id }, { likes: ++article.likes })
            return res.status(200).send();
        } catch (error) {
            ArticleController.createLog(error);
            return res.status(500).send({ error: "Falha ao curtir", data: error.message })
        }
    }

    static async replyArticle(req, res) {
        const { text, authorid } = req.body;
        
        if ( !text || !authorid)
        return res.status(400).send({ message: "os campos não podem estarem vazios " });

        if (authorid.length < 3)
            return res.status(400).send({ message: "O autor não pode ser menor que 3 caracteres" })
        try {
            const author = await authorController.getAuthor(authorid);
            const article = {
                text,
                likes: 0,
                author,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                removedAt: null,
            }
            await Article.create(article)
            return res.status(201).send({ message: "Resposta criada com sucesso" })
        } catch (error) {
            ArticleController.createLog(error);
            return res.status(500).send({ error: "Falha ao salvar a Resposta", data: error.message });
        }
    }
}

module.exports = ArticleController;