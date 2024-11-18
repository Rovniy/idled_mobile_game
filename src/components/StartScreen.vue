<template>
  <div class="start-screen">
    <h2 class="title">Welcome to</h2>
    <h1 class="username">IDLE-D!</h1>
    <Button text="Play" :callback="() => $emit('startGame')" size="large" />
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/Ui/Button.vue";

// Нет необходимости в скриптовой части
</script>

<style scoped lang="scss">
.start-screen {
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
    font: 700 36px/36px $main_font;
    color: $color_white
  }
  .username {
    font: 700 80px/80px $main_font;
    color: $color_white;
    text-shadow: 5px 5px 10px rgba($color_bg, .5);
  }
}
</style>
