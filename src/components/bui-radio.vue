<template>
    <div :class="[changeDirection,'flex-fluid']">
        <bui-option-list v-for="(item, index) in newItems"
                            v-bind="Object.assign({}, customStyles, item)"
                            :style="Object.assign({}, cWrapperStyle, containerStyle)"
                            :key="index"
                            :index="index"
                            @select="select(index)"></bui-option-list>

    </div>
</template>

<script>
    import buiOptionlist from './bui-option-list.vue';
    module.exports = {
        components: { 'bui-option-list' : buiOptionlist },
        props: {
            "items": {
                type: Array
            },
            // 是否可选
            "disabled": {
                type: Boolean,
                default: false
            },
            "value": {
                type: Array
            },
            "direction": {
                type: String,
                default: 'horizontal' // horizontal | vertical
            },
            "containerStyle": {
                type: Object
            },
            "textStyles": {
                type: Object
            },
            "textDirection": {
                type: String,
                default: "right"
            },
            "fontSize": {
                type: String,
                default: '30px'
            },
            "iconSize": {
                type: String,
                default: '48px'
            },
            // 正常状态文字色值
            "color": {
                type: String,
                default: '#9ea7b4'
            },
            // 选中状态文字色值
            "selectedColor": {
                type: String,
                default: '#00cc66'
            },
            "selectIcon": {
                type: String,
                default:"ion-android-radio-button-on"
            },
            "unSelectedIcon": {
                type: String,
                default:"ion-android-radio-button-off"
            },
        },
        data () {
            return {
                newItems: this.initList()
            }
        },
        watch: {
            value (){
                this.newItems = this.initList();
            }
        },
        computed: {
            customStyles(){
                return {
                    "textDirection": this.textDirection,
                    "direction": this.direction,
                    "fontSize": this.fontSize,
                    "iconSize": this.iconSize,
                    "color": this.color,
                    "selectedColor": this.selectedColor,
                    "selectIcon": this.selectIcon,
                    "unSelectedIcon": this.unSelectedIcon,
                    "textStyles": this.textStyles,
                    "leftColumn": this.leftColumn,
                }
            },
            cWrapperStyle () {
                const { disabled } = this;
                return {
                    opacity: disabled ? 0.5 : 1,
                    paddingTop : '15px',
                    paddingBottom : '15px',
                }
            },
            changeDirection(){
                return this.direction=="horizontal"? "flex-row":"flex-column";
            },
            leftColumn(){
                return this.direction=="horizontal" ? false : true
            }

        },
        created () {
        },
        methods: {
            //数据赋值
            initList () {

                const newItems = this.items.map((item, i) => {
                    let { disabled } = item;
                    disabled = !!disabled;
                    // disabled为true时认为selected无效，同时单选模式下只认为第一个selected为true的为有效值
                    // selected = !disabled && !!selected && (!single || selectedCount === 0);
                    if (this.value == item.value){
                        Vue.set(item,'selected',true);
                    }else{
                        Vue.set(item,'selected',false);
                    }
                    return item;
                });
                return newItems;
            },
            //点击筛选操作
            select(index){
                if(this.disabled) return;
                this.updateList(index);
                this.$emit('selected', this.value, this.newItems.filter(item => item.selected));
                this.$emit('input', this.value, this.newItems.filter(item => item.selected));
                this.$emit("change", this.value, this.newItems.filter(item => item.selected));
            },
            //筛选时数据渲染
            updateList(index){
                this.newItems = this.newItems.map((item, i) => {
                    item.selected = index === i;
                    this.value = this.newItems[index].value;
                    return item;
                });
            }
        }
    }
</script>

<style lang="scss" src="../css/radio.scss"/>