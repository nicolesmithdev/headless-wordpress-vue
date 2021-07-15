<template>
    <li
        @click="onClick" 
        :class="{ omission: isNaN(pageNumber) }"
    >
        <span>{{ pageNumber }}</span>
    </li>
</template>

<script>
export default {
    props: ['pageNumber'],
    methods: {
        onClick() {
            if (!isNaN(this.pageNumber)) {
                this.$emit('loadPage', this.pageNumber);
            }
        }
    }
}
</script>