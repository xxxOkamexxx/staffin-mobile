import { View, Text, ActivityIndicator, Image, TouchableOpacity  } from 'react-native'
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { downloadCv, getCv } from '@/api/backend'
import { useTranslation } from 'react-i18next'
import { useToast } from 'react-native-toast-notifications'
import { theme } from '@/constants/Theme'
import { useTheme } from '@rneui/themed'
import Button from '@/components/UI/Button'
import pageStyle from '@/constants/Styles'
import { useRouter } from 'expo-router'
import Document from '@/components/Pages/TabsComponents/Profile/StaffProfile/Document'

const page = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const { theme } = useTheme()
  const router = useRouter()

  const {data, isLoading} = useQuery({
    queryKey: ["cv-data"],
    queryFn: async () => {
      const response = getCv();
     
      return response
    }
  })

  if (isLoading) return (
    <View
      style={{
        ...pageStyle.pageComponent,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator color={theme.colors.primary} />
    </View>
  )

  if (!data) return (
    <View
      style={{
        ...pageStyle.pageComponent,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        gap: theme.spacing.md,
      }}
    >
      <Text style={{...pageStyle.button20, color: theme.colors.primary}}>{`${t("no-document-message")}`}</Text>
      <Text style={{...pageStyle.smText, color: theme.colors.grey0}}>{`${t("create-cv-message")}`}</Text>

      <TouchableOpacity
        onPress={() => router.push('/profile')}
      >
        <Text 
          style={{
            ...pageStyle.button16, 
            color: theme.colors.primary,
            textDecorationLine: "underline",
            textDecorationColor: theme.colors.primary,
          }}
        >
          {`${t("create-profile")}`}
        </Text>
      </TouchableOpacity>
    </View>
  );

  
  function handleDownloadCv(): void {
    console.log("download CV")
    // throw new Error('Function not implemented.')
  }

  return (
    <View
      style={{
        ...pageStyle.pageComponent,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {isLoading && <ActivityIndicator color={theme.colors.primary}/>}


      <Document data={data}/>
  
    </View>
  )
}

export default page