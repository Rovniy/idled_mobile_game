<template>
  <GameCanvas />
</template>

<script setup>
import GameCanvas from './components/GameCanvas.vue';
import {onMounted } from 'vue'
import { useTelegram } from './composable/telegram'
import { useUserStore } from './store/user'

const userStore = useUserStore()

onMounted(() => {
  const telegram = useTelegram();

  userStore.initTelegramData(telegram);
})
</script>

<style>
/* Глобальные стили, если необходимо */
</style>
