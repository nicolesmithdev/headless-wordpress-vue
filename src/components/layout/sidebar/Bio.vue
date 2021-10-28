<template>
    <div>
        <p>
            <img
                src="https://www.toningwithtwins.com/wp-content/uploads/2020/07/profilepic-5-768x1024.jpg"
                alt="Nicole Smith"
                width="768"
                height="1024"
            />
        </p>

        <p>
            Hello! My name is Nicole, and I am a mother to fraternal twin girls
            Scotlynn &amp; Skylar. I've been on a health and fitness journey
            since 2012, but even more so since having my twins in 2016. I am
            always looking to connect with other like-minded women also on a
            fitness journey.
        </p>

        <p>
            <router-link to="/about" class="button">More About Me</router-link>
        </p>
    </div>
</template>

<style lang="scss" scoped>
img {
    display: block;
}

p:not(:last-child) {
    margin-bottom: $padding * 0.5;
}

.button {
    background-color: transparent;
    color: $pink;
    padding: 0;
}
</style>
