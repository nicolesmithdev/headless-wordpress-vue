export default {
    FETCH_CATEGORIES: async function({ commit }) {
        const response = await this._vm.$http.get('wp/v2/categories');
        if (response.status == 200) {
            commit('MUTATE', { prop: 'categories', value: response.body });
        }
        return false;
    },
    FETCH_COMMENTS: async function({ commit }, postId) {
        const response = await this._vm.$http.get(
            `wp/v2/comments?post=${postId}`
        );
        if (response.status == 200) {
            commit('MUTATE_KEY', {
                prop: 'page',
                key: 'comments',
                value: response.body,
            });
        }
        return false;
    },
    LOAD_NAV: async function({ commit }, payload) {
        await this._vm.$http.get('menus/v1/locations/' + payload.location).then(
            (response) => {
                const menuItems = [];

                response.data.items.map((item) => {
                    if (item.slug) {
                        menuItems.push({
                            id: item.ID,
                            title: item.title,
                            slug: item.slug,
                        });
                    } else if (item.url) {
                        if (item.title === 'Home') {
                            menuItems.push({
                                id: item.ID,
                                title: 'Home',
                                slug: '',
                            });
                        } else {
                            menuItems.push({
                                id: item.ID,
                                title: item.title,
                                url: item.url,
                            });
                        }
                    }
                });

                commit('SET_NAV', { location: payload.location, menuItems });
            },
            (error) => {
                console.log('error', error);
            }
        );
    },

    LOAD_PAGE: async function({ commit, dispatch }, payload) {
        const response = await this._vm.$http.get(
            `wp/v2/pages/?slug=${payload.route}`
        );
        if (response.status == 200) {
            if (response.data.length) {
                commit('MUTATE', { prop: 'page', value: response.data[0] });
            }
            await dispatch('LOAD_POST', { route: payload.route });
        }
        return false;
    },

    LOAD_POST: async function({ commit }, payload) {
        const response = await this._vm.$http.get(
            `wp/v2/posts/?slug=${payload.route}`
        );
        if (response.status == 200 && response.data.length) {
            commit('MUTATE', { prop: 'page', value: response.data[0] });
        }
        return false;
    },

    LOAD_POSTS: async function({ commit }, payload) {
        let url =
            'wp/v2/posts?page=' +
            (payload.page ? payload.page : 1) +
            '&per_page=' +
            payload.postsPerPage;
        if (payload.include) {
            for (let id in payload.include) {
                url = url + '&include[]=' + payload.include[id];
            }
        }

        await this._vm.$http.get(url).then((response) => {
            const totalPosts = response.headers.map['x-wp-total'][0];

            const posts = [];
            for (let post in response.data) {
                posts.push(response.data[post]);
            }

            commit('MUTATE', { prop: 'posts', value: posts });
            commit('MUTATE', {
                prop: 'pageCount',
                value: Math.ceil(totalPosts / payload.postsPerPage),
            });
        });
    },

    FETCH_SEARCH_RESULTS: async function({ dispatch }, payload) {
        let url =
            'wp/v2/search?search=' +
            payload.query +
            '&per_page=' +
            payload.postsPerPage;

        await this._vm.$http.get(url).then((response) => {
            const postIds = response.data.map((post) => {
                return post.id;
            });

            dispatch('LOAD_POSTS', {
                postsPerPage: payload.postsPerPage,
                include: postIds,
            });
        });
    },

    PROP: ({ commit }, { prop, value }) => {
        if (!prop || value === undefined) {
            return false;
        }
        commit('MUTATE', { prop, value });
    },
    PROP_KEY: ({ commit }, { prop, key, value }) => {
        if (!key || value === undefined) {
            return false;
        }
        commit('MUTATE_KEY', { prop, key, value });
    },
};
