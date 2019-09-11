<template>
    <div>
        <bui-header
                title="弹出层(bui-popup)"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <div class="center" style="padding:10px;">
            <bui-button class="ex-btn" type="warning" value="下面弹出" @click="open1()"></bui-button>
            <bui-button class="ex-btn" type="warning" value="上面弹出" @click="open2()"></bui-button>
            <bui-button class="ex-btn" type="warning" value="左边弹出" @click="open3()"></bui-button>
            <bui-button class="ex-btn" type="warning" value="右边弹出" @click="open4()"></bui-button>
            <bui-button class="ex-btn" type="warning" value="手动关闭" @click="open5()"></bui-button>
        </div>

        <bui-popup v-model="showPopup1" height="300">
            <text class="h4">下方弹出内容</text>
        </bui-popup>

        <bui-popup v-model="showPopup2" pos="top" backgroundColor="#ff9900" height="600">
            <text class="h4">上面弹出内容</text>
        </bui-popup>

        <bui-popup v-model="showPopup3" pos="left" backgroundColor="#ff4e24" width="300">
            <text class="h4">左边弹出内容</text>
        </bui-popup>

        <bui-popup v-model="showPopup4" pos="right" width="300">
            <text class="h4">右边弹出内容</text>
        </bui-popup>

        <bui-popup v-model="showPopup5" pos="right" width="300" ref="popup5" :autoHide="false" >
            <text class="h4" @click="closeMe">点我关闭</text>
        </bui-popup>
    </div>

</template>

<style lang="scss" src="src/css/buiweex.scss"></style>

<style>
    .ex-btn {
        margin-bottom: 20px;
    }
</style>

<script>
    export default {
        data: function () {
            return {
                leftItem: {
                    icon: 'ion-ios-arrow-back'
                },
                showPopup1: false,
                showPopup2: false,
                showPopup3: false,
                showPopup4: false,
                showPopup5: false
            }
        },
        methods: {
            back() {
                this.$pop();
            },
            open1() {
                this.showPopup1 = true;
            },
            open2() {
                this.showPopup2 = true;
            },
            open3() {
                this.showPopup3 = true;
            },
            open4() {
                this.showPopup4 = true;
            },
            open5() {
                this.showPopup5 = true;
            },
            closeMe() {
                // 手动关闭需要调用close才有动画效果
                this.$refs['popup5'].hide(()=>{
                    this.showPopup5 = false;
                });
            }
        }
    }
</script>