<script setup lang="ts">
type TProps = {
  text: string,
  callback: () => void,
  size: 'micro' | 'small' | 'medium' | 'large',
  color?: 'default' | 'share'
}
const props = withDefaults(defineProps<TProps>(), {
  text: '',
  callback: () => null,
  size: 'medium',
  color: 'default'
})

function doCallback() {
  return props.callback()
}
</script>

<template>
  <button :class="[ 'btn', props.size, `${props.color}_color` ]" @click="doCallback">
    {{ props.text }}
  </button>
</template>

<style scoped lang="scss">
@use "@/assets/style/vars" as *;

.btn {
  border: none;
  color: $color_white;

  &.default_color {
    background: url('@/assets/images/ui/button.png') no-repeat 0 0 / cover;
  }
  &.share_color {
    background: url('@/assets/images/ui/button_share.png') no-repeat 0 0 / cover;
  }

  &.micro {
    width: 89px;
    height: 37px;
    font: 500 22px/1 $main_font;
    background: url('@/assets/images/ui/button_micro.png') no-repeat 0 0 / cover;
  }
  &.small {
    width: 150px;
    height: 47px;
    font: 700 30px/1 $main_font;
  }
  &.medium {
    width: 296px;
    height: 92px;
    font: 700 50px/1 $main_font;
  }
  &.large {
    width: 350px;
    height: 108px;
    font: 700 70px/1 $main_font;
  }

  &:hover, &:active {
    filter: brightness(0.8);
  }
}
</style>
