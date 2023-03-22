const CarEntryController = require('./CarEntryController')
const CarExitModel = require('../models/CarExitModel')
const CarEntryModel = require('../models/CarEntryModel')

class CarExit{

    async exitCar(req, res) {
        const placa = req.params.placa
        try {
            const car = await CarEntryModel.findAll({ where: { placa: placa }});
            const carDetails = car[0].dataValues
            
            try {
                const carExit = await CarExitModel.create({
                    placa: carDetails.placa,
                    modelo: carDetails.modelo,
                    cor: carDetails.cor,
                    pgto: carDetails.pgto,
                    entrada: carDetails.createdAt,
                })
                
                await CarEntryController.removeCar(placa)
                res.status(200)
                res.json({status: true, msg: 'Carro removido com sucesso.'})

            } catch (error) {
                res.status(406)
                res.json({status: false, msg: 'Falha ao remover veiculo.'})
            }

        } catch (err) {
            res.status(406)
            res.json({status: false, msg: 'Problemas ao conectar com servidor.'})
        }
    }

    async totalPrice(req, res) {

        const placa = req.params.placa

        const car = await CarExitModel.findAll({ where: { placa: placa }});
        const carExitDatails = car[0].dataValues
        const entryDate = new Date(carExitDatails.entrada).toLocaleString()
        const exitDate = new Date(carExitDatails.createdAt).toLocaleString()
    
        res.status(200)
        res.json({entrada: entryDate, saida: exitDate})

    }

}

module.exports = new CarExit