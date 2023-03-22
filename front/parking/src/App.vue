<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default{
  
}
</script>

<style scoped>
  #app{
    font-family: 'Roboto';
  }

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
