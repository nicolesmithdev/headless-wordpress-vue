<template>
    <div :class="pageClasses">
        <BaseSpinner v-if="isLoading" />
        <template v-else>
            <header class="entry-header">
                <p
                    v-if="page.type == 'post'"
                    class="entry-meta"
                    v-html="publishedDate"
                />
                <h1 class="entry-title" v-html="page.title.rendered"></h1>
            </header>
            <div v-html="page.content.rendered" class="entry-content"></div>
            <footer class="entry-footer">
                <p class="entry-meta">
                    <span class="entry-categories">
                        Filed Under:
                        <span
                            v-for="category in categories"
                            :key="category.id"
                            v-html="category.name"
                        >
                        </span>
                    </span>
                </p>
            </footer>
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
        categories() {
            const cats = this.$store.getters.PROP('categories') || [];
            return this.page && this.page.categories
                ? cats.filter((cat) => this.page.categories.includes(cat.id))
                : [];
        },
        pageClasses() {
            let categories = [];
            this.categories.map((cat) =>
                categories.push('category-' + cat.slug)
            );
            return this.page
                ? 'post-' +
                      this.page.id +
                      ' ' +
                      this.page.type +
                      ' type-' +
                      this.page.type +
                      ' status-' +
                      this.page.status +
                      (this.page.format ? 'format-' + this.page.format : '') +
                      ' ' +
                      categories.join(' ') +
                      ' entry'
                : '';
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
