<template>
    <li :id="`comment-${comment.id}`" :class="commentClasses">
        <article :id="`article-comment-${comment.id}`">
            <header class="comment-header">
                <p class="comment-author">
                    <v-avatar
                        v-if="comment.author_avatar_urls"
                        size="60"
                        class="avatar"
                    >
                        <v-img
                            :src="comment.author_avatar_urls[96]"
                            :alt="comment.author_name"
                            :lazy-src="comment.author_avatar_urls[24]"
                            height="60"
                            width="60"
                        />
                    </v-avatar>
                    <span class="comment-author-name">
                        <a
                            v-if="comment.author_url"
                            :href="comment.author_url"
                            class="comment-author-link"
                        >
                            {{ comment.author_name }}
                        </a>
                        <template v-else>
                            {{ comment.author_name }}
                        </template>
                    </span>
                </p>
                <p class="comment-meta">
                    <time class="comment-time">
                        <a href="#comment-304" class="comment-time-link">
                            {{ date }}
                        </a>
                    </time>
                </p>
            </header>
            <div class="comment-content" v-html="comment.content.rendered" />
        </article>
        <ul v-if="children" class="children">
            <SingleComment
                v-for="comment in children"
                :key="comment.id"
                :comment="comment"
            />
        </ul>
    </li>
</template>

<script>
import moment from 'moment';
export default {
    // MUST give a name in recursive components
    // https://vuejs.org/v2/guide/components-edge-cases.html#Recursive-Components
    name: 'SingleComment',
    props: ['comment', 'children'],
    computed: {
        commentClasses() {
            return 'comment' + (this.children ? ' depth-1' : '');
        },
        date() {
            return moment(this.comment.date).format(
                'MMMM DD, YYYY [at] h:mm A'
            );
        },
    },
};
</script>
