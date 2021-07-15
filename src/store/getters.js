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
}