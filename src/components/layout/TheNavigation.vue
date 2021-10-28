<template>
    <nav>
        <div v-if="isLoading" class="loading">Loading...</div>
        <template v-else v-for="item in menuItems">
            <router-link :to="`/` + item.slug" :key="item.ID" exact>{{
                item.title
            }}</router-link>
        </template>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false,
        };
    },
    created() {
        this.loadNavigation();
    },
    computed: {
        menuItems() {
            return !this.isLoading && this.$store.getters.primaryNav;
        },
    },
    methods: {
        async loadNavigation() {
            this.isLoading = true;

            try {
                await this.$store.dispatch('LOAD_NAV', { location: 'primary' });
            } catch (error) {
                console.log('TheNavigation.vue loadNavigation() error', error);
            }

            this.isLoading = false;
        },
    },
};
</script>

<style lang="scss" scoped>
nav {
    @extend .container;
    background-color: $white;
    margin-bottom: $padding * 1.5;

    a,
    .loading {
        color: $gray;
        display: inline-block;
        font: 700 #{14px}/#{$line-height} $alt-font;
        padding: ($padding * 0.5) $padding;
        text-decoration: none;
        text-transform: uppercase;

        &:hover,
        &.router-link-exact-active {
            color: $pink;
        }
    }
}
</style>
