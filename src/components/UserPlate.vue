<script setup lang="ts">
import {computed} from 'vue'
import DefaultAvatar from '@/assets/images/default_avatar.png'

const props = defineProps({
  level: Number,
  username: String,
  experience: Number,
  experienceToNextLevel: Number,
  avatar: String,
})

const experiencePercentage = computed(() => {
  if (!props.experience || !props.experienceToNextLevel) return 0

  return (props.experience / props.experienceToNextLevel) * 100;
});
const userAvatar = computed(() => {
  return props?.avatar || DefaultAvatar
})
</script>

<template>
  <div class="user_plate">
    <div class="avatar_area">
      <img :src="userAvatar" alt="props.username" class="avatar" />
    </div>

    <div class="level_wrapper">
      <span class="level">lvl {{ props.level || 0 }}</span>
    </div>

    <div class="username" v-text="props.username" />

    <div class="exp_bar">
      <div class="exp_progress" :style="{ width: experiencePercentage + '%' }" />
      <div class="exp_text">Exp: {{ props.experience }} / {{ props.experienceToNextLevel }}</div>
    </div>
  </div>
</template>

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
    bottom: -10px;
    width: $avatar_size;
    height: $avatar_size;
    z-index: 1;

    .avatar {
      border-radius: 50%;
      width: $avatar_size;
      height: $avatar_size;
      box-shadow: 5px 5px 5px $color_bg;
    }
  }

  .username {
    position: absolute;
    left: $left_indent + 10px;
    bottom: $exp_bar_height;
    background: $color_white;
    width: fit-content;
    font: 700 18px/18px $main_font;
    color: $color_bg;
    padding: 5px 10px 5px 15px;
    border-top-right-radius: 20px;
    border-top: 3px solid $color_bg;
    border-right: 3px solid $color_bg;
    box-shadow: 5px 5px 5px $color_bg;
  }

  .level_wrapper {
    position: absolute;
    right: 0;
    bottom: $exp_bar_height;
    z-index: 1;
    background: $color_white;
    width: fit-content;
    font: 700 18px/18px $main_font;
    padding: 5px 10px 5px 15px;
    border-top-left-radius: 20px;
    border-top: 3px solid $color_bg;
    border-left: 3px solid $color_bg;

    .level {
      font: 700 16px/16px $main_font;
      color: $color_bg;
    }
  }

  .exp_bar {
    position: fixed;
    bottom: 0;
    left: $left_indent;
    width: 100%;
    height: $exp_bar_height;
    background-color: $color_bg;
    display: flex;
    align-items: center;
    justify-content: center;

    .exp_progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: $exp_bar_height;
      background-color: $color_orange;
      width: 0;
      transition: width 1s;
      border-top-right-radius: calc($exp_bar_height / 2);
      border-bottom-right-radius: calc($exp_bar_height / 2);
    }

    .exp_text {
      position: relative;
      color: #fff;
      font: 700 14px/14px $main_font;
      z-index: 1;
    }
  }
}

</style>
