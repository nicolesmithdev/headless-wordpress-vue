<template>
    <div class="pagination">
        <ul>
            <li>
                <button :disable="isPrevButtonDisabled" @click="prevPage">
                    &laquo; Previous Page
                </button>
            </li>
            <template v-for="trigger in triggers">
                <base-pagination-trigger
                    :key="trigger"
                    :class="{ current: trigger === currentPage }"
                    :pageNumber="trigger"
                    @loadPage="onLoadPage"
                />
            </template>
            <li>
                <button :disable="isNextButtonDisabled" @click="nextPage">
                    Next Page &raquo;
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import BasePaginationTrigger from './BasePaginationTrigger';

export default {
    emits: ['nextPage', 'prevPage'],
    props: {
        currentPage: {
            type: Number,
            required: true,
        },
        visiblePagesCount: {
            type: Number,
            default: 5,
        },
    },
    components: {
        BasePaginationTrigger,
    },
    computed: {
        isPrevButtonDisabled() {
            return this.currentPage === 1;
        },
        isNextButtonDisabled() {
            return this.currentPage === this.getPageCount;
        },
        getPageCount() {
            return this.$store.getters.pageCount;
        },
        triggers() {
            const currentPage = this.currentPage;
            const pageCount = this.getPageCount;
            const visiblePagesCount = this.visiblePagesCount;
            const visiblePagesThreshold = (visiblePagesCount - 1) / 2;
            const paginationTriggersArray = Array(
                this.visiblePagesCount - 1
            ).fill(0);

            // scenario 1 - the selected page # is smaller than half of the list width
            if (currentPage <= visiblePagesThreshold + 1) {
                paginationTriggersArray[0] = 1;
                const pagintationTriggers = paginationTriggersArray.map(
                    (paginationTrigger, index) => {
                        return paginationTriggersArray[0] + index;
                    }
                );
                pagintationTriggers.push('...', pageCount);
                return pagintationTriggers;
            }

            // scenario 2 - the selected page # is bigger than half of the list width counting from the end of the list
            else if (currentPage >= pageCount - visiblePagesThreshold + 1) {
                const pagintationTriggers = paginationTriggersArray.map(
                    (paginationTrigger, index) => {
                        return pageCount - index;
                    }
                );
                pagintationTriggers.reverse().unshift(1, '...');
                return pagintationTriggers;
            }

            // scenario 3 - all other cases
            else {
                paginationTriggersArray[0] =
                    currentPage - visiblePagesThreshold + 1;
                const pagintationTriggers = paginationTriggersArray.map(
                    (paginationTrigger, index) => {
                        return paginationTriggersArray[0] + index;
                    }
                );
                pagintationTriggers.unshift(1);
                pagintationTriggers.push('...', pageCount);
                return pagintationTriggers;
            }
        },
    },
    methods: {
        nextPage() {
            this.$emit('nextPage');
        },
        prevPage() {
            this.$emit('prevPage');
        },
        onLoadPage(value) {
            this.$emit('loadPage', value);
        },
    },
};
</script>

<style lang="scss">
.pagination {
    clear: both;
    margin: $padding * 2 0;

    ul {
        margin: 0;
        padding: 0;
    }

    li {
        display: inline-block;
        list-style: none;
        margin: 0 2px 4px;

        button,
        span {
            background-color: $medium-gray;
            border: none;
            color: #333;
            cursor: pointer;
            display: block;
            font-size: 16px;
            font-weight: 600;
            line-height: $line-height;
            padding: 8px 12px;
        }

        &:first-child {
            margin-left: 0;
        }

        &:last-child {
            margin-right: 0;
        }

        &:hover button,
        &:hover span,
        &.current button,
        &.current span {
            background-color: #333;
            color: $white;
        }

        &.omission span {
            background-color: transparent;
            color: #333;
            cursor: auto;
            padding: 0;
        }
    }
}
</style>
