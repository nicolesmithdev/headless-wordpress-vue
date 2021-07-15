<template>
    <div class="sidebar">
        <section v-for="component in components" :key="component">
            <component :is="component" />
        </section>
    </div>
</template>

<script>
import Search from './sidebar/Search';
import SocialMedia from './sidebar/SocialMedia';
import Bio from './sidebar/Bio';
import PopularPosts from './sidebar/PopularPosts';

export default {
    components: {
        Search,
        SocialMedia,
        Bio,
        PopularPosts
    },
    data() {
        return {
            components: ['Search', 'SocialMedia', 'Bio', 'PopularPosts']
        };
    }
}
</script>

<style lang="scss" scoped>
.sidebar {
    font-size: 14px;
    line-height: 25px;

    section {
        background-color: $white;
        border: 5px solid $medium-gray;
        margin-bottom: $padding;
        padding: $padding/2;
        text-align: center;
    }
}
</style>