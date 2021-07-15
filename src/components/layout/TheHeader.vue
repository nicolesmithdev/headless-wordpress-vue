<template>
    <header class="site-header">
        <div id="toolbar"></div>
        <router-link to="/" id="logo">
            <img src="@/assets/toning-with-twins.png" alt="Toning With Twins" />
        </router-link>
        <Navigation />
    </header>
</template>

<script>
import Navigation from './TheNavigation';

export default {
    components: {
        Navigation
    }
}
</script>

<style lang="scss" scoped>
.site-header {
    text-align: center;

    #logo {
        display: block;
        margin: $padding auto;
        width: 185px;

        img {
            display: block;
        }
    }

    #toolbar {
        background-color: $pink;
        color: $white;
        min-height: 10px;
        text-align: right;
    }
}
</style>