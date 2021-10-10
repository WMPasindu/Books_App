import 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './AuthProvider';
import AuthStack from './AuthStack';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
      console.log("USER :::: " + JSON.stringify(user))
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <AppStack/> : <AuthStack/>}
    </NavigationContainer>
  );
};

export default Routes;
