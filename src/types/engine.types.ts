import {ComputedRef, Ref} from "vue";
import {TBulletDamageType} from "@/engine/bullet";
import {TSpawnBossLogic, TSpawnEnemy} from "@/types/engine/enemy.types";
import {spawnBossLogic} from "@/engine/enemy";
import {ITelegram} from "@/types/composable/telegram.types";

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
        value: number,
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
    _id?: number, // Локальный ID. Ставится при создании врага в виде timestamp
    x?: number,
    y?: number,
    id?: string,
    boss?: boolean,
    name: string,
    hp: number,
    maxHP?: number,
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
    _id?: number,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    radius: number,
    angle: number,
    speed: number,
    target?: any,
    bulletDamage?: TBulletDamageType,
    penetrateTargetId?: number | null
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
        value: number,
    },
    expirationTime?: number,
}

export interface IInitBullets {
    bullets: IBullet[],
    bulletImage: HTMLImageElement,
    bulletImageLoaded: boolean
}

export interface IActiveBuff {
    id?: string,
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
    width?: number,
    height?: number,
    image: HTMLImageElement,
    opacity: number,
    lifetime: number,
}

export interface ICriticalEffect {
    x: number,
    y: number,
    width?: number,
    height?: number,
    image: HTMLImageElement,
    opacity: number,
    lifetime: number,
}

export interface ISelectedUpgrades {
    [key: string]: number
}

export interface ISelectedUpgradesValue {
    [key: string]: number,
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
    passingTime: Ref<number>,
    score: Ref<number>
}

export interface IProgress {
    enemyHP: number,
    enemyDamage: number
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
    telegramApi: ITelegram,
    progress: IProgress,
    spawnInterval: number,
    spawnTimeout: ReturnType<typeof setTimeout>|undefined,
    player: IPlayer|null,
    puffEffects: IPuffEffect[],
    criticalEffect: ICriticalEffect[],
    enemyHPIncreaseCoefficient?: number,
    audioManager: IAudioManager,
    spawnBossLogic: (params: TSpawnBossLogic) => void,
}

export interface IInitGameResponse {
    engine: IEngine,
    resetGame: () => void,
    handleClick: (coords: { x: number; y: number }) => void,
}
