import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'
import RegisterPage from "../views/RegistrationPage.vue";
import Login from "../views/Login.vue";
import VerificationPage from "../views/VerificationPage.vue";
import SuccessPage from "../views/SuccessPage.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/verify",
    name: "VerificationPage",
    component: VerificationPage
  },
  {
    path: "/success-page",
    name: "SuccessPage",
    component: SuccessPage,
    meta: {
      title: "SuccessPage",
      requiresAuth: true
    },
    // beforeEnter: route_guard
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (localStorage.getItem("access_token")) {
      next();
    } else {
      next({ path: "login" });
    }
  } else if (localStorage.getItem("access_token")) {
    next({ path: "success-page" });
  }
  next();
});

// function route_guard(to, from, next) {
//   var isAuthenticated = false;
//   if (localStorage.getItem("access_token")) {
//     isAuthenticated = true;
//   } else {
//     isAuthenticated = false;
//   }
//   if (isAuthenticated) {
//     next(); // allow to enter route
//   } else {
//     next("/login"); // go to '/login';
//   }
// }

export default router;
