import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import * as WebBrowser from 'expo-web-browser';
import useAuth from '../hooks/useAuth';
import { User as FirebaseUser } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';

type Props = {};

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = (props: Props) => {
  const { updateUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user: FirebaseUser = userCredential.user;
        updateUser(user);
      })
      .catch((error) => {
        console.error('Error signing up:', error);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user: FirebaseUser = userCredential.user;
        updateUser(user);
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  };

  return (
    <View style={tw`flex-1 items-center justify-center bg-white`}>
      <TextInput
        placeholder="Enter email"
        onChangeText={setEmail}
        style={tw`border-b-2 border-gray-400 mb-4 px-4 py-2 w-80`}
      />
      <TextInput
        placeholder="Enter password"
        onChangeText={setPassword}
        secureTextEntry
        style={tw`border-b-2 border-gray-400 mb-4 px-4 py-2 w-80`}
      />
      <View style={tw`flex flex-row items-baseline justify-center gap-2`}>
        <TouchableOpacity
          style={tw`bg-[#00ADB5] flex items-center justify-center w-32 px-8 py-3 rounded-md`}
          onPress={handleSignUp}
        >
          <Text style={tw`text-white text-lg font-semibold`}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`mt-3 bg-[#CD6688] flex items-center justify-center w-32 px-8 py-3 rounded-md`}
          onPress={handleSignIn}
        >
          <Text style={tw`text-white text-lg font-semibold`}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
