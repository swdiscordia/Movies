import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import{ Provider } from 'react-redux'
import { Image } from 'react-native'
import Store from './Store/configureStore'

import Search from './Components/Search/Search';
import FilmDetail from './Components/FilmDetail/FilmDetail'
import Favorites from './Components/Favorites/Favorites'
import appStyles from './app.style';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNav = () => (
  <Tab.Navigator 
    tabBarOptions={{
      showLabel: false, 
      activeBackgroundColor: '#DDD',
      inactiveBackgroundColor: '#FFF'
    }}>
      <Tab.Screen  
        name="Rechercher" 
        component={Search} 
        options={() => ({
          tabBarIcon: () => (
            <Image source={require('./images/ic_search.png')} style={appStyles.icon} />
          )
        })} 
      />
      <Tab.Screen 
        name="Favoris" 
        component={Favorites} 
        options={() => ({
          tabBarIcon: () => (
            <Image source={require('./images/ic_favorite.png')} style={appStyles.icon} />
          )
        })} 
      />
  </Tab.Navigator>
)

const App = () => (
  <Provider store={Store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TabNav" component={TabNav} />
        <Stack.Screen name="FilmDetail" component={FilmDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;