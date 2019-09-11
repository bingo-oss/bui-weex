<template>
    <div>
        <bui-header
                title="单选（bui-radio）"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <div style="padding: 10px;flex: 1">
            <scroller>
                <text class="h4">横向单选</text>
                <text class="h4" @click="fn">点击不可选</text>
                <text class="h4" @click="reset">点击多选清空</text>
                <bui-radio v-model="selectedValue1" :items="items1" :disabled="disabled"></bui-radio>
                <text class="h4 mT50">垂直单选(文字右边)</text>
                <bui-radio v-model="selectedValue" :textStyles="textStyles" iconSize="30" fontSize="30" :containerStyle="containerStyle" direction="vertical" selectedColor="#FF943B" @selected="changeValue" :items="items"></bui-radio>
                <text class="h4 mT50">垂直单选(文字左边)</text>
                <bui-radio textDirection="left" direction="vertical" @selected="changeValue" v-model="selectedValue" :items="items"></bui-radio>
                <text class="h4 mT50">单选场景案例</text>
                <text style="text-align: center;background-color: #ff9900;padding: 30px;border-radius: 10px;color: #fff;" @click="open1()">弹出层单选列表</text>
            </scroller>
        </div>
        <bui-popup v-model="showPopup1" height="400">
            <scroller style="padding: 20px;">
                <div style="flex-direction: row;">
                    <text style="flex: 9;font-size:30px;color: #888888">请选择下列选项</text>
                    <text style="margin-bottom: 20px;flex: 1;text-align: right;color: #03A9F4" @click="confirm">确定</text>
                </div>
                <bui-radio textDirection="left" direction="vertical" v-model="selectedValue" :items="items"></bui-radio>
            </scroller>
        </bui-popup>
    </div>
</template>

<style lang="scss" src="src/css/buiweex.scss"></style>
<style scoped>
    .titleEx{
        margin-bottom: 20px;
        background-color: #f8f8f8;
        padding: 8px;
    }
    .mT50{
        margin-top: 50px;
    }
</style>

<script>
    export default {
        data: function () {
            return {
                leftItem: {
                    icon: 'ion-chevron-left'
                },
                showPopup1: false,
                changevalue: '',
                selectedValue:"2",
                selectedValue1:"",
                items:[
                    {value:"1",title:'全部'},
                    {value:"2",title:'选项一sfsdfsdfsdfsdfsdf djsdfsdjfks dj sdfksd fsdjfsdjfksdfksdfk k  dsfsdfk fdskjfsdjfsdf sdf sdfsdfj '},
                    {value:"3",title:'选项二'},
                    {value:"4",title:'选项三'}
                ],
                items1:[
                    {value:"1",title:'全部'},
                    {value:"2",title:'选项一'},
                    {value:"3",title:'选项二'},
                    {value:"4",title:'选项三'}
                ],
                disabled: false
            }
        },
        computed :{
            textStyles(){
                return {
                    marginLeft : '30px'
                }
            },
            containerStyle(){
                return {
                    paddingLeft : '20px',
                    paddingRight : '20px',
                    paddingTop : '30px',
                    paddingBottom : '30px',
                    borderBottomColor : '#f2f2f2',
                    borderBottomWidth : '1px',
                    borderBottomStyle : 'solid',
                }
            },
        },
        methods: {
            back() {
                this.$pop();
            },
            open1() {
                this.showPopup1 = true;
                this.changevalue = this.selectedValue;
            },
            changeValue(value, index){
                // this.$toast(value);
                // this.$toast(index);
                this.selectedValue1 = value;
            },
            confirm(){
                this.$toast(JSON.stringify(this.changevalue));
                this.showPopup1 = false;
            },
            fn(){
                this.disabled = !this.disabled
            },
            reset(){
                this.selectedValue1 = '';
            }
        }
    }
</script>