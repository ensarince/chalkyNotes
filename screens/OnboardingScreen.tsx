import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'react-native-heroicons/solid';
import * as ImagePicker from 'expo-image-picker';
import { RadioButton } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/firestore';

type Props = {};

function dataURItoBlob(dataURI: string) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);
  
  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  
  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  
    return new Blob([ia], { type: mimeString });
  }

const Onboarding = (props: Props) => {
  const [name, setName] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [about, setAbout] = useState<string>('')
  const [steps, setSteps] = useState(0);

  const db = firestore();


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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
  
    if (!result.canceled) {
      let imgBlob = dataURItoBlob(result.assets[0].uri);
      let profileImage: string = `data:${result.assets[0].type};base64,${result.assets[0].base64}`;
      setProfileImage(profileImage);
    }
  };

  const styles = {
    radioButtonLabel: tw`text-gray-700`,
    radioButton: tw`bg-white  rounded-md p-2 m-1`,
  };
  const handleSubmit = async () => {
    try {
      const formData = {
        first_name: name,
        url: profileImage,
        age: age, 
        gender: gender,
        about: about, 
      };

      await db.collection('users').doc().set(formData, { merge: true });
      //navigation.navigate('Dashboard'); // Navigate to the dashboard after updating profile
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <View style={tw`flex-1 items-center justify-center bg-white p-4`}>
      <Text style={tw`text-2xl font-bold text-center mt-20`}>Create Your Profile</Text>
      <View style={tw`flex-1 items-center justify-center bg-white p-4`}>
        {steps === 0 &&
        <>
          <Text style={tw`text-lg font-bold mb-4 italic  text-[#00ADB5]`}>Your Name</Text>
          <TextInput
            placeholder="Doober Dinklefingers"
            value={name}
            onChangeText={setName}
            style={tw`border-b-2 border-gray-400 mb-4 px-4 py-2 w-80 h-10 mt-10`}
          />
        </>
        }      
        {
          steps === 1 &&
          <>
            {!profileImage &&
              <Text style={tw`text-lg font-bold mb-4 italic  text-[#00ADB5]`}>Upload Profile Picture</Text>
            }
            <TouchableOpacity
              style={tw`bg-[#00ADB5] w-24 h-24 rounded-full overflow-hidden mb-4`}
              onPress={pickImage}
            >
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={tw`w-full h-full`} resizeMode="cover" />
              ) : (
                <Ionicons name="person-circle-outline" size={96} color="white" />
              )}
            </TouchableOpacity>
          </>
        }
        {
          steps === 2 &&
          <>
            <Text style={tw`text-lg font-bold mb-4 italic  text-[#00ADB5]`}>Your Age</Text>
            <TextInput
              placeholder="Too young to die"
              value={age}
              onChangeText={setAge}
              style={tw`border-b-2 border-gray-400 mb-4 px-4 py-2 w-80 h-10 mt-10`}
            />
          </>
        }
        {steps === 3 &&
          <>
            <Text style={tw`text-lg font-bold mb-4 italic text-[#00ADB5]`}>Gender</Text>
              <RadioButton.Group
                onValueChange={setGender}
                value={gender}
              >
                <RadioButton.Item
                  label="Man"
                  value="man"
                  labelStyle={styles.radioButtonLabel}
                  style={styles.radioButton}
                  color="#00ADB5"
                />
                <RadioButton.Item
                  label="Woman"
                  value="woman"
                  labelStyle={styles.radioButtonLabel}
                  style={styles.radioButton}
                  color="#00ADB5"
                />
                <RadioButton.Item
                  label="Other"
                  value="other"
                  labelStyle={styles.radioButtonLabel}
                  style={styles.radioButton}
                  color="#00ADB5"

                />
              </RadioButton.Group>
          </>
        }
        {
          steps === 4 &&
          <>
          <Text style={tw`text-lg font-bold mb-4 italic text-[#00ADB5]`}>About you and your climbing:</Text>
          <TextInput
            multiline
            placeholder="I like climbing with socks and cure depression with monkey action."
            value={about}
            onChangeText={setAbout}
            style={tw`border-b-2 border-gray-400 px-4 py-2 w-80 h-40 mt-20`}
          />
          </>
        }
      </View>

          
        <View style={tw`flex flex-row justify-evenly gap-10 w-80 mt-30 items-center`}>
          {steps !== 0 &&
            <TouchableOpacity
            style={tw`bg-[#00ADB5] p-2 rounded-md`}
            onPress={handlePrevious}
            >
                <ArrowLeftCircleIcon size={40} color={"#fff"}/>
            </TouchableOpacity>
          }
          {steps === 4 && about !== '' &&
              <TouchableOpacity
                style={tw`bg-[#CD6688] flex items-center justify-center w-32 px-8 py-3 h-15 rounded-md`}
                onPress={handleSubmit}
              >
                <Text style={tw`text-white text-lg font-semibold`}>Submit</Text>
              </TouchableOpacity>
            }
          {steps !== 4 &&
            <TouchableOpacity
            style={tw`bg-[#00ADB5] p-2 rounded-md`}
            onPress={handleContinue}
            >
              <ArrowRightCircleIcon size={40} color={"#fff"}/>
            </TouchableOpacity>
          }
        </View>
    </View>
  );
};

export default Onboarding;
