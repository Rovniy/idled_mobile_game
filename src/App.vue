<template>
  <GameCanvas />
</template>

<script setup>
import GameCanvas from './components/GameCanvas.vue';
import { onMounted } from 'vue'
import { useUserStore } from './store/user'
import { useLaunchParams, isTMA, miniApp  } from '@telegram-apps/sdk-vue';

const userStore = useUserStore()

onMounted(async () => {
  await userStore.initTelegramData();
})
</script>

<style>
/* Глобальные стили, если необходимо */
</style>
