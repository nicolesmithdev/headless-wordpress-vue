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
import Disclaimer from './sidebar/Disclaimer';

export default {
    components: {
        Search,
        SocialMedia,
        Bio,
        PopularPosts,
        Disclaimer,
    },
    data() {
        return {
            components: [
                'Search',
                'SocialMedia',
                'Bio',
                'PopularPosts',
                'Disclaimer',
            ],
        };
    },
};
</script>
