<script setup lang="ts">
import { useDebugStore } from '@/store/debug'

const debug = useDebugStore();
</script>

<template>
  <div class="debug_window">
    <div class="msg">555</div>
    <div class="msg" v-for="item in debug.getMessages">{{ item }}</div>
  </div>
</template>

<style scoped lang="scss">
.debug_window {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  z-index: 100;

  .msg {
   font: 500 16px/24px Arial, Helvetica, sans-serif;
    color: greenyellow;
  }
}
</style>
