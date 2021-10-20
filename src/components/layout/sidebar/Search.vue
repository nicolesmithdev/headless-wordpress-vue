<template>
    <form>
        <input
            type="search"
            name="search"
            v-model="searchQuery"
            placeholder="Search this website"
            @input="onSearch"
        />
    </form>
</template>

<script>
export default {
    computed: {
        searchQuery: {
            get() {
                return this.$store.getters.PROP('searchQuery');
            },
            set(value) {
                this.$store.dispatch('PROP', {
                    prop: 'searchQuery',
                    value: value,
                });
            },
        },
    },
    methods: {
        onSearch() {
            this.$router.replace('/?s=' + this.searchQuery);
        },
    },
    watch: {
        $route(to, from) {
            if (from.query.s && to.fullPath == '/') {
                this.searchQuery = '';
            }
        },
    },
};
</script>
