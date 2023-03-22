const UsersModel = require('../models/UsersModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const secret = 'asd0978342hjbcsdf635423fdfsdf!625d'

class User {

    async create(req, res){
        let {name, email, password} = req.body

        if( name != undefined && (name.split('')).length > 2 &&
            email != undefined && (email.split(' ')).length < 2 &&
            password != undefined && (password.split(' ')).length < 2){

                try {

                    const userFind = await UsersModel.findAll({where: { email: email }})
                    if(userFind.length == 0){
                        let hash = await bcrypt.hash(password, 10);

                        await UsersModel.create({
                            name: name,
                            email: email,
                            password: hash
                        })

                        res.status(200)
                        res.json({status: true, msg: 'Usuario Cadastrado com sucesso'})
                    } else {
                        res.status(406)
                        res.json({status: false, msg: 'O usuário já existe'})
                    }
                    

                } catch (err) {
                    res.status(406)
                    res.json({status: false, msg: 'Problema ao conectar com servidor'})
                }

            } else {
                res.status(401)
                res.json({status: false, msg: 'Insira todos os campos corretamente'})
            }
    }

    async login(req, res) {

        const {email, password} = req.body
        let user = await UsersModel.findAll({ where: { email: email }})
        

        if(user.length > 0){

            user = user[0].dataValues
            let compare = await bcrypt.compare(password, user.password);
            
            if(compare){
                let token = jwt.sign({ name: user.name, email: user.email }, secret);
                res.status(200)
                res.json({status: true, token: token})
            } else {
                res.status(401)
                res.json({status: false, msg: 'Senha inválida'})
            }

        } else {
            res.status(404)
            res.json({status: false, msg: 'Usuário não encontrado em nossa base de dados'})
        }

    }

    async validate(req, res){
        res.status(200)
        res.send({status: true, msg: 'Validação OK'})
    }

}

module.exports = new User