<template>
    <nav>
        <div v-if="isLoading" class="loading">Loading...</div>
        <template v-else v-for="item in menuItems">
            <a
                :key="item.ID"
                :href="item.url"
                target="_blank"
            >
                <i :class="icon(item.title)"></i>
            </a>
        </template>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false,
            icons: [
                { name: 'Facebook', icon: 'fab fa-facebook-f' },
                { name: 'Instagram', icon: 'fab fa-instagram' },
                { name: 'Twitter', icon: 'fab fa-twitter' },
                { name: 'Pinterest', icon: 'fab fa-pinterest-p' }
            ],
        };
    },
    created() {
        this.loadNavigation();
    },
    computed: {
        menuItems() {
            return !this.isLoading && this.$store.getters.socialNav;
        }
    },
    methods: {
        icon(value) {
            return (this.icons.find(el => el.name === value) ? this.icons.find(el => el.name === value).icon : 'fas fa-times') + ' fa-lg';
        },
        async loadNavigation() {
            this.isLoading = true;

            try {
                await this.$store.dispatch('LOAD_NAV', { location: 'social' });
            }
            catch(error) {
                console.log('SocialMedia.vue loadNavigation() error', error);
            }

            this.isLoading = false;        
        }
    }
}
</script>

<style lang="scss" scoped>
a {
    color: $gray;
    margin-left: $padding/4;
    margin-right: $padding/4;

    &:first-child {
        margin-left: 0;
    }

    &:last-child {
        margin-right: 0;
    }

    &:hover {
        color: $pink;
    }
}
</style>