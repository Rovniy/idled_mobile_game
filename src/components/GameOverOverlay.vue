<template>
  <div class="game_over_overlay">
    <h1 class="title">Game Over</h1>
    <p class="desc">Score: <b>{{ finalScore }}</b></p>
    <Button text="Share" size="small" color="share" :callback="shareResult" />
    <Button text="Play" size="large" :callback="restartGame" />
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/Ui/Button.vue";
import {computed} from 'vue'

const props = defineProps({
  experience: Number,
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

<style scoped lang="scss">
.game_over_overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  z-index: 20;

  .title {
    margin-top: 0;
    font: 700 36px/36px $main_font;
    color: $color_white;
  }

  .desc {
    font: 700 24px/24px $main_font;
    color: $color_white;

    b {
      font: 700 24px/24px $main_font;
      color: $color_orange
    }
  }
}
</style>
