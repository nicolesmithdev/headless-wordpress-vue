<template>
    <div :class="postClasses">
        <header class="entry-header">
            <p class="entry-meta" v-html="publishedDate" />
            <h2 class="entry-title">
                <router-link
                    :to="{ path: `/` + post.slug, params: {} }"
                    v-html="post.title.rendered"
                ></router-link>
            </h2>
        </header>
        <div class="entry-content">
            <router-link :to="`/` + post.slug" v-if="image">
                <v-img
                    transition="fade-transition"
                    :lazy-src="lazySrc"
                    :src="image"
                    :alt="post.title.rendered"
                >
                </v-img>
            </router-link>
            <div v-html="post.excerpt.rendered" />
        </div>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    props: ['post'],
    data() {
        return {
            image: '',
        };
    },
    created() {
        this.featuredImg();
    },
    methods: {
        featuredImg() {
            if (
                this.post.featured_image_src &&
                this.post.featured_image_urls.large
            ) {
                this.image = this.post.featured_image_urls.large[0];
            } else {
                this.$http
                    .get('wp/v2/media?parent=' + this.post.id + '&type=image')
                    .then(
                        (response) => {
                            this.image = response.data[0].source_url;
                        },
                        (error) => {
                            console.log(error);
                        }
                    );
            }
        },
    },
    computed: {
        lazySrc() {
            return this.post.featured_image_urls &&
                this.post.featured_image_urls.thumbnail[0]
                ? this.post.featured_image_urls.thumbnail[0]
                : this.image;
        },
        postClasses() {
            return 'post-' + this.post.id + ' post entry';
        },
        publishedDate() {
            return moment(this.post.date).format('MMMM d, YYYY');
        },
    },
};
</script>
