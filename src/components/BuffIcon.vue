<template>
  <div class="upgrade-icon-container">
    <img :src="icon" class="upgrade-icon" alt="" />
    <span class="upgrade-count">{{ count }}</span>
    <div v-if="isTemporary" class="buff_timer">{{ count }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  icon: String,
  count: Number,
  isTemporary: Boolean,
});
</script>

<style scoped lang="scss">
@import "@/assets/style/vars";

.upgrade-icon-container {
  position: relative;
  width: 40px;
  height: 40px;

  .upgrade-icon {
    width: 100%;
    height: 100%;
  }

  .upgrade-count,
  .buff_timer {
    position: absolute;
    bottom: -5px;
    right: -5px;
    background-color: $color_white;
    border: 3px solid $color_bg;
    color: $color_bg;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font: 700 14px/1 $main_font;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .buff_timer {
    background-color: $color_orange;
    color: $color_white;
  }
}
</style>
