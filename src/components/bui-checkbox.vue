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
                type: Array,
                default: function () {
                    return []
                }
            },
            // 是否可选
            "disabled": {
                type: Boolean,
                default: false
            },
            "value": {
                type: Array,
                default: function () {
                    return []
                }
            },
            "direction": {
                type: String,
                default: 'horizontal' // horizontal | vertical
            },
            //可选个数限制
            "limit": {
                type: [Number, String],
                default: 10
            },
            //单选
            "single": {
                type: Boolean,
                default: false
            },
            "containerStyle": {
                type: Object,
                default: function () {
                    return {}
                }
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
                default:"ion-ios-checkmark"
            },
            "unSelectedIcon": {
                type: String,
                default:"ion-ios-checkmark-outline"
            },
        },
        mounted(){

        },
        data () {
            return {
                newItems: this.initList()
            }
        },
        watch: {
            value (){
                this.newItems = this.initList();
            },
            items(){
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
            // boxStyle(){
            //     const { disabled } = this;
            //     return {
            //         opacity: disabled ? 0.5 : 1
            //     }
            // },
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
                let selectedCount = 0;

                const newItems = this.items.map((item, i) => {
                    let { disabled } = item;
                    disabled = !!disabled;
                    // disabled为true时认为selected无效，同时单选模式下只认为第一个selected为true的为有效值
                    // selected = !disabled && !!selected && (!single || selectedCount === 0);
                    if (this.value.indexOf(item.value) != -1){
                        Vue.set(item,'selected',true);
                        selectedCount += 1;
                    }else{
                        Vue.set(item,'selected',false);
                    }
                    return item;
                });
                this.selectedCount = selectedCount;
                return newItems;
            },
            //点击筛选操作
            select(index){
                if(this.disabled) return;
                const selected = this.newItems[index].selected;
                if (this.limit <= this.selectedCount && !selected) {
                    this.$emit('overLimit', this.limit);
                } else {
                    this.updateList(index);
                    if(this.value.indexOf(this.newItems[index].value) != -1 ){
                        this.value.splice(this.value.indexOf(this.newItems[index].value), 1)
                    }else{
                        this.value.push(this.newItems[index].value);
                    }
                    this.$emit('selected', this.value , this.newItems.filter(item => item.selected));
                    this.$emit('input', this.value, this.newItems.filter(item => item.selected));
                    this.$emit("change", this.value, this.newItems.filter(item => item.selected));
                }
            },
            //筛选时数据渲染
            updateList(index){
                const single = this.single;
                let selectedCount = 0;
                this.newItems = this.newItems.map((item, i) => {
                    if (this.single) {
                        item.selected = index === i && !item.selected;
                        this.value.splice(0, this.value.length);
                    } else {
                        if (i === index) item.selected = !item.selected;
                    }
                    if (item.selected) selectedCount += 1;
                    return item;
                });

                this.selectedCount = selectedCount;
            }
        }
    }
</script>

<style lang="scss" src="../css/radio.scss"/>