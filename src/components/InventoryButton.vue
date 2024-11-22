<script setup lang="ts">
const emit = defineEmits([ 'open' ])

function openInventory() {
  return emit('open')
}
</script>

<template>
  <div class="inventory_button">
    <img src="@/assets/images/ui/backpack.png" alt="" class="inventory_bag" @click="openInventory" />
  </div>
</template>

<style scoped lang="scss">
$size: 100px;

.inventory_button {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 1;
  width: $size;
  height: $size;

  &:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 300px;
    height: 300px;
    z-index: 1;
    background-image: radial-gradient(circle, black 0%, transparent 70%);
    background-repeat: no-repeat;
    background-position: 150px 150px;
    pointer-events: none;
  }

  .inventory_bag {
    width: $size;
    height: $size;
    position: relative;
    z-index: 2;
  }
}
</style>
