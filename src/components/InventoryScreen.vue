<template>
  <div class="inventory_screen">
    <ScreenTitle text="My inventory" />

    <ScreenItemList :list="inventoryList" :action-callback="useItem" />

    <ScreenTitle text="Shop" />

    <ScreenItemList :list="shopList" :action-callback="buyItem" action-text="Buy" />

    <div class="action_area">
      <Button :callback="hideInventory" text="Close" size="small" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, watch} from 'vue'
import {useInventoryStore} from '@/store/inventory'
import {IBuffManager, IGameState, IInitGameResponse} from "@/types/engine.types";
import Button from "@/components/Ui/Button.vue";
import ScreenTitle from "@/components/Ui/ScreenTitle.vue";
import ScreenItemList from "@/components/Ui/ScreenItemList.vue";
import {shopItems} from "@/database/shop";
import {TItemListItem} from "@/types/ui/ScreenItemList.types";

const emit = defineEmits([ 'hide' ])

const inventoryStore = useInventoryStore()

type IProps = {
  buff: IBuffManager | null
}
const props = withDefaults(defineProps<IProps>(), {
  buff: null,
})

const inventoryList = computed(() => {
  if (!props?.buff) return []

  const list : any[] = []

  for (const item in inventoryStore.inventory) {
    for (const _buff of props.buff.buffs.value) {
      if (inventoryStore.inventory[item].id === _buff.id) {
        list.push({
          ..._buff,
          count: inventoryStore.inventory[item].c
        })
        break
      }
    }
  }

  return list
})

const shopList = computed(() => {
  const list : any[] = []

  shopItems.forEach((_shopItem) => {
    if (!props?.buff) return []

    for (const _buff of props.buff.buffs.value) {
      if (_shopItem.id === _buff.id) {
        list.push({
          ..._shopItem,
          icon: _buff.icon,
          name: _buff.name,
          description: _buff.description
        })
        break
      }
    }
  })

  return list
})

watch(inventoryList.value, a => console.log(a))

function hideInventory() {
  return emit('hide')
}

async function useItem(item: TItemListItem) {
  try {
    await inventoryStore.use({
      id: item.id,
      c: 1
    })

    const targetBuff = props.buff?.buffs.value.find(_buff => _buff.id === item.id)
    console.log('targetBuff', targetBuff);
    if (!targetBuff) return

    props.buff?.applyBuff(targetBuff)
  } catch (e) {
    console.error(e)
  } finally {
    hideInventory()
  }
}

async function buyItem(item: TItemListItem) {
  try {
    await inventoryStore.buy(item)
  } catch (e) {
    console.error(e)
  } finally {
    hideInventory()
  }
}
</script>


<style scoped lang="scss">
.inventory_screen {
  @include overlay_wrapper;
  padding: 10px;

  .action_area {
    margin: 20px 0 0 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
