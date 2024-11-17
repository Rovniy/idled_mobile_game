<template>
  <GameCanvas />
</template>

<script setup>
import GameCanvas from './components/GameCanvas.vue';
import {onMounted } from 'vue'
import { useTelegram } from './composable/telegram'

onMounted(() => {
  const telegram = useTelegram();
  console.log('telegram', telegram)
  console.log('telegram.initDataUnsafe', telegram.initDataUnsafe)
  console.log('window.location.hash', window.location.hash)
  console.log('window.location.host', window.location.host)
})
</script>

<style>
/* Глобальные стили, если необходимо */
</style>
