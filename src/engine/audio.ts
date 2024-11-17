class AudioManager {
	sounds = {}

	constructor() {
		this.sounds = {};
	}

	loadSound(name: string, src: string) {
		const audio = new Audio(src)
		audio.volume = .05;

		this.sounds[name] = audio;
	}

	playSound(name: string) {
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
