<template>
  <div class="screen_title">
    <span class="title" v-text="props.text" />
  </div>
</template>

<script setup lang="ts">
type TProps = {
  text: string
}

const props = withDefaults(defineProps<TProps>(), {
  text: ''
})
</script>

<style scoped lang="scss">
.screen_title {
  width: 100%;
  padding: 20px 10px;
  text-align: center;

  .title {
    font: 700 24px/24px $main_font;
    color: $color_white;
  }
}
</style>
