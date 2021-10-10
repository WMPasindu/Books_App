import 'react-native-gesture-handler';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            // options={{
            //   title: 'Register', //Set Header Title
            //   headerStyle: {
            //     backgroundColor: '#307ecc', //Set Header color
            //   },
            //   headerTintColor: '#fff', //Set Header text color
            //   headerTitleStyle: {
            //     fontWeight: 'bold', //Set Header text style
            //   },
            // }}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      );
};

export default AuthStack;