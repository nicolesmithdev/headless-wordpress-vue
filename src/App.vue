<template>
    <div class="site-container">
        <SiteHeader />
        <div class="container">
            <div class="content">
                <transition name="fade" mode="out-in">
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
    data() {
        return {
            isLoading: true,
        };
    },
    beforeMount() {
        this.$store.dispatch('FETCH_CATEGORIES');
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
