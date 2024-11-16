import bulletImageSrc from '../assets/images/bullet.png';
import { IInitBullets } from "@/types";

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
