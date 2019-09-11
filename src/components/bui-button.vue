<template>
    <div class="btn-block"
         :style="exBtnStyle"
         @longpress="_longPress"
         @click="_click">
        <slot></slot>
        <text class="btn-text" :style="exTextStyle" v-if="value!=''">{{value}}</text>

    </div>
</template>

<style>

    .btn-block {
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        flex-direction: row;
    }

    .btn-text {
        text-overflow: ellipsis;
        lines: 1;
        color: #FFFFFF;
    }
</style>

<script>
    const STYLE_MAP = {
        default: {
            backgroundColor: '#FFFFFF',
            borderColor: '#A5A5A5',
            borderWidth: '1px'
        },
        text:{
            borderWidth:'0px'
        },
        highlight: {
            backgroundColor: '#FFFFFF',
            borderColor: '#EE9900',
            borderWidth: '1px'
        },
        primary: {
            backgroundColor: '#3399ff',
            borderColor: '#3399ff',
            borderWidth: '1px'
        },
        success: {
            backgroundColor: '#00cc66',
            borderColor: '#00cc66',
            borderWidth: '1px'
        },
        warning: {
            backgroundColor: '#ff9900',
            borderColor: '#ff9900',
            borderWidth: '1px'
        },
        danger: {
            backgroundColor: '#ff4e24',
            borderColor: '#ff4e24',
            borderWidth: '1px'
        }
    };

    const TEXT_STYLE_MAP = {
        default: {
            color: '#657180'
        },
        text:{
            color: '#657180'
        },
        highlight: {
            color: '#EE9900'
        },
        primary: {
            color: '#ffffff'
        },
        success: {
            color: '#ffffff'
        },
        warning: {
            color: '#ffffff'
        },
        danger: {
            color: '#ffffff'
        }
    };

    const BTN_SIZE_MAP = {
        small: {
            "width": "200px",
            "height": "60px",
            "padding-left": "10px",
            "padding-right": "10px",
        },
        large:{
            "width": "500px",
            "height": "100px",
            "padding-left": "25px",
            "padding-right": "25px",
        },
        default: {
            "width": "300px",
            "height": "88px",
            "padding-left": "25px",
            "padding-right": "25px"
        }
    };
    const TEXT_SIZE_MAP = {
        small: {
            "font-size": "30px"
        },
        large:{
            "font-size": "45px"
        },
        default: {
            "font-size": "36px"
        }
    };

    module.exports = {
        props: {
            size: {
                type: String,
                default: "default"
            },
            value: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'default'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            btnStyle: Object,
            textStyle: Object
        },
        computed: {
            exBtnStyle () {
                const {type, disabled, btnStyle, size} = this;

                const exBtnStyle = Object.assign(STYLE_MAP[type], BTN_SIZE_MAP[size], btnStyle);
                return disabled ? Object.assign({}, exBtnStyle, {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 0
                }) : exBtnStyle;
            },
            exTextStyle () {
                const {type, disabled, textStyle, size} = this;
                const exTextStyle = Object.assign(TEXT_STYLE_MAP[type], TEXT_SIZE_MAP[size], textStyle);
                return disabled ? Object.assign({}, exTextStyle, {color: '#ffffff'}) : exTextStyle;
            }
        },
        methods: {
            _click (e) {
                if (!this.disabled) this.$emit('click', e)
            },
            _longPress(e){
                if (!this.disabled) this.$emit('longpress', e)
            }
        }
    }
</script>

