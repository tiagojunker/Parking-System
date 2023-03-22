<template>
  <div class="client">
      <NavBar/>
      <div class="search-bar">
        <h3>Pesquisar Clientes</h3>
        <div class="search">
          <input v-model="placa" class="input" type="text" placeholder="Digite a placa do veiculo do cliente: ">
          <button @click.prevent="showClient" class="btn"><ion-icon name="search"></ion-icon></button>
        </div>

        <div class="add-client">
          <hr>
          <h3>Novo Cliente 
            <span>
              <button class="btn" @click="showModal">
                <ion-icon name="person-add"></ion-icon>
              </button>
            </span>
          </h3>

          <hr>
          <h3>Clientes Cadastrados</h3>
          <ClientTable :clients="this.client == ''? this.clientsCreated : this.client"/>
        </div>
        
        <dialog>
          <FormModal/>
        </dialog>
  

      </div>
  </div>
</template>

<script>
import axios from 'axios'
import FormModal from '../components/FormModal.vue'
import ClientTable from '../components/ClientTable.vue'
import NavBar from '../components/NavBar.vue'

export default {
  
  components: {
    FormModal,
    ClientTable,
    NavBar
  },

  data(){
    return{
      nome: '',
      placa: '',
      modelo: '',
      cor: '',
      pgto: '1',
      error: '',
      success: '',
      clientsCreated: {},
      client: ''
    }
  },

  methods: {
    showModal(){
      this.$el.querySelector('dialog').showModal();
    },
    closeModal(){
      this.$el.querySelector('dialog').close()
      document.location.reload(true)
    },

    async showClient(){

      if(this.placa == undefined){
        this.client = [this.clientsCreated]
      } else {

        const result = [this.clientsCreated.find(item => item.placa == this.placa)];
       
        if(Object.keys(result).length === 0){
          this.client = this.clientsCreated
        } else {
          this.client = result          
        }

      }
      
    },



  },

  async created(){
    try {
      const url = 'http://localhost:3000/client/all'
      let req = {
          headers: {
              Authorization: "Bearer " + localStorage.getItem('token')
          }
      }
      const clients = await axios.get(url, req)
      this.clientsCreated = clients.data.clients
    } catch (err) {
      console.error('Erro ao conectar com servidor back-end')
    }
  }
}
</script>

<style scoped>

  *{
    font-family: 'Roboto', sans-serif;
  }
  .search-bar{
    margin-top: 3vw;
  }

  .search{
    display: flex;
    width: 40vw;
    margin: 0 auto;
  }

  .search .btn{
    padding: 5px 25px;
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid #cfcfcf;
    border-radius: 5px;
    margin-left: 5px ;
  }

  .search .btn:hover{
    transition: 0.5s;
    background-color: #cfcfcf;
  }

  h3{
    margin: 0 auto;
    margin-bottom: 5px;
    width: 40vw;
  }

  .add-client{
    margin-top: 1vw;
  }

  hr{
    width: 40vw;
    margin: 15px auto;
  }

  .add-client .btn{
    padding: 2px 10px;
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid #cfcfcf;
    border-radius: 5px;
    margin-left: 5px ;
  }

  .add-client .btn:hover{
    transition: 0.5s;
    background-color: #cfcfcf;
  }

  dialog{
        width: 80vw;
        margin: 0 auto;
        border: 1px solid rgba(0, 0, 0, 0);
        padding: 30px;
        top: 50%;
        transform: translate(0%,-50%);
        background: rgba(0, 0, 0, 0);
  }

  dialog::backdrop{
      background-color: rgb(0,0,0, 0.5);
  }

     
</style>