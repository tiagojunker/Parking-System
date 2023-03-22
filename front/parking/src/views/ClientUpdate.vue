<template>
  <div>
    <NavBar/>
    <form action="" class="has-background-light">
        <h1 class="has-text-success">Alterar Informação Cliente</h1>
        <article v-if="error.length > 0" class="message is-danger">
            <div class="message-body">
                {{ error }}
            </div>
        </article>
        <input class="input" v-model="client.nome" type="text" placeholder="Nome do Cliente: " required>
        <input class="input" v-model="client.placa" type="text" placeholder="Placa do Veiculo: " required>
        <input class="input" v-model="client.modelo" type="text" placeholder="Modelo do Veiculo: " required>
        <input class="input" v-model="client.cor" type="text" placeholder="Cor do Veiculo: " required>
        <select v-model="client.pgto" class="input" name="pgto" required>
            <option value="0">A pagar</option>
            <option value="1">Pago</option>
        </select>
        <button @click.prevent="changeClient" class="button is-warning">Alterar</button>
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
            client: {},
            error: '',
            success: '',
            selected: false,
            req: {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
        }
    },

    methods:{
        async changeClient(){
            try {
                if(this.client.nome != undefined &&
                    this.client.placa != undefined && this.client.placa != '' && this.client.placa.split(' ').length == 1) 
                {                    
                    const url = 'http://localhost:3000/client/update'
                    await axios.post(url, this.client, this.req)
                    this.error = ''
                    this.$router.push('/client')

                } else {
                    this.error = 'Registre todos os dados corretamente!'
                }

                

            } catch (error) {
                this.error = 'Problema alterar cliente'
                console.log(error)
            }
        },
    },

    computed: {
        
    },

    async created(){
        try {
            const placa = this.$store.state.clientUpdate
            const url = 'http://localhost:3000/client/' + placa
            const client = await axios.get(url, this.req)
            this.client = client.data.client[0]  
            this.error = ''
            this.selected = this.client.pgto

        } catch (error) {
            this.error = 'Problema ao encontrar cliente'
        }
        
    }
    
}
</script>

<style scoped>

    h1{
        text-align: Center;
        font-size: 1.6rem;
        margin-bottom: 10px;
    }

    form{
        padding: 30px;
        border-radius: 15px;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        width: 50vw;
        margin: 0 auto;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    input, select{
        margin-bottom: 10px;
    }
    
    button{
        margin-bottom: 10px;
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