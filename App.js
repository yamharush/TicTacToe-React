import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';

export default function TicTacToe() {
    const [board, setBoard] = useState([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],]);
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [result, setResult] = useState('');

    function handleMove(row, col) {
        const newBoard = [...board];
        if (newBoard[row][col] === '') {
            newBoard[row][col] = currentPlayer;
            setBoard(newBoard);
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        }

        checkForWin();
    }

    function checkForWin() {
        // check rows
        for (let i = 0; i < 3; i++) {
            if (
                board[i][0] !== '' &&
                board[i][0] === board[i][1] &&
                board[i][1] === board[i][2]
            ) {
                startNewGame(board[i][0]);
                return;
            }
        }

        // check columns
        for (let i = 0; i < 3; i++) {
            if (
                board[0][i] !== '' &&
                board[0][i] === board[1][i] &&
                board[1][i] === board[2][i]
            ) {
                startNewGame(board[0][i]);
                return;
            }
        }

        // check diagonals
        if (
            board[0][0] !== '' &&
            board[0][0] === board[1][1] &&
            board[1][1] === board[2][2]
        ) {
            startNewGame(board[0][0]);
            return;
        }
        if (
            board[0][2] !== '' &&
            board[0][2] === board[1][1] &&
            board[1][1] === board[2][0]
        ) {
            startNewGame(board[0][2]);
            return;
        }

        // check for draw
        let isDraw = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    isDraw = false;
                }
            }
        }
        if (isDraw) {
            startNewGame('No one');
        }
    }

    function startNewGame(winner) {
        setBoard([
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ]);
        setCurrentPlayer('X');
        setResult('The Winner is ' + winner);
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={result}
                editable={false}
            />
            {board.map((rows, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {rows.map((col, colIndex) => (
                        <View key={colIndex} style={styles.cell}>
                            {col === '' ? (
                                <TouchableOpacity
                                    style={styles.empty}
                                    onPress={() => handleMove(rowIndex, colIndex)}
                                />
                            ) : col === 'X' ? (
                                <Image
                                    style={styles.image}
                                    source={require('./images/x.png')}
                                />
                            ) : (
                                <Image
                                    style={styles.image}
                                    source={require('./images/o.png')}
                                />
                            )}
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd',
    },
    input: {
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        borderWidth: 1,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    empty: {
        width: 80,
        height: 80,
    },
    image: {
        width: 80,
        height: 80,
    },
});
