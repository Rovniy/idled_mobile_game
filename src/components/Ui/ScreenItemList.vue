<template>
  <div class="buff_scroll_wrapper">
    <div class="buff_info" v-for="(item, index) in preparedList" :key="index">
      <div class="avatar_area">
        <img :src="item.icon" alt="item.id" class="avatar">
      </div>

      <div class="meta_area">
        <span class="title" v-text="getBuffTitle(item)" />
        <span class="desc" v-text="item.description" />
      </div>

      <div v-if="props.actionCallback" class="action_area">
        <Button :callback="() => doAction(item)" :text="props.actionText" size="micro" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from "@/components/Ui/Button.vue";
import { TItemListItem, TItemListProps } from "@/types/ui/ScreenItemList.types";

const props = withDefaults(defineProps<TItemListProps>(), {
  list: () => [],
  withTemp: false,
  actionText: 'Use',
  actionCallback: undefined
})

const preparedList = computed(() => props.list || [])

function getBuffTitle(item: any) {
  if (props.withTemp) {
    return item?.temp ? item.name + ' (Temp)' : item.name
  }
  if (item.count > 1) {
    return item.name + ` (x${item.count})`
  }

  return item.name
}

function doAction(item: TItemListItem) {
  if (!props?.actionCallback) return

  return props.actionCallback(item)
}
</script>

<style scoped lang="scss">
.buff_scroll_wrapper {
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
</style>
