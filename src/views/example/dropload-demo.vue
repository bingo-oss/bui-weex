<template>
    <div>
        <bui-header title="弹出框(bui-dropload)"
                    :leftItem="leftItem"
                    @leftClick="back"></bui-header>

        <bui-dropload :droploadStyle="droploadStyle"
                      :refreshStyle="refreshStyle"
                      :refreshTextStyle="refreshTextStyle"
                      :refreshTextMap="refreshTextMap"
                      :refreshIconStyle="refreshIconStyle"
                      :loadingStyle="loadingStyle"
                      :loadingTextStyle="loadingTextStyle"
                      :loadingIconStyle="loadingIconStyle"
                      :loadingTextMap="loadingTextMap"
                      @loading="loading"
                      @refresh="refresh">
            <cell v-for="(item,index) in list">
                <bui-cell :key="index" :title="item"></bui-cell>
            </cell>
        </bui-dropload>
    </div>
</template>

<style lang="scss" src="src/css/buiweex.scss"></style>

<script>
    export default {
        data () {
            return {
                leftItem: {
                    icon: 'ion-chevron-left'
                },
                list: [],
                total: 0,
                droploadStyle: {
                    backgroundColor: '#fff'
                },
                refreshStyle: {
                    backgroundColor: '#ccc'
                },
                refreshTextMap: {
                    start: '准备下拉',
                    move: '可以释放啦',
                    success: '刷新完成',
                    fail: '刷新失败啦'
                },
                refreshStyle: {
                    backgroundColor: '#fff'
                },
                refreshTextStyle: {
                    color: 'orange',
                },
                refreshIconStyle: {
                    color: 'orange',
                },
                loadingStyle: {
                    backgroundColor: '#fff'
                },
                loadingTextStyle: {
                    color: 'orange',
                },
                loadingIconStyle: {
                    color: 'orange',
                },
                loadingTextMap: {
                    start: '向上拉加载更多',
                    success: '加载完成',
                    empty: '没有更多了',
                    fail: '加载失败，请重试'
                },
            }
        },
        methods: {
            back() {
                this.$pop();
            },
            createData(text, number) {
                let arr = [];
                for (let i = 1; i <= 10; i++) {
                    let item = text + (i + this.total);
                    arr.push(item);
                }
                return arr;
            },
            loading(next) {
                this.total += 10;
                setTimeout(() => {
                    this.list = this.list.concat(this.createData('加载数据', 10));
                    next && next();
                }, 200)
            },
            refresh(next) {
                this.total = 0;
                setTimeout(() => {
                    this.list = this.createData('刷新数据', 10)
                    next && next();
                }, 200)

            },
        },
        created() {
            this.list = this.createData('测试数据', 10)
        },
    }
</script>