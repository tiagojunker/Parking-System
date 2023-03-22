const express = require('express')
const router = express.Router()

const CarEntryController = require('../controllers/CarEntryController')
const CarExitController = require('../controllers/CarExitController')
const ClientesController = require('../controllers/ClientsController')
const UsersController = require('../controllers/UserController')
const loginAuth = require('../middlewares/LoginAuth')
const userAuth = require('../middlewares/UserAuth')

router.post('/car/new', loginAuth, CarEntryController.addCar) // Da entrada de um carro no estacionamento - OK
router.get('/car/all', loginAuth, CarEntryController.showCars) // Retorna todos os carros que estão estacionados -Ok
router.get('/car/:placa', loginAuth, CarEntryController.showCar) // Retorna um carro especifico de acordo com a placa

router.post('/car/:placa', loginAuth, CarExitController.exitCar) // Dá Saida de um carro no estacionamento - Ok
router.get('/car/time/:placa', loginAuth, CarExitController.totalPrice) // Retorna permanência do veiculo no local - Ok

router.post('/client', loginAuth, ClientesController.addClient) // Adiciona um novo cliente a base de dados
router.get('/client/all', loginAuth, ClientesController.showClients) // Retorna todos os clientes cadastrados
router.get('/client/:placa', loginAuth, ClientesController.showClient) // Retorna um cliente especifico
router.post('/client/update', loginAuth, ClientesController.updateClient) // Atualiza os dados do carro de um cliente
router.post('/client/delete/:id', loginAuth, ClientesController.removeCliente)  // Deleta o cliente da base de dados

router.post('/user/new', userAuth, UsersController.create)  // Cria um novo usuário no banco de dados
router.post('/user/login', UsersController.login)  // Cria um novo usuário no banco de dados
router.post('/validate', loginAuth, UsersController.validate)  // retorna Ok para validação

module.exports = router