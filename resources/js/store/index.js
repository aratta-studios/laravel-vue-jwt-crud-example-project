import Vue from "vue"
import Vuex from "vuex"
import axios from 'axios'
import VueAxios from 'vue-axios'
import login from './login';
import phoneBook from './phoneBook';


Vue.use(Vuex, VueAxios, axios);

export default new Vuex.Store({
    namespaced: true,
    modules: {
        login,
        phoneBook
    },
    state: {
        windowHeight: 0,
        windowWidth: 0
    },
    actions: {
        // Shared actions
    },

    mutations: {
        ['setWindowHeight'](state, {windowHeight}) {
            state.windowHeight = windowHeight;
        },
        ['setWindowWidth'](state, {windowWidth}) {
            state.windowWidth = windowWidth;
        }
    },
    getters: {
        // Shared getters
    }
})
