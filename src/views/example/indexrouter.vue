<template>
    <div class="flex-column">
        <bui-header title="路由(router)" :leftItem="leftItem" @leftClick="back"></bui-header>
        <div class="panel">
            <!--<text class='link' :style="{'color:active': 'black'}" @click='linkTo("/")'>tab1</text>-->
            <text class='link' :style="{'color:active': 'black'}" @click='linkTo("/")'>tab1</text>
            <text class='link' :style="{'color:active': 'black'}" @click='linkTo(`/test1/${id}`)'>tab2</text>
            <text class='link' :style="{'color:active': 'black'}" @click='linkTo("/test2")'>tab3</text>
        </div>
        <div class="span1" style="height: 750px;">
            <router-view></router-view>
        </div>



    </div>
</template>

<style lang="scss" src="src/css/buiweex.scss"></style>
<style scoped>
    .panel {
        flex-direction: row;
        height: 100px;
        border-bottom-width: 1px;
        border-color: #eeeeee;
        justify-content: space-between;
    }
    .link{
        line-height: 100px;
        text-align: center;
        flex: 1;
        color: #00B4FF;
    }
</style>

<script>
    const globalEvent = weex.requireModule('globalEvent');
    module.exports = {
        data: function () {
            return {
                leftItem: {
                    icon: 'ion-chevron-left'
                },
                id: "buiweex"
            }
        },
        methods: {
            back() {
                this.$pop();
            },
            linkTo(path){
                //点击后改变路由
                this.$router.push({
                    path: path
                });
            }

        },
        components: {
        },
        watch: {
            $route(to,from){
                this.$alert(to.path);
            }
        },
        mounted: function () {
            this.$alert(this.$route);
            globalEvent.addEventListener("androidback",(e)=> {
                this.$pop();
            });
        }
    }
</script>
