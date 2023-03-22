<template>
  <div class="login">
    <form action="" class="has-background-light">
        <h1 class="has-text-success">Login de Funcionários</h1>
        <article v-if="error.length > 0" class="message is-danger">
            <div class="message-body">
                {{ error }}
            </div>
        </article>
        <input v-model="email" class="input" type="text" placeholder="Email ou Usuario: ">
        <input v-model="password" class="input" type="password" placeholder="Senha: ">
        <button @click.prevent="login" class="button is-success">Logar</button>
        <p><a class="has-text-dark" href="/user">Cadastrar Novo</a></p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {


    data(){
        return{
            email: '',
            password: '',
            error: ''
        }
    },
    methods: {
        async login() {
            try {
                const url = 'http://localhost:3000/user/login'
                const auth = await axios.post(url, {email: this.email, password: this.password})
                const token = auth.data.token
                localStorage.setItem('token', token)
                this.$router.push('New')
                
            } catch (error) {
                console.log(error.response.data.msg)
                this.error = error.response.data.msg
            }
            
        }
    }

}
</script>

<style scoped>

    .login {
        position: relative;
    }
    
    form {
        position: fixed;
        width: 45vw;
        margin: 0 auto;
        padding: 30px;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
        border-radius: 15px;
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
    
</style>