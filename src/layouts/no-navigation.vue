<template>
    <div id="app">
        <div class="container">
            <slot/>
        </div>
    </div>
</template>
<style lang="scss" scoped>
#id {
    height: 100vh;
    width: 100hw;
    position: relative;
}
.container {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>

