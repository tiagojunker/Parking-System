import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

async function auth(to, from, next){
  if(localStorage.getItem('token') != undefined){

    let req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }

    try {
      const validate = await axios.post('http://localhost:3000/validate',{},req)
      if(validate.data.status){
        next()
      } else {
        next('/')
      }

    } catch (err) {
      next('/')
    }
  } else {
    next('/')
  }
}

const routes = [
 
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/new',
    name: 'New Car',
    component: () => import('../views/NewCar.vue'),
    beforeEnter: auth
  },
  {
    path: '/show',
    name: 'Show Cars',
    component: () => import('../views/ShowCars.vue'),
    beforeEnter: auth
  },
  {
    path: '/client',
    name: 'New Client',
    component: () => import('../views/NewClient.vue'),
    beforeEnter: auth
  },
  {
    path: '/user',
    name: 'New User',
    component: () => import('../views/NewUser.vue')
  },
  {
    path: '/client/update',
    name: 'Client Update',
    component: () => import('../views/ClientUpdate.vue'),
    beforeEnter: auth
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
