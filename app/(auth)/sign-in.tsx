import { View, Text, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { useRouter, Link } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { globalStyles } from '@/constants/GlobalStyle';

export default function SignIn() {
  const router = useRouter();

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className={`flex justify-center ${globalStyles.container}`}>       

          <Text className="text-2xl font-semibold text-dark mt-10 font-psemibold">
            Sign in to Staffin
          </Text>

          <CustomButton 
            onPress={() => router.push("/(tabs)/home")}
            title="Log In"
          />

                 
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}