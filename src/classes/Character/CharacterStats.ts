export enum Stat {STR = 'strength', DEX = 'dexterity', CON = 'constitution', INT = 'intelligence', WIS = 'wisdom', CHA = 'charisma'}

export class CharacterStats {
    private stats: Map<string, number> = new Map([
        [Stat.STR, 0],
        [Stat.DEX, 0],
        [Stat.CON, 0],
        [Stat.INT, 0],
        [Stat.WIS, 0],
        [Stat.CHA, 0]
    ]);

    constructor() {}

    get(stat: Stat | string) {
        return this.stats.get(stat);
    }

    set(stat: Stat | string, newValue: number) {
        return this.stats.set(stat, newValue);
    }

    *[Symbol.iterator](): Generator<[string, number], void, void> {
        for (let [statName, statValue] of this.stats){
            yield [statName, statValue];
        }
    }
    combine(that: CharacterStats): CharacterStats {
        for (let [statName, statValue] of that) {
            this.stats.set(statName, (this.stats?.get(statName) ?? 0) + statValue);
        }
        return this;
    }

    scale(scalar: number): CharacterStats {
        for (let [statName, _] of this) {
            this.stats.set(statName, (this.stats?.get(statName) ?? 0) * scalar);
        }
        return this;
    }
}