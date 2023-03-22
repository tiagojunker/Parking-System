<template>
  <div class="table">
    <table class="table is-striped">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Placa</th>
                    <th>Modelo</th>
                    <th>Cor</th>
                    <th>Pagamento</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="client in clients" :key="client.placa">
                    <td>{{ client.nome }}</td>
                    <td>{{ client.placa }}</td>
                    <td>{{ client.modelo }}</td>
                    <td>{{ client.cor }}</td>
                    <td>{{ client.pgto ? 'Pago' : 'Não Pago' }}</td>
                    <td>
                        <button class="button is-danger" @click.prevent="deleteUser(client.id)">Deletar</button>
                    </td>
                    <td>
                        <button class="button is-warning" @click.prevent="changeIdUpdate(client.placa)">Alterar</button>
                    </td>
                    <input type="hidden" name="id" :value="client.id">
                </tr>
            </tbody>
        </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {


    props: {
        clients:{
            require: true,
            type: Object
        }
    },
    
    data(){
        return{
            req: {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
        }
    },
    methods: {
        async deleteUser(id){
            if(window.confirm('Deseja realmente deletar o cliente?')){
                try {
                    const url = 'http://localhost:3000/client/delete/'+ id
                    await axios.post(url,{},this.req)
                    alert('Usuario deletado com sucesso')
                    document.location.reload(true)
                } catch (err) {
                    console.error('Um erro Aconteceu')
                }
                
            }
        },

        changeIdUpdate(placa){
            this.$store.state.clientUpdate = placa
            this.$router.push('client/update')
        }
    }
    
}
</script>

<style scoped>

    table{
        margin: 25px auto;
        border: 1px solid rgba(0, 0, 0, 0.319);
    }
    
    td{
        text-align: left;
    }

</style>