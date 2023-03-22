<template>
  <div id="show">
    <NavBar/>
    <div v-if="cars.length <= 0">
        <h1 class="alone">Nenhum Veiculo No Estacionamento</h1>
    </div>
    <div v-else>
        <hr>
        <h1 class="has-text-success">Veiculos Estacionados</h1>
        <hr>
        <table class="table is-striped">
            <thead>
                <tr>
                    <th>Placa</th>
                    <th>Modelo</th>
                    <th>Cor</th>
                    <th>Pagamento</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="car in cars" :key="car.placa">
                    <td>{{ car.placa }}</td>
                    <td>{{ car.modelo }}</td>
                    <td>{{ car.cor }}</td>
                    <td>{{ car.pgto ? 'Pago' : 'Não Pago' }}</td>
                    <td>
                        <button class="button is-danger" @click.prevent="showTime(car.placa)">Finalizar</button>
                    </td>
                    <input type="hidden" name="id" :value="car.id">
                </tr>
            </tbody>
        </table>
        <dialog>
            <h1>Tempo do Veiculo Finalizado</h1>
            <strong>Entrada: </strong><p>{{ timeModal.entrada }}</p>
            <strong>Saida: </strong><p>{{ timeModal.saida }}</p>
            <button class="button" @click.prevent="closeModal">Fechar</button>
        </dialog>
    </div>
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
            cars: {},
            timeModal: {},
            req: {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
        }
    },

    methods:{
        showModal(){
            this.$el.querySelector('dialog').showModal();
        },
        closeModal(){
            this.$el.querySelector('dialog').close()
            document.location.reload(true)
        },
        async exitCar(placa){
            const url = 'http://localhost:3000/car/'+placa
            await axios.post(url,{},this.req)
        },
        async showTime(placa){
            await this.exitCar(placa)
            const url = 'http://localhost:3000/car/time/'+placa
            const time = await axios.get(url,this.req)
            this.timeModal = time.data
            this.showModal()
        }
    },

    async created(){
        const url = 'http://localhost:3000/car/all'
        let cars = await axios.get(url, this.req)
        this.cars = cars.data.cars
    }

    
}
</script>

<style scoped>

    #show{
        text-align: center;
    }

    table{
        margin: 0 auto;
        border: 1px solid rgba(0, 0, 0, 0.319);
    }
    .car{
        text-align: center;
        width: 65vw;
        margin: 0 auto;
    }

    h1{
        font-size: 1.8rem;
    }

    td{
        text-align: left;
    }

    dialog{
        width: 80vw;
        margin: 0 auto;
        border: 1px solid rgba(0, 0, 0, 0.331);
        padding: 30px;
        top: 50%;
        transform: translate(0%,-50%);
    }

    dialog::backdrop{
        background-color: rgb(0,0,0, 0.5);
    }

    dialog button{
        margin-top: 25px;
    }

    .alone{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }


</style>