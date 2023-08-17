import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon, UserIcon, ViewColumnsIcon } from 'react-native-heroicons/solid';
import HomeScreen from './screens/HomeScreen';
import useAuth from './hooks/useAuth';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import Onboarding from './screens/OnboardingScreen';

type Props = {}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const StackNavigator = (props: Props) => {

    const { user } = useAuth();

    const MainStack = () => (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }}/>
        </Stack.Navigator>
      );

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === 'Main') {
                    iconName = 'home';
                } else if (route.name === 'Profile') {
                    iconName = 'user';
                } else if (route.name === 'Dashboard'){
                    iconName = 'dashboard';
                }

                return iconName === 'home' ? (
                    <HomeIcon /* name={iconName} */ size={size} color={"#00ADB5"} />
                ) : iconName === 'dashboard' ? (
                    <ViewColumnsIcon /* name={iconName} */ size={size} color={"#00ADB5"} />
                ): iconName === 'user' ? (
                    <UserIcon /* name={iconName} */ size={size} color={"#00ADB5"} />
                ): null},
            })}
        >
        {user ? ( 
            <>
                <Tab.Screen name="Main" component={MainStack} options={{ headerShown: false, title: "Home", tabBarInactiveTintColor:"#111", tabBarActiveTintColor:"#00ADB5" }}/>
                <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false, title: "Dashboard", tabBarInactiveTintColor:"#111", tabBarActiveTintColor:"#00ADB5" }}/>
                <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false, title: "Profile", tabBarInactiveTintColor:"#111", tabBarActiveTintColor:"#00ADB5" }}/>
            </>
        )  : (
            <Tab.Screen name="Login" component={LoginScreen} options={{ headerShown: false,  tabBarStyle:{display:"none"}}}/> 
        )}
    </Tab.Navigator>
    )
}

export default StackNavigator