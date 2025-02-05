import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, useRouter } from "expo-router"; 

//Redux
import { useAppDispatch, useAppSelector } from "@/store/reduxHooks";
import { login } from "@/store/slice/authSlice";
//UI
import { TextInput } from 'react-native-paper';
import { globalStyles } from "@/constants/globalStyles";
import { colors } from "@/constants/Colors";
import { ButtonLg } from "@/components/UI/CustomButton";
import  logo  from "../../assets/Images/icon.png"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


const SignIn = () => {
  const router = useRouter();
  const dispatch = useAppDispatch(); 
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { authUser, isLoading, error } = useAppSelector((state) => state.auth)
  

  const handleLogin = async () => {
    if (!email || !password) {
      alert("All fields are required!");
      return;
    }
    try {
      const result = await dispatch(login({ email, password }));
  
      if (login.fulfilled.match(result)) {
        // console.log("Login successful:", result.payload);

        const { role } = result.payload;
  
        if (role === 1) {
          router.push('/(admin)/(tabs)/dashboard');
        } else if (role === 3) {
          router.push('/(staff)/(tabs)/home');
        } else {
          console.log("Role is not handled:", role);
        }
      } else {
        console.error("Login failed:", result.payload || result.error);
      }
    } catch (err) {
      console.error("Unexpected error during login:", err);
    }
  };

  return (
    <SafeAreaView style={[globalStyles.container, globalStyles.paddingX, {backgroundColor: colors.primaryDark}]}> 

    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={logo} style={{width:80, height:80}}  />
        <Text style={[globalStyles.titleText, {color:colors.white}]}>
          Sign In
        </Text>
      </View>


      <View style={styles.formContainer}>
        <TextInput
          textColor={colors.white}
          style={styles.textInputStyle}
          label="Email"
          placeholder="Email"
          placeholderTextColor={colors.white70}
          value={email}
          onChangeText={email => setEmail(email)}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          theme={theme}
        />
            
        <TextInput
          textColor={colors.white}
          style={styles.textInputStyle}
          label="Password"
          placeholder="Password"
          placeholderTextColor={colors.white70}
          value={password}
          onChangeText={password => setPassword(password)}
          mode="outlined"
          theme={theme}
          secureTextEntry = {!showPassword}
          right={
            <TextInput.Icon
              icon={() => (
                <MaterialCommunityIcons
                  name={!showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={colors.white}
                />
              )}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

        <Text style={[styles.link, {alignSelf:'flex-end'}]}>Forget password?</Text>

      </View>


      <ButtonLg
        title={isLoading ? "Logging in... " : "Sign In"}
        containerStyles={globalStyles.btnBlack}
        textColor={colors.white}
        isLoading={isLoading} 
        handlePress={handleLogin}         
      />

      <View style={{flexDirection:'row', alignItems:'center'}}>
        <Text style={{color:colors.white, fontFamily:'Inter-Regular', fontSize:16}}>Don't have an account? </Text>
        <Link href={"/(auth)/sign-up"} style={styles.link}>
          <Text>Sign Up</Text>
        </Link>
      </View>

    </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    gap:24,
  },
  titleContainer:{
    alignItems:'center',
    width:'100%',
    gap:8,
  },
  formContainer:{
    width:'100%',
    gap:8,
  },
  link:{
    fontFamily:'Inter-Regular',
    fontSize:16,
    color:colors.secondary,
    textDecorationLine:'underline'
  },
  textInputStyle:{
    width:'100%',
  },
});

// TextInput Theme
const theme = {
  colors:{
    primary:colors.secondary, 
    secondary:colors.white40, 
    onSurfaceVariant:colors.white40, 
    onBackground:colors.primaryDark,
    background:colors.primaryDark
  },    
}