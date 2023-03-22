const ClientsModel = require('../models/ClientsModel')

class Clients{

    async addClient(req, res) {
        let {nome, modelo, placa, cor, pgto} = req.body

        try {
            const clientFind = await ClientsModel.findAll({where: { nome: nome }})
            console.log(clientFind)
            if(clientFind.length == 0){

                if( nome != undefined && (nome.split('')).length > 2 &&
                    modelo != undefined && (modelo.split('')).length > 2 &&
                    placa != undefined && (placa.split('')).length > 2 &&
                    cor != undefined && (cor.split('')).length > 2 ){
                       
                    
                    const client = await ClientsModel.create({
                        nome: nome,
                        modelo: modelo,
                        placa: placa,
                        cor: cor,
                        pgto: pgto
                    })
            
                    res.status(201)
                    res.json({status: true, msg: 'Cliente Cadastrado com sucesso'})
                } else {
                    res.status(406)
                    res.json({status: false, msg: 'Insira todos os dados corretamente'})
                }

                
            } else {
                res.status(401)
                res.json({status: false, msg: 'O cliente já existe'})
            }
            

        } catch (err) {
            res.status(406)
            res.json({status: false, msg: 'Falha ao cadastrar cliente.'})
        }
    }

    async showClients(req, res){
        try {
            const clients = await ClientsModel.findAll()
            res.status(200)
            res.json({status: true, clients: clients})
        } catch (err) {
            res.status(406)
            res.json({status: false, msg: 'Falha na requisição'})
        }
    }

    async showClient(req, res){
        const placa = req.params.placa
        try {
            const client = await ClientsModel.findAll({where: { placa: placa }}) 
            if(client.length !== 0) {
                res.status(200)
                res.json({status: true, client: client})
            } else {
                res.status(404)
                res.json({status: false, msg: 'Cliente não encontrado.'})
            }


        } catch (err) {
            res.status(406)
            res.json({status: false, msg: 'Problemas ao conectar com servidor.'})
        }

    }

    async updateClient(req, res){
        const { id, placa, modelo, cor, pgto, nome } = req.body
        
        if( placa != undefined && 
            modelo != undefined && 
            cor != undefined && 
            pgto != undefined &&
            nome != undefined) { 
            
            try {
                const newCar = await ClientsModel.update({
                    placa: placa,
                    modelo: modelo,
                    cor: cor,
                    pgto: pgto,
                    nome: nome
                }, { where: {id: id} });
                
                console.log(newCar)

                res.status(201)
                res.json({status: true, msg: 'Alteração no cliente feita com sucesso.'})

            } catch (err) {
                res.status(406)
                res.json({status: false, msg: 'Falha ao realizar alteração.'})
            }
            
        } else {
            res.status(400)
            res.json({status: false, msg: 'Todos os dados do veiculo devem ser informados (Ex: placa, modelo, cor, pgto).'})
        }
        
    }

    async removeCliente(req, res){
        const id = req.params.id
        try {
            const client = await ClientsModel.findAll({where: { id: id }})
    
            if(client.length != 0){
                await ClientsModel.destroy({where: { id: id }})
                res.status(200)
                res.json({status: true, msg: 'Cliente removido com sucesso.'})
            } else {
                res.status(404)
                res.json({status: false, msg: 'O Cliente não existe.'})
            }
            
        } catch (err) {
            res.status(406)
            res.json({status: true, msg: 'Falha ao conectar com servidor.'})
        }
    }

}

module.exports = new Clients
