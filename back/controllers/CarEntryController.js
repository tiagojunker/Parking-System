const CarEntryModel = require('../models/CarEntryModel')

class CarEntry {

    async addCar(req, res){
        const  {placa, modelo, cor, pgto} = req.body
        let car = {}
        let parked = await CarEntryModel.findAll({ where: { placa: placa }});


        if(parked.length !== 0){
            res.status(401)
            res.json({status: false, msg: 'Não autorizado, Veiculo já estacionado no patio.'})
        } else {

            try{

                if(placa != undefined) {
                    car.placa = placa
                } else {
                    res.status(401)
                    res.json({status: false, msg: 'Não autorizado, necessário informar placa do veiculo'})
                    return
                }
    
                if(modelo != undefined) {
                    car.modelo = modelo
                }
                if(cor != undefined) {
                    car.cor = cor
                }
                if(pgto != undefined) {
                    car.pgto = pgto
                }
    
                await CarEntryModel.create(car)            
                res.status(200)
                res.json({status: true, msg: 'Carro adicionado com sucesso.'})
    
            } catch(err){
                res.status(406)
                res.json({status: false, msg: 'Problemas ao conectar com servidor.'})
            }

        }
    }

    async showCars(req, res){

        try{
            const cars = await CarEntryModel.findAll()
            res.status(200)
            res.json({status: true, cars: cars})
            
        } catch(err) {
            res.status(406)
            res.json({status: false, msg: 'Problemas ao conectar com servidor.'})
        }
        
    }

    async showCar(req, res) {
        const placa = req.params.placa
        try {
            const car = await CarEntryModel.findAll({ where: { placa: placa }});
            res.status(200)
            res.json({status: true, car: car})
        } catch (err) {
            res.status(406)
            res.json({status: false, msg: 'Problemas ao conectar com servidor.'})
        }
    }

    async removeCar(placa){
    
        try {
            const car = await CarEntryModel.destroy({ where: { placa: placa }});
            if(car == 1){
                return ({status: true, msg: 'Carro deletado com sucesso.'})
            } else {
                return ({status: false, msg: 'Nenhum veiculo com essa placa foi encontrado na base de dados.'})
            }
            
        } catch (err) {
            return ({status: false, msg: 'Problemas ao conectar com servidor.'})
        }
    }

}

module.exports = new CarEntry