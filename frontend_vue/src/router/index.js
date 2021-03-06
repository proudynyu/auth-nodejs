import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';

Vue.use(VueRouter);

const DASH_URL = 'http://localhost:3333/auth/dashboard';

async function isLogged(to, from, next) {
  if (localStorage.token) {
    const body = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.token}`,
        'content-type': 'application/json',
      },
    };
    const data = await fetch(DASH_URL, body);
    const result = await data.json();
    if (result.success === 'ok') {
      next('/dashboard');
    }
    next();
  } else {
    next();
  }
}

async function checkToken(to, from, next) {
  if (localStorage.token) {
    next();
  } else {
    next('/login');
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: isLogged,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: isLogged,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: checkToken,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
