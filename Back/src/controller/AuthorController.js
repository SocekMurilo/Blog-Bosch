const { Author } = require("../model/Author");
const User = require("../model/Login");
const CryptoJS = require('crypto-js');
class AuthorController {


    static async create(req, res) {
        var bytes = CryptoJS.AES.decrypt(req.body.jsonCrypt, process.env.SECRET);
        const decryptd = bytes.toString(CryptoJS.enc.Utf8);
        const json = JSON.parse(decryptd);

        const { name, email, birth } = json;
        if (!name || !birth || !email)
            return res.status(400).send({ message: "os campos não podem estarem vazios " });
        if (name.length < 3)
            return res.status(400).send({ message: "o nome não pode ser menor que 3 caracteres" });
        if (email.length < 3)
            return res.status(400).send({ message: "Insira um e-mail válido" });
        if (!email.includes('@'))
            return res.status(400).send({ message: "Insira um e-mail válido" })
        const author = {
            name,
            email,
            birth,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            removedAt: null,
        }
        try {
            await Author.create(author)
            return res.status(201).send({ message: "Autor cadastrado com sucesso" })
        } catch (error) {
            return res.status(500).send({ error: "Failed to get data" });
        }
    }
    static async getAuthor(_id) {
        try {
            const author = await Author.findById(_id)
            return author
        } catch (error) {
            throw error;
        }
    }
    static async login(req, res) {
        const { email, password } = json;

        if (!email)
            return res.status(422).json({ message: "O e-mail é obrigatório" });
        if (!password)
            return res.status(422).json({ message: "A senha é obrigatória" });
        const user = await User.findOne({ email: email });
        if (!user)
            return res.status(422).json({ message: "Usuário e/ou senha inválido" });

        var bytes = CryptoJS.AES.decrypt(req.body.jsonCrypt, process.env.SECRET);
        const decryptd = bytes.toString(CryptoJS.enc.Utf8);
        const json = JSON.parse(decryptd);

        if (json2 != password)
            return res.status(422).send({message : "Senha Invalida"});

        try {
            const secret = process.env.SECRET
            const token = jwt.sign(
                {
                    id: user._id,
                },
                secret,
                {
                    expiresIn: '2 days'
                }

            );
            return res.status(200).send({ token: token })
        } catch (error) {
            return res.status(500).send({ message: "Something failed", data: error.message })
        }
    }

}
module.exports = AuthorController;