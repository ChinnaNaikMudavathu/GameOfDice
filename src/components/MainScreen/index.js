import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, ToastAndroid, Image } from 'react-native';
import RNShake from 'react-native-shake';

import { DICE1, DICE2, DICE3, DICE4, DICE5, DICE6 } from '../../assets/diceImages';
import styles from './index.style';

const MainScreen = (props) => {
    const { nmValues, updateNMValues } = props || {};
    const { N, M } = nmValues || {};
    const [playersDetails, setPlayersDetails] = useState([]);
    const [currentUser, setCurrentUser] = useState(1);
    const [previousDice, setPreviousDice] = useState(0);
    const [dice, setDice] = useState(0);
    const [rankOrder, setRankOrder] = useState(1);

    useEffect(() => {
        const initialPlayersDetails = new Array(N).fill(null).map((_,index) => {
            return {player: index + 1, score: 0, rank: 0, isValidPlayer: true}
        });
        setPlayersDetails(initialPlayersDetails);

        const subscribeShake = RNShake.addListener(onRollDice)
        return () => {
          subscribeShake.remove();
        };
    }, []);

    const onRollDice = () => {
        const randomDice = Math.floor(Math.random() * 6);
          setPreviousDice(dice);
          setDice(randomDice + 1);
    };

    useEffect(() => {
        if(dice) {
            let winPlayersCount = 0;
            let isWin = false;
            const updatePlayersScore = playersDetails.map((eachPlayer, _) => {
                const { player, score, rank } = eachPlayer || {};
                
                if(player === currentUser){
                    const totalScore = score + dice;
                    const isNotValidPlayer = previousDice === 1 && dice === 1;
                    if(isNotValidPlayer) { // Dice two time 1's so user is not valid rest of the game.
                        return {...eachPlayer, isValidPlayer: false};
                    } else {
                        isWin = score >= M;
                        return {...eachPlayer, score: score >= M ? score : totalScore, rank: score >= M ? rankOrder : rank};
                    }
                } else {
                    return eachPlayer;
                }
            });
            updatePlayersScore.forEach((eachPlayer) => {
                if(eachPlayer.score >= M) {
                    winPlayersCount +=1;
                }
            })
            if(winPlayersCount === updatePlayersScore.length) {
                ToastAndroid.show('Game over', ToastAndroid.LONG);
                updateNMValues(null);
            } else {
                if(isWin) {
                    setRankOrder(rankOrder + 1);
                }
                let movePlayer = 0;
                if(currentUser < updatePlayersScore.length) { // Find next active user
                    for(let i = currentUser ; i < updatePlayersScore.length && movePlayer === 0 ; i++) {
                        if(updatePlayersScore[i].score < M) {
                            movePlayer = updatePlayersScore[i].player;
                        }
                    };
                } else {
                    if(movePlayer === 0) {
                        for(let j = 0 ; j < currentUser - 1 && movePlayer === 0 ; j++) {
                            if(updatePlayersScore[j].score < M) {
                                movePlayer = updatePlayersScore[j].player;
                            }
                        };
                    }
                }
                if(dice != 6) {
                    setCurrentUser(movePlayer);
                }
            }
            setPlayersDetails(updatePlayersScore);

        }
    }, [dice]);

    const renderPlayers = ({ item, _ }) => {
        const { player, score, isValidPlayer } = item || {};
        const isWin = score >= M;
        const activeColor = !isValidPlayer ? 'BECFC1': isWin ? '#32B401' : currentUser === player ? 'blue' : 'orange';
        return (
            <View
                style={[styles.player, {backgroundColor: activeColor}]}
            >
                <Text style={{color: '#ffffff'}}>{`Player: ${player}`}</Text>
                <Text style={{color: '#ffffff'}}>{`score: ${score}`}</Text>
                <Text style={{color: '#ffffff'}}>{`rank: ${isWin ? rankOrder : 0}`}</Text>
                { isWin && <Text style={{color: '#ffffff'}}>Win</Text>}
            </View>
        )
    };
    const renderDice = () => {
        switch (dice) {
            case 1:
                return <Image style={styles.diceImage} source={DICE1}/>;
            case 2:
                return <Image style={styles.diceImage} source={DICE2}/>;
            case 3:
                return <Image style={styles.diceImage} source={DICE3}/>;
            case 4:
                return <Image style={styles.diceImage} source={DICE4}/>;
            case 5:
                return <Image style={styles.diceImage} source={DICE5}/>;
            case 6:
                return <Image style={styles.diceImage} source={DICE6}/>;
            default:
                return <Image style={styles.diceImage} source={DICE1}/>;
        }
    };
    return (
        <View>
            {renderDice()}
            <View style={styles.container}>
                <FlatList
                    data={playersDetails}
                    keyExtractor={(item,index) => item.player+index}
                    extraData={playersDetails}
                    renderItem={renderPlayers}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    style={styles.flatList}
                />
            </View>
        </View>
        
    )
};

 export default MainScreen;