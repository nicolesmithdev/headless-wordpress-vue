import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state() {
        return {
            categories: [],
            page: {},
            pageCount: 0,
            posts: [],
            primaryNav: [],
            searchQuery: null,
            searchResults: [],
            socialNav: [],
            ui: {
                loading: true,
            },
        };
    },
    mutations,
    actions,
    getters,
});

export default store;
