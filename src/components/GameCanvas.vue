<template>
  <div>
    <!-- Добавляем StartScreen -->
    <StartScreen
        v-if="showStartScreen"
        @startGame="handleStartGame" />

    <!-- Полоса HP -->
    <HpBar :player-h-p="gameState.playerHP.value"/>

    <!-- Кнопка паузы -->
    <Button
        text="Stats"
        :callback="pauseGame"
        size="small"
        class="pause_button" />

    <!-- Иконки бафов под полосой HP -->
    <div class="upgrades_container" @click="showBuffInfoScreen">
      <BuffIcon
          v-for="(upgrade, index) in buff.selectedUpgradeIcons.value"
          :key="index"
          :icon="upgrade.icon"
          :count="upgrade.count"
          :is-temporary="upgrade.isTemporary"
      />
    </div>

    <canvas ref="gameCanvas" @click="handleCanvasClick"/>

    <Userplate :experience="gameState.experience.value"
               :experience-to-next-level="gameState.experienceToNextLevel.value"
               :level="gameState.level.value"
               :username="userStore.getUsername"
               :score="gameState.score.value"
               :avatar="userStore.getAvatar"/>

    <!-- Buff Selection Window -->
    <div v-if="gameState.levelUpOptions.value && !gameState.isGameOver.value" id="level-up-overlay">
      <BuffCard
          v-for="item in buff.levelUpBuffs.value"
          :key="item.id"
          :buff="item"
          @select="handleSelectUpgrade"
      />
    </div>

    <InventoryButton @open="openInventory" />

    <InventoryScreen v-if="inventoryScreenShown" :buff="buff" @hide="closeInventory" />

    <!-- Оверлей с сообщением об окончании игры -->
    <GameOverOverlay
        v-if="gameState.isGameOver.value"
        :experience="gameState.experience.value"
        @share="shareResult"
        @restart="restartGame"
    />

    <BuffInfoScreen
        v-if="buffInfoScreenShown"
        :buff="buff"
        :gameInstance="gameInstance"
        @click="hideBuffInfoScreen" />

    <PauseScreen
        v-if="showPauseScreen && !gameState.isGameOver.value"
        @resumeGame="handleResumeGame"
        :buffs="buff.selectedUpgradesValue.value" />

    <DebugMessages />
  </div>
</template>


<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref, watch, Ref} from 'vue'
import BuffCard from './BuffCard.vue';
import BuffIcon from './BuffIcon.vue';
import GameOverOverlay from './GameOverOverlay.vue';
import HpBar from './HpBar.vue';
import StartScreen from './StartScreen.vue';
import PauseScreen from './PauseScreen.vue';
import Userplate from './UserPlate.vue';
import Button from "@/components/Ui/Button.vue";
import {initGame} from '@/engine';
import {useBuffManager} from '@/engine/buffManager';
import {IGameState, IInitGameResponse } from '@/types/engine.types'
import {useUserStore} from "@/store/user";
import {useTelegram} from "@/composable/telegram";
import DebugMessages from "@/components/DebugMessages.vue";
import BuffInfoScreen from "@/components/BuffInfoScreen.vue";
import {settings} from "@/settings";
import {spawnBossLogic} from "@/engine/enemy";
import Inventory from "@/components/Inventory.vue";
import InventoryButton from "@/components/InventoryButton.vue";
import InventoryScreen from "@/components/InventoryScreen.vue";

let gameInstance: IInitGameResponse|null,
    pauseStartTime : number = 0;


const gameState: IGameState = {
  level: ref(1),
  experience: ref(0),
  experienceToNextLevel: ref(50),
  isPaused: ref(false),
  levelUpOptions: ref(false),
  playerHP: ref(100),
  isGameOver: ref(false),
  passingTime: ref(1),
  score: ref(1),
}
const gameCanvas : Ref<HTMLCanvasElement|null> = ref(null);
const showStartScreen = ref(true);
const showPauseScreen = ref(false);
const buffInfoScreenShown = ref(false);
const inventoryScreenShown = ref(false);

const userStore = useUserStore()
const telegram = useTelegram()
const buff = useBuffManager(gameState.isPaused);

function handleStartGame() {
  showStartScreen.value = false;
  gameState.isPaused.value = false;
}

function shareResult() {
  telegram.shareResult(gameState.experience.value)
}

function handleSelectUpgrade(buffId: string) {
  buff.selectUpgrade(buffId);
  gameState.levelUpOptions.value = false;
}

function restartGame() {
  gameState.isGameOver.value = false;
  gameState.playerHP.value = settings.player.maxHP;
  gameState.level.value = 1;
  gameState.experience.value = 0;
  gameState.experienceToNextLevel.value = 100;
  showPauseScreen.value = false;
  showStartScreen.value = false;

  buff.resetBuffs();
  gameInstance && gameInstance.resetGame();

  gameState.isPaused.value = false;
}

/**
 * Постановка игры на паузу
 */
function pauseGame(withScreen: boolean = true) {
  if (gameState.isPaused.value) return;

  gameState.isPaused.value = true;
  pauseStartTime = Date.now();

  if (!withScreen) return;
  showPauseScreen.value = true;
}
/**
 * Снятие с паузы.
 */
function handleResumeGame(withScreen: boolean = true) {
  if (!gameState.isPaused.value) return;

  gameState.isPaused.value = false;
  const pauseDuration = Date.now() - pauseStartTime;

  buff.adjustBuffExpirationTimes(pauseDuration);

  if (!withScreen) return
  showPauseScreen.value = false;
}

/**
 * Клик по канвасу. Происходит при попытке поднять дроп
 */
function handleCanvasClick(event: MouseEvent) {
  if (!gameCanvas.value || !gameInstance) return;

  const canvasRect = gameCanvas.value.getBoundingClientRect();
  const x = event.clientX - canvasRect.left;
  const y = event.clientY - canvasRect.top;

  gameInstance.handleClick({x, y});
}

/**
 * Открытие экрана со списком доступных бафов
 */
function showBuffInfoScreen() {
  pauseGame(false)
  buffInfoScreenShown.value = true;
}
/**
 * Закрытие экрана со списком доступных бафов
 */
function hideBuffInfoScreen() {
  buffInfoScreenShown.value = false;

  handleResumeGame()
}

/**
 * Открытие инвентаря пользователя
 */
function openInventory() {
  pauseGame(false)
  inventoryScreenShown.value = true;
}
/**
 * Закрытие инвентаря
 */
function closeInventory() {
  handleResumeGame()
  inventoryScreenShown.value = false;
}

watch(gameState.level, () => {
  gameState.isPaused.value = true;

  buff.levelUpBuffs.value = buff.getRandomBuffs(2);
  gameState.levelUpOptions.value = true;

  // Попытка спавна босса. Вызывается при изменении левела ГГ
  gameInstance?.engine.spawnBossLogic({ engine: gameInstance?.engine, gameState: gameState })
});

onMounted(async () => {
  gameState.isPaused.value = true;

  if (gameCanvas.value) {
    gameInstance = await initGame({
      gameCanvas,
      gameState,
      buff
    });
  }

  document.addEventListener('visibilitychange', () => { document.hidden && pauseGame() });
  window.addEventListener('blur', () => pauseGame());
});
</script>


<style lang="scss" scoped>
.upgrades_container {
  position: fixed;
  top: 20px; /* Располагаем под полосой HP */
  left: 5px;
  display: flex;
  align-items: center;
  z-index: 2;
  max-width: calc(100vw - 170px);
  flex-wrap: wrap;
  gap: 5px;
}

#level-up-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  gap: 20px;
  padding: 0 20px;
}

canvas {
  display: block;
  background: #222;
}

.pause_button {
  position: absolute;
  top: 20px;
  right: 5px;
}

</style>
