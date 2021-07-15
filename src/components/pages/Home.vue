<template>
    <div>
        <BaseSpinner v-if="isLoading"/>
        <template v-else-if="hasSearchQuery">
            <h1>Search Results</h1>
            <ul v-for="post in posts" :key="post.id">
                <li>{{ post.title }}</li>
            </ul>
        </template>
        <template v-else-if="hasPosts">
            <template v-for="post in posts">
                <SinglePost
                    :key="post.id"
                    :id="post.id"
                    :slug="post.slug"
                    :title="post.title.rendered"
                    :excerpt="post.excerpt.rendered"
                    :date="post.date"
                    :featured-image="post.featured_image_src"
                    :featured-image-urls="post.featured_image_urls"
                />
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
import SinglePost from '../SinglePost';
import Pagination from '../UI/BasePagination';
// import SearchResults from '../SearchResults';

export default {
    components: {
        SinglePost,
        Pagination,
        // SearchResults
    },
    data() {
        return {
            isLoading: false,
            currentPage: 1,
            postsPerPage: 3
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
        }
    },
    methods: {
        async loadPosts() {
            this.isLoading = true;
            console.log('route', this.$route);
            let route = this.$route.query.s ? 'search' : 'posts';
            try {
                await this.$store.dispatch('LOAD_POSTS', {
                    apiRoute: route,
                    query: '80 day',
                    postsPerPage: this.postsPerPage
                })
            }
            catch(error) {
                console.log('loadPosts error', error);
            }
            this.isLoading = false;
        },
        changePage(value) {
            switch(value) {
                case 'next':
                    this.currentPage += 1;
                    break;
                case 'prev':
                    this.currentPage -= 1;
                    break;
                default:
                    this.currentPage = value;
            }
        }
    },
    watch: {
        '$route' (to, from) {
            if (
                (from.query.s && to.fullPath == "/") ||
                (from.fullPath == "/" && to.query.s)
            ) {
                this.loadPosts();
            }

            if (from.query.s && to.fullPath == "/") {
                this.$store.dispatch('SEARCH_TERM', null);
            }
        }

    }
}
</script>