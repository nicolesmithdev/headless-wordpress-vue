<template>
    <form>
        <input type="search" name="search" v-model="searchQuery" placeholder="Search this website" @input="onSearch" />
    </form>
</template>

<script>
export default {
    data() {
        return {
            'searchQuery': ''
        };
    },
    methods: {
        onSearch() {
            this.$store.dispatch('SEARCH_TERM', this.searchQuery);
            this.$router.replace('/?s='+this.searchQuery);
        }
    },
    watch: {
        '$route' (to, from) {
            if ( from.query.s && to.fullPath == "/") {
                this.searchQuery = '';
            }
        }
    }
}
</script>