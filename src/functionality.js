class UnitError extends Error {}

const tolerance = 0.01;
/*
    DICE
*/
class Dice {
    #pmf = new Array();
    #cdf = new Array();
    constructor(numSides, weights) {
        this.sides = numSides;
        this.#pmf = weights ? weights : new Array(numSides).fill(1/numSides)
        let unitSum = this.#pmf.reduce((acc, x) => acc + x)
        if (Math.abs(1 - unitSum) >= tolerance) {
            throw new UnitError('Sum of weights does not equal 1.');
        }
        this.#cdf = this.#pmf.map((sum => value => sum += value)(0));
    }

    roll() {
        return this.#cdf.findIndex(el => Math.random() <= el) + 1;
    }

    toString() {
        return `D${this.sides}`
    }
}
/*
    EventNode
*/
const DELIMITER = '\t';

class InvariantViolation extends Error {}
class SelfLoopViolation extends Error {}

class EventNode {

    constructor(name, description) {
        this.name = name;
        this.description = description ?? this.description;
    }
    
    add(newEvent) {
        if (newEvent === this){
            throw new SelfLoopViolation(`Attempt to add a self loop on ${this.name}.`)
        }
        this.#invariant(newEvent);
        return this.outcomes.set(newEvent.name, newEvent);
    }

    remove(newEvent) { // add and remove accept different types. TODO: possible redesign?
        return this.outcomes.delete(newEvent);
    }

    *[Symbol.iterator]() {
        yield* this.#preorder(0);
    }

    generateLevels(){ // organize nodes by depth where array idx is depth, and array members are nodes at that depth
        let levels = new Array();
        for (const [outcome, depth] of this) {
            levels[depth] = levels[depth] ? levels[depth]: new Array();
            levels[depth].push(outcome);
        }
        return levels;
    }

    getSize() { // returns total number of nodes and connections
        let [numNodes, numConnections] = [0,0];
        for (const [outcome, _] of this) {
            numNodes++;
            numConnections += outcome.outcomes.size;
        }
        return [numNodes, numConnections];
    }

    toString() { // represent tree as string. shows overall structure. indentation depth for each node reflects its actual depth 
        let s = '';
        for (const [outcome, depth] of this) {
            s = s.concat(`${DELIMITER.repeat(depth)}${outcome.name}\n`);
        }
        return s;
    }

    #invariant(newest) { // for a connected tree, the number of connections is always one less than the number of nodes.
        let [numNodes, numConnections] = this.getSize();
        numNodes += 1; //newest counts as one
        numConnections += newest.outcomes.size + 1; // newest may have connections as well, plus 1 for a simulated connection

        if (numConnections != numNodes - 1) { // |E| = |V| - 1
            throw new InvariantViolation(`An invariant violation has occurred with the addition of ${newest.name} to ${this.name}.`); // TODO: make this error more descriptive
        }
    }

    *#preorder(depth = 0){ // preorder traversal with depth tracking
        yield [this, depth];
        if (this.outcomes.size > 0) {
            for (const outcome of this.outcomes.values()) {
                yield* outcome.preorder(depth + 1);
            }
        }
    }
}


/*
    Event Creator Menu
*/
function dropSword(swordImg) {
    swordImg.classList.add('dropped');
}

function retractSword(swordImg) {
    swordImg.classList.remove('dropped');
    swordImg.classList.add('retracted');
    setTimeout(() => {
        swordImg.classList.remove('retracted');
    }, 1000);
}

function onSwordClick() {
    const swordImg = document.getElementById('sword');
    swordImg.classList.contains('dropped') ? retractSword(swordImg) : dropSword(swordImg);
}

/*
    Scenario Menu
*/
function onPullTabClick() {
    const pullTab = document.getElementById('pulltab-container');
    const sceneMenuContainer = document.getElementById('scene-menu-container');

    if (!pullTab.classList.contains('open')) {
        pullTab.classList.add('open');
        sceneMenuContainer.classList.add('open');
    } else {
        pullTab.classList.remove('open');
        sceneMenuContainer.classList.remove('open');
    }
}

/*
    Dice Menu
*/
let selectedDice = [];
const rollHistory = JSON.parse(localStorage.getItem('rollHistory') || '{}');

function onDragonClick() {
    const dragonButton = document.getElementById('dragon-button');
    const diceContainer = document.getElementById('dice-container');
    const resultLabel = document.getElementById('result');

    // Toggle the "active" class on click
    dragonButton.classList.toggle('active');

    // Toggle the visibility of the dice container
    diceContainer.classList.toggle('hidden');
    diceContainer.classList.toggle('visible');
    resultLabel
}

function updateSelectedDiceDisplay() {
    document.getElementById("result").innerText = `Rolling: ${selectedDice.join(' + ')}`;
}

function addDie(numSides) {
    let newDice = new Dice(numSides);
    selectedDice.push(newDice);
    updateSelectedDiceDisplay();
}

function rollDice() {
    const resultLabel = document.getElementById('result');
    if (selectedDice.length === 0) {
        resultLabel.innerText = 'No dice selected.';
        return;
    }
    const timestamp = new Date().toLocaleString();
    let totalResult = selectedDice.reduce((sum, nextDie) => sum + nextDie.roll(), 0);
    rollHistory[timestamp] = totalResult;
    
    localStorage.setItem('rollHistory', JSON.stringify(rollHistory));
    resultLabel.innerText = `Total Result: ${totalResult}`;
    
    selectedDice = [];
    
}