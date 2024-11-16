import {Ref, ref, computed, ComputedRef} from 'vue';
import buffsData from '@/database/buffs';
import {IActiveBuff, IBuff, IBuffManager} from "@/types";
import { RARE_WEIGHT } from '@/database/rare'
import { BUFFS_IDS, BUFF_PROP, BUFF_PROP_ICONS } from '@/database/buffs'

export function useBuffManager(isPaused: Ref<boolean>) : IBuffManager {
	// Реактивные переменные
	const buffs : Ref<IBuff[]> = ref([]);
	const levelUpBuffs = ref([]);
	const selectedUpgrades = ref({
		[BUFF_PROP.SHOOT_SPEED]: 0,
		[BUFF_PROP.SHOOT_DAMAGE]: 0,
		[BUFF_PROP.SHOOT_TARGETS]: 0,
		[BUFF_PROP.ENEMY_DETECTION_RADIUS]: 0,
		[BUFF_PROP.SHOOT_BULLET_SPEED]: 0,
		[BUFF_PROP.SHOOT_IN_CON_FORWARD]: 0,
		[BUFF_PROP.SHOOT_ACCURACY]: 0,
		[BUFF_PROP.PLAYER_INVINCIBLE]: 0,
	});
	const activeTemporaryBuffs : Ref<IBuff[]> = ref([]);

	// Значения бафов
	const shootSpeedIncrease = ref(0);
	const damageIncrease = ref(0);
	const additionalTargets = ref(0);
	const attackRadiusIncrease = ref(0);
	const bulletSpeedIncrease = ref(0);
	const coneShotLevel = ref(0);
	const playerSpeedMultiplier = ref(1);
	const isInvincible = ref(false);
	const accuracyIncrease = ref(0);

	/**
	 * Бафы и их влияние не игровой процесс
	 */
	function applyBuff(buff: IBuff) {
		const { effect, duration } = buff;

		switch (effect.type) {
			case BUFFS_IDS.SHOOT_SPEED:
				if (typeof effect.value === 'number') shootSpeedIncrease.value += effect.value;
				selectedUpgrades.value[BUFF_PROP.SHOOT_SPEED] += 1;
				break;
			case BUFFS_IDS.SHOOT_DAMAGE:
				if (typeof effect.value === 'number') damageIncrease.value += effect.value;
				selectedUpgrades.value[BUFF_PROP.SHOOT_DAMAGE] += 1;
				break;
			case BUFFS_IDS.SHOOT_MULTIPLE_TARGETS:
				if (typeof effect.value === 'number') additionalTargets.value += effect.value;
				selectedUpgrades.value[BUFF_PROP.SHOOT_TARGETS] += 1;
				break;
			case BUFFS_IDS.ENEMY_DETECTION_RADIUS:
				if (typeof effect.value === 'number') attackRadiusIncrease.value += effect.value;
				selectedUpgrades.value[BUFF_PROP.ENEMY_DETECTION_RADIUS] += 1;
				break;
			case BUFFS_IDS.SHOOT_BULLET_SPEED:
				if (typeof effect.value === 'number') bulletSpeedIncrease.value += effect.value;
				selectedUpgrades.value[BUFF_PROP.SHOOT_BULLET_SPEED] += 1;
				break;
			case BUFFS_IDS.SHOOT_IN_CON_FORWARD:
				if (typeof effect.value === 'number') coneShotLevel.value += effect.value;
				selectedUpgrades.value[BUFF_PROP.SHOOT_IN_CON_FORWARD] = coneShotLevel.value;
				break;
			case BUFFS_IDS.SHOOT_ACCURACY:
				if (typeof effect.value === 'number') accuracyIncrease.value += effect.value;
				selectedUpgrades.value[BUFF_PROP.SHOOT_ACCURACY] += 1;
				break;
			// Добавьте обработку других бафов
			default:
				break;
		}

		if (duration) {
			addTemporaryBuff(buff);
		}
	}

	/**
	 * Удаление бафов
	 */
	function removeBuffEffect(buff : IBuff) {
		const { effect } = buff;

		switch (effect.type) {
			// Отменяем эффекты временных бафов
			case BUFFS_IDS.SHOOT_SPEED:
				if (typeof effect.value === 'number') playerSpeedMultiplier.value -= effect.value;
				break;
			case BUFFS_IDS.PLAYER_INVINCIBILITY:
				isInvincible.value = false;
				break;
			default:
				break;
		}
	}

	// Загрузка бафов
	function loadBuffs() {
		buffs.value = buffsData.map((buff : IBuff) => {
			return {
				...buff,
				icon: `../assets/icons/${buff.icon}`,
			}
		});
	}
	loadBuffs();

	const selectedUpgradeIcons : ComputedRef<IActiveBuff[]> = computed(() => {
		const buffsArray = [];

		for (const item in selectedUpgrades.value) {
			if (selectedUpgrades.value[item] === 0) continue;

			buffsArray.push({
				icon: BUFF_PROP_ICONS[item],
				count: selectedUpgrades.value[item],
			});
		}

		// Добавляем временные бафы
		activeTemporaryBuffs.value.forEach((buff: IBuff) => {
			if (!buff?.expirationTime) return

			const remainingTime = Math.ceil((buff.expirationTime - Date.now()) / 1000);

			buffsArray.push({
				icon: buff.icon,
				count: remainingTime,
				isTemporary: true,
			});
		});

		return buffsArray;
	});

	function resetBuffs() {
		selectedUpgrades.value = {
			[BUFF_PROP.SHOOT_SPEED]: 0,
			[BUFF_PROP.SHOOT_DAMAGE]: 0,
			[BUFF_PROP.SHOOT_TARGETS]: 0,
			[BUFF_PROP.ENEMY_DETECTION_RADIUS]: 0,
			[BUFF_PROP.SHOOT_BULLET_SPEED]: 0,
			[BUFF_PROP.SHOOT_IN_CON_FORWARD]: 0,
			[BUFF_PROP.SHOOT_ACCURACY]: 0,
			[BUFF_PROP.PLAYER_INVINCIBLE]: 0,
		};

		shootSpeedIncrease.value = 0;
		damageIncrease.value = 0;
		additionalTargets.value = 0;
		attackRadiusIncrease.value = 0;
		bulletSpeedIncrease.value = 0;
		coneShotLevel.value = 0;
		accuracyIncrease.value = 0;
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

	function selectUpgrade(buffId: string) {
		const buff = levelUpBuffs.value.find((b: IBuff) => b.id === buffId);
		if (!buff) return;

		applyBuff(buff);

		levelUpBuffs.value = [];
		isPaused.value = false;
	}



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
		selectedUpgradeIcons,
		shootSpeedIncrease,
		damageIncrease,
		additionalTargets,
		attackRadiusIncrease,
		bulletSpeedIncrease,
		coneShotLevel,
		playerSpeedMultiplier,
		isInvincible,
		activeTemporaryBuffs,
		accuracyIncrease,
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
