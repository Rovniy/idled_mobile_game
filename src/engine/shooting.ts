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
		if (enemy?.x === undefined || enemy?.width === undefined || enemy?.y === undefined) return false;

		const dist = Math.hypot(enemy.x - player.x, enemy.y - player.y);

		// Добавляем enemy.width, чтобы стрелять во врагов, которые только пересекают радиус огня
		return (dist - enemy.width / 2) <= player.attackRadius;
	});

	if (enemiesInRange.length === 0) return; // Нет врагов в радиусе атаки

	player.lastShotTime = now;

	// Сортируем врагов по близости
	const sortedEnemies = enemiesInRange.sort((a : IEnemy, b : IEnemy) => {
		if (a?.x === undefined || a?.y === undefined || b?.x === undefined || b?.y === undefined) return 0;

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
	const maxDeviation = (1 - player.accuracy) * Math.PI / 4; // Максимальное отклонение (до 45 градусов)
	const deviation = (Math.random() * 2 - 1) * maxDeviation;

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

	const shootInConBullets = buff.selectedUpgradesValue.value[BUFF_PROP.SHOOT_IN_CON_FORWARD]

	targets.forEach((_enemy) => {
		if (_enemy?.x === undefined || _enemy?.y === undefined) return

		if (shootInConBullets > 0) {
			const totalProjectiles = 1 + shootInConBullets * 2; // Общее количество снарядов
			const angleSpread = 0.2 + 0.5 * shootInConBullets; // Общий угол разброса в радианах (можно настроить)
			const angleStep = angleSpread / (totalProjectiles - 1);

			angleToTarget += deviation;

			// Генерируем углы для каждого снаряда
			const startAngle = angleToTarget - angleSpread / 2;

			for (let i = 0; i < totalProjectiles; i++) {
				bulletData.angle = startAngle + i * angleStep + deviation;
				bulletData._id = Date.now()

				bullets.push({ ...bulletData });
			}
		} else {
			bulletData.angle = Math.atan2(_enemy.y - player.y, _enemy.x - player.x) + deviation;
			bulletData._id = Date.now()
			bulletData.target = _enemy

			bullets.push({ ...bulletData });
		}
	});
}
