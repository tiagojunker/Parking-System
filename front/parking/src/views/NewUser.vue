<template>
  <div>
    <form action="" class="has-background-light">
      <h1 class="has-text-primary">Cadastro de usuário</h1>
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
      <input v-model="name" type="text" class="input" placeholder="Nome do Usuário: ">
      <input v-model="email" type="text" class="input" placeholder="Email: ">
      <input v-model="userPassword" type="password" class="input" placeholder="Senha do Usuário: ">
      <input v-model="rootPassword" type="password" class="input" placeholder="Senha Administrativa: ">
      <button @click.prevent="newUser" class="button is-success">Criar</button>
      <p><a class="has-text-dark" href="/">Fazer Login?</a></p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {

  components:{
  
  },

  data(){
    return{
      error: '',
      success: '',
      name: '',
      email: '',
      userPassword: '',
      rootPassword: ''
    }
  },
  methods: {
    async newUser(){
      
      try {
        
        const url = 'http://localhost:3000/user/new'
        const user = await axios.post(url,{
          name: this.name,
          email: this.email,
          password: this.userPassword,
          rootPassword: this.rootPassword
        })

        this.success = user.data.msg
        this.error = ''
        this.clearFields()

      } catch (err) {
        if(err.response.data.status == false){
          this.error = err.response.data.msg
          this.success = ''
          this.clearFields()

        } else {
          this.error = err.response.data
          this.success = ''
          this.clearFields()
        }
      }     

    },

    clearFields(){
      this.email = ''
      this.userPassword = ''
      this.name = ''
      this.rootPassword = ''
    }

  }

}
</script>

<style scoped>
  div{
    position: relative;
  }

  form{
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
    border-radius: 15px;
    width: 40vw;
    margin: 0 auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  h1 {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 10px;
  }

  input {
    margin-bottom: 15px;
  }

  button{
    position: relative;
    width: 100%;
    font-size: 1.2rem;
  }

  article{
    margin: 0 auto;
    text-align: center;
  }

  p, a{
    text-align: center;
    font-size: 0.9rem;
    margin-top: 10px;
  }

  p:hover, a:hover{
    text-decoration: underline;
    transition: 0.7s;
  }

  article{
    width: 35vw;
    margin: 0 auto;
    text-align: center;
    }

</style>