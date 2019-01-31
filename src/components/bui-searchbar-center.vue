<template>
    <div :class="['flex-row', 'row-center-left', 'bui-searchbar', 'bui-search-bg']" @click="onfocusFn">
        <div :class="['flex-row', 'row-center-left', 'span1', 'bui-input']">
            <div class="flex-row center" :class="[!searchstatus ? 'span1':'']">
                <bui-icon v-if="!deletestatus" name="ion-ios-search-strong" @click="onfocusFn"></bui-icon>
                <text class="bui-search-icon-box-text" v-if="!searchstatus">搜索</text>
            </div>
            <input ref="inputSearch" class="span1 bui-search-input-text" v-if="searchstatus" @focus="onfocus($event)" @return="search" return-key-type="search" @blur="onblur($event)" @input="oninput($event)" v-model="valueNew" :autofocus="autofocusNew" type="text" :placeholder="placeholder"/>
            <bui-icon class="bui-search-icon-delete" @click="onclear($event)" v-if="deletestatus" name='ion-ios-close-outline'></bui-icon>
        </div>
        <text :class="['bui-search-search', 'bui-search-text-color']" @click="search()" v-if="searchstatus">搜索</text>
    </div>
</template>

<style lang="scss" src="../css/layout.scss"></style>
<style lang="scss" src="../css/searchbar.scss"></style>

<script>
    module.exports = {
        props: {
            "placeholder": {
                type: String,
                default: "请输入搜索内容"
            },
            "value": {
                type: String,
                default: ""
            },
            "autofocus": {
                type: Boolean,
                default: false
            }
        },
        data: function () {
            return {
                deletestatus : false,
                searchstatus : false,
                autofocusNew : false,
                valueNew : ''
            }
        },
        methods: {
            //搜索框触发输入焦点
            onfocusFn () {
                this.searchstatus = true;
                this.autofocusNew = true;
            },
            //搜索获得输入焦点
            onfocus(event) {
                this.$emit("focus", event);
            },
            //搜索失去输入焦点
            onblur(event) {
                this.autofocusNew = false;
                this.$emit('blur', event);
            },
            //搜索输入值更改
            oninput(event) {
                this.valueNew = event.value;
                if(this.valueNew.length == 0) this.deletestatus = false;
                else this.deletestatus = true;
                this.$emit('input', event);
            },
            //清除搜索输入值
            onclear(event) {
                this.autofocusNew = false;
                this.deletestatus = false;
                this.valueNew = "";
                this.$emit('clear');
            },
            //搜索
            search() {
                this.$emit("search",this.valueNew);
            },
            //关闭键盘
            hideKeyboard(){
                this.$refs.inputSearch.blur();
            }
        }
    }
</script>