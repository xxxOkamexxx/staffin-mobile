import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Link } from 'expo-router';

import { useAppDispatch } from '@/store/reduxHooks';
import { setError, signin } from '@/store/slice/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import { globalStyles } from '@/constants/GlobalStyle';
import Colors from '@/constants/Colors';

import { ErrorAlert } from '@/components/CustomAlert';
import { FilledButtonLg, OutlineButtonIconLLg } from '@/components/CustomButtons';
import { CheckBox } from '@rneui/themed';
import CardGradient from '@/components/CardGradient';

import logo from '@/assets/images/main-logo.png'
import { MaterialCommunityIcons } from '@expo/vector-icons';



export default function SignIn() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const [checked, setChecked] = React.useState(true);
  const toggleCheckbox = () => setChecked(!checked);
 
  const router = useRouter();
  
  const dispatch = useAppDispatch();
  const { userData, isLoading, isError, isAdmin } = useSelector((state:RootState) => state.auth);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleSignin = () => {
    const params = {
      email: email,
      password: password
    };
    if (email === '' || password === '') {
      dispatch(setError(true));
    } else {
      dispatch(setError(false)); 
      dispatch(signin(params)); 

      if (isLoading && !isError){
        console.log('is Loading?:', isLoading);
      }
      if(!isLoading && isError){
        console.log('is Errror?:', isError);
      }
    }
  };
  
  useEffect(() => {
    if (userData && !isError) { isAdmin 
      ? router.push('/admin/(tabs)/home')
      : router.push('/staff/(tabs)/home')
    }
  },[userData])

  return (
    <SafeAreaView style={globalStyles.authContainerThema}>
      <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
        {/* Card */}
        <View style={[globalStyles.authCardContainer,]}>  

          <CardGradient /> 

            <Image 
              source={logo} 
              style={[globalStyles.logo]}
              resizeMode="contain" 
            />
      
            <Text style={[globalStyles.titleText, globalStyles.textWhite, globalStyles.centerText]}>
              Sign In
            </Text>

            <View style={[globalStyles.formContainer]}>

              {isError && (
                <ErrorAlert 
                  title = {'Invalid sign-in credentials'}
                  msg = {'Please fill in all fields.'}
                />              
              )}

              {/* Form: Email*/}
              <View style={[globalStyles.inputLine, globalStyles.borderWhite]}>
                <TextInput
                  value={email} 
                  style={[globalStyles.inputText, globalStyles.textWhite]}               
                  keyboardType='email-address'
                  inputMode='email'
                  placeholder='Email'
                  placeholderTextColor={Colors.white70}
                  onChangeText={(text) => {
                    const sanitizedText = text.replace(/\s/g, '').toLowerCase()
                    setEmail(sanitizedText)
                  }}
                />
              </View>

              {/* Form: Password */}
              <View style={[globalStyles.inputLine, globalStyles.borderWhite]}>
                <TextInput
                  value={password}                   
                  style={[globalStyles.inputText, globalStyles.textWhite, {flex: 6}]} 
                  keyboardType='default'
                  placeholder= 'Password'
                  placeholderTextColor={Colors.white70}
                  onChangeText={(text) => {
                    const sanitizedText = text.replace(/\s/g, '')
                    setPassword(sanitizedText)
                  }}
                  onPress={() => dispatch(setError(false))}
                  secureTextEntry={!showPassword}               
                />
                <TouchableOpacity 
                  onPress={togglePasswordVisibility}
                >
                  <MaterialCommunityIcons 
                    name={showPassword ? 'eye-off' : 'eye' }
                    size={24} 
                    color={Colors.white70} 
                  />
                </TouchableOpacity>
              </View>
              
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <CheckBox
                  checked={checked}
                  onPress={toggleCheckbox}
                  iconType="material-community"
                  checkedIcon="checkbox-outline"
                  uncheckedIcon={'checkbox-blank-outline'}
                  checkedColor={Colors.success} 
                  title={'Remember me'} 
                  containerStyle={{
                    backgroundColor: 'none',
                    paddingLeft: 0,
                    marginLeft: 0,
                    marginTop:0,
                    paddingTop:0,
                  }}
                  textStyle={{
                    color:`${Colors.textWhite}`,
                    fontSize: 16,
                    fontWeight: 'regular',
                    marginLeft: 4,
                  }} 
                />
                
                <Text 
                  style={[globalStyles.pText, globalStyles.textSecondary, globalStyles.textUnderline,]}
                >
                  <Link href={"/"}>
                    Forgot password?
                  </Link>
                </Text>
              </View>

            </View>

            {/* Sign in button */}
            <FilledButtonLg
              title='Sign in'
              color='black'
              onPress={handleSignin}
              textColor={Colors.textWhite}
            />

            {/* divider */}
            <View style={[globalStyles.divider,]} /> 

            {/* Sign in with LinkedIn button */}
            <OutlineButtonIconLLg
              title='Sign in With LinkedIn'
              color={Colors.textWhite}
              onPress={()=> console.log('hello Linked')}
              textColor={Colors.textWhite}
              icon='linkedin'
            />
          
            {isLoading && <ActivityIndicator size="small" color={Colors.secondary} />} 
            

            <Text style={{textAlign: 'center', marginTop: 16}}>
              <Text style={[globalStyles.pText, globalStyles.textWhite]}>
                Don't have any account?{" "}                   
              </Text>
              <Text style={[globalStyles.pText, globalStyles.textSecondary, globalStyles.textUnderline]}>
                <Link href={"/(auth)/sign-up"}>
                  Sign up
                </Link>
              </Text>
            </Text> 
                  
        </View>
    
      </View>
    </SafeAreaView>
  )
}

