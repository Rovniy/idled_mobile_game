<template>
  <div class="pause-screen">
    <h1 class="title">Pause...</h1>
    <Button text="Resume" :callback="() => $emit('resumeGame')" size="medium" />
  </div>
</template>

<script setup lang="ts">
// Нет необходимости в скриптовой части
import Button from "@/components/Ui/Button.vue";
</script>

<style scoped lang="scss">
@import '@/assets/style/vars';

.pause-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* Полупрозрачный черный фон */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  gap: 20px;

  .title {
    font: 700 48px/48px $main_font;
    color: $color_white
  }
}
</style>
