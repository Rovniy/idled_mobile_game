<template>
  <div class="start-screen">
    <h1>Hello, Andrei</h1>
    <Button text="Play" :callback="() => $emit('startGame')" size="large" />
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/Ui/Button.vue";

// Нет необходимости в скриптовой части
</script>

<style scoped>
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
}

.start-screen h1 {
  color: white;
  font-size: 48px;
  margin-bottom: 20px;
}
</style>
