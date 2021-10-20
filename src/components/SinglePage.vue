<template>
    <div :class="pageClasses">
        <BaseSpinner v-if="isLoading" />
        <template v-else>
            <p
                v-if="page.type == 'post'"
                class="entry-meta"
                v-html="publishedDate"
            />
            <h1 class="entry-title" v-html="page.title.rendered"></h1>
            <div v-html="page.content.rendered" class="entry-content"></div>
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
export default {
    data() {
        return {
            isLoading: false,
        };
    },
    computed: {
        ...mapGetters(['page']),
        pageClasses() {
            return 'post-' + this.page.id + ' page entry';
        },
        publishedDate() {
            return moment(this.page.date).format('MMMM d, YYYY');
        },
    },
    methods: {
        async loadPage() {
            this.isLoading = true;

            try {
                await this.$store.dispatch('LOAD_PAGE', {
                    route: this.$route.params.slug,
                });
            } catch (error) {
                console.log('loadPage error', error);
            }

            this.isLoading = false;
        },
    },
    created() {
        this.loadPage();
    },
    watch: {
        $route() {
            this.loadPage();
        },
    },
};
</script>
