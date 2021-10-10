import React, { useContext } from 'react';
import {
  createDrawerNavigator,
  useDrawerProgress,
  DrawerContentScrollView,
  DrawerItemList,
  useDrawerStatus,
} from '@react-navigation/drawer';
import { View, Image, Text, StatusBar } from 'react-native';
import Animated from 'react-native-reanimated';
import Profile from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import COLORS from '../../const/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from './AuthProvider';

const Drawer = createDrawerNavigator();

const DrawerScreenContainer = ({ children }) => {
  const isDrawerOpen = useDrawerStatus();
  const progress = useDrawerProgress();
  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 25],
  });

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius,
        transform: [{ scale }],
        overflow: 'hidden',
      }}>
      <StatusBar
        backgroundColor={isDrawerOpen == 'open' ? COLORS.primary : COLORS.white}
        barStyle="dark-content"
      />
      {children}
    </Animated.View>
  );
};

const CustomDrawerContent = props => {
  const { user, logout } = useContext(AuthContext);
  return (
    <DrawerContentScrollView
      style={{
        paddingVertical: 30,
      }}>
      <View
        style={{
          marginLeft: 20,
          marginVertical: 40,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <Image
          source={{ uri: user.photoURL }}
          style={{ height: 70, width: 70, borderRadius: 40 }}
        />
        <Text
          style={{
            color: COLORS.white,
            fontWeight: 'bold',
            fontSize: 16,
            marginTop: 10,
          }}>
          {user.displayName}
        </Text>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {
          width: 200,
          backgroundColor: COLORS.primary,
        },
        overlayColor: null,
        drawerLabelStyle: {
          fontWeight: 'bold',
        },
        drawerActiveTintColor: COLORS.white,
        drawerInactiveTintColor: COLORS.secondary,
        drawerItemStyle: { backgroundColor: null },
        sceneContainerStyle: {
          backgroundColor: COLORS.primary,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        options={{
          title: 'HOME',
          drawerIcon: ({ color }) => (
            <Icon name="home" size={25} style={{ marginRight: -20, color }} />
          ),
        }}>
        {props => (
          <DrawerScreenContainer>
            <HomeScreen {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="ADD NOTES"
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="book-plus" size={25} style={{ marginRight: -20, color }} />
          ),
        }}>
        {props => (
          <DrawerScreenContainer>
            <HomeScreen {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="PROFILE"
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="account" size={25} style={{ marginRight: -20, color }} />
          ),
        }}>
        {props => (
          <DrawerScreenContainer>
            <Profile {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="FAVOURITES"
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="heart" size={25} style={{ marginRight: -20, color }} />
          ),
        }}>
        {props => (
          <DrawerScreenContainer>
            <HomeScreen {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="LOG OUT"
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="logout" size={25} style={{ marginRight: -20, color }} />
          ),
        }}>
        {props => (
          <DrawerScreenContainer>
            <HomeScreen {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
