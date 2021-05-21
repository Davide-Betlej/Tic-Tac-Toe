// Będziemy przetrzymywac tablicę gameboard w obiekcie Gameboard. 
// Gracze również będą obiektami
// Utworzyć kontroler (sprawdzający warunek zwycięstwa po każdym ruchu)
// Przetrzymywać jak najmniej globalnego kodu jak to możliwe...
// ... ukrywać je w factory function albo w modules.
// Jezeli potrzebujesz czegoś 'jedynie raz' (gameboard, controller)...
// uzyj Modules, jezeli więcej (np. graczy) twórz ich za pomocą ...
// factory functions. 

// Utworzyć JS który będzie renderował zawartość tablicy na stronie.

// Utworzyć funkcję która pozwala graczowi postawić odpowiedni symbol..
// na boardzie i połączyć ją z DOM. (Pamiętaj o logice)

// Utworzyć logikę która sprawdza wygraną lub remis.


// player creation factory function
const createPlayer = (name, sign) => {
    return {name, sign}
};

// gameboard object
const gameBoard = (() => {

    // generating the board
    let gameboardArr = [];
    for (let i = 0; i < 9; i++) {
        gameboardArr.push('');
    }

    // rendering squares from the array
    let squareContainer = document.querySelector('#gameDisplay');

    gameboardArr.forEach((item, index) => {
        const newSquare = document.createElement('div')
        newSquare.className = 'square'
        squareContainer.appendChild(newSquare)
    })


    // add the marks
    Array.from(squareContainer.children).forEach((newSquare, index) => {
        newSquare.addEventListener('click', function flip() {
            // displays the active player's sign
            newSquare.innerHTML= gameController.activePlayer.sign
            newSquare.setAttribute('data', gameController.activePlayer.sign)
            // updates the array
            gameboardArr[index] = gameController.activePlayer.sign;
            // removing the event listener
            newSquare.removeEventListener('click', flip)
            // update the remaining moves
            gameController.remainingMoves -= 1;
            // check for the winner
            // gameController.checkWin();
            // checking the remaining moves
            if (gameController.winner == false) {
                if (gameController.remainingMoves > 0) {
                    gameController.nextPlayer();
                } else if (gameController.remainingMoves == 0) {
                    gameController.declareTie();
                }
            }
        })
    })


    return {gameboardArr};
})();

// controller object
const gameController = (() => {

    // creating players
    const playerOne = createPlayer('Player1', 'X')
    const playerTwo = createPlayer('Player2', 'O')

    // default values
    let activePlayer = playerOne;
    let winner = false;
    let remainingMoves = 9;

    // selector
    let tieBox = document.querySelector('.text-container');

    //next player
    function nextPlayer() {
        this.activePlayer === playerOne ? this.activePlayer = playerTwo : this.activePlayer = playerOne;
        console.log('Active player: ' + activePlayer.name);
    }

    function declareTie() {
        tieBox.innerHTML = 'It\'s a tie!'
    }

    return {
        activePlayer,
        remainingMoves,
        nextPlayer,
        winner,
        declareTie
    }
})();