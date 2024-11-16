// src/engine/player.js

import playerImageSrc from '../assets/images/player.png';
import {IPlayer} from "@/types";

export function initPlayer(canvas : HTMLCanvasElement) : IPlayer {
	const playerImage = new Image();
	playerImage.src = playerImageSrc;

	const player = {
		x: canvas.width / 2,
		y: canvas.height / 2,
		radius: 20,
		width: 60,
		height: 60,
		color: 'white',
		shootInterval: 500, // Стреляет каждые 500мс
		lastShotTime: 0,
		attackRadius: 150, // Начальный радиус атаки
		image: playerImage,
		imageLoaded: false,
		angle: 0,
		accuracy: 0.6,
		hp: 100,
		maxHp: 100,
	};

	// Устанавливаем флаг загрузки изображения
	playerImage.onload = () => {
		player.imageLoaded = true;
	};

	return player;
}
