<template>
    <div id="comments" class="entry-comments">
        <template v-if="comments && comments.length > 0">
            <h3>Comments</h3>
            <ol class="comment-list">
                <SingleComment
                    v-for="comment in parentComments"
                    :key="comment.id"
                    :comment="comment"
                    :children="childComments(comment.id)"
                />
            </ol>
        </template>
        <CommentForm />
    </div>
</template>

<script>
import SingleComment from './SingleComment';
import CommentForm from './CommentForm';
export default {
    props: ['postId'],
    components: { SingleComment, CommentForm },
    beforeMount() {
        this.$store.dispatch('FETCH_COMMENTS', this.postId);
    },
    computed: {
        comments() {
            return (
                this.$store.getters.PROP_KEY({
                    prop: 'page',
                    key: 'comments',
                }) || []
            );
        },
        commentClasses() {
            return 'comment';
        },
        parentComments() {
            return this.comments.filter((comment) => comment.parent === 0);
        },
    },
    methods: {
        childComments(parentId) {
            return this.comments.filter(
                (comment) => comment.parent === parentId
            );
        },
    },
};
</script>
