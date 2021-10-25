export default {
    page(state) {
        return state.page;
    },

    pageCount(state) {
        return state.pageCount;
    },

    posts(state) {
        return state.posts;
    },

    hasPosts(state) {
        return state.posts && state.posts.length > 0;
    },

    hasSearchQuery(state) {
        return state.searchQuery;
    },

    primaryNav(state) {
        return state.primaryNav;
    },

    socialNav(state) {
        return state.socialNav;
    },
    LOADING: (state) => {
        return state.ui.loading;
    },
    PROP: (state) => (prop) => {
        return state[prop] !== undefined ? state[prop] : false;
    },
    PROP_KEY: (state) => ({ prop, key }) => {
        return state[prop] && state[prop][key] !== undefined
            ? state[prop][key]
            : false;
    },
};
