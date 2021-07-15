<template>
    <div>
        <BaseSpinner v-if="isLoading"/>
        <template v-else-if="hasResults">
            <h1>Search Results</h1>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false,
            currentPage: 1,
            postsPerPage: 3
        };
    },
    created() {
        this.loadResults();
    },
    computed: {
        hasResults() {
            return !this.isLoading && this.$store.getters.hasPosts;
        }
    },
    methods: {
        async loadResults() {
            this.isLoading = true;
            try {
                await this.$store.dispatch('LOAD_POSTS', {
                    apiRoute: 'search',
                    query: '80 day',
                    postsPerPage: this.postsPerPage
                })
            }
            catch(error) {
                console.log('loadPosts error', error);
            }
            this.isLoading = false;
        },
    }
}
</script>