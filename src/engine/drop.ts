import dropsData, { DROP_EFFECT } from '@/database/drops';
import HpIcon from '@/assets/images/drops/hp.png'
import ExperienceIcon from '@/assets/images/drops/experience.png'
import MeteorIcon from '@/assets/images/drops/meteor.png'
import {IBuffManager, IDrop, IEngine, IGameState} from "@/types";
import { DROP_IDS } from "@/database/drops";

const IMAGE_MAP = {
	[DROP_IDS.HEALTH_ELIXIR_SMALL]: HpIcon,
	[DROP_IDS.EXPERIENCE_ELIXIR_SMALL]: ExperienceIcon,
	[DROP_IDS.INVINCIBILITY_BUFF_SMALL_TEMP]: MeteorIcon,
}

/**
 * Загрузка данных дропа и их иконок
 */
export function loadDrops() : IDrop[] {
	return dropsData.map((drop: IDrop)=> {
		const icon : HTMLImageElement = new Image();

		icon.src = IMAGE_MAP[drop.icon]

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
	const { playerHP, experience } = gameState;
	const { addTemporaryBuff } = buff;

	if (!player) return

	const effect = drop.effect;

	switch (effect.type) {
		case DROP_EFFECT.PLAYER_INCREASE_HP:
			player.hp = Math.min(player.maxHp, player.hp + effect.value);
			playerHP.value = player.hp;
			break;
		case DROP_EFFECT.PLAYER_ADD_EXP:
			experience.value += effect.value;
			break;
		case DROP_EFFECT.PLAYER_DO_INVINCIBILITY:
			const targetBuff = buff.buffs.value.find(i => i.id === 'invincibility')
			if (!targetBuff) break;

			targetBuff.duration = effect.duration

			addTemporaryBuff(targetBuff);
			break;
		default:
			break;
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
