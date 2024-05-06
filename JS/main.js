
document.querySelector('.control-buttons span').onclick = startingGame;

function startingGame() {

    let yourName = prompt('Please, write your name');

    if (yourName == null || yourName == '') {

        document.querySelector('.name span').innerHTML = "Unknown";
        
    } else {

        document.querySelector('.name span').innerHTML = yourName;
        
    }

    document.querySelector('.control-buttons').remove();
    
}
// all elements which has class [has-matched];
let allFinishedBlocks = document.getElementsByClassName('has-matched');

// Effect duration;
let duration = 500;

// Select blocks container;
let blocksContainer = document.querySelector('.memory-game-blocks');

// Create array from game blocks;
let blocks = Array.from(blocksContainer.children);

// Create range of keys;
// let orderRange = [...Array(blocks.length).keys()];           Method [1]

let orderRange = Array.from(Array(blocks.length).keys());     //Method [2]

// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);

// Add order Css property to game blocks;
blocks.forEach((block, index) => {

    // Add css order property;
    block.style.order = orderRange[index];
    
    
    // Add Click event;
    block.addEventListener('click', function(){

        // Trigger the flip block function;
        flipBlock(block);
        
    });
    
});


// if all blocks are taken class [is-flipped];
setInterval(() => {
    if (allFinishedBlocks.length == blocks.length) {

        gameFinished();
    } 
}, 100);

// Flip block function;
function flipBlock(selectBlock) {

    // Add class is-flipped;
    selectBlock.classList.add('is-flipped');
    
    // Collect all flip cards;
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    
    // If there are two flippedBlocks;
    if (allFlippedBlocks.length === 2) {

        // console.log(`You've Just Flipped two cards Thaer`);
        // Stop clicking function;
        stopClicking();

        // Check matched block function;
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
        
    }
    
}

// function construction [Shuffle];
function shuffle(array) {

    let current = array.length,
        temp,
        random;

    // calling Array's items decreasingly;
    while (current > 0) {

        // get random number
        random = Math.floor(Math.random() * current);
        
        // Decrease number by one;
        current--;

        // [1] - Save current element in stash;
        temp = array[current];

        // [2] - Current element = random element;
        array[current] = array[random];

        // [3] - Random element = get element from stash;
        array[random] = temp;
        
    }
    
    return array;
    
}

// function construction [stopClicking];
function stopClicking() {

    // add class no clicking on main container;
    blocksContainer.classList.add('no-clicking');
    
    setTimeout(()=> {

        // Remove class after duration;
        blocksContainer.classList.remove('no-clicking');
    }, duration);
    
}

// function construction [check matched blocks];
function checkMatchedBlocks(firstBlock, secondBlock) {

    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-matched');
        secondBlock.classList.add('has-matched');

        document.getElementById('success').play();
        
    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1
        
        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

        }, duration);

        document.getElementById('fail').play();
        
    }
    
}

// function construction [gameFinished];
function gameFinished() {

    // variable for tires;
    let toWin = parseInt(document.querySelector('.info-container .tries span').innerHTML);
    let heading =  document.querySelector('.game-finished h1');
    // Appering cover page when finished;
    document.querySelector('.game-finished').classList.add('apper');
    console.log(toWin);
    console.log(heading);
    // Adding the rate of the player;
    if (toWin >= 5) {

        heading.innerHTML = 'Good';
        
    } else if (toWin >= 15) {
        
        heading.innerHTML = 'Bad';

    } else {

        heading.innerHTML = 'Excellent';
        
    }

    // Adding faild tries of the player;
    document.querySelector('.game-finished span').innerHTML = toWin;

    // activating buttons;
    document.getElementById('button-no').onclick = function() {
        
        window.close();
        
    }

    document.getElementById('button-yes').onclick = function() {
        
        document.querySelector('.game-finished').classList.remove('apper');

        startingGame();
        
    }

}