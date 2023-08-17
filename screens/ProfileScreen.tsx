import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Cog6ToothIcon } from 'react-native-heroicons/solid';

type Props = {};


type RootStackParamList = {
    Home: undefined;
    Dashboard: undefined;
    Profile: undefined
    Onboarding: undefined
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>; 

const ProfileScreen = (props: Props) => {

const navigation = useNavigation<HomeScreenNavigationProp>();

  // Sample user profile data and achievements
  const userProfile = {
    username: 'climber123',
    fullName: 'John Doe',
    email: 'john@example.com',
    profileImage: require('../assets/img/profile.png'), // Replace with actual image
  };

  const climbingAchievements = [
    'Completed 100 Climbs',
    'Reached V5 Bouldering Grade',
    'Conquered El Capitan',
    // Add more achievements
  ];
  

  return (
    <View style={tw`h-full w-full items-center justify-start bg-[#00ADB5] gap-5`}>
        <TouchableOpacity
            style={tw`bg-[#00ADB5] mt-15 w-24 h-24 rounded-full overflow-hidden mb-4`}
            onPress={() => navigation.navigate("Onboarding")}
        >
            {userProfile?.profileImage ? 
            (
                <Image source={userProfile.profileImage} style={tw`w-full h-full`} resizeMode="cover" />
            ) : (
                <Ionicons name="person-circle-outline" size={96} color="white" />
            )}
        </TouchableOpacity>
            <Cog6ToothIcon /* name={iconName} */ size={36} style={tw`z-100 absolute right-8 top-20`} color={"#fff"} />

        <Text style={tw`text-white text-lg mt-2`}>{userProfile.fullName}</Text>
        <Text style={tw`text-gray-300`}>{userProfile.username}</Text>
        <Text style={tw`text-gray-300`}>{userProfile.email}</Text>

        <View style={tw`bg-white rounded-lg p-4 mt-4 mx-4 w-98`}>
            <Text style={tw`text-gray-700 text-lg font-semibold mb-2`}>Climbing Achievements</Text>
            {climbingAchievements.map((achievement, index) => (
                <Text key={index} style={tw`mb-1`}>
                    <Ionicons name="checkmark-circle-outline" size={16} color="green" /> {achievement}
                </Text>
            ))}
        </View>

        <TouchableOpacity
            style={tw`bg-white rounded-lg p-4 mt-4 mx-4 w-98`}
            onPress={() => {
            /* Implement navigation to settings screen */
            }}
        >
            <Text style={tw`text-gray-700 text-lg font-semibold`}>Settings</Text>
        </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
