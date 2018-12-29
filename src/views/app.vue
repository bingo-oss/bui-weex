<template>
    <div class="center">
        <bui-image src="/image/logo.png" width="150px" height="150px"></bui-image>
        <text class="h2">BUI-Weex</text>
        <text class="h4">专注为Weex前端开发者提供高质量UI组件</text>
        <text @click="createG()">{{userIds}}</text>
        <bui-button @click="open()" style="margin-top: 30px" type="primary" :value="'选择'"></bui-button>
        <!--<bui-button style="margin-top: 30px" type="primary" value="快速体验" @click="jumpTo"></bui-button>-->
    </div>
</template>

<style lang="scss" src="src/css/buiweex.scss"></style>

<script>
    const storage = weex.requireModule('storage');
    const globalEvent = weex.requireModule('globalEvent');
    import linkapi from "linkapi";
    import util from "src/js/util";
    module.exports = {
        data () {
            return {
                size: 60,
                userIds: ["928f5c8c-2de1-4301-b051-fa0ea61aaf86", "8198cee0-b8e2-4c28-aae8-00ac1c022749", "0d441c9b-0885-4c42-8e4b-fddcd7579f2b"],
                groupId: ""
            }
        },
        methods:{
            jumpTo () {
                var url = "index.js";
                this.$push(url);
            },
            createG (){

                linkapi.createGroup({
                    userIds: this.userIds
                }, (res)=>{
                    this.$alert("成功");
                    this.groupId = res.groupId;
                    storage.setItem("groupId", this.groupId);
                    // this.register();
                    linkapi.execSyncService(1, (resp)=>{
                        this.$alert("同步成功");
                        this.$alert(resp);
                    });

                }, (error)=>{
                    this.$alert("失败");
                    this.$alert(error);
                });
            },
            register(){
                this.$alert(this.groupId);
                if(this.groupId != "")
                linkapi.registerReceiver(2, this.groupId);
                linkapi.getMsgCmd( this.groupId, (res, msg)=>{
                        this.$alert("进来");
                        this.$alert(res);
                        this.$alert(msg);
                });
            },
            open(){

                // linkapi.selectFiles(4, (res)=>{
                //     this.$alert(11);
                //     this.$alert(res);
                // },(error)=>{
                //     this.$alert("失败");
                //     this.$alert(error);
                // })



                linkapi.runApp({
                    appCode: "activity",
                    appUrl: "activity-detail.weex.js",
                    data: {
                        actId: "111111"
                    }
                },(res)=>{
                    this.$alert(res);
                },(error)=>{
                    this.$alert(error);
                })




                // this.register();
                //
                // linkapi.startGroupCard(this.groupId, (res)=>{
                //     this.$alert("打开群组聊天");
                //     this.$alert(res);
                // }, (error)=>{
                //     this.$alert("失败不打开");
                //     this.$alert(error);
                // })

            }


        },
        mounted () {
            linkapi.getServerConfigs((res)=>{
                this.$alert(res);
            });




            storage.getItem("groupId", e=>{
                if(e.data !== 'undefined'){
                    this.groupId = e.data;
                }
            });
            this.$alert(WXEnvironment.deviceModel);

            globalEvent.addEventListener("androidback", (e)=> {
                this.$pop();
            });
        }
    }
</script>