import {IBuffManager, IBullet, IEnemy, IEngine} from "@/types";
import {BUFF_PROP} from "@/database/buffs";
import {settings} from "@/settings";

type TShootBulletParams = {
	engine: IEngine,
	buff: IBuffManager
}
export function shootBullet(params: TShootBulletParams) {
	const { engine, buff } = params
	const { player, enemies, bullets } = engine

	if (!player) return;

	const now = Date.now();
	const adjustedShootInterval = player.shootInterval / (1 + buff.selectedUpgradesValue.value[BUFF_PROP.SHOOT_SPEED]);
	if (now - player.lastShotTime < adjustedShootInterval) return;

	// Фильтруем врагов, находящихся в радиусе атаки
	const enemiesInRange = enemies.filter((enemy) => {
		if (enemy?.x === undefined || enemy?.y === undefined) return false;

		const dist = Math.hypot(enemy.x - player.x, enemy.y - player.y);
		return dist <= player.attackRadius;
	});

	if (enemiesInRange.length === 0) return; // Нет врагов в радиусе атаки

	player.lastShotTime = now;

	// Сортируем врагов по близости
	const sortedEnemies = enemiesInRange.sort((a : IEnemy, b : IEnemy) => {
		if (!a?.x || !a?.y || !b?.x || !b?.y) return 0;

		const distA = Math.hypot(a.x - player.x, a.y - player.y);
		const distB = Math.hypot(b.x - player.x, b.y - player.y);
		return distA - distB;
	});

	// Определяем количество целей
	const numTargets = 1 + buff.selectedUpgradesValue.value[BUFF_PROP.SHOOT_TARGETS];

	// Выбираем ближайших врагов
	const targets = sortedEnemies.slice(0, numTargets);

	// Устанавливаем угол поворота игрока к первой цели
	const primaryTarget = targets[0];
	let angleToTarget = 0
	if (primaryTarget?.x && primaryTarget?.y) {
		angleToTarget = Math.atan2(primaryTarget.y - player.y, primaryTarget.x - player.x);
	}

	player.angle = angleToTarget;

	player.accuracy = Math.min(1, player.accuracy + Number(buff.selectedUpgradesValue.value[BUFF_PROP.SHOOT_ACCURACY]));

	// Добавляем погрешность к углу стрельбы
	const accuracy = player.accuracy; // Значение от 0 до 1
	const maxDeviation = (1 - accuracy) * Math.PI / 4; // Максимальное отклонение (до 45 градусов)
	const randomDeviation = (Math.random() * 2 - 1) * maxDeviation; // Случайное отклонение

	const bulletData : IBullet = {
		x: player.x,
		y: player.y,
		width: 11,
		height: 22,
		speed: settings.player.shootingSpeed + buff.selectedUpgradesValue.value[BUFF_PROP.SHOOT_BULLET_SPEED],
		angle: 0,
		color: 'cyan',
		radius: 5, // Для проверки столкновений
		// Нет свойства target
	}

	// Добавляем погрешность к каждому снаряду
	const deviation = (Math.random() * 2 - 1) * maxDeviation;

	const shootInConBullets = buff.selectedUpgradesValue.value[BUFF_PROP.SHOOT_IN_CON_FORWARD]

	if (shootInConBullets > 0) {
		const totalProjectiles = 1 + shootInConBullets * 2; // Общее количество снарядов
		const angleSpread = 0.2 + 0.05 * shootInConBullets; // Общий угол разброса в радианах (можно настроить)
		const angleStep = angleSpread / (totalProjectiles - 1);

		angleToTarget += randomDeviation;

		// Генерируем углы для каждого снаряда
		const startAngle = angleToTarget - angleSpread / 2;

		for (let i = 0; i < totalProjectiles; i++) {
			bulletData.angle = startAngle + i * angleStep + deviation;

			bullets.push(bulletData);
		}
	} else {

		targets.forEach((enemy) => {
			if (enemy?.x === undefined || enemy?.y === undefined) return

			bulletData.angle = Math.atan2(enemy.y - player.y, enemy.x - player.x) + deviation;
			bulletData.target = enemy

			bullets.push(bulletData);
		});
	}
}
