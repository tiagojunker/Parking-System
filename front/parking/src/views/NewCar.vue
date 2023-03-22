<template>
    <div id="new">        
        <NavBar/>
        <form action="" class="has-background-light">
            <article v-if="error.length > 0" class="message is-danger">
                <div class="message-body">
                    {{ error }}
                </div>
            </article>
            <article v-if="success.length > 0" class="message is-success">
                <div class="message-body">
                    {{ success }}
                </div>
            </article>
            <h3 class="has-text-success">Cadastro de Veiculos</h3>
            <input class="input" @blur="isClient" v-model="placa" type="text" placeholder="Placa do Veiculo: " required>
            <input class="input" v-model="modelo" type="text" placeholder="Modelo do Veiculo: ">
            <input class="input" v-model="cor" type="text" placeholder="Cor do Veiculo: ">
            <select class="input" v-model="pgto" name="pgto" id="pgto">
                <option value="0">Pagar</option>
                <option value="1">Mensalista</option>
            </select>
            <button class="button is-primary" @click.prevent="addCar" type="submit">Cadastrar</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import NavBar from '../components/NavBar.vue'

export default {
    components:{
        NavBar
    },

    data(){
        return{
            placa: '',
            modelo: '',
            cor: '',
            pgto: '0',
            error: '',
            success: '',
            client: '',
            req: {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
        }
    },

    methods:{
        async addCar(){
            try {                
                const link = 'http://localhost:3000/car/new'
                
                if(this.placa.length >= 7 && (this.placa.split(' ')).length < 2){
                        const car = {
                        placa: this.placa,
                        modelo: this.modelo,
                        cor: this.cor,
                        pgto: this.pgto
                    }
                    await axios.post(link, car, this.req)
                    this.error = '',
                    this.success = 'Veiculo adicionado com sucesso.'
                    this.clearFields()

                } else {
                    this.error = 'Insira uma placa correta'
                    this.success = ''
                    this.clearFields()
                }
                

            } catch (err) {
                this.error = err.response.data.msg
                this.clearFields()
            }
        },

        clearFields(){
            this.placa = ''
            this.modelo = ''
            this.cor = ''
            this.pgto = '0'
        },

        async isClient(){
            try {
                const url = 'http://localhost:3000/client/' + this.placa
                this.client = await axios.get(url, this.req)
                this.client = this.client.data.client[0]
                this.modelo = this.client.modelo
                this.cor = this.client.cor
                this.client.pgto == true ? this.pgto = '1' : this.pgto = '0'
                
            } catch (error) {
                return false
            }
        }
    }
}
</script>

<style scoped>
    #new{
        font-family: 'Roboto', sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    h3{
        text-align: Center;
        font-size: 2rem;
        margin-bottom: 10px;
    }

    form{
        padding: 30px;
        border-radius: 15px;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        width: 40vw;
        margin: 15vh auto;
    }


    input, select{
        margin-bottom: 10px;
    }
    
    button{
        padding: 20px 0px;
        border-radius: 25px;
        color: white;
        font-size: 0.9rem;
        font-weight: 600;
        text-transform: uppercase;
    }

    button:hover{
        transition: 0.5s;
    }

    article{
        width: 100%;
        margin: 0 auto;
        text-align: center;
    }

</style>