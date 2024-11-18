<template>
  <div class="hp_bar">
    <div class="hp_progress" :style="{ width: hpPercentage + '%', background: hpColor }"></div>
    <div class="hp_text">
      <img src="@/assets/images/ui/icon_hearth.png" alt="HP" class="hp_icon">
      {{ playerHP }} / 100
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'

const props = defineProps({
  playerHP: Number,
  maxPlayerHP: Number,
});

const hpColor = computed(() => {
  if (hpPercentage.value > 50) {
    return 'green';
  } else if (hpPercentage.value > 25) {
    return 'yellow';
  } else {
    return 'red';
  }
});
const hpPercentage = computed(() => {
  return ((props?.playerHP || 0) / 100) * 100;
});
</script>

<style scoped lang="scss">
$height: 15px;

.hp_bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $height;
  background-color: $color_bg;
  display: flex;
  align-items: center;
  justify-content: center;

  .hp_progress {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transition: width 1s;
  }

  .hp_text {
    position: relative;
    color: $color_white;
    font: 700 14px/1 $main_font;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;

    .hp_icon {
      width: 15px;
      height: 15px;
    }
  }
}
</style>
