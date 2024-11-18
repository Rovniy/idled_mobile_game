<template>
  <div class="pause-screen">
    <h1 class="title">Pause...</h1>
    <Button text="Resume" :callback="() => $emit('resumeGame')" size="medium" />

    <h2 class="stats_title">Stats:</h2>

    <div class="stats_area">
      <div class="stats" v-for="value in statsPreparedList" :key="value.at(0)">
        <div class="text">{{ value.at(0) }}</div>
        <div class="separator" />
        <div class="value">{{ value.at(1) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
// Нет необходимости в скриптовой части
import Button from "@/components/Ui/Button.vue";
import { BUFF_PROP_TEXT } from "@/database/buffs"

type TProps = {
  buffs: Object,
}
const props = withDefaults(defineProps<TProps>(), {
  buffs: () => ({})
})

const statsPreparedList = computed(() => {
  return Object.entries(props.buffs)
      .map(i => [getBuffTitle(i[0]), getBuffValue(i[1])])
      .sort((a, b) => a[0].localeCompare(b[0]));
})
function getBuffTitle(buffKey: string) : string {
  return BUFF_PROP_TEXT[buffKey] || buffKey
}
function getBuffValue(value: number|boolean) : string {
  if (typeof value === "boolean") {
    return value ? 'Yes' : 'No'
  }

  return value.toString()
}
</script>

<style scoped lang="scss">
.pause-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* Полупрозрачный черный фон */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  gap: 20px;

  .title {
    font: 700 48px/48px $main_font;
    color: $color_white
  }

  .stats_title {
    font: 700 24px/24px $main_font;
    color: $color_white
  }

  .stats_area {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    gap: 5px;

    .stats {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .text {
        font: 500 18px/14px $main_font;
        color: $color_white;
        white-space: normal;
        padding: 0 10px 0 0;
      }

      .separator {
        background-repeat: repeat-x;
        background-image: radial-gradient(circle, rgba($color_white, .2) 20%, transparent 20%);
        background-size: 10px 10px;
        height: 10px;
        flex-grow: 1;
      }

      .value {
        font: 900 18px/14px $main_font;
        color: $color_white;
        white-space: normal;
        padding: 0 0 0 10px;
      }
    }
  }
}
</style>
