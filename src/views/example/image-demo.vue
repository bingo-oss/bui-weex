<template>
    <div>
        <bui-header
                title="图片(bui-image)"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>


        <scroller class="column-center-top">
            <text class="h4">远程图片</text>
            <bui-image width="260px" height="260px" :src="remote_pic"></bui-image>

            <text class="h4">工程目录的图片(固定放在/image/)</text>
            <bui-image src="/image/demo.png" width="260px" height="260px"></bui-image>


            <text class="h4">使用placeholder，加载默认图片</text>
            <bui-image width="260px" placeholder="/image/demo.png" height="260px" @load="onLoad()" :src="remote_no_pic"></bui-image>

            <text class="h4">圆角图片(radius="30px")</text>
            <bui-image width="260px" height="260px" radius="30px" :src="remote_pic"></bui-image>

            <text class="h4">Base64 图片</text>
            <bui-image width="260px" height="260px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAMAAABgOjJdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAO1QTFRFhomSb3J8XGBrdnqDgYWNlJefV1tmfoGKU1diT1NfgISNgoWOYmZwio2Vi4+Wc3eAkJObZGhzUlZiaGt2U1djfYCKZGdyhYiQeHyFio6VgYWOVVllbHB6XWFsY2ZxaWx3jZCYXmFsfYCJcnZ/UVVham54V1tng4aPb3N8WV1pX2JtZWl0YWVvVlpmiYyUWVxohomRd3uEdHiBeX2GZ2t1hIeQVFhkf4OMbnJ8fYGKdnqEb3N9kJScY2dycnaAjpKZdHeBjpKajI+Yc3eBhYiRf4KLXmFtio6Wi4+XjZCZkJSbkZScjI+XlJifTlJe+rAZcwAAAZBJREFUeNp0lOeWgjAQhSdUBQRRbFjX7tpW3XUt23tL3v9xNigJIHh/zRk+5iR3ZgIkULWmwgv+A7VWDWWBR/nSt2gLUzIVbLH1lo8RRW1wEfqxPtCKUaKTMUhURuUhTIi6Q07l6LuAEFdpEld6tWNEx00CKKJ3jsR1xSHJcj4bB+LmkpxT49Yj8mqQUVBBciUk8ITepESJ+5AqY1+uwny5IjDPcADoN0BIwjLOsjKZOewtbi/9fvi338a44CetIai2H/cokPLj9tfEj2wVzD4rIWMlfpu+CXc5Pw4qh5X7AUw4gZIswUENGT8lAN1fMBVeAxIIxYR3Nin0imOe52emdxkyP8aY+0S9Y2d63cNoxvACRTaeI70slst+cjYCAnXmuuS1RKKmy1hKBX0hzaC3KOsxsmz2Ir2NzMcEbVCo+cf5oDOWOzNAucpxxoglnZlT1+KzXk4kymKwL4ttN+73dhHeuWV85zLL073Vw3v7MdDuE3a/JRrCmqwFQ2yV8gmvg/d+aPCMH0GLvB//AgwAo1MTpxsaxVoAAAAASUVORK5CYII=" />
        </scroller>
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
                remote_pic:"https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg",
                remote_no_pic:"https://img.alicdn.com/tps/picture.jpg"
            }
        },
        methods: {
            back () {
                this.$pop()
            },
            onLoad(e) {
                this.$toast("image load finished.");
            }
        }
    }
</script>