<template>
    <div v-if="value">
        <bui-mask :rgba="rgba" @click="maskClick"></bui-mask>
        <div ref="popupBox"
             :height="height"
             :class="['bui-popup', pos]"
             :style="popupStyle">
            <slot></slot>
        </div>
    </div>
</template>
<script>
const animation = weex.requireModule("animation");
export default {
  props: {
    rgba: {
      type: [String, Number]
    },
    value: {
      type: Boolean,
      default: false
    },
    pos: {
      type: String,
      default: "bottom"
    },
    backgroundColor: {
      type: String,
      default: "#FFFFFF"
    },
    height: {
      type: [Number],
      default: 840
    },
    width: {
      type: [Number],
      default: 750
    },
    autoHide: {
      type: Boolean,
      default: true
    },
    unit: {
      type: String,
      default: 'wx'
    }
  },
  watch: {
    value(val) {
      this.$emit("input", val);
      setTimeout(() => {
        this.appearPopup(this.value);
      }, 50);
    }
  },
  computed: {
    popupStyle() {
      const { pos, width, height, backgroundColor } = this;
      let style = {
        width: `${this.getRealSize(width)}`,
        backgroundColor: backgroundColor
      };
      if (pos == "top") {
        style = Object.assign(style, {
          top: `-${this.getRealSize(height)}`,
          height: `${this.getRealSize(height)}`
        });
      }
      if (pos == "bottom") {
        style = Object.assign(style, {
          bottom: `-${this.getRealSize(height)}`,
          height: `${this.getRealSize(height)}`
        });
      }
      if (pos == "left") {
        style = Object.assign(style, {
          left: `-${this.getRealSize(width)}`
        });
      }
      if (pos == "right") {
        style = Object.assign(style, {
          right: `-${this.getRealSize(width)}`
        });
      }
      return style;
    }
  },
  methods: {
    maskClick() {
      if(this.autoHide) {
        this.appearPopup(false);
      }
    },
    // 手动关闭时候调用，有动画效果的关闭
    hide(callback) {
      this.appearPopup(false, callback);
    },
    // 显示与隐藏
    appearPopup(bool, callback) {
      animation.transition(
        this.$refs["popupBox"],
        {
          styles: {
            transform: this.getTransform(
              this.pos,
              this.width,
              this.height,
              !bool
            )
          },
          duration: 300,
          delay: 0
        },
        () => {
          if (!bool) {
            this.$emit("input", false);
            callback && callback();
          }
        }
      );
    },
    getTransform(pos, width, height, bool) {
      let _size = pos === "top" || pos === "bottom" ? height : width;
      let _transform;
      bool && (_size = 0);
      switch (pos) {
        case "top":
          _transform = `translateY(${this.getRealSize(_size)})`;
          break;
        case "bottom":
          _transform = `translateY(-${this.getRealSize(_size)})`;
          break;
        case "left":
          _transform = `translateX(${this.getRealSize(_size)})`;
          break;
        case "right":
          _transform = `translateX(-${this.getRealSize(_size)})`;
          break;
      }
      return _transform;
    },
    // 获取实际的大小，带单位可能是px或者wx
    getRealSize(size) {
      return `${size}${this.unit}`;
    }
  }
};
</script>


<style scoped>
.bui-popup {
  position: fixed;
}

.top {
  left: 0;
  right: 0;
}

.bottom {
  left: 0;
  right: 0;
}

.left {
  bottom: 0;
  top: 0;
}

.right {
  bottom: 0;
  top: 0;
}
</style>
