import {IAudioManager} from "@/types";

type TSound = {
	[key: string]: HTMLAudioElement
}

class AudioManager {
	sounds: TSound = {}

	loadSound(name: string, src: string) {
		const audio : HTMLAudioElement = new Audio(src)
		audio.volume = .05;

		this.sounds[name] = audio;
	}

	playSound(name: string) {
		if (!this.sounds[name]) return

		this.sounds[name].currentTime = 0; // Перематываем в начало для повторного воспроизведения
		return this.sounds[name].play();
	}
}

export const AUDIO = {
	ENEMY_DEATH: 'ENEMY_DEATH'
}

export function initAudion() {
	const manager : IAudioManager = new AudioManager();

	manager.loadSound(AUDIO.ENEMY_DEATH, '/src/assets/audio/enemy_death.mp3');

	return manager
}
