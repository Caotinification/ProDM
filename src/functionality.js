class UnitError extends Error { }

const tolerance = 0.01;
/** 
 * Dice Menu
*/
class Dice {
    #pmf = new Array();
    #cdf = new Array();
    constructor(numSides, weights) {
        this.sides = numSides;
        this.#pmf = weights ? weights : new Array(numSides).fill(1 / numSides)
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
/** 
 * EventNode
*/
const DELIMITER = '\t';

class InvariantViolation extends Error { }
class SelfLoopViolation extends Error { }

class EventNode {
    
    description = "";
    coverImage = null;
    
    #outcomes = new Map();
    constructor(name, description, coverImage) {
        this.name = name;
        this.description = description ?? this.description;
        this.coverImage = coverImage;
    }

    add(newEvent) {
        if (newEvent === this) {
            throw new SelfLoopViolation(`Attempt to add a self loop on ${this.name}.`)
        }
        this.#invariant(newEvent);
        return this.#outcomes.set(newEvent.name, newEvent);
    }

    remove(newEvent) { // add and remove accept different types. TODO: possible redesign?
        return this.#outcomes.delete(newEvent);
    }

    *[Symbol.iterator]() {
        yield* this.#preorder(0);
    }

    generateLevels() { // organize nodes by depth where array idx is depth, and array members are nodes at that depth
        let levels = new Array();
        for (const [outcome, depth] of this) {
            levels[depth] = levels[depth] ? levels[depth] : new Array();
            levels[depth].push(outcome);
        }
        return levels;
    }

    getSize() { // returns total number of nodes and connections
        let [numNodes, numConnections] = [0, 0];
        for (const [outcome, _] of this) {
            numNodes++;
            numConnections += outcome.#outcomes.size;
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
        numConnections += newest.#outcomes.size + 1; // newest may have connections as well, plus 1 for a simulated connection

        if (numConnections != numNodes - 1) { // |E| = |V| - 1
            throw new InvariantViolation(`An invariant violation has occurred with the addition of ${newest.name} to ${this.name}.`); // TODO: make this error more descriptive
        }
    }

    *#preorder(depth = 0) { // preorder traversal with depth tracking
        yield [this, depth];
        if (this.#outcomes.size > 0) {
            for (const outcome of this.#outcomes.values()) {
                yield* outcome.#preorder(depth + 1);
            }
        }
    }
}


/** 
 * Event Creator Menu
*/
function onPullTab2Click() {
    const pullTab2 = document.getElementById('pulltab2-container');
    const eventsMenuContainer = document.getElementById('events-menu-container');

    pullTab2.classList.toggle('open');
    eventsMenuContainer.classList.toggle('open');
}

/** 
 * Scenario Menu
*/
function onPullTabClick() {
    const pullTab = document.getElementById('pulltab-container');
    const sceneMenuContainer = document.getElementById('scene-menu-container');

    pullTab.classList.toggle('open');
    sceneMenuContainer.classList.toggle('open');
}

function onPlusButtonClick() {
    const eventCardsContainer = document.getElementById('event-cards-container');

    const eventCardsImg = document.createElement('img');
    eventCardsImg.src = './assets/eventCards.png';
    eventCardsImg.alt = 'Event Cards';

    eventCardsContainer.innerHTML = '';
    eventCardsContainer.appendChild(eventCardsImg);
    eventCardsContainer.style.display = eventCardsContainer.style.display === 'none' ? 'block' : 'none';
}


function onEventMakerButtonClick() {
    const eventMakerModal = document.getElementById("eventMakerModal");
    eventMakerModal.style.display = "block";
}

function onEventMakerSpanClick() {
    const eventMakerModal = document.getElementById("eventMakerModal");
    eventMakerModal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == eventMakerModal) {
        eventMakerModal.style.display = "none";
    }
}

/**
 * Scenes
 */


document.addEventListener('DOMContentLoaded', () => {
    const scenarioButtons = document.querySelectorAll('.select-scenario-btn');

    scenarioButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const selectedScenario = document.querySelectorAll('.scenario')[index];
            const scenarioTitle = selectedScenario.querySelector('.scenario-title').textContent;
            const scenarioNarration = selectedScenario.querySelector('.scenario-narration').textContent;
            // OVER HERE IS WHERE THE CALL TO SAVE/ADD THE SCENARIO FROM THE SCENARIO MENU TO THE CURRENT NODE SHOULD BE WRITTEN!
            console.log(`Selected Scenario: ${scenarioTitle}`);
            console.log(`Narration: ${scenarioNarration}`);

        });
    });
})

// Form submission handling
let storyNodes = new Map();

function onNewEventSubmission(event) {
    event.preventDefault(); // Prevent default form submission

    const eventsContainer = document.getElementById('events-container');

    // Retrieve form data
    const title = document.getElementById("title").value;
    const narration = document.getElementById("narration").value;
    const image = document.getElementById("image").files[0];


    if (storyNodes.has(title)) {
        alert(`${title} already exists as a story event.`)
        return;
    }

    let newEventHTML = document.getElementById('baseEvent').cloneNode(true);
    let children = newEventHTML.children;
    newEventHTML.id = `event-${title}`;
    children[0].innerText = title;
    children[1].innerText = narration;
    children[2].src = image.path;
    
    storyNodes[title] = new EventNode(title, narration, image);
    eventsContainer.appendChild(newEventHTML);
    newEventHTML.hidden = false;
    // Close the modal
    eventMakerModal.style.display = "none";
}

/** 
 * Dice Menu
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

/**
 * Roll History Menu
 */

function showHistory() { // shows roll history
    var historyList = document.getElementById("historyList");
    historyList.innerHTML = "";

    for (const timestamp in rollHistory) {
        const listItem = document.createElement("li");
        listItem.textContent = `${timestamp}: ${rollHistory[timestamp]}`;
        historyList.appendChild(listItem);
    }

    historyModal.style.display = "block";
}

function onHistoryModalClick() {
    let historyModal = document.getElementById("historyModal");
    let historyModalSpan = historyModal.getElementsByClassName("close")[0];

}

function onHistoryModalSpanClick() {
    historyModal.style.display = "none";
}

window.onclick = function (event) { // if user clicks anywhere but the modal, close it
    if (event.target == historyModal) {
        historyModal.style.display = "none";
    }
}

window.addEventListener('beforeunload', () => {
    localStorage.removeItem('rollHistory');
});

