<template>
    <label class="switch">
        <input type="checkbox" @change="handleChange">
        <span class="slider"></span>
        <div class="switch-label">
            <span>on</span>
            <span>off</span>
        </div>
    </label>
</template>
<script>
export default {
    methods: {
        handleChange(e) {
            this.$emit('input', e.target.checked);
            this.$emit('change', this);
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/_color.scss";
@import "@/assets/css/_mixin.scss";
.switch {
    position: relative;
    display: inline-block;
    height: 30px;
    color: $secondary-text;
    border: 1px solid $border-color;
}

.switch input {display:none;}

.switch-label {
    position: relative;
    top: 0;
    text-align: center;
    cursor: pointer;
    span {
        display: inline-block;
        width: 70px;
        padding: 4px;
    }
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    @include transition(0.4s);
}

.slider:before {
    position: absolute;
    content: "";
    width: 70px;
    left: 0;
    bottom: 0;
    top: 0;
    background-color: $secondary;
    border: none;
    @include transition(0.4s);
}

input:focus + .slider {
    box-shadow: 0 0 1px $border-color;
}

input:checked + .slider:before {
    @include translateX(70px);
}

input ~ .switch-label > span:first-child {
    color: $primary-text;
}

input:checked ~ .switch-label {
    > span:first-child {
         color: inherit;
    }
    > span:last-child {
        color: $primary-text;
    }
}

</style>