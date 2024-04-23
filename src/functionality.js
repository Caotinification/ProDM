let isSwordDropped = false;

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
    if (isSwordDropped) {
        retractSword(swordImg);
    } else {
        dropSword(swordImg);
    }
    isSwordDropped = !isSwordDropped;
}

function onDragonClick() {
    const dragonButton = document.getElementById('dragon-button');
    const diceContainer = document.getElementById('dice-container');
    // Toggle the "active" class on click
    dragonButton.classList.toggle('active');

    // Toggle the visibility of the dice container
    diceContainer.classList.toggle('hidden');
    diceContainer.classList.toggle('visible');
}