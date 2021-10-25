<template>
    <div class="site-container">
        <SiteHeader />
        <div class="container">
            <div class="content">
                <BaseSpinner v-if="loading" />
                <transition v-else name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
            <Sidebar />
        </div>
        <SiteFooter />
    </div>
</template>

<script>
import SiteHeader from './components/layout/TheHeader';
import SiteFooter from './components/layout/TheFooter';
import Sidebar from './components/layout/TheSidebar';

export default {
    components: {
        SiteHeader,
        SiteFooter,
        Sidebar,
    },
    beforeMount() {
        this.$store.dispatch('FETCH_CATEGORIES');
    },
    created() {
        this.loadPage();
    },
    computed: {
        loading() {
            return this.$store.getters.LOADING;
        },
    },
    methods: {
        async loadPage() {
            this.$store.dispatch('PROP_KEY', {
                prop: 'ui',
                key: 'loading',
                value: true,
            });

            try {
                await this.$store.dispatch('LOAD_PAGE', {
                    route: this.$route.params.slug,
                });
            } catch (error) {
                console.log('loadPage error', error);
            }

            this.$store.dispatch('PROP_KEY', {
                prop: 'ui',
                key: 'loading',
                value: false,
            });
        },
    },
    watch: {
        $route() {
            this.loadPage();
        },
    },
};
</script>

<style lang="scss">
* {
    box-sizing: border-box;
    transition: all 0.2s linear;
}

body {
    color: #333;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>
