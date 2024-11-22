import bulletImageSrc from '@/assets/images/bullet.png';
import {IBuffManager, IBullet, IEnemy, IEngine, IGameState, IInitBullets} from "@/types/engine.types";
import {BUFF_PROP} from "@/database/buffs";
import {isRandomChance} from "@/utils/helpers";
import {checkCollision} from "@/engine/collision";
import {handleEnemyCritHitVfx, handleEnemyDrop, handleEnemyDeathAudio, handleEnemyDeathVfx} from "@/engine/enemy";

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

type TBulletFlight = {
	bullet: IBullet,
	enemy: IEnemy,
	engine: IEngine,
	buff: IBuffManager,
	index: number,
	gameState: IGameState
}
/**
 * Полет пули и поведение при столкновении
 * @param params
 */
export function bulletFlight(params: TBulletFlight) {
	const { index, bullet, enemy, buff, engine, gameState } = params

	// Если пуля никого не касается
	if (!checkCollision(bullet, enemy)) return;

	// Если пуля находится в цели, которую она пробила насквозь
	if (bullet.penetrateTargetId === enemy._id) return;

	const bulletDamage = calculateBulletDamage({ buff })

	enemy.hp -= bulletDamage.damage

	bullet.bulletDamage = bulletDamage

	if (bulletDamage.isCritical) {
		handleEnemyCritHitVfx({ enemy, engine })
	}

	// Проверка сквозного пробития врага
	if (isThroughPenetration({ buff })) {
		bullet.penetrateTargetId = enemy._id
	} else {
		engine.bullets.splice(index, 1);
	}

	if (enemy.hp <= 0) {
		gameState.experience.value += enemy.experience;
		engine.enemies.splice(engine.enemies.indexOf(enemy), 1);

		// Обрабатываем выпадение дропа
		handleEnemyDrop({ enemy, engine });
		handleEnemyDeathVfx({ enemy, engine })
		handleEnemyDeathAudio({ engine })
	}
}


export type TBulletDamageType = {
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
		damage = basicDamage * (1 + _SU[BUFF_PROP.PLAYER_BULLET_CRITICAL_POWER])
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
