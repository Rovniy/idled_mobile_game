<template>
  <div class="card" @click="$emit('select', props.buff.id)">
    <div class="icon_area">
      <img :src="props.buff.icon" class="card_icon" alt="" />
    </div>
    <h3 class="title">{{ props.buff.name }}</h3>
    <p class="desc">{{ props.buff.description }}</p>
    <span class="rarity" :class="props.buff.rarity">{{ props.buff.rarity }}</span>

    <span class="duration" v-if="props.buff.duration">
      <img src="@/assets/images/ui/icon_clock.png" alt="Timeout" class="icon_clock" />

      <span class="text">{{ props.buff.duration }}s</span>
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  buff: Object,
});
</script>

<style scoped lang="scss">
@import "@/assets/style/vars";

.card {
  background-color: #abc141;
  color: #000;
  width: 200px;
  height: 300px;
  padding: 10px;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.5s;
  position: relative;
  border: 5px solid $color_bg;

  .title {
    font: 700 18px/24px $main_font;
    color: $color_bg;
    margin: 20px 0 0 0;
  }

  .desc {
    margin: 10px 0 0 0;
    font: 500 14px/18px $main_font;
  }

  &:hover {
    transform: scale(1.05);
  }

  .icon_area {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border: 3px solid $color_bg;
    border-radius: 20px;
    margin: 0 auto;
    line-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .card_icon {
      width: 110%;
      aspect-ratio: 1 / 1;

    }
  }

  .rarity {
    position: absolute;
    top: -20px;
    right: -20px;
    font-weight: bold;
    text-transform: uppercase;
    padding: 5px;
    border-radius: 10px;
    color: $color_white;
    border: 3px solid $color_bg;
    box-shadow: $shadow_soft;

    &.UNCOMMON {
      color: $color_bg;
      background: #4CAF50;
    }
    &.COMMON {
      color: $color_bg;
      background: #B0BEC5;
    }
    &.RARE {
      color: $color_white;
      background: #2196F3;
    }
    &.LEGENDARY {
      color: $color_bg;
      background: #FFD700;
    }
    &.ARCANA {

      background: #9C27B0;
    }
  }

  .duration {
    $icon_size: 60px;

    position: absolute;
    left: calc(-#{$icon_size} / 3);
    top: calc(-#{$icon_size} / 3);

    .icon_clock {
      width: $icon_size;
      height: $icon_size;
      box-shadow: $shadow;
      border-radius: 50%;
    }

    .text {
      position: absolute;
      top: 20px;
      left: 30px;
      font: 900 30px/30px $main_font;
      transform: rotate(-20deg);
      z-index: 1;
      color: $color_orange;
      text-shadow: 3px 3px 1px $color_bg;
      -webkit-text-stroke: 1px $color_bg;
    }
  }
}
</style>
