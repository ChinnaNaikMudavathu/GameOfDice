import React, { useState } from 'react';
import { Text, View, Modal, ToastAndroid, TextInput, TouchableOpacity } from 'react-native';
import styles from './index.style';

const AskNumberOfPlayers = (props) => {
    const { updateNMValues } = props || {};

    const [numOfPlayers, setNumOfPlayers] = useState(null);
    const [minPoint, setMinPoint] = useState(null);

    const onRequestClose = () => {
        ToastAndroid.show('Please enter N and M values', ToastAndroid.LONG);
    };

    const updateNumberOfPlayers = (N) => {
        setNumOfPlayers(N)
    };
    const updateMinWinPoint = (M) => {
        setMinPoint(M)
    };
    const handleOnPressStartGame = () => {
        if(numOfPlayers && minPoint) {
            updateNMValues({N: parseInt(numOfPlayers), M: parseInt(minPoint)})
        } else {
            alert('Please provide N and M values');  
        }
    }
    return (
        <Modal
            visible={true}
            onRequestClose={onRequestClose}
            onDismiss={onRequestClose}
            transparent={true}
        >
            <View
                style={styles.container}
            >
                <View
                    style={styles.contentContainer}
                >
                    <TextInput
                        placeholder='Please enter N value(Number of players)'
                        value={numOfPlayers}
                        keyboardType='numeric'
                        onChangeText={(N) => updateNumberOfPlayers(N)}
                        style={styles.inputStyle}
                    />
                    <TextInput
                        placeholder='Please enter M value(Mininum win point)'
                        value={minPoint}
                        keyboardType='numeric'
                        onChangeText={(M) => updateMinWinPoint(M)}
                        style={styles.inputStyle}
                    />
                    <TouchableOpacity
                        onPress={handleOnPressStartGame}
                        style={styles.buttonContainer}
                    >
                        <Text style={styles.buttonText}>Start Game</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
};

export default AskNumberOfPlayers;