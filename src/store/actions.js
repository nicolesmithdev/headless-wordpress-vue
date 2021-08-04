export default {
    LOAD_NAV: async function({ commit }, payload) {
        await this._vm.$http.get('menus/v1/locations/'+payload.location).then(response => {
            const menuItems = [];

            response.data.items.map(item => {
                if (item.slug) {
                    menuItems.push({
                        id: item.ID,
                        title: item.title,
                        slug: item.slug
                    });
                } else if (item.url) {
                    if (item.title === "Home") {
                        menuItems.push({
                            id: item.ID,
                            title: "Home",
                            slug: ''
                        });
                    } else {
                        menuItems.push({
                            id: item.ID,
                            title: item.title,
                            url: item.url
                        });
                    }
                }
            });

            commit('SET_NAV', { location: payload.location, menuItems });
        }, error => {
            console.log('error', error);
        });
    },

    LOAD_PAGE: async function({ commit, dispatch }, payload) {
        const response = await this._vm.$http.get(`wp/v2/pages/?slug=${payload.route}`);
        if (response.status == 200) {
            if (response.data.length) {
                commit('SET_PAGE', response.data[0]);
            }
            await dispatch('LOAD_POST', { route: payload.route });
        }
        return false;
    },

    LOAD_POST: async function({ commit }, payload) {
        const response = await this._vm.$http.get(`wp/v2/posts/?slug=${payload.route}`);
        if (response.status == 200 && response.data.length) {
            commit('SET_PAGE', response.data[0]);
        }
        return false;
    },
    
    LOAD_POSTS: async function({ commit }, payload) {         
        let baseUrl = 'wp/v2/'+payload.apiRoute+'?per_page='+payload.postsPerPage;
        let url = payload.query ? baseUrl+'&search='+payload.query : baseUrl;

        await this._vm.$http.get(url).then(function(response) {
            const totalPosts = response.headers.map["x-wp-total"][0];

            const posts = [];
            for (let post in response.data) {
                posts.push(response.data[post]);
            }

            commit('SET_POSTS', posts);
            commit('PAGINATION_PAGE_COUNT', Math.ceil(totalPosts / payload.postsPerPage));
        });
    },

    SEARCH_TERM: function({ commit }, term) {
        commit('SET_SEARCH_TERM', term);
    }
}