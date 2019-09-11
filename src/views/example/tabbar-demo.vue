<template>
    <div style="background-color: #00B4FF">
        <bui-header title="选项卡(bui-tabbar)" :leftItem="leftItem" @leftClick="back"></bui-header>

        <bui-tabbar :tabItems="tabItems" showSelectedLine=true @change="onItemChange" v-model="currentTab"></bui-tabbar>
        <slider class="slider" @change="onSliderChange" :index="currentTab" style="background-color: red">
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
        </slider>
        <bui-tabbar :tabItems="tabItems" selectedBackground="#F77845" selectedColor="#ffffff" @change="onItemChange" v-model="currentTab"></bui-tabbar>
    </div>
</template>

<style lang="scss" src="src/css/buiweex.scss"></style>
<style>
    .slider{
        flex:1;
    }
    .slider-item{
        width: 750px;
        justify-content: center;
        align-items: center;
    }
</style>
<script>
    module.exports = {
        data: function () {
            return {
                leftItem: {
                    icon: 'ion-chevron-left'
                },
                currentTab:1,
                tabItems: [
                    {
                        title: "首页",
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
            }
        }
    }
</script>
