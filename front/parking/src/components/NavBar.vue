<template>
    <nav class="navbar is-primary">
      <h3><span class="brand">Br </span>Parking</h3>
      <div class="links">
        <router-link to="/new">Novo</router-link>
        <router-link to="/show">Estacionados</router-link>
        <router-link to="/client">Clientes</router-link>
        <a class="exit" @click="logout">Sair</a>
      </div>
    </nav>
</template>

<script>
export default {
  methods:{
    logout(){
      localStorage.removeItem('token')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
nav{
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 100px;
  }

  h3{
    font-size: 1.3rem;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.463);
    cursor: pointer;
  }
  .brand{
    color: yellow;
  }

  nav a{
    text-decoration: none;
    color: white;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.463);
  }

  nav a:hover{
    transition: 0.5s;
    color: yellow;
  }

  .links a{
    margin-left: 20px;
  }

  .exit{
    color: rgb(255, 27, 27);
    font-weight: 600;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0);
  }
</style>