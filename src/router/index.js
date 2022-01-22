import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Winner from '@/components/home/Winner'
import Login from '@/components/admin/Login'
import Dashboard from '@/components/admin/Dashboard'
import WinnerEntry from '@/components/admin/Winner'
import Campaign from '@/components/admin/Campaign'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home, 
    },
    {
      path: '/winner',
      name: 'Winner',
      component: Winner, 
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/newwinner',
      name: 'NewWinner',
      component: WinnerEntry,
    },
    {
      path: '/campaign',
      name: 'Campaign',
      component: Campaign,
    },
  ]
})
