const DELIMITER = '\t';

class InvariantViolation extends Error {}
class SelfLoopViolation extends Error {}

export class EventNode {
    readonly name: string;
    description: string = '';
    outcomes: Map<string, EventNode> = new Map();

    constructor(name: string, description?: string) {
        this.name = name;
        this.description = description ?? this.description;
    }
    
    add(newEvent: EventNode) {
        if (newEvent === this){
            throw new SelfLoopViolation(`Attempt to add a self loop on ${this.name}.`)
        }
        this.invariant(newEvent);
        return this.outcomes.set(newEvent.name, newEvent);
    }

    remove(newEvent: string) { // add and remove accept different types. TODO: possible redesign?
        return this.outcomes.delete(newEvent);
    }

    *[Symbol.iterator](): Generator<[EventNode, number], void, void> {
        yield* this.preorder(0);
    }

    generateLevels(): Array<Array<EventNode>> { // organize nodes by depth where array idx is depth, and array members are nodes at that depth
        let levels: Array<Array<EventNode>> = new Array();
        for (const [outcome, depth] of this) {
            levels[depth] = levels[depth] ? levels[depth]: new Array();
            levels[depth].push(outcome);
        }
        return levels;
    }

    getSize(): [number, number] { // returns total number of nodes and connections
        let [numNodes, numConnections] = [0,0];
        for (const [outcome, _] of this) {
            numNodes++;
            numConnections += outcome.outcomes.size;
        }
        return [numNodes, numConnections];
    }

    toString(): string { // represent tree as string. shows overall structure. indentation depth for each node reflects its actual depth 
        let s: string = '';
        for (const [outcome, depth] of this) {
            s = s.concat(`${DELIMITER.repeat(depth)}${outcome.name}\n`);
        }
        return s;
    }

    private invariant(newest: EventNode): void { // for a connected tree, the number of connections is always one less than the number of nodes.
        let [numNodes, numConnections] = this.getSize();
        numNodes += 1; //newest counts as one
        numConnections += newest.outcomes.size + 1; // newest may have connections as well, plus 1 for a simulated connection

        if (numConnections != numNodes - 1) { // |E| = |V| - 1
            throw new InvariantViolation(`An invariant violation has occurred with the addition of ${newest.name} to ${this.name}.`); // TODO: make this error more descriptive
        }
    }

    private *preorder(depth: number = 0): Generator<[EventNode, number], void, void>{ // preorder traversal with depth tracking
        yield [this, depth];
        if (this.outcomes.size > 0) {
            for (const outcome of this.outcomes.values()) {
                yield* outcome.preorder(depth + 1);
            }
        }
    }
}