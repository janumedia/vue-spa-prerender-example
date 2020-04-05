<template>
    <button :class="className" :type="submit !== undefined ? 'submit' : ''">
        <router-link v-if="url && url.indexOf('http') == -1" :title="label" :to="url">{{ label }}</router-link>
        <a v-else-if="url" :href="url" target="_blank" :title="label" rel="noopener">{{ label }}</a>
        <span v-else>{{ label }}</span>
    </button>
</template>
<script>
export default {
    props: ["primary", "submit", "label", "url"],
    computed: {
        className() {
            let str = this.primary !== undefined ? 'button--primary' : '';
            return str + (this.submit !== undefined ? ' button--submit' : '');
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/_color.scss";
@import "@/assets/css/_mixin.scss";
button {
    border: 1px solid $border-color;
    @include border-radius(0);
    
    text-transform: uppercase;
    letter-spacing: 0.04em;
    display:inline-block;
    padding: 0;
    vertical-align:middle;
    text-decoration:none;
    font-size: 0.8em;
    color: $secondary;
    background-color:inherit;
    text-align:center;
    cursor:pointer;
    white-space:nowrap;
    @include transition-duration(0.4s);

    &:focus {
        outline: none;
    }
    & span,
    & a {
        display:block;
        color: $secondary;
        padding:8px 16px;
        text-decoration: none;
        cursor: pointer;
        @include transition-duration(0.4s);
    }
    &:hover,
    & > a:hover {
        color: $primary-text;
        background-color: $secondary;
    }
}

.button--primary {
    border: 1px solid $primary;
    color: $primary-text;
    padding:0px 9px;
    background-color: $primary;
    margin-bottom: 16px;
    & span,
    & a {
        color: $primary-text;
    }
    &:hover,
    & > a:hover {
        color: $primary-text;
        background-color: $secondary;
    }
}

.button--submit {
    padding:8px 40px;
}

@media only screen and (max-width:768px) {
    .button--submit {
        width: 100%;
    }
}

</style>
