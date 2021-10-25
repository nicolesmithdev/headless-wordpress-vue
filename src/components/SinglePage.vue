<template>
    <div>
        <div :class="pageClasses">
            <header class="entry-header">
                <p
                    v-if="page.type == 'post'"
                    class="entry-meta"
                    v-html="publishedDate"
                />
                <h1 class="entry-title" v-html="page.title.rendered"></h1>
            </header>
            <div v-html="page.content.rendered" class="entry-content"></div>
            <footer
                class="entry-footer"
                v-if="categories && categories.length > 0"
            >
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
        </div>
        <Comments :post-id="page.id" />
    </div>
</template>

<script>
import Comments from '../components/comments/Comments';
import { mapGetters } from 'vuex';
import moment from 'moment';
export default {
    components: { Comments },
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
};
</script>
