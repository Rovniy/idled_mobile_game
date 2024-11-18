import {Ref, ref, computed, ComputedRef} from 'vue';
import buffsData from '@/database/buffs';
import {IActiveBuff, IBuff, IBuffManager} from "@/types";
import { RARE_WEIGHT } from '@/database/rare'
import { BUFF_PROP, BUFF_PROP_ICONS } from '@/database/buffs'
import {settings} from "@/settings";

const SELECTED_UPGRADES_COUNT = {
	[BUFF_PROP.SHOOT_SPEED]: 0,
	[BUFF_PROP.SHOOT_DAMAGE]: 0,
	[BUFF_PROP.SHOOT_TARGETS]: 0,
	[BUFF_PROP.ENEMY_DETECTION_RADIUS]: 0,
	[BUFF_PROP.SHOOT_BULLET_SPEED]: 0,
	[BUFF_PROP.SHOOT_IN_CON_FORWARD]: 0,
	[BUFF_PROP.SHOOT_ACCURACY]: 0,
	[BUFF_PROP.PLAYER_INVINCIBLE]: 0,
	[BUFF_PROP.PLAYER_ARMOR]: 0,
	[BUFF_PROP.PLAYER_BULLET_PENETRATION]: 0,
	[BUFF_PROP.PLAYER_BULLET_CRITICAL_CHANCE]: 0,
	[BUFF_PROP.PLAYER_BULLET_CRITICAL_POWER]: 0,
}
const SELECTED_UPGRADES_VALUE = {
	[BUFF_PROP.SHOOT_SPEED]: 0,
	[BUFF_PROP.SHOOT_DAMAGE]: 0,
	[BUFF_PROP.SHOOT_TARGETS]: 0,
	[BUFF_PROP.ENEMY_DETECTION_RADIUS]: 0,
	[BUFF_PROP.SHOOT_BULLET_SPEED]: 0,
	[BUFF_PROP.SHOOT_IN_CON_FORWARD]: 0,
	[BUFF_PROP.SHOOT_ACCURACY]: 0,
	[BUFF_PROP.PLAYER_INVINCIBLE]: 0,
	[BUFF_PROP.PLAYER_ARMOR]: 0,
	[BUFF_PROP.PLAYER_BULLET_PENETRATION]: 0,
	[BUFF_PROP.PLAYER_BULLET_CRITICAL_CHANCE]: settings.player.baseCriticalChance,
	[BUFF_PROP.PLAYER_BULLET_CRITICAL_POWER]: settings.player.baseCriticalPower,
}

export function useBuffManager(isPaused: Ref<boolean>) : IBuffManager {
	// Реактивные переменные
	const buffs : Ref<IBuff[]> = ref(buffsData);
	const levelUpBuffs = ref([]);
	const selectedUpgrades = ref(SELECTED_UPGRADES_COUNT);
	const selectedUpgradesValue = ref(SELECTED_UPGRADES_VALUE)
	const activeTemporaryBuffs : Ref<IBuff[]> = ref([]);

	/**
	 * Бафы и их влияние не игровой процесс
	 */
	function applyBuff(buff: IBuff) {
		const { effect, duration } = buff;

		if (duration) {
			addTemporaryBuff(buff);
		} else {
			selectedUpgrades.value[effect.type]++;
			selectedUpgradesValue.value[effect.type] += effect.value
		}
	}

	/**
	 * Удаление бафов
	 */
	function removeBuffEffect(buff : IBuff) {
		const { effect } = buff;

		selectedUpgrades.value[effect.type]--;

		if (selectedUpgrades.value[effect.type] < 0) {
			selectedUpgrades.value[effect.type] = 0
		}

		selectedUpgradesValue.value[effect.type] -= effect.value;
		if (selectedUpgradesValue.value[effect.type] < 0) {
			selectedUpgradesValue.value[effect.type] = 0
		}
	}

	const selectedUpgradeIcons : ComputedRef<IActiveBuff[]> = computed(() => {
		const buffsArray = [];

		// Рисуем постоянные улучшения
		for (const item in selectedUpgrades.value) {
			if (selectedUpgrades.value[item] <= 0) continue;

			const preparedUpgradeBuff = {
				id: item,
				icon: BUFF_PROP_ICONS[item],
				count: selectedUpgrades.value[item],
				isTemporary: false,
			}
			buffsArray.push(preparedUpgradeBuff);
		}

		// Добавляем временные бафы
		activeTemporaryBuffs.value.forEach((buff: IBuff) => {
			if (!buff?.expirationTime) return

			const remainingTime = Math.ceil((buff.expirationTime - Date.now()) / 1000);

			const preparedActiveBuff = {
				id: buff.id,
				icon: buff.icon,
				count: remainingTime,
				isTemporary: true,
			}
			buffsArray.push(preparedActiveBuff);
		});

		return buffsArray;
	});

	function resetBuffs() {
		selectedUpgrades.value = SELECTED_UPGRADES_COUNT
		selectedUpgradesValue.value = SELECTED_UPGRADES_VALUE
		activeTemporaryBuffs.value = [];
	}

	/**
	 * Создаем массив с бафами, повторенными согласно их весу
	 * @param count
	 */
	function getRandomBuffs(count: number) {
		let weightedBuffs : IBuff[] = [];

		buffsData.forEach((buff : IBuff) => {
			let weight = RARE_WEIGHT[buff.rarity];

			for (let i = 0; i < weight; i++) {
				weightedBuffs.push(buff);
			}
		});

		const selectedBuffs : IBuff[] = [];
		while (selectedBuffs.length < count && weightedBuffs.length > 0) {
			// Выбираем случайный индекс
			const randomIndex = Math.floor(Math.random() * weightedBuffs.length);
			const buff = weightedBuffs[randomIndex];

			// Проверяем, не выбрали ли мы уже этот баф
			if (!selectedBuffs.find((b) => b.id === buff.id)) {
				selectedBuffs.push(buff);
			}

			// Удаляем все вхождения этого бафа из weightedBuffs, чтобы избежать повторений
			weightedBuffs = weightedBuffs.filter((b) => b.id !== buff.id);
		}

		return selectedBuffs;
	}

	/**
	 * Выбора апгрейда из карточек при лвлапе
	 * @param buffId
	 */
	function selectUpgrade(buffId: string) {
		const buff = levelUpBuffs.value.find((b: IBuff) => b.id === buffId);
		if (!buff) return;

		applyBuff(buff);

		levelUpBuffs.value = [];
		isPaused.value = false;
	}

	/**
	 * Добавление бафа при клике на выпавший дроп
	 * @param buff - Объект бафа из database
	 */
	function addTemporaryBuff(buff : IBuff) {
		const existingBuff : IBuff|undefined = activeTemporaryBuffs.value.find((b : IBuff) => b.id === buff.id);
		if (!buff?.duration) return

		if (existingBuff) {
			// Продлеваем баф
			existingBuff.expirationTime = Date.now() + buff.duration * 1000;
		} else {
			const expirationTime = Date.now() + buff.duration * 1000;
			const tempBuf : IBuff = {
				...buff,
				expirationTime,
			}
			selectedUpgradesValue.value[buff.effect.type] += buff.effect.value;
			activeTemporaryBuffs.value.push(tempBuf);
		}
	}

	function adjustBuffExpirationTimes(pauseDuration : number) {
		activeTemporaryBuffs.value.forEach((buff : IBuff) => {
			if (!buff?.expirationTime) return

			buff.expirationTime += pauseDuration;
		});
	}

	function updateTemporaryBuffs() {
		if (isPaused.value) {
			return;
		}

		const now = Date.now();

		activeTemporaryBuffs.value = activeTemporaryBuffs.value.filter((buff: IBuff) => {
			if (!buff?.expirationTime) return

			if (now >= buff.expirationTime) {
				activeTemporaryBuffs.value.filter((_b: IBuff) => _b.id !== buff.id);
				removeBuffEffect(buff);
				return false; // Удаляем баф из массива
			}
			return true;
		});
	}

	// Запускаем интервал для обновления временных бафов
	setInterval(updateTemporaryBuffs, 100);

	return {
		buffs,
		levelUpBuffs,
		selectedUpgrades,
		selectedUpgradesValue,
		selectedUpgradeIcons,
		activeTemporaryBuffs,
		getRandomBuffs,
		selectUpgrade,
		resetBuffs,
		adjustBuffExpirationTimes,
		applyBuff,
		addTemporaryBuff,
		removeBuffEffect,
		updateTemporaryBuffs,
	};
}
