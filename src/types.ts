import {ComputedRef, Ref} from "vue";
import { BUFF_PROP } from "@/database/buffs";

export interface IDrop {
    x?: number,
    y?: number,
    id: string,
    name?: string,
    description?: string,
    icon?: string,
    iconImage?: HTMLImageElement,
    duration?: number,
    effect: {
        type: string,
        value: number|boolean,
        buff?: string,
        duration?: number
    },
    pickupText?: string,
    remainingTime?: number,
    isBlinking?: boolean
}

export interface IFloatingText {
    text: string,
    x: number,
    y: number,
    opacity: number,
    lifespan: number,
    startTime: number
}

type TEnemyDrop = {
    id: string,
    chance: number,
}
export interface IEnemy {
    x?: number,
    y?: number,
    id: string,
    boss?: boolean,
    name: string,
    hp: number,
    damage: number,
    speed: number,
    experience: number,
    image?: string|HTMLImageElement,
    imageLoaded?: boolean,
    width?: number,
    height?: number,
    rotate?: number,
    drops: TEnemyDrop[],
    wobble?: {
        offset: number,
        intensity: number,
        speed: number
    }
}

export interface IBullet {
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    radius: number,
    angle: number,
    speed: number,
    target?: any
}

export interface IPlayer {
    x: number,
    y: number,
    radius: number,
    width: number,
    height: number,
    color: string,
    shootInterval: number, // Стреляет каждые 500мс
    lastShotTime: number,
    attackRadius: number, // Начальный радиус атаки
    image: HTMLImageElement,
    imageLoaded: boolean,
    angle: number,
    accuracy: number,
    hp: number,
    maxHp: number,
}

export interface IBuff {
    id: string,
    name: string,
    description: string,
    icon: string,
    rarity: string,
    duration?: number,
    effect: {
        type: string,
        value: number|boolean,
    },
    expirationTime?: number,
}

export interface IInitBullets {
    bullets: IBullet[],
    bulletImage: HTMLImageElement,
    bulletImageLoaded: boolean
}

export interface IActiveBuff {
    icon: string,
    count: number,
    isTemporary?: boolean,
}

export interface IAudioManager {
    sounds: {
        [key: string]: HTMLAudioElement
    };
    loadSound(name: string, src: string): void;
    playSound(name: string): void;
}

export interface IPuffEffect {
    x: number,
    y: number,
    image: HTMLImageElement,
    opacity: number,
    lifetime: number,
}

export interface ISelectedUpgrades {
    [BUFF_PROP.SHOOT_ACCURACY]: number,
    [BUFF_PROP.SHOOT_BULLET_SPEED]: number,
    [BUFF_PROP.SHOOT_IN_CON_FORWARD]: number,
    [BUFF_PROP.SHOOT_SPEED]: number,
    [BUFF_PROP.PLAYER_INVINCIBLE]: number,
    [BUFF_PROP.ENEMY_DETECTION_RADIUS]: number,
    [BUFF_PROP.SHOOT_TARGETS]: number,
    [BUFF_PROP.SHOOT_DAMAGE]: number,
}

export interface ISelectedUpgradesValue {
    [BUFF_PROP.SHOOT_ACCURACY]: number,
    [BUFF_PROP.SHOOT_BULLET_SPEED]: number,
    [BUFF_PROP.SHOOT_IN_CON_FORWARD]: number,
    [BUFF_PROP.SHOOT_SPEED]: number,
    [BUFF_PROP.PLAYER_INVINCIBLE]: boolean,
    [BUFF_PROP.ENEMY_DETECTION_RADIUS]: number,
    [BUFF_PROP.SHOOT_TARGETS]: number,
    [BUFF_PROP.SHOOT_DAMAGE]: number,
}

export interface IBuffManager {
    buffs: Ref<IBuff[]>,
    levelUpBuffs: Ref<IBuff[]>,
    selectedUpgrades: Ref<ISelectedUpgrades>,
    selectedUpgradesValue: Ref<ISelectedUpgradesValue>,
    selectedUpgradeIcons: ComputedRef<IActiveBuff[]>,
    activeTemporaryBuffs: Ref<IBuff[]>,
    getRandomBuffs: (count: number) => IBuff[],
    selectUpgrade: (buffId: string) => unknown,
    resetBuffs: () => unknown,
    adjustBuffExpirationTimes: (pauseDuration : number) => unknown,
    applyBuff: (buff: IBuff) => unknown,
    addTemporaryBuff: (buff : IBuff) => unknown,
    removeBuffEffect: (buff : IBuff) => unknown,
    updateTemporaryBuffs: () => unknown,
}

export interface IGameState {
    level: Ref<number>,
    experience: Ref<number>,
    experienceToNextLevel: Ref<number>,
    isPaused: Ref<boolean>,
    levelUpOptions: Ref<boolean>,
    playerHP: Ref<number>,
    isGameOver: Ref<boolean>,
}

export interface IEngine {
    ctx: CanvasRenderingContext2D|null
    canvas: HTMLCanvasElement,
    floatingTexts: IFloatingText[],
    backgroundImage: HTMLImageElement,
    allDrops: IDrop[],
    drops: IDrop[],
    enemies: IEnemy[],
    bullets: IBullet[],
    bulletImage: HTMLImageElement,
    bulletImageLoaded: boolean,
    loadedEnemies: IEnemy[],
    spawnInterval: number,
    spawnTimeout: ReturnType<typeof setTimeout>|undefined,
    player: IPlayer|null,
    puffEffects: IPuffEffect[],
    audioManager: IAudioManager
}

export interface IInitGame {
    resetGame: () => void,
    handleClick: (coords: { x: number; y: number }) => void,
}
