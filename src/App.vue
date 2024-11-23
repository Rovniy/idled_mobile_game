<template>
  <GameCanvas/>
</template>

<script setup>
import GameCanvas from '@/components/GameCanvas.vue'
import {onMounted} from 'vue'
import {useUserStore} from '@/store/user'
import {useInventoryStore} from '@/store/inventory.ts'
import {useTelegram} from '@/composable/telegram.ts'
import {BUFFS_IDS} from '@/database/buffs'

const userStore = useUserStore()
const inventoryStore = useInventoryStore()
const telegram = useTelegram()

onMounted(async () => {
  try {
    telegram.initApi()

    await userStore.initTelegramData()

    await inventoryStore.initInventory()
    await inventoryStore.add(BUFFS_IDS.SHOOT_IN_CON_FORWARD, 10)
  } catch (e) {
    console.error(e)
  }
})
</script>

<style>
/* Глобальные стили, если необходимо */
</style>
