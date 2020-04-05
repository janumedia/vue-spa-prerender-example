<template>
    <div :class="className">
        <div>
            <img :src="placeHolder" :data-src="src" :alt="title" data-pin-nopin="true">
        </div>
    </div>
</template>
<script>
import {registerListener, unRegisterListener, inViewPort, onCSSTransitionEnd} from "@/assets/js/events/events"
import Vue from 'vue';

const loadImage = (img, index) => {
    
    if(!inViewPort(img, 50)) return;
    
    const src = img.getAttribute("data-src");
    const placeHolder = img.getAttribute("src");
    const parentElementStyle = img.parentElement.style;
    parentElementStyle.backgroundImage = `url(${placeHolder})`;
    parentElementStyle.backgroundRepeat = "no-repeat";
    parentElementStyle.backgroundSize = "cover";
    parentElementStyle.backgroundPosition = "center";
    
    img.onload = () => {
        if(img.src == src) {
            onCSSTransitionEnd(img, () => {
                parentElementStyle.backgroundImage = `url(${img.src})`;//"";
                img.className = "done";
                if(components) components.map(component => {
                    const nextImg = component.$el.querySelector('img[data-src]');
                    //load others with the same image src
                    if(nextImg) nextImg.src = src;
                    component.imageLoaded(index);
                });
            });
            img.onCSS;
            img.className = "image-loaded";
        }
    }
    img.onerror = () => {
        if(components) components.map(component => component.imageError(index));
        img.src = placeHolder;//parentElementStyle.backgroundImage.replace(/(url\(|\)|")/g, '');
    }
    img.className = "image-loading";
    img.removeAttribute("data-src");

    const components = registeredComponent.filter(item => item.src == src);
    if(components) components.map(component => component.imageReady(index));

    img.src = src;
}

const onScroll = () => {
    images = document.querySelectorAll(`.${className} img[data-src]`);
    [].slice.call(images).map((img, index) => {
        if (img.complete) loadImage(img, index);
        else {
            Vue.nextTick(() => img.onload = () => loadImage(img, index))
        }
    });
}

const initScrollListener = (f) => {
    registeredComponent.push(f);
    if(init) return;
    //https://nuxtjs.org/faq/window-document-undefined/
    if(process.browser) {
        registerListener("scroll", onScroll);
        registerListener("resize", onScroll);
        //some delay in case new components added
        setTimeout(onScroll);
    }
    init = true;
}

const dispose = (f) => {
    let index = registeredComponent.indexOf(f);
    if(index > -1) registeredComponent.splice(index, 1);
    if(registeredComponent.length <= 0) {
        unRegisterListener("scroll", onScroll);
        unRegisterListener("resize", onScroll);
        init = false;
    }
}

let images, className = "lazy-image", init = false, registeredComponent = [];

export default {
    props:{
        src:{
            type: String,
            require: true
        },
        title: {
            type:String
        }, 
        square: {
            type: Boolean
        }
    },
    data() {
        return { 
            className
        }
    },
    className,
    loadImage,
    computed: {
        placeHolder() {
            return `/images/assets/${this.square ? "2x2" : "3x2"}-placeholder.svg`
        }
    },
    methods: {
        imageReady(index) {
            this.$emit('onReady', this, index);
        },
        imageLoaded(index) {
            this.$emit('onLoaded', this, index);
            dispose(this);
        },
        imageError(index) {
            this.$emit('onError', this, index);
            dispose(this);
        }
    },
    beforeCreate() {
        initScrollListener(this);
    },
    beforeDestroy() {
        dispose(this);
    },
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/_mixin.scss";
.lazy-image {
    > div {
        padding: 0 !important;
        margin: 0 !important;
    }
}
img {
    width: 100%;
    opacity: 1;
    display: block;
    @include transition(opacity 0.4s);
    &.image-loading {
        opacity: 0;
        visibility: hidden;
    }
    /*&.done {
        visibility: hidden;
    }*/
}
</style>

