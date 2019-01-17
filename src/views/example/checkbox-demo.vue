<template>
    <div>
        <bui-header
                title="多选（bui-checkbox）"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <div style="padding: 10px;flex: 1">
            <scroller>
                <text class="h4">横向多选</text>
                <text class="h4" @click="fn">点击不可选</text>
                <text class="h4" @click="valueFn">点击多选清空</text>
                <bui-checkbox v-model="obj.selectedValue1" :items="items1" :disabled="disabled"></bui-checkbox>
                <text class="h4 mT50">垂直多选(右边文字)</text>
                <bui-checkbox v-model="selectedValue" direction="vertical" :items="items"></bui-checkbox>
                <text class="h4 mT50">垂直多选(左边文字)</text>
                <bui-checkbox textDirection="left"
                              :textStyles="textStyles"
                              iconSize="30"
                              fontSize="30"
                              :containerStyle="containerStyle"
                              direction="vertical"
                              selectedColor="#FF943B"
                              v-model="selectedValue"
                              @selected="selected"
                              :items="items"></bui-checkbox>
                <text class="h4 mT50">多选场景案例</text>
                <text style="text-align: center;background-color: #ff9900;padding: 30px;border-radius: 10px;color: #fff;" @click="open1()">弹出层多选列表</text>
            </scroller>
        </div>
        <bui-popup v-model="showPopup1" height="400">
            <scroller style="padding: 20px;">
                <div style="flex-direction: row;">
                    <text style="flex: 9;font-size:30px;color: #888888">请选择下列选项</text>
                    <text style="margin-bottom: 20px;flex: 1;text-align: right;color: #03A9F4" @click="confirm">确定</text>
                </div>
                <bui-checkbox textDirection="left" direction="vertical" v-model="selectedValue" @change="changeValue" :items="items"></bui-checkbox>
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
                itemsss: '',
                changevalue: '',
                selectedValue:["1","2"],
                selectedValue1:["2"],
                items:[
                    {value:"1",title:'全部'},
                    {value:"2",title:'选项一afdf sdfd'},
                    {value:"3",title:'选项二sfdsf'},
                    {value:"4",title:'选项三 fdsf'}
                ],
                items1:[
                    {value:"1",title:'全部'},
                    {value:"2",title:'选项一afdf sdfd dfsdfksjf dsfsdfksjdfksdfjsjdfskdfksdkfsdfj sdjfsdjfjsdkj '},
                    {value:"3",title:'选项二sfdsf'},
                    {value:"4",title:'选项三 fdsf'}
                ],
                disabled: false,
                obj: {
                    "selectedValue1": ["2"]
                }
            }
        },
        computed:{
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
            valueFn(){
                this.obj.selectedValue1 = [];
            },
            fn(){
                this.disabled = !this.disabled
            },
            back() {
                this.$pop();
            },
            open1() {
                this.showPopup1 = true;
                this.changevalue = this.selectedValue;
            },
            changeValue(value, item){
                this.changevalue = value;
                this.$toast(JSON.stringify(item));
                setTimeout(()=>{
                    this.$toast(JSON.stringify(value));
                },1000)

            },
            confirm(){
                this.$toast(JSON.stringify(this.changevalue));
                this.showPopup1 = false;
            },
            selected(value, index){
                // this.itemsss = value;
                // this.$toast(JSON.stringify(value));
                // this.$toast(JSON.stringify(index));
            }
        }
    }
</script>