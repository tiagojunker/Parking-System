<template>
  <div>
    <form action="" class="has-background-light">
        <h1>Novo Cliente</h1>
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
        <input class="input" v-model="nome" type="text" placeholder="Nome do Cliente: " required>
        <input class="input" v-model="placa" type="text" placeholder="Placa do Veiculo: " required>
        <input class="input" v-model="modelo" type="text" placeholder="Modelo do Veiculo: " required>
        <input class="input" v-model="cor" type="text" placeholder="Cor do Veiculo: " required>
        <select class="input" v-model="pgto" name="pgto" required>
            <option value="0">A pagar</option>
            <option value="1">Pago</option>
        </select>
        <button @click.prevent="addClient" class="button is-primary">Cadastrar</button>
        <button @click.prevent="closeModal" class="button is-danger">Sair</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    
    data(){
        return{
            nome: '',
            placa: '',
            modelo: '',
            cor: '',
            pgto: '1',
            error: '',
            success: '',
            req: {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
        }
    },

    methods: {
        async addClient(){
            
            let car = {
                nome: this.nome,
                placa: this.placa,
                modelo: this.modelo,
                cor: this.cor,
                pgto: this.pgto
            }

            if(this.placa.length >= 7 && (this.placa.split(' ')).length < 2     &&
                this.nome.length >= 2                                           &&
                this.modelo.length >= 2 && (this.modelo.split(' ')).length < 2  &&
                this.cor.length >= 2 && (this.cor.split(' ')).length < 2 )      {

                    try {
                        const url = 'http://localhost:3000/client'
                        const client = await axios.post(url, car, this.req)
                        if(client.data.status == true){
                            this.success = client.data.msg
                            this.resetMsg()                            
                        } else {
                            this.error = client.data.msg
                            console.log(this.error)
                            this.resetMsg()                            
                        }

                    } catch (err) {
                        this.error = err.response.data.msg
                        console.log(err)
                        this.resetMsg()                        
                    }

            } else {
                this.error = 'É necessário Inserir todos os dados.'
                this.resetMsg()                
            }
   
        },

        resetMsg() {
            setTimeout(() => {
                this.error = ''
                this.success = ''
            }, 5000)
        },

        closeModal() {
            location.reload(true)
        }

    }

}
</script>

<style scoped>
    form{
        padding: 30px;
        border-radius: 15px;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        width: 40vw;
        margin: 0 auto;
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
        margin-bottom: 10px;
    }
    
    h1{
        text-align: Center;
        margin-bottom: 30px;
    }

    button:hover{
        transition: 0.5s;
    }

    .esc{
        text-align: right;
        font-size: 0.8rem;
    }

    article{
        width: 100%;
        margin: 0 auto;
        text-align: center
        ;
    }
</style>