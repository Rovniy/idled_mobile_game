class AudioManager {
	constructor() {
		this.sounds = {};
	}

	loadSound(name, src) {
		const audio = new Audio(src)
		audio.volume = .05;

		this.sounds[name] = audio;
	}

	playSound(name) {
		if (this.sounds[name]) {
			this.sounds[name].currentTime = 0; // Перематываем в начало для повторного воспроизведения
			this.sounds[name].play();
		}
	}
}

export const AUDIO = {
	ENEMY_DEATH: 'ENEMY_DEATH'
}

export function initAudion() {
	const manager = new AudioManager();

	manager.loadSound(AUDIO.ENEMY_DEATH, '/src/assets/audio/enemy_death.mp3');

	return manager
}
