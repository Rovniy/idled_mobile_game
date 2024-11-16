<template>
  <div class="pause-screen">
    <h1>Pause...</h1>
    <Button text="Resume" :callback="() => $emit('resumeGame')" size="medium" />
  </div>
</template>

<script setup lang="ts">
// Нет необходимости в скриптовой части
import Button from "@/components/Ui/Button.vue";
</script>

<style scoped>
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
  z-index: 20;
}

.pause-screen h1 {
  color: white;
  font-size: 48px;
  margin-bottom: 20px;
}

.pause-screen button {
  font-size: 24px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
