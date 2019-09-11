<template>
    <image v-bind:src="imagePath"
           v-bind:placeholder="placeholderPath"
           v-bind:style="{'border-radius':radius, 'width': width, 'height': height}"
           v-bind:resize="resize"
           @click="_click($event)"
           @load="_load()" />
</template>

<script>
    module.exports = {
        computed: {
            imagePath() {
                if(this.src!=""){
                    return this._isHttpOrFile(this.src)?this.src:this._getContext()+this.src;
                }
            },
            placeholderPath() {
                if (this.placeholder!= "") {
                    return this._isHttpOrFile(this.placeholder)?this.placeholder:this._getContext()+this.placeholder;
                }
            }
        },
        props: {
            width: {
                type: String
            },
            height: {
                type:String
            },
            src: {
                type: String
            },
            resize: {
                type: String,
                default: "stretch"
            },
            placeholder: {
                type: String,
                default: ""
            },
            radius: {
                type:[String,Number],
                default: "0px"
            }
        },
        methods: {
            _click(e) {
                this.$emit('click', e);
            },
            _load() {
                this.$emit('load');
            },
            _isHttpOrFile(path){
                //http file base64
                return path.indexOf("http")==0 || path.indexOf("file")==0 || path.indexOf("data:image")==0;
            },
            _getContext(){
                let url = weex.config.bundleUrl;
                if(url.indexOf('?')>0){
                    url = url.substring(0,url.indexOf('?'));
                }
                url = url.split('/').slice(0, -1).join('/');
                if(this._isHttpOrFile(url)){
                    return url;
                }else{
                    if(url.indexOf("/")==0){
                        url=url.substring(url.indexOf("/")+1);
                    }
                    url =`file:///android_asset${ url==""?'':"/"}${url}`;
                }
                return url;
            }
        }
    }
</script>
