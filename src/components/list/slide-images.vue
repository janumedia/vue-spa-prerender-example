<template>
    <div class="slide-images">
        <div v-for="(slide, i) in list" :key="i">
            <lazy-image 
                :src="slide.img.indexOf('http') > -1 ? slide.img : slide.img" 
                :title="(slide.name ? slide.name : 'slide')"
                @onLoaded="onImageLoaded"
            />
            <p v-if="slide.name || slide.credit" class="hide">{{ slide.name }}{{ slide.credit ? `${slide.name ? ', ' : ''}credit by ${slide.credit}` : ''}}</p>
            <p v-else-if="list.find(slide =>slide.credit)">&nbsp;</p>
        </div>   
    </div>
</template>
<script>
import {tns} from '../../../node_modules/tiny-slider/src/tiny-slider'
import LazyImage from "@/components/core/LazyImage"
import {registerListener, unRegisterListener, inViewPort} from "@/assets/js/events/events"

const onScroll = () => {
    registeredComponent.map(component => {
        if(component.tinySlider) {
            if(inViewPort(component.$el)) component.tinySlider.play();
            else component.tinySlider.pause();
        }
    })
}

const initScrollListener = (f) => {
    registeredComponent.push(f);
    if(init) return;
    //https://nuxtjs.org/faq/window-document-undefined/
    if(process.browser) {
        registerListener("scroll", onScroll);
        registerListener("resize", onScroll);
        //process next tick if new componend added
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

let init, registeredComponent = [];

export default {
    props: ["list"],
    components: { LazyImage },
    data() {
        return {
            placeHolder: "/images/assets/3x2-placeholder.svg",
            sliding: false,
            tinySlider: null
        }
    },
    methods: {
        onImageLoaded(el) {
            if(inViewPort(el.$el)) this.tinySlider.play();
            else this.tinySlider.pause();
            //show info
            if(el.$el.nextSibling && el.$el.nextSibling.classList) el.$el.nextSibling.classList.remove("hide");
        },
        initSlider() {
            this.tinySlider = tns({
                container: this.$el,//'.slide-images',
                autoplay: true,
                nav: false,
                controls: true,
                arrowKeys: true,
                mouseDrag: true,
                autoplayTimeout: 8000 
            });
            this.tinySlider.events.on('indexChanged', this.slideIndexChange);
            this.tinySlider.pause();
            //load image from first active slide
            const activeSlide = this.tinySlider.getInfo().container.querySelector('.tns-slide-active');
            LazyImage.loadImage(activeSlide.querySelector('img'));
        },
        slideIndexChange(info) {
            const img = info.slideItems[info.index].querySelector('img');
            const src = img.getAttribute('data-src');
            //check if window / tab active / visible
            //console.log(window.document.visibilityState);
            if(src) {
                this.tinySlider.pause();
                LazyImage.loadImage(img);
            } else {
                this.tinySlider.play();
            }
        }
    },
    mounted() {
        //register scroll event
        initScrollListener(this);
        //call initSlider after next tick
        setTimeout(this.initSlider);
    },
    beforeDestroy() {
        if(this.tinySlider) {
            this.tinySlider.events.off('indexChanged', this.slideIndexChange);
            this.tinySlider.destroy();
        }
        dispose(this);
    }
}
</script>
<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.8.6/tiny-slider.css');
@import "@/assets/css/_mixin.scss";

.tns-outer {
    position: relative;
    img {
        width: 100%;
    }
    > button {
        display: none;
    }
    &:hover .tns-controls > button {
        display: inline;
    }
}

.tns-controls  {
    > button {
        font-size: 0;
        line-height: 0;
        display: none;
        position: absolute;
        top: calc(50% - 40px);
        width: 40px;
        height: 40px;
        padding: 0;
        cursor: pointer;
        color: transparent;
        border: none;
        outline: none;
        background-color: rgba(52, 44, 44, 0.4);
        opacity: 0.6;
        z-index: 1;
        @include translate(0, -50%);

        &:hover {
            background-color: rgba(52, 44, 44, 0.6);
        }
    }
    
    > button:first-child {
        left: 0px;
        background-image: url("/images/assets/icon-expand-white.svg");
        background-size: cover;
        @include rotate(90deg);
    }

    > button:nth-child(2){
        right: 0px;
        background-image: url("/images/assets/icon-expand-white.svg");
        background-size: cover;
        @include rotate(-90deg);
    }
}

.slide-images {
    p {
        text-align: left;
        //transition: opacity 0.5s;
        @include transition(opacity 0.5s);
        &.hide {
            opacity: 0;
        }
    }
    img {
        width: 100%;
    }
}

</style>
