import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'react-native-heroicons/solid';

type Props = {};

const Onboarding = (props: Props) => {
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [steps, setSteps] = useState(0)


  const handleChooseProfileImage = () => {
    // Implement image picker logic here
  };

  const handleContinue = () => {
    if(steps < 5){
      setSteps(steps + 1)
    }else return;
  };

  const handlePrevious = () => {
    if(steps > 0){
      setSteps(steps - 1)
    }else return;
  };

  return (
    <View style={tw`flex-1 items-center justify-center bg-white p-4`}>
      <Text style={tw`text-2xl font-bold text-center mt-20`}>Create Your Profile</Text>
      <View style={tw`flex-1 items-center justify-center h-50 bg-white p-4`}>
        {steps === 0 &&
          <TextInput
            placeholder="Enter your name"
            onChangeText={setName}
            style={tw`border-b-2 border-gray-400 mb-4 px-4 py-2 w-80`}
          />
        }      
        {
          steps === 1 &&
          <>
            <Text style={tw`text-lg font-bold mb-4`}>Upload Profile Picture</Text>
            <TouchableOpacity
              style={tw`bg-[#00ADB5] w-24 h-24 rounded-full overflow-hidden mb-4`}
              onPress={handleChooseProfileImage}
            >
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={tw`w-full h-full`} resizeMode="cover" />
              ) : (
                <Ionicons name="person-circle-outline" size={96} color="white" />
              )}
            </TouchableOpacity>
          </>
        }
      </View>
        <View style={tw`flex flex-row justify-between w-80 mt-30 items-center`}>
          <TouchableOpacity
            style={tw`bg-[#00ADB5] p-2 rounded-md`}
            onPress={handlePrevious}
          >
              <ArrowLeftCircleIcon size={40} color={"#fff"}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-[#00ADB5] p-2 rounded-md`}
            onPress={handleContinue}
          >
            <ArrowRightCircleIcon size={40} color={"#fff"}/>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default Onboarding;
