import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../views/Index";
import Login from "../views/Login";
import User from "../views/User";
import College from "../views/College";
import Clazz from "../views/Clazz";
import Student from "../views/Student";

Vue.use(VueRouter)

const routes = [

  {
    path: '/index',
    name: 'index',
    component: Index,
    children:[
      {
        path: '/User',
        name: 'User',
        component: User
      }, {
        path: '/College',
        name: 'College',
        component: College
      }, {
        path: '/Clazz',
        name: 'Clazz',
        component: Clazz
      },
      {
        path: '/Student',
        name: 'Student',
        component: Student
      },
    ]
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
