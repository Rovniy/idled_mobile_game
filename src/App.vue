<template>
  <GameCanvas />
</template>

<script setup>
import GameCanvas from './components/GameCanvas.vue';
import {onMounted } from 'vue'
import { useTelegram } from './composable/telegram'
import { useUserStore } from './store/user'
import { useLaunchParams } from '@telegram-apps/sdk-vue';

const lp = useLaunchParams();
const userStore = useUserStore()

onMounted(() => {
  const { instance } = useTelegram();

  userStore.initTelegramData(instance);

  console.log('useLaunchParams', lp)
})
</script>

<style>
/* Глобальные стили, если необходимо */
</style>
