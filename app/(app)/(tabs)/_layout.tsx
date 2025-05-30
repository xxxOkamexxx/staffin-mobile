import { View, Text, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, Tabs } from 'expo-router'

import { IAuthInfo, IAuthState, useAuth } from "@/contexts/authContext";
import { Fonts, Sizes, theme } from '@/constants/Theme'
import { Avatar, ListItem, useTheme } from '@rneui/themed'
import { useTranslation } from "react-i18next";

import CustomTabBar from '@/components/Pages/TabsComponents/CustomTabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ActivityIndicator } from 'react-native';
import PageHeader from '@/components/Header';



export const unstable_settings = {
  initialRouteName: "index",
};

export function TabBarIcon(props: { 
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"]; 
  color: string; 
  size: number; 
  isActive: boolean; style?: any
 }) {
  return <MaterialCommunityIcons name={props.name} color={props.color} size={props.size} style={{ ...props.style }} isActive={props.isActive} 
  />;
}

const _layout = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  const {
    authState: { userData, userId },
    session,
    isLoading,
  } = useAuth();


  if (isLoading && !userData) {
    return <ActivityIndicator color={theme.colors.primary} />
    //return <SplashScreenLogo />;
  }

  if (!session) {
    return <Redirect href="/(auth)/signin" />;
  } 

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background}}>

      <Tabs
        initialRouteName={unstable_settings.initialRouteName}
        tabBar={(props) =>(          
          <CustomTabBar {...props} />          
        )}
        
        screenOptions={() => ({
          headerShown: true,
          tabBarStyle: {
            position: 'absolute', // Optional: lets you float the bar
            backgroundColor: 'transparent', // 👈 This is important!
            borderTopWidth: 0,
            elevation: 0, // Android shadow
            shadowColor: 'transparent',      
          },
          tabBarItemStyle: {
            width: 'auto',
            backgroundColor: 'transparent',
            borderColor: "transparent",
            borderWidth: 0,
            shadowColor: "transparent",
          },
        })}
      >
        {/* Home Tab */}
        <Tabs.Screen 
          name="index"
          options={{
            tabBarShowLabel: true,
            headerTitleAlign: "center",
            headerShown: true,
            headerTitle: "Home",
            tabBarLabel: t("home"),
            tabBarIcon: ({ focused }) => (
              <>
              {userData?.roleId === 3 && 
                <TabBarIcon
                  name={focused ? "home" : "home-outline"}
                  isActive={focused}
                  size={32}
                  color={focused ? theme.colors.secondary : theme.colors.white}
                />
              }
              {userData?.roleId === 1 && 
                  <TabBarIcon
                    name={focused ? "view-dashboard" : "view-dashboard-outline"}
                    isActive={focused}
                    size={32}
                    color={focused ? theme.colors.secondary : theme.colors.white}
                  />
                }
                {userData?.roleId === 2 && 
                  <TabBarIcon
                    name={focused ? "view-dashboard" : "view-dashboard-outline"}
                    isActive={focused}
                    size={32}
                    color={focused ? theme.colors.secondary : theme.colors.white}
                  />
                }
              </>
            ), 
            header: () => <PageHeader />,
          }} 
        />

        {/* Jobs Tab */}
        <Tabs.Screen 
          name="jobs"
          options={{
            tabBarShowLabel: true,
            headerTitleAlign: "center",
            headerShown: true,
            headerTitle: "Jobs",
            tabBarLabel: t("jobs"),
            tabBarIcon: ({ focused }) => (
              <>
                {userData?.roleId === 3 && 
                  <TabBarIcon
                    name={focused ? "briefcase" : "briefcase-outline"}
                    isActive={focused}
                    size={30}
                    color={focused ? theme.colors.secondary : theme.colors.white}
                  />
                }
                {userData?.roleId === 1 &&
                  <TabBarIcon
                    name="table-account"
                    isActive={focused}
                    size={30}
                    color={focused ? theme.colors.secondary : theme.colors.white}
                  />
                }
              </>
            ),
            //headerStyle: { backgroundColor: theme.colors.searchBg },
            headerTitleStyle: { color: theme.colors.grey0 },
            header: () => <PageHeader />,
          }} 
        />

        {/* Route Tab (no label or icon in the tab) */}
        <Tabs.Screen
          name="route"
          options={{
            tabBarShowLabel: false,
            headerTitleAlign: "center",
            headerShown: false,
            headerTitle: t("profile"),
            tabBarLabel: "Route",
            header: () => <PageHeader />,
          }}
        />

        {/* Profile Screen - Hidden from Tab Bar */}
        <Tabs.Screen 
          name="profile"
          options={{
            href: null, // Hides from the tab bar
            // tabBarStyle: { display: "none", height: 0, width: 0, },
            // tabBarIcon: () => null,
            headerShown: true,
            // headerTitle: t("overview"),
            header: () => <PageHeader />,
          }} 
        />

        {/* Application Screen - Hidden from Tab Bar */}
        <Tabs.Screen 
          name="application"
          options={{
            href: null, // Hides from the tab bar
            // tabBarStyle: { display: "none", height: 0, width: 0, },
            // tabBarIcon: () => null,
            headerShown: true,
            // headerTitle: "My Application",
            header: () => <PageHeader />,
          }} 
        />

        {/* Document Screen - Hidden from Tab Bar */}
        <Tabs.Screen 
          name="document"
          options={{
            href: null, // Hides from the tab bar
            // tabBarStyle: { display: "none", height: 0, width: 0, },
            // tabBarIcon: () => null,
            headerShown: true,
            // headerTitle: "My Document",
            header: () => <PageHeader />,
          }} 
        />
        
        {/* Document Screen - Hidden from Tab Bar */}
        <Tabs.Screen 
          name="activity"
          options={{
            href: null, // Hides from the tab bar
            // tabBarStyle: { display: "none", height: 0, width: 0, },
            // tabBarIcon: () => null,
            headerShown: true,
            // headerTitle: "My Document",
            header: () => <PageHeader />,
          }} 
        />
        
        {/* Document Screen - Hidden from Tab Bar */}
        <Tabs.Screen 
          name="jobAnnounce"
          options={{
            href: null, // Hides from the tab bar
            // tabBarStyle: { display: "none", height: 0, width: 0, },
            // tabBarIcon: () => null,
            headerShown: true,
            // headerTitle: "My Document",
            header: () => <PageHeader />,
          }} 
        />

        {/* Document Screen - Hidden from Tab Bar */}
        <Tabs.Screen 
          name="preferences"
          options={{
            href: null, // Hides from the tab bar
            // tabBarStyle: { display: "none", height: 0, width: 0, },
            // tabBarIcon: () => null,
            headerShown: true,
            // headerTitle: "My Document",
            header: () => <PageHeader />,
          }} 
        />

        {/* Community Tab */}
        <Tabs.Screen 
          name="community"
          options={{
            tabBarShowLabel: true,
            headerTitleAlign: "center",
            headerShown: true,
            headerTitle: "Community",
            tabBarLabel: t("community"),
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name={focused ? "account-group" : "account-group-outline"}
                isActive={focused}
                size={30}
                color={focused ? theme.colors.secondary : theme.colors.white}
              />
            ),
            header: () => <PageHeader />,
          }} 
        />

        {/* Setting Tab */}
        <Tabs.Screen 
          name="setting"
          options={{
            tabBarShowLabel: true,
            headerTitleAlign: "center",
            headerShown: true,
            headerTitle: "Setting",
            tabBarLabel: t("setting"),
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name={focused ? "cog" : "cog-outline"}
                isActive={focused}
                size={30}
                color={focused ? theme.colors.secondary : theme.colors.white}
              />
            ),
            header: () => <PageHeader />,
          }} 
        />
      </Tabs>
    </View>
  )
}

export default _layout



