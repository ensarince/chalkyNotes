import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import useAuth from '../hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

//! app has three screens: 'Home', 'Dashboard', and 'Profile'. Each screen has a corresponding route key in the RootStackParamList.

type RootStackParamList = {
  Home: undefined;
  Dashboard: undefined;
  Profile: undefined
};

//!When you specify 'Home' in the StackNavigationProp type for the HomeScreen, you are indicating that the type is specifically tailored to the navigation object of the HomeScreen
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>; 


const HomeScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={tw`h-full w-full flex items-center justify-center bg-[#00ADB5]`}>
        <View style={tw`pt-15 flex items-center gap-5 p-5`}>
          <Ionicons name="person-circle" size={64} color="white" />
          <Text style={tw`text-white text-2xl font-bold text-center`}>
            Welcome,{'\n'}
            {user?.email}
          </Text>
        </View>
        <View style={tw`mt-10 p-4 bg-white rounded-3xl mx-4 w-98`}>
          <Text style={tw`text-gray-700 text-lg font-semibold mb-2 text-center`}>
            Your Recent Climbs
          </Text>
          {/* Display a list of recent climbs here */}
        </View>
        {/* <TouchableOpacity
          style={tw`p-2 mt-3 bg-white left-2 rounded-3xl w-48 items-center`}
          onPress={() => {navigation.navigate("Dashboard") 
          }}
        >
          <Text style={tw`text-[#00ADB5] font-semibold text-lg`}>View Dashboard</Text>
        </TouchableOpacity> */}
    </View>
  );
};

export default HomeScreen;
