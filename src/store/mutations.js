export default {
    PAGINATION_PAGE_COUNT: (state, payload) => {
        state.pageCount = payload;
    },

    SET_NAV: (state, payload) => {
        const menuName = payload.location + 'Nav';
        state[menuName] = payload.menuItems;
    },

    SET_PAGE: (state, page) => {
        state.page = page;
    },

    SET_POSTS: (state, posts) => {
        state.posts = posts
    },

    SET_SEARCH_TERM: (state, term) => {
        state.searchQuery = term;
    }
}