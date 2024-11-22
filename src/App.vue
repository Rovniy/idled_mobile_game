<template>
  <GameCanvas/>
</template>

<script setup>
import GameCanvas from '@/components/GameCanvas.vue'
import {onMounted} from 'vue'
import {useUserStore} from '@/store/user'
import {useInventoryStore} from '@/store/inventory.ts'
import {useTelegram} from '@/composable/telegram.ts'

const userStore = useUserStore()
const inventoryStore = useInventoryStore()
const telegram = useTelegram()

onMounted(async () => {
  try {
    telegram.initApi()
    await userStore.initTelegramData()
    await inventoryStore.initInventory()
    await inventoryStore.add('apple')
  } catch (e) {
    console.error(e)
  }
})
</script>

<style>
/* Глобальные стили, если необходимо */
</style>
