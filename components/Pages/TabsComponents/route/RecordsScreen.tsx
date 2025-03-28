"use client";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from "react";
import { Fonts, Sizes, theme } from "@/constants/Theme";
import { Divider, useTheme } from "@rneui/themed";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, { FadeInLeft, BounceIn, BounceInDown} from "react-native-reanimated";
import { useAuth } from "@/contexts/authContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import pageStyle from "@/constants/Styles";
import ModalHeader from "../ModalHeader";


const screenWidth = Dimensions.get("window").width

export default function RecordsScreen() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const {
    authState: { userData },
  } = useAuth();

  // const userData = null;

  const recordsList = [
    {
      id: 1,
      icon: "account-box-outline",
      title: t("profile"), // overview
      value: t("profile"),
      path: "/profile",
    },
    {
      id: 2,
      icon: "playlist-check", // My Application
      title: t("my-application"),
      value: t("my-application"),
      path: "/application",
    },
    {
      id: 3,
      icon: "file-document-outline", // My Document
      title: t("my-document"),
      value: t("my-document"),
      path: "/document",
    },
  ];

 
  return (
    <View style={{flex:1, backgroundColor: theme.colors.background}}>
      <ModalHeader title={t("profile")} />

      {userData && (
        <>
          {recordsInfo()}
        </>
      )}
    </View>    
  );

  function recordsInfo() {
    interface props {
      item: any
      index: number
    }
    const renderItem = ({item, index}:props) => (
      <TouchableOpacity 
        key={item.id}
        style={{
          ...styles.recordInfoBox
        }}
        onPress={() =>{
          if(item.path) {
            router.replace(item.path)
          }
        }}
      >
        <MaterialCommunityIcons name={item.icon} size={24} color={theme.colors.grey0}/>
        <Text
          style={{
            ...pageStyle.headline02,
            color: theme.colors.grey0,
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity> 
    );

    return (
      <Animated.View entering={BounceInDown.delay(300).duration(1000).springify()}>
        <FlatList 
          data={recordsList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          numColumns={1}
          contentContainerStyle={{ padding: Sizes.fixPadding }}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
    )
  }

}


const styles = StyleSheet.create({
  itemContainer:{
    padding: Sizes.fixPadding,
    flexDirection: 'column',
    gap: theme.spacing?.md
  },
  recordInfoBox: {
    flexDirection: "row",
    padding: Sizes.fixPadding,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: theme.spacing?.md,
  },
});