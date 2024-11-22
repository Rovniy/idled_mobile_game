<template>
  <div class="user_plate">
    <div class="avatar_area">
      <img :src="userAvatar" alt="props.username" class="avatar"/>
    </div>

    <div class="level_wrapper">
      <span class="level">lvl {{ props.level || 0 }}</span>
    </div>

    <div class="username" v-text="props.username"/>

    <div class="circle_progress">
      <svg :viewBox="`0 0 ${EXP_RADIAL.size} ${EXP_RADIAL.size}`">
        <circle :cx="EXP_RADIAL.x" :cy="EXP_RADIAL.y" :r="EXP_RADIAL.radius" :fill="EXP_RADIAL.circle_fill"/>

        <line
            v-for="n in 24"
            :key="n"
            :x1="EXP_RADIAL.x"
            :y1="EXP_RADIAL.y"
            :x2="getLineEnd(n).x"
            :y2="getLineEnd(n).y"
            :stroke="EXP_RADIAL.section_stroke"
            stroke-width="1"
        />

        <path :stroke="EXP_RADIAL.highlight_stroke" :stroke-width="EXP_RADIAL.highlight_width" fill="none"
              :d="radialExpProgress"/>
      </svg>

      <div class="data_badge">
        {{ userScore }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {animateProgress, describeArc, thousands} from '@/utils/helpers'

import DefaultAvatar from '@/assets/images/default_avatar.png'

const EXP_RADIAL = {
  size: 200,
  radius: 100,
  section_stroke: '#76a3a3',
  circle_fill: '#102020',
  highlight_stroke: 'rgba(246,73,4,0.48)',
  highlight_width: 30,
  fill_radius: 90,
  x: 100,
  y: 100,
  startAngle: 225,
  totalAngle: 180,
}
const radialExpProgress = ref('')
const expProgressText = ref('0')

type TProps = {
  level: number,
  username: string,
  experience: number,
  score: number,
  experienceToNextLevel: number,
  avatar: string,
}
const props = withDefaults(defineProps<TProps>(), {
  level: 0,
  username: '',
  experience: 0,
  score: 0,
  experienceToNextLevel: 0,
  avatar: '',
})

const experienceValue = computed(() => +(props?.experience || 0));
const userScore = computed(() => props?.score ? thousands(props.score) : 0);
const expTotalDelta = computed(() => 100 / props.experienceToNextLevel)
const userAvatar = computed(() => {
  return props?.avatar || DefaultAvatar
})

/**
 * Анимация изменения опыта игрока
 */
watch(experienceValue, (newVal, oldValue) => {
  animateProgress(oldValue, newVal, 1000, updateProgress)
})

/**
 * Обновление значения прогресса игрока
 * Заполнение полосы
 */
function updateProgress(progress: number) {
  const percentage = expTotalDelta.value * progress
  const filledAngle = (percentage / 100) * EXP_RADIAL.totalAngle;
  const endAngle = (EXP_RADIAL.startAngle + filledAngle) % 360;

  expProgressText.value = percentage.toFixed(0)
  radialExpProgress.value = describeArc(EXP_RADIAL.x, EXP_RADIAL.y, EXP_RADIAL.fill_radius, EXP_RADIAL.startAngle, endAngle);
}

/**
 * Просчет положения и длины рисок на полосе прогресса
 */
function getLineEnd(n: number) {
  const angleDeg = (n - 1) * 15;
  const angleRad = angleDeg * Math.PI / 180;

  return {
    x: EXP_RADIAL.x + EXP_RADIAL.radius * Math.cos(angleRad),
    y: EXP_RADIAL.y + EXP_RADIAL.radius * Math.sin(angleRad)
  };
}

</script>

<style scoped lang="scss">
$left_indent: 40px;
$avatar_size: 70px;
$exp_bar_height: 15px;

.user_plate {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;

  .avatar_area {
    position: absolute;
    left: -10px;
    bottom: -20px;
    width: $avatar_size;
    height: $avatar_size;
    z-index: 2;

    .avatar {
      border-radius: 50%;
      width: $avatar_size - 10px;
      height: $avatar_size - 10px;
    }
  }

  .username {
    position: absolute;
    left: $left_indent + 10px;
    bottom: 0;
    background: $color_white;
    width: fit-content;
    font: 700 18px/18px $main_font;
    color: $color_bg;
    padding: 5px 10px 5px 15px;
    border-top-right-radius: 20px;
    border-top: 3px solid $color_bg;
    border-right: 3px solid $color_bg;
    box-shadow: -5px -5px 5px rgba($color_bg, .5);
  }

  .level_wrapper {
    position: absolute;
    left: $left_indent;
    bottom: $exp_bar_height + 15px;
    transform: rotate(-30deg);
    z-index: -1;
    background: $color_gray;
    width: fit-content;
    font: 700 18px/18px $main_font;
    padding: 5px 10px 5px 15px;
    border-radius: 20px;
    border: 3px solid $color_bg;

    .level {
      font: 500 16px/16px $main_font;
      color: $color_white;
    }
  }

  .circle_progress {
    position: absolute;
    left: -20px;
    bottom: -20px;
    width: $avatar_size + 10px;
    height: $avatar_size + 10px;
    z-index: 1;
    border-radius: 50%;
    box-shadow: 5px 5px 5px rgba($color_bg, .5);

    svg {
      transition: all .5s ease-in-out;

      circle {
        stroke: $color_bg;
      }
    }

    .data_badge {
      position: absolute;
      top: -16px;
      left: 60%;
      height: 50px;
      transform: translateX(-50%) rotate(10deg);
      border: 3px solid $color_bg;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background: $color_orange;
      color: #fff;
      font: 700 12px/12px $main_font;
      white-space: nowrap;
      width: fit-content;
      padding: 3px;
      z-index: -1;
    }
  }
}

</style>
