<template>
    <footer class="site-footer">
        <p>&copy; 2017 - {{ new Date().getFullYear() }} Nicole Smith, Toning With Twins. All Rights Reserved. <router-link to="/privacy/">Privacy Policy</router-link></p>
    </footer>
</template>

<style lang="scss" scoped>
.site-footer {
    background-color: $dark-gray;
    clear: both;
    color: $white;
    padding: $padding/2;
    text-align: center;

    @include respond-to('x-small') {
        display: none;
        visibility: hidden;
    }

    a {
        color: $white;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    p {
        margin: 0;
    }
}
</style>