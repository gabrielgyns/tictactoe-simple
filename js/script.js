// alert('Hello Tic Tac Toe');

const state = {
    possibleWinnings: [
        ['sqr-1', 'sqr-2', 'sqr-3'], // row-1
        ['sqr-4', 'sqr-5', 'sqr-6'], // row-2
        ['sqr-7', 'sqr-8', 'sqr-9'], // row-3
        ['sqr-1', 'sqr-4', 'sqr-7'], // column-1
        ['sqr-2', 'sqr-5', 'sqr-8'], // column-2
        ['sqr-3', 'sqr-6', 'sqr-9'], // column-3
        ['sqr-1', 'sqr-5', 'sqr-9'], // diagonal-1
        ['sqr-3', 'sqr-5', 'sqr-7'], // diagonal-2
    ],    
    isCircle: false, // To track who is playing: X or O
    haveWinner: false // To track if someone has won.
}

const clearBoardAndStats = () => {
    // Reset board
    const squares = document.getElementsByClassName('sqr');
    for (let sqr of squares) sqr.textContent = ''

    // Reset "Whose turn is it"
    document.getElementById('label-whose-turn').innerHTML = 'Whose turn is it? <span id="whose-turn">X</span>'

    // Reset status
    state.isCircle = false;
    state.haveWinner = false;
}

const makeAMove = (el) => {
    const clickedElement = document.getElementsByClassName(el)[0];
    
    let { isCircle } = state;

    if (!clickedElement.textContent && !state.haveWinner) {
        // Set the X or O
        clickedElement.textContent = isCircle ? 'O' : 'X';
        
        // Set "Whose turn is it" to "X" or "O" 
        document.getElementById('whose-turn').textContent = isCircle ? 'X' : 'O';

        // Check if someone WON on this move.
        checkWin();

        // Check if is DRAW
        checkDraw();

        // Change the state of the game
        state.isCircle = !isCircle;
    }
}

const checkWin = () => {
    let result;
    let weHaveAWinner = false;

    for (let possibility of state.possibleWinnings) {
        result = possibility.map(item => document.getElementsByClassName(item)[0]?.textContent); // Get the text of each possible of wining
        result = result.join(''); // Create a string with the elements of an array

        weHaveAWinner = result === 'XXX' || result === 'OOO' ? true : false;
        
        if (weHaveAWinner) {
            document.getElementById('label-whose-turn').textContent = `O player ${state.isCircle ? 'O' : 'X'} ganhou!!`;

            state.haveWinner = true;
        };
    }
}

const checkDraw = () => {
    if (!state.haveWinner) {
        const elements = document.getElementsByClassName('sqr');

        let emptyPositions = 9;

        for (const el of elements) {
            if (el.textContent !== '') emptyPositions--; 
        }

        if (emptyPositions === 0) document.getElementById('label-whose-turn').textContent = 'Deu empate aí em!!';
    }
}
