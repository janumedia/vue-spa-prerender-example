<template>
    <div class="input">
        <label>{{ label }}</label>
        <div class="input-container">
            <span class="prefix" v-if="prefix">{{ prefix }}</span>
            <input :type="inputType" :class="prefix ? 'has-prefix' : sufix ? 'has-sufix' : ''" @focus="handleFocus">
            <span class="sufix" v-if="sufix">{{ sufix }}</span>
            <span class="text-error">{{ errorText }}</span>
        </div>
    </div>
</template>
<script>
const TYPE_NUMBER = 'NUMBER';
const TYPE_DATE = 'DATE';
export default {
    props: {
        type: String,
        label: String,
        prefix: String,
        sufix: String,
        value: [Number, String],
        inValid: Function
    },
    data() {
        return {
            errorText: ""
        }
    },
    computed: {
        inputType() {
            const type = this.type.toUpperCase();
            if(type === TYPE_DATE) return 'tel';
            if(type === TYPE_NUMBER) return 'text';
            return this.type;
        },
        inputPattern() {
            const type = this.type.toUpperCase();
            if(type === TYPE_DATE) return '^[0-9\/\\]*$';
            if(type === TYPE_NUMBER) return '^[0-9]*$';
            return '';
        },
        content: {
            get: function() {
                return this.value;
            },
            set: function(newValue) {
                //handled with $emit
            }
        }
    },
    methods: {
        handleFocus(e) {
            console.log(e)
            console.log('focus', e.target);
            e.target.style.opacity = 0.3;
            //this.$el.querySelector('input.has-prefix').style.paddingRight = `${this.$el.querySelector('.prefix').offsetWidth}px`;
        }
    },
    mounted() {
        /*
        var arr = [1,5,2,3,2];
        //console.log(arr[10]);
        var a = arr.find(a => a == 2);
        console.log(a);
        
        const ws = fs.createWriteStream(process.env.OUTPUT_PATH);    

        const i = parseInt(readLine().trim(), 10);

        const res = myFunc(i);

        ws.write(res.join('\n') + '\n');
        ws.end();
        */
       /*
       console.log(Math.pow(50, -0.1));
       var arr = [2, 2, 2]
       var b =  arr.reduce((a, b) => a + b);
       console.log(b);
        var arr2 = [{a:1, b:2}, {a:2, b:4}]
        arr2.map(({a, b}) => {
            console.log(a, b);
        })
        */

       var arr = [
           //{quantity:50, width:2, height:1, product:{area_price:0.8}},
           //{quantity:50, width:1, height:1, product:{area_price:0.8}},
           {quantity:50, width:2, height:1, product:{area_price:0.8}},
           {quantity:100, width:1, height:1, product:{area_price:0.8}},
           {quantity:150, width:3, height:3, product:{area_price:0.8}},
       ];

       //var total = arr.reduce((a, b) => a.quantity + b.quantity);
       var q = arr.map(({quantity}) => quantity);
       var total = q.reduce((a, b) => a + b);
       console.log(total);

       var arr2 = arr.map(({quantity, width, height, product}) => {
           let area = width * height;
           let quantity_adj = Math.pow(quantity, -0.1);
           return area * product.area_price * quantity * quantity_adj;
       })

       var b = arr2.reduce((a, b) => a + b).toFixed(2);
       console.log(b);
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/_color.scss';
@import '@/assets/css/_mixin.scss';
.input, input {
    color: $secondary-text;
}
.input-container {
    position: relative;
}
input, .prefix, .sufix {
    font-size: 1.2em;
    font-weight: bold;
}
.prefix, .sufix {
    position: absolute;
    top: 8px;
}
.sufix {
    right: 0px;
}
input {
    width: 100%;
    height: 40px;
    //margin-bottom: 24px;
    padding: 0.4em 0;
    border: 0;
    border-bottom: 1px solid $border-color;
    background-color: inherit;
    // iOS shadow removed
    -webkit-appearance: none;
    -moz-appearance: none;
    box-shadow: none;
    @include border-radius(0);
    @include transition(0.4s);
    &:focus {
        border-bottom: 2px solid $primary;
    }
    &.has-prefix {
        padding: 0.4em 0 0.4em 15px;
    }
    &.has-sufix {
        padding: 0.4em 20px 0.4em 0;
    }
}
</style>

