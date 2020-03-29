import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Incidents from './pages/Incidents';
import Detail from './pages/Detail';

const AppStack = createStackNavigator();



// import { Container } from './styles';

export default function src() {
  return (
    <NavigationContainer>

      <AppStack.Navigator screenOptions={{headerShown : false}}>

        <AppStack.Screen name="Incidents" component={Incidents}/>
        <AppStack.Screen name="Details" component={Detail}/>

      </AppStack.Navigator>

    </NavigationContainer>
  );
}
