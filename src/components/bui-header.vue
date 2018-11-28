<template>
    <div :style="{'background-color':backgroundColor}">

        <div :style="{'height': fixedHeight}" v-if="iosFixed"></div>

        <div class="bui-header" :style="{'height':height}">
            <div class="bui-header-left" :style="{'height':height}">
                <div v-if="leftItem" @click="_leftClick($event)" class="flex-row column-center-top hot" :style="{'height': height}">
                    <bui-icon @click="_leftClick($event)" :activeColor="activeColor"
                              v-if="leftItem.icon||leftItem.icons" :name="leftItem.icon||leftItem.icons" :size="iconSize"
                              :color="iconColor"></bui-icon>
                    <text @click="_leftClick($event)" :style="{'color':textColor,'color:active':activeColor,'margin-left':'10px'}" v-if="leftItem.text"
                          class="bui-header-text">{{leftItem.text}}</text>
                </div>
                <slot name="left"></slot>
            </div>

            <div class="bui-header-main">
                <div :style="{width:maxTitleWidth}" v-if="title!==''">
                    <text class="bui-header-title" :style="{'color':textColor}" @click="_centerClick($event)">{{title}}</text>
                </div>
                <slot name="center"></slot>
            </div>

            <div class="bui-header-right" :style="{'height':height}">
                <div v-if="rightItem" @click="_rightClick($event)" class="flex-row column-center-top hot" :style="{'height': height}">
                    <bui-icon @click="_rightClick($event)" :activeColor="activeColor" v-if="rightItem.icon||rightItem.icons"
                              :name="rightItem.icon||rightItem.icons" :size="iconSize" :color="iconColor"></bui-icon>
                    <text @click="_rightClick($event)" :style="{'color':textColor,'color:active':activeColor,'margin-left':'10px'}"
                          v-if="rightItem.text" class="bui-header-text">{{rightItem.text}}</text>
                </div>
                <slot name="right"></slot>
            </div>

        </div>
    </div>
</template>
<style lang="scss" src="../css/header.scss"></style>
<style lang="scss" src="../css/layout.scss"></style>

<script>
    var defaultItem = {
        icon: '',
        icons: '',
        text: ''
    };
    import util from "src/js/util";
    var platform = weex.config.env.platform.toLowerCase();
    module.exports = {
        data(){
            return{
                activeColor:"#b9c2cf"
            }
        },
        props: {
            title: {
                type: String,
                default: ""
            },
            leftItem: {
                type: Object,
                default: defaultItem
            },
            rightItem: {
                type: Object,
                default: defaultItem
            },
            textColor: {
                type: String,
                default: "#ffffff"
            },
            iconColor: {
                type: String,
                default: "#ffffff"
            },
            iconSize: {
                type: String,
                default: "48px"
            },
            backgroundColor: {
                type: String,
                default: "#4ca4fe"
            },
            height: {
                type: String,
                default: "44wx"
            },
            maxTitleWidth: {
                type: String,
                default: "400px"
            }
        },
        computed: {
            iosFixed () {
                return platform === "ios";
            },
            fixedHeight() {
                return this.iosFixed && util.isIPhoneX() ? "44wx" : "20wx"
            }
        },
        methods: {
            _leftClick (e) {
                this.$emit('leftClick', e);
            },
            _rightClick (e) {
                this.$emit('rightClick', e);
            },
            _centerClick (e) {
                this.$emit('centerClick', e);
            }
        }
    }
</script>