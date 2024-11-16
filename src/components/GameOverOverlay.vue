<template>
  <div id="game-over-overlay">
    <div id="game-over-message">
      <h1>Игра окончена</h1>
      <p>Ваш счет: {{ finalScore }}</p>
      <button @click="shareResult">Поделиться результатом</button>
      <button @click="restartGame">Начать заново</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'

const props = defineProps({
  experience: String,
});

const emit = defineEmits(['share', 'restart']);

const finalScore = computed(() => {
  return props.experience + ' XP';
});

function shareResult() {
  emit('share');
}

function restartGame() {
  emit('restart');
}
</script>

<style scoped>
#game-over-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* Полупрозрачный фон */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000; /* Поверх всех элементов */

  #game-over-message {
    background-color: #fff;
    padding: 40px;
    border-radius: 10px;
    text-align: center;
    color: #000;

    h1 {
      margin-top: 0;
      font-size: 36px;
    }

    p {
      font-size: 24px;
    }

    button {
      width: 200px;
      padding: 10px;
      margin-top: 15px;
      font-size: 18px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
    }

    button:first-of-type {
      background-color: #4CAF50; /* Зеленый */
      color: white;
    }

    button:last-of-type {
      background-color: #f44336; /* Красный */
      color: white;
    }
  }
}
</style>
