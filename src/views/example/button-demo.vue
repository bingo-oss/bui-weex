<template>
    <div>
        <bui-header
                title="按钮（bui-button）"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <scroller>

            <div class="flex-column" style="margin-left: 20px;margin-right: 20px;">

                <div class="flex-row">
                    <bui-button class="ex-btn" size="small" value="Smalll Button" @click="btnEvent"></bui-button>
                </div>

                <div class="flex-row">
                    <bui-button class="ex-btn" size="large" value="Large Button" @click="btnEvent"></bui-button>
                </div>

                <div class="flex-row">
                    <bui-button class="ex-btn" value="Normal" @click="btnEvent"></bui-button>
                </div>

                <div class="flex-row">
                    <bui-button class="ex-btn" type="primary" value="Primary" @click="btnEvent"></bui-button>
                </div>

                <div class="flex-row">
                    <bui-button class="ex-btn" type="success" value="Success" @click="btnEvent"></bui-button>
                </div>

                <div class="flex-row">
                    <bui-button class="ex-btn" type="warning" value="Warning" @click="btnEvent"></bui-button>
                </div>

                <div class="flex-row">
                    <bui-button class="ex-btn" type="danger" value="Danger" @click="btnEvent"></bui-button>
                </div>

                <div class="flex-row">
                    <bui-button class="ex-btn" type="danger" disabled=true value="Disabled" @click="btnEvent"></bui-button>
                </div>

                <div class="flex-row">
                    <bui-button class="ex-btn" type="text" value="Text Button" @click="btnEvent"></bui-button>
                </div>

                <div class="flex-row">
                    <bui-button class="ex-btn" value="Button" type="highlight" @click="btnEvent">
                        <bui-icon style="margin-right: 10px;" name="ion-checkmark-circled" color="#EE9900"></bui-icon>
                    </bui-button>
                </div>

                <div class="flex-row">
                    <bui-button class="ex-btn" value="自定义样式1" type="highlight" :btnStyle="btnStyle"  @click="btnEvent"></bui-button>
                </div>

                <div class="flex-row">
                    <bui-button class="ex-btn" value="自定义样式2" type="highlight" :btnStyle="btnStyle1"  @click="btnEvent"></bui-button>
                </div>

            </div>

        </scroller>
    </div>
</template>

<style lang="scss" src="src/css/buiweex.scss"></style>

<style>
    .ex-btn {
        margin-top: 20px;
    }
</style>

<script>
    export default {
        data: function () {
            return {
                leftItem: {
                    icon: 'ion-chevron-left'
                },
                btnStyle:{
                    "width": "300px",
                    "backgroundColor": '#f3f2f23',
                    'backgroundColor:active': '#f6f2f23'
                },
                btnStyle1: {
                    "flex": 1,
                    "backgroundColor": '#f2f2f2',
                    'backgroundColor:active': '#cccccc'
                }
            }
        },
        methods: {
            back() {
                this.$pop();
            },
            btnEvent(e) {
                this.$toast("button click");
            }
        }
    }
</script>