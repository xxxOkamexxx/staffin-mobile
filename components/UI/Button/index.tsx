import React from "react";
import { ActivityIndicator } from "react-native";
import { Button as ButtonBase } from "@rneui/themed";
import { theme } from "@/constants/Theme";
import pageStyle from "@/constants/Styles";

interface PropsButton {
  title: string;
  onPress?: () => void;
  titleStyle?: any;
  buttonStyle?: any;
  containerStyle?: any;
  disabled?: boolean;
  loading?: boolean;
  icon?: any;
  iconPosition?: "left" | "right" | "top" | "bottom";
  linearGradientProps?: any;
  size?: "sm" | "md" | "lg";
  radius?: number | "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  type?: "solid" | "outline" | "clear";
}

export default function Button({ title, onPress, titleStyle, buttonStyle, containerStyle, disabled, loading, icon, iconPosition, size, color, radius, type }: PropsButton) {
  // Custom loading icon as an ActivityIndicator
  const renderLoadingIcon = () => (
    <ActivityIndicator size="small" color="#FFF" /> // Customize color and size as needed
  );

  return (
    <ButtonBase
      title={loading ? "" : title} // Hide title when loading
      onPress={onPress}
      color={color}
      radius={radius}
      type={type}
      titleStyle={{...titleStyle, ...pageStyle.button16}}
      buttonStyle={{...buttonStyle, borderRadius: theme.spacing?.xs}}
      containerStyle={{...containerStyle}}
      disabled={disabled}
      loading={loading}
      // Replace the icon with a spinner if loading, otherwise show the provided icon
      icon={loading ? renderLoadingIcon() : icon}
      iconPosition={iconPosition}
      size={size}
    />
  );
}
