import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { useToast } from 'react-native-toast-notifications'
import { useAuth } from '@/contexts/authContext'
import { useQuery } from '@tanstack/react-query'
import { getUserPostsAndShares } from '@/api/backend'
import { SafeAreaView } from 'react-native-safe-area-context'
import pageStyle from '@/constants/Styles'
import PostTemplate from '@/components/UI/PostTemplate'

const Page = () => {
  const [userInfoMessage, setUserInfoMessage] = useState(false)
  const [pending, setPending] = useState(false)
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  
  const { 
    authState:{ 
      userData, 
      userId,
    } ,
  } = useAuth();

   // Get Users Posts
   const {
    data: posts =[],
    refetch: userPostsRefetch,
    isLoading: postIsLoading,
    isPending
  } = useQuery({
    queryKey: ["user-posts"],
    queryFn: async () => {
      const response = await getUserPostsAndShares(userId!)
      console.log('kör i activity : getUserPostsAndShares');
      
      
      return response;
    },
    enabled: !!userId,
  })

  
  return (
    <View>
      <View>
        <TouchableOpacity>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Liked</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Comments</Text>
        </TouchableOpacity>
      </View>
      { isPending && postIsLoading &&(
        <ActivityIndicator size="large" color={theme.colors.primary} />
      )}
      
      {!posts.length && 
      <View>
        <Text 
          style={{
            ...pageStyle.headline02, 
            color: theme.colors.grey0,
          }}
        >
          {`${t("no-activity-message")}`}
        </Text>

        <Text>
          {`${t("create-post-message")}`}
        </Text>
      </View>
      }

      {/* 🚧 Insert post list */}
      <PostTemplate post={posts}/>
    </View>
  )
}

export default Page