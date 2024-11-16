<script setup lang="ts">
type TProps = {
  text: string,
  callback: () => void,
  size: 'small'|'medium'|'large'
}
const props = withDefaults(defineProps<TProps>(), {
  text: '',
  callback: () => null,
  size: 'medium',
})

function doCallback() {
  return props.callback()
}
</script>

<template>
  <button :class="[ 'btn', props.size ]" @click="doCallback">
    {{ props.text }}
  </button>
</template>

<style scoped lang="scss">
@import "@/assets/style/vars";

.btn {
  background: url('@/assets/images/ui/button.png') no-repeat 0 0 / cover;
  border: none;
  color: $color_white;

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
