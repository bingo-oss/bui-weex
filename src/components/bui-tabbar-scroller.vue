<template>
    <scroller :show-scrollbar="false" scroll-direction="horizontal" class="tab-bar" :style="{height:(tabStyles().height), width:width}">
        <div class="tab-bar-item" :ref="'tabbar-item'+index" v-for="(item,index) in tabs" :key="index" @click="handleClick($event,item,index)" :style="tabStyles(index)">
            <bui-image v-if="item.pic || item.selectedPic" class="tab-bar-image" :src="index === value ? item.selectedPic || item.pic : item.pic" :width="imageStyles.width" :height="imageStyles.height" :radius="imageStyles.radius" @click="handleClick($event,item,index)"></bui-image>           
            <bui-icon v-else-if="item.icon" :name="item.icon"
                      :color="index === value ? iconStyles().selectedColor : iconStyles().color"
                      @click="handleClick($event,item,index)" :size="iconStyles().size">
            </bui-icon>
            <text class="tab-bar-text" :style="{color : index == value ? tabStyle.selectedColor : tabStyle.color,fontSize:tabStyle.fontSize}">{{item.title}}</text>
        </div>
    </scroller>
</template>
<script>
    const dom = weex.requireModule('dom');
    // 默认配置
    const tableDefaultStyle = {
        width : 150,
        height : 120,
        color : '#999',
        selectedColor : '#54AAFE',
        backgroundColor : '#fff',
        selectedBackgroundColor : '#fff',
        borderBottomColor : '#fff',
        selectedBorderBottomColor : '#54AAFE',
        borderBottomWidth : 3,
        borderStyle : 'solid',
        borderTopWidth : 1,
        borderTopColor : '#ccc',
        selectedBorderTopColor : '#ccc',
        fontSize : 28
    };
    const imageDefaultStyle = {
        width : 50,
        height : 50,
        radius : 0
    }
    const iconDefaultStyle = {
        color : '#9ea7b4',
        selectedColor : '#54AAFE',
        size : 43
    }
    export default {
        props : {
            tabs : {
                type : Array,
                default : ()=>[]
            },
            tabStyle : {
                type : Object,
                default : () => ({

                })
            },
            imageStyle : {
                type : Object,
                default : () => ({
                })
            },
            iconStyle : {
                type : Object,
                default : () => ({

                })
            },
            width : {
                type : [Number,String],
                default : 750
            },
            value : {
                type : Number,
                default : 0
            }

        },
        data (){
            return {
                prevIndex : 0,
            }
        },
        methods : {
            handleClick(e,item,index){
                this.prevIndex = this.value;
                this.to(index);
                this.$emit('change',index);
                this.$emit('input',index);
            },
            to(index){
                const prev = this.prevIndex;
                const currentTabEl = this.$refs[`tabbar-item${index}`][0];
                this.value = index;
                const width = parseInt(this.tabStyles().width);
                const visibleNum = Math.floor(this.width / width);
                const tabsNum = this.tabs.length;
                const computedPage = tabsNum > visibleNum ? 2 : index;
                let offset = index+1 >= visibleNum ? -(this.width - width) / 2 : -width * computedPage;
                if(prev > visibleNum || index > 1) {
                    dom.scrollToElement(currentTabEl, {
                        offset
                    });
                }
                if(index <= 1 && prev > index){
                    dom.scrollToElement(currentTabEl, {
                        offset: -width * index
                    });
                }
            },
            next(){
                let index = this.value;
                if (index < this.tabs.length - 1) {
                    index++;
                }
                this.to(index);
            },
            prev(){
                let index = this.value;
                if (index > 0) {
                    index--;
                }
                this.to(index);
            },
            tabStyles(index){
                let selected = index == this.value;

                this.tabStyle = Object.assign(tableDefaultStyle,this.tabStyle);

                if(this.flexflow){

                }

                let {width,height,selectedBackgroundColor,backgroundColor,borderBottomWidth,borderStyle,selectedBorderBottomColor,borderBottomColor,borderTopWidth,borderTopColor,selectedBorderTopColor} = this.tabStyle;
                return {
                    width:width+'px',
                    height:height+'px',
                    backgroundColor: selected ? selectedBackgroundColor : backgroundColor,
                    borderBottomWidth:borderBottomWidth,
                    borderBottomStyle:borderStyle,
                    borderBottomColor: selected ? selectedBorderBottomColor : borderBottomColor,
                    borderTopWidth : borderTopWidth,
                    borderTopColor : selected ?selectedBorderTopColor :borderTopColor
                }
            },
            // imageStyles(){
            //     this.imageStyle = Object.assign(imageDefaultStyle,this.imageStyle);
            //     let {width,height,radius} = this.imageStyle;
            //     return {
            //         width:width+'px',
            //         height:height+'px',
            //         radius : radius + 'px'
            //     }

            // },
            iconStyles(){
                this.iconStyle = Object.assign(iconDefaultStyle,this.iconStyle);
                let {color,selectedColor,size} = this.iconStyle;
                return {
                    color,
                    selectedColor,
                    size
                }
            },
        },
        watch : {
            value (newVal,oldValue){
                this.prevIndex = oldValue || 0;
                this.to(newVal);
            }
        },
        computed :{
          imageStyles(){
                this.imageStyle = Object.assign(imageDefaultStyle,this.imageStyle);
                let {width,height,radius} = this.imageStyle;
                return {
                    width:width+'px',
                    height:height+'px',
                    radius : radius + 'px'
                }

            },
        }
    }
</script>
<style lang="scss" src="../css/tab-bar.scss"></style>