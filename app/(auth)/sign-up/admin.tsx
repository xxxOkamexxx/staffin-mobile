import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Link } from 'expo-router';
import CustomButton from '@/components/CustomButton'
import { globalStyles } from '@/constants/GlobalStyle';
import CustomForm from '@/components/CustomForm';

const AdminPage = () => {
  const [companyName, setCompanyName] = useState('')
  const [orgNr, setOrgNr] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter();

  return (
    <SafeAreaView className=" h-full">
      <ScrollView>
        <View className={`flex justify-center ${globalStyles.container}`}>       

          <Text className="text-2xl font-semibold text-d mt-10">
            Sign up as Admin
          </Text>

          <View className='my-4 flex flex-col space-y-2 mb-8'>

            <Text>Company name:</Text>
            <CustomForm 
              inputMode='text'
              onChangeText={() => setCompanyName}
              placeholder='Company name'
              showIcon = {false}
            />

            <Text>Organization number:</Text>
            <CustomForm 
              inputMode='text'
              onChangeText={() => setOrgNr}
              placeholder='Organization number'
              showIcon = {false}
            />

            <Text>Email:</Text>
            <CustomForm 
              inputMode='email'
              onChangeText={() => setEmail}
              placeholder='E-mail'
              showIcon = {false}
            />

            <Text>Password:</Text>  
            <CustomForm 
              inputMode='text'
              onChangeText={() => setPassword}
              placeholder='Password'
              showIcon = {true}
            />

          </View>

          <CustomButton 
            onPress={() => router.push("/(tabs)/home")}
            title="Confirm"
            containerStyles='bg-primary'
            textStyles='text-white'
          />

          <View className='mt-4 justify-center flex-row items-baseline space-x-2'>
            <Text className='text-center text-gray'>
              Already have an account?                     
            </Text>
            <Text className='text-center text-secondary font-semibold underline'>
              <Link href={"/(auth)/sign-in"}>
                Sign in here
              </Link>
            </Text>
          </View>
                
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AdminPage