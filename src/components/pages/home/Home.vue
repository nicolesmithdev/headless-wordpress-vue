<template>
    <div>
        <BaseSpinner v-if="isLoading" />
        <template v-else-if="hasSearchQuery">
            <h1>Search Results</h1>
            <template v-for="post in posts">
                <SinglePost :key="post.id" :post="post" />
            </template>
        </template>
        <template v-else-if="hasPosts">
            <template v-for="post in posts">
                <SinglePost :key="post.id" :post="post" />
            </template>
            <Pagination
                :current-page="currentPage"
                @nextPage="changePage('next')"
                @prevPage="changePage('prev')"
                @loadPage="changePage"
            />
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SinglePost from './SinglePost';
import Pagination from '../../UI/BasePagination';

export default {
    components: {
        SinglePost,
        Pagination,
    },
    data() {
        return {
            isLoading: false,
            currentPage: 1,
            postsPerPage: 3,
        };
    },
    created() {
        this.loadPosts();
    },
    computed: {
        ...mapGetters(['posts']),
        hasSearchQuery() {
            return this.$route.query.s || this.$store.getters.hasSearchQuery;
        },
        hasPosts() {
            return !this.isLoading && this.$store.getters.hasPosts;
        },
    },
    methods: {
        async loadPosts() {
            this.isLoading = true;
            let route = this.$route.query.s ? 'search' : 'posts';
            if (route == 'search') {
                try {
                    await this.$store.dispatch('FETCH_SEARCH_RESULTS', {
                        query: this.hasSearchQuery,
                        postsPerPage: this.postsPerPage,
                    });
                } catch (error) {
                    console.log('loadPosts error', error);
                }
            } else {
                try {
                    await this.$store.dispatch('LOAD_POSTS', {
                        page: this.currentPage,
                        postsPerPage: this.postsPerPage,
                    });
                } catch (error) {
                    console.log('loadPosts error', error);
                }
            }
            this.isLoading = false;
        },
        changePage(value) {
            switch (value) {
                case 'next':
                    this.currentPage += 1;
                    break;
                case 'prev':
                    this.currentPage -= 1;
                    break;
                default:
                    this.currentPage = value;
            }
            window.scrollTo(0, 0);
        },
    },
    watch: {
        $route(to, from) {
            if (
                (from.query.s && to.fullPath == '/') ||
                (from.fullPath == '/' && to.query.s)
            ) {
                this.loadPosts();
            }

            if (from.query.s && to.fullPath == '/') {
                this.$store.dispatch('PROP', {
                    prop: 'searchQuery',
                    value: null,
                });
            }
        },
        currentPage() {
            this.loadPosts();
        },
        hasSearchQuery() {
            this.loadPosts();
        },
    },
};
</script>
