import React, { useEffect, useState } from "react";
import { View, Dimensions, Text } from 'react-native';
import AskNumberOfPlayers from "./components/AskMembers";
import MainScreen from "./components/MainScreen";

const App = () => {
  const [nmValues, setMNvalues] = useState(null);
  const renderMainScreen = () => {
    return (
      <View>
        <View style={{  height: 80, backgroundColor: '#9092D7', justifyContent: 'center', alignItems: 'center' }}>
            <Text
                style={{ fontSize: 50, color: '#ffffff', textAlign: 'center' }}
            >Dice Game</Text>
        </View>
        <MainScreen  nmValues={nmValues} updateNMValues={setMNvalues}/>
      </View>
    )
  };
  return (
    <View style={{ width: Dimensions.get('screen').width}}>
      {nmValues ?  renderMainScreen() : <AskNumberOfPlayers updateNMValues={setMNvalues} />}
    </View>
  )
}
export default App;
