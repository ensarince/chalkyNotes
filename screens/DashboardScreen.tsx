import React from 'react';
import { View, Text, ScrollView, Image, ImageBackground } from 'react-native';
import tw from 'twrnc';

type Props = {};

const DashboardScreen = (props: Props) => {
  // Sample climbing statistics and recent climbs data
  const climbingStatistics = {
    totalClimbs: 125,
    averageGrade: '5.10',
    successRate: '85%',
  };

  const recentClimbs = [
    {
      id: '1',
      date: '2023-08-01',
      location: 'Rocky Peak',
      grade: '5.9',
    },
    {
      id: '2',
      date: '2023-07-28',
      location: 'Climb City Gym',
      grade: '5.11',
    },
    // Add more recent climbs
  ];

  return (
    <ScrollView contentContainerStyle={tw`h-full w-full items-center justify-start bg-[#00ADB5]`}>
      <ImageBackground
        source={require('../assets/img/dashboard.png')}
        style={tw`h-full w-full`}
      >
        <View style={tw`bg-white mt-15 rounded-lg p-4 mx-2`}>
          <Text style={tw`text-gray-700 text-lg font-semibold mb-2`}>Climbing Statistics</Text>
          <View style={tw`flex-row justify-between items-center mb-2`}>
            <Text>Total Climbs: {climbingStatistics.totalClimbs}</Text>
            <Text>Average Grade: {climbingStatistics.averageGrade}</Text>
            <Text>Success Rate: {climbingStatistics.successRate}</Text>
          </View>
        </View>
        <View style={tw`bg-white rounded-lg p-4 mt-4 mx-2`}>
          <Text style={tw`text-gray-700 text-lg font-semibold mb-2`}>Recent Climbs</Text>
          {recentClimbs.map((climb) => (
            <View key={climb.id} style={tw`flex-row justify-between items-center mb-2`}>
              <View>
                <Text>{climb.date}</Text>
                <Text>{climb.location}</Text>
              </View>
              <Text>{climb.grade}</Text>
            </View>
          ))}
        </View>
      </ImageBackground>
      {/* <Image
        source={require('../assets/img/dashboard.png')} // Add your dashboard image
        style={tw`mt-4 w-80 h-60`}
        resizeMode="cover"
      /> */}
    </ScrollView>
  );
};

export default DashboardScreen;
