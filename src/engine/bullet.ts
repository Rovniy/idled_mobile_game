import bulletImageSrc from '@/assets/images/bullet.png';
import {IBuff, IBuffManager, IInitBullets} from "@/types";
import {BUFF_PROP} from "@/database/buffs";
import {isRandomChance} from "@/utils/helpers";

export function initBullets() : Promise<IInitBullets> {
	return new Promise((resolve) => {
		const bulletImage = new Image();
		bulletImage.src = bulletImageSrc;
		let bulletImageLoaded = false;

		bulletImage.onload = () => {
			resolve({
				bullets: [],
				bulletImage,
				bulletImageLoaded,
			})
		};
	})
}

type TBulletDamageType = {
	damage: number,
	basicDamage: number,
	isCritical: boolean
}
type TCalculatePlayerOutgoingDamageParams = {
	buff: IBuffManager
}
/**
 * Определение финального урона снаряда
 * @param params
 */
export function calculateBulletDamage(params: TCalculatePlayerOutgoingDamageParams) : TBulletDamageType {
	let damage = 0

	const { buff } = params;
	const _SU = buff.selectedUpgradesValue.value

	let basicDamage = 1 + _SU[BUFF_PROP.SHOOT_DAMAGE];
	damage = basicDamage

	// Расчет критического урона
	const isCriticalHit = isRandomChance(_SU[BUFF_PROP.PLAYER_BULLET_CRITICAL_CHANCE])
	if (isCriticalHit) {
		damage = basicDamage * _SU[BUFF_PROP.PLAYER_BULLET_CRITICAL_POWER]
	}

	return {
		damage,
		basicDamage,
		isCritical: isCriticalHit
	}
}

type TCheckPenetrationDestructionParams = {
	buff: IBuffManager
}
/**
 * Определяем шанс пробития врага насквозь
 * @param params
 * @return boolean - True, если пробили насквозь
 */
export function isThroughPenetration(params: TCheckPenetrationDestructionParams) {
	const { buff } = params
	const MAX_PENETRATION = 10
	const playerPenetrationRate = buff.selectedUpgradesValue.value[BUFF_PROP.PLAYER_BULLET_PENETRATION]

	const penetration = Math.min(Math.max(playerPenetrationRate, 0), MAX_PENETRATION);
	const penetrationChance = (penetration / MAX_PENETRATION) * 100;

	return Math.random() * 100 < penetrationChance;
}
