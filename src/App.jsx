
import { useEffect, useState } from 'react';

import React from 'react'
import './App.css'

import Square from './Square/square.jsx'

const renderFrom = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
const opponent = "rani";

const App = () => {
    const [gameState, setGameState] = useState(renderFrom);
    const [currentPlayer, setCurrentPlayer] = useState('circle');
    const [finishState, setFinishState] = useState('false');

    const checkWinner = () => {
        // Check rows
        for (let i = 0; i < gameState.length; i++) {
            if (
                gameState[i][0] === gameState[i][1] &&
                gameState[i][1] === gameState[i][2] &&
                gameState[i][0] !== null // Check for non-null value
            ) {
                return gameState[i][0];
            }
        }

        // Check columns
        for (let i = 0; i < gameState[0].length; i++) {
            if (
                gameState[0][i] === gameState[1][i] &&
                gameState[1][i] === gameState[2][i] &&
                gameState[0][i] !== null // Check for non-null value
            ) {
                return gameState[0][i];
            }
        }

        // Check diagonals
        if (
            (gameState[0][0] === gameState[1][1] && gameState[1][1] === gameState[2][2] && gameState[0][0] !== null) ||
            (gameState[0][2] === gameState[1][1] && gameState[1][1] === gameState[2][0] && gameState[0][2] !== null)
        ) {
            return gameState[1][1];
        }

        return null;
    }


    useEffect(() => {
        const winner = checkWinner();
        if (winner === 'circle' || winner === 'cross') {
            setCurrentPlayer(winner);
            setFinishState(true);
            console.log(winner);
        }
    }, [gameState]);

    return (
        <div className='container'>
            <div className="move-detection">
                <div className="left">raju</div>
                <div className="right">{opponent}</div>
            </div>
            <h1 className='game-heading'>Tic Tac Toe</h1>
            <div className='squares-box'>
                {
                    gameState.map((arr, rowindex) =>
                        arr.map((e, colindex) => {
                            return <Square
                                finishState={finishState}
                                setFinishState={setFinishState}
                                currentPlayer={currentPlayer}
                                setCurrentPlayer={setCurrentPlayer}
                                gameState={gameState}
                                setGameState={setGameState}
                                id={rowindex * 3 + colindex}
                                key={rowindex * 3 + colindex}
                            />
                        })
                    )
                }
            </div>
            {
                finishState &&
                (<div className="footer">{currentPlayer} won the game</div>)
            }
        </div>
    )
}

export default App
