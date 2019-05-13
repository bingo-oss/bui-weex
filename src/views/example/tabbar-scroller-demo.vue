<template>
    <div>
        <bui-header title="选项卡(bui-tabbar-scroller)" :leftItem="leftItem" @leftClick="back"></bui-header>

        <bui-tabbar-scroller :tabs="tabItems" selectedBackground="#F77845" selectedColor="#ffffff" @change="onItemChange" v-model="currentTab"></bui-tabbar-scroller>
        <slider class="slider" @change="onSliderChange" :index="currentTab">
            <div class="slider-item">
                <text class="h1">tab0</text>
            </div>
            <div class="slider-item">
                <text class="h1">tab1</text>
            </div>
            <div class="slider-item">
                <text class="h1">tab2</text>
            </div>
            <div class="slider-item">
                <text class="h1">tab3</text>
            </div>
            <div class="slider-item">
                <text class="h1">tab3</text>
            </div>
            <div class="slider-item">
                <text class="h1">tab3</text>
            </div>
        </slider>
    </div>
</template>

<style lang="scss" src="src/css/buiweex.scss"></style>
<style>
    .slider{
        flex:1;
    }
    .slider-item{
        width: 750px;
        /*justify-content: center;*/
        align-items: center;
    }
    .type-info_column{
        /*position: relative;*/
        width : 100px;
        height: 100px;
        margin-right: 24px;
        background-color: #f1f1f1;



    }
    .type-info_ratio{
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100px;
        height : 2px;
        background-color: #0088fb;
    }
</style>
<script>
    const animation = weex.requireModule('animation');
    module.exports = {
        data: function () {
            return {
                leftItem: {
                    icon: 'ion-chevron-left'
                },
                currentTab:1,
                tabStyle: {
                    // backgroundColor: "#000"
                },
                tabItems: [
                    {
                        title: "首页1",
                        icon: "ion-home"
                    },
                    {
                        icon: "ion-planet",
                        title: "探索"
                    },
                    {
                        icon: "ion-ios-cart",
                        title: "商城"
                    },
                    {
                        icon: "ion-ribbon-a",
                        title: "奖励"
                    },
                    {
                        icon: "ion-ribbon-a",
                        title: "奖励"
                    },
                    {
                        icon: "ion-ribbon-a",
                        title: "奖励"
                    }
                ]
            }
        },
        methods: {
            back() {
                this.$pop();
            },
            onItemChange(index){
            },
            onSliderChange(e){
                var index = e.index;
                this.currentTab=index;
            },

        },
        mounted: function(){
            animation.transition(el, {
                styles: {
                    transform: translate,
                    transformOrigin: 'center center'
                },
                duration: 200,
                timingFunction: "ease-in",
                delay: 0
            }, () => {
                fn && fn();
            })
        }
    }
</script>
