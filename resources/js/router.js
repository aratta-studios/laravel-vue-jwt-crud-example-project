import Vue from "vue"
import VueRouter from "vue-router"
import PhoneBookPage from './ui/pages/phoneBook';
import LoginPage from './ui/pages/login';
import store from './store/index';

Vue.use(VueRouter);

function guard(to, from, next){
    if(store.state.login.isLoggedIn === true) {
        // or however you store your logged in state
        next(); // allow to enter route
    } else{
        next('/login'); // go to '/login';
    }
}

export default new VueRouter({
    mode: 'history',

    routes: [
        {
            path: '',
            name: 'PhoneBook',
            component: PhoneBookPage,
            beforeEnter: guard
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginPage
        }
    ]
})
