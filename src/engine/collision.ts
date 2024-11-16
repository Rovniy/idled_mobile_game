// src/engine/collision.js

export function checkCollision(obj1 : any, obj2 : any) {
	const dist = Math.hypot(obj1.x - obj2.x, obj1.y - obj2.y);
	const radiusSum = (obj1.radius || obj1.width / 2) + (obj2.radius || obj2.width / 2);
	return dist < radiusSum;
}
