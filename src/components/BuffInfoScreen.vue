<template>
  <div class="buff_info_screen" @click="emit('click')">
    <h2 class="area_title" v-if="isHasActiveBuffs">Active buffs</h2>

    <div class="buff_scroll_wrapper" v-if="isHasActiveBuffs">
      <div class="buff_info" v-for="item in activeBuffsList" :key="item.id">
        <div class="avatar_area">
          <img :src="item.icon" alt="item.id" class="avatar">
        </div>
        <div class="meta_area">
          <span class="title" v-text="getBuffTitle(item)" />
          <span class="desc" v-text="item.description" />
        </div>
      </div>
    </div>

    <h2 class="area_title alls_area">All available buffs</h2>

    <div class="buff_scroll_wrapper">
      <div class="buff_info" v-for="item in buffsList" :key="item.id">
        <div class="avatar_area">
          <img :src="item.icon" alt="item.id" class="avatar">
        </div>
        <div class="meta_area">
          <span class="title" v-text="item.name" />
          <span class="desc" v-text="item.description" />
        </div>
      </div>
    </div>

    <h2 class="area_title alls_area">All available loot</h2>

    <div class="buff_scroll_wrapper">
      <div class="buff_info" v-for="item in lootList" :key="item.id">
        <div class="avatar_area">
          <img :src="item.icon" alt="item.id" class="avatar">
        </div>
        <div class="meta_area">
          <span class="title" v-text="item.name" />
          <span class="desc" v-text="item.description" />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {computed, onMounted} from 'vue'
import {IBuff, IBuffManager, IDrop, IEngine, IGameState, IInitGameResponse} from "@/types/engine.types";

const emit = defineEmits([ 'click' ])
type TProps = {
  buff: IBuffManager|null,
  gameInstance: IInitGameResponse|null,
}
const props = withDefaults(defineProps<TProps>(), {
  buff: null,
  gameInstance: null
})

const buffsList = computed(() => {
  return props.buff?.buffs.value.sort((a: IBuff, b: IBuff) => a.name.localeCompare(b.name)) || []
})
const activeBuffsList = computed(() => {
  const list: any = []

  props.buff?.selectedUpgradeIcons.value.forEach(item => {
    props.buff?.buffs.value.forEach(_buff => {
      if (item.id === _buff.id) list.push({
        ..._buff,
        temp: item.isTemporary
      })
    })
  })

  return list.sort((a: IBuff, b: IBuff) => a.name.localeCompare(b.name))
})
const isHasActiveBuffs = computed(() => activeBuffsList.value.length > 0)
const lootList = computed(() => {
  if (!props.gameInstance) return []
  if (!props.gameInstance?.engine) return []

  return props.gameInstance.engine.allDrops.sort((a: IDrop, b: IDrop) => {
    if (!a?.name || !b?.name) return 0

    return a.name.localeCompare(b.name)
  })
})
function getBuffTitle(item: any) {
  return item?.temp ? item.name + ' (Temp)' : item.name
}
onMounted(() => {
  console.log('props.buff', props.buff);
})

// Нет необходимости в скриптовой части
</script>

<style scoped lang="scss">
.buff_info_screen {
  @include overlay_wrapper;
  z-index: 10;
  overflow-y: scroll;
  padding: 0 10px 10px;

  .area_title {
    margin: 20px 0 0 0;
    width: 100%;
    font: 500 24px/24px $main_font;
    color: $color_white;
    text-align: center;

    &.alls_area {
      margin: 20px 0 0 0;
    }
  }

  .buff_scroll_wrapper {
    margin: 10px 0 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: fit-content;
    gap: 5px;

    .buff_info {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      user-select: none;
      gap: 10px;

      .avatar_area {
        $size: 50px;

        height: $size;
        width: $size;
        line-height: 0;

        .avatar {
          height: $size;
          width: $size;
        }
      }

      .meta_area {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        .title {
          font: 500 18px/24px $main_font;
          color: $color_white;
        }
        .desc {
          font: 500 14px/18px $main_font;
          color: rgba($color_white, .8);
        }
      }
    }
  }
}
</style>
