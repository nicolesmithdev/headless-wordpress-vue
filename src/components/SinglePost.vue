<template>
    <div :class="postClasses">
        <p class="entry-meta">
            {{ publishedDate }}
        </p>
        <h2 class="entry-title">
            <router-link :to="`/` + slug" v-html="title"></router-link>
        </h2>
        <router-link :to="`/` + slug" v-if="image">
            <img :src="image" :alt="title" />
        </router-link>
        <div v-html="excerpt" class="entry-content"></div>
    </div>
</template>

<script>
export default {
    props: ['id', 'slug', 'title', 'excerpt', 'date', 'featuredImage', 'featuredImageUrls'],
    data() {
        return {
            image: ''
        };
    },
    created() {
        this.featuredImg();
    },
    methods: {
        featuredImg() {
            // if featured image is set, use that
            if (this.featuredImage && this.featuredImageUrls.large) {
                this.image = this.featuredImageUrls.large[0];

            // otherwise try and get the first image in the body
            } else {
                this.$http.get('wp/v2/media?parent=' + this.id + '&type=image')
                    .then((response) => {
                        this.image = response.data[0].source_url;
                    }, error => {
                        console.log(error);
                    });
            }
        }
    },
    computed: {
        postClasses() {
            return 'post-' + this.id + ' post entry';
        },
        publishedDate() {
            const d = new Date(this.date);
            const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const month = months[d.getMonth()];
            const date = d.getDate();
            const year = d.getFullYear();
            
            return month + ' ' + date + ', ' + year;
        }
    } 
}
</script>