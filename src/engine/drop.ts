import dropsData, { DROP_EFFECT } from '@/database/drops';
import {IBuffManager, IDrop, IEngine, IGameState} from "@/types";

/**
 * Загрузка данных дропа и их иконок
 */
export function loadDrops() : IDrop[] {
	return dropsData.map((drop: IDrop)=> {
		const icon : HTMLImageElement = new Image();

		icon.src = drop.icon ?? ''

		drop.iconImage = icon;

		return drop
	});
}

export function initDrops() : IDrop[] {
	return [];
}

type TApplyDropEffectParams = {
	drop: IDrop,
	engine: IEngine,
	gameState: IGameState,
	buff: IBuffManager,
}
/**
 * Применяем эффект дропа
 * @param {TApplyDropEffectParams} params
 */
export function applyDropEffect(params : TApplyDropEffectParams) {
	const { drop, engine, gameState, buff} = params
	const { player } = engine;
	if (!player) return

	const { playerHP, experience } = gameState;
	const { addTemporaryBuff } = buff;
	let targetBuff = null

	if (drop.effect.buff) {
		targetBuff = buff.buffs.value.find(i => i.id === drop.effect.buff)
		// buff.selectedUpgrades.value[drop.effect.type] += 1;
		//buff.selectedUpgradesValue.value[drop.effect.type] += drop.effect.value;
	} else {
		switch (drop.effect.type) {
			case DROP_EFFECT.PLAYER_INCREASE_HP:
				player.hp = Math.min(player.maxHp, player.hp + drop.effect.value);
				playerHP.value = player.hp;
				break;
			case DROP_EFFECT.PLAYER_ADD_EXP:
				experience.value += drop.effect.value;
				break;
		}
	}

	if (targetBuff && drop.effect.duration) {
		targetBuff.duration = drop.effect.duration;
		targetBuff.effect.value = drop.effect.value;
		addTemporaryBuff(targetBuff);
	}
}

type TCreateFloatingTextParams = {
	drop: IDrop,
	engine: IEngine,
}
/**
 * Создаем всплывающий текст
 * @param {TCreateFloatingTextParams} params
 */
export function createFloatingText(params: TCreateFloatingTextParams) {
	const { drop, engine } = params

	engine.floatingTexts.push({
		text: drop.pickupText || '',
		x: drop.x || 0,
		y: drop.y || 0,
		opacity: 1,
		lifespan: 1000,
		startTime: Date.now()
	});
}
