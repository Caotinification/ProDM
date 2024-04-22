import { CharacterStats } from "./CharacterStats";

export class Character {
    readonly name: string;
    stats: CharacterStats = new CharacterStats();
    isAlive: boolean = true;

    constructor(name: string, stats?: CharacterStats) {
        this.name = name;
        this.stats = stats ?? this.stats;
    }
    
    addStats(stats: CharacterStats) {
        this.stats.combine(stats);
        return this;
    }

    scaleStats(scalar: number) {
        this.stats.scale(scalar);
        return this;
    }
}