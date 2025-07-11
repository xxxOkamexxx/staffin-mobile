import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';

import { Fonts, theme } from '@/constants/Theme';
import { Divider, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs'

import { IEducation, IUser } from '@/types/UserTypes';
import EditEducationModal from './editEducationModal';
import pageStyle from '@/constants/Styles';
import AddEducationModal from './addEducationModal';
import EmptyItemMessage from '../../../EmptyItemMessage';


interface props {
  user: IUser;
  showEditButton: boolean;
  refetch: () => void
}

const Education = ({user, showEditButton, refetch}: props) => {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [eduData, setEduData] = useState<IEducation>()

  const { theme } = useTheme()
  const { t } = useTranslation();
  const router = useRouter()

  
  return (
    <View 
      style={{
        ...styles.postsContainer
      }}
    >
      {user?.educations && user?.educations
        .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
        .slice(0, 2)
        .map((edu, index, array) => (
          <View key={edu.id}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
              <View
                style={{
                  flex: 2
                }}
              >
                <Text 
                  style={{
                    ...pageStyle.headline03,
                    color: theme.colors.grey0,
                  }}
                >
                  {edu.institution}        
                </Text>

                <Text 
                  style={{
                    ...pageStyle.smText,
                    color: theme.colors.grey0,
                  }}
                >
                  {edu.fieldOfStudy} 
                </Text>

                <Text 
                  style={{
                    ...pageStyle.smText,
                    color: theme.colors.grey3,
                  }}
                >
                  {dayjs(edu.startDate).format('YYYY-MM-DD')} - {edu.endDate ? dayjs(edu.endDate).format('YYYY-MM-DD') : `${t("ongoing")}`}
                </Text>
              </View>

              <View>
                { showEditButton && 
                  <TouchableOpacity
                    style={{
                      ...styles.itemEditButton,
                      backgroundColor: theme.colors.background
                    }}
                    onPress={() => {
                      setEduData(edu)
                      setOpenEditModal(true)
                    }} 
                  >
                    <MaterialCommunityIcons 
                      name='pencil' 
                      size={24} 
                      color={ theme.mode === 'light'
                        ? theme.colors.grey3
                        : theme.colors.white
                      }
                    />
                  </TouchableOpacity>
                }
              </View>

            </View> 

            {index < array.length - 1 && 
              <Divider 
                color={theme.colors.greyOutline} 
                style={{marginTop: theme.spacing.md,}}
              />
            }

          </View>
        ))
      }
      {!user?.educations?.length && (
        <EmptyItemMessage 
          onPress={() => setOpenAddModal(true)}
          message={`${t("add-education")}`}
        />
      )}

      {/* Modal */}
      <EditEducationModal
        data={eduData!}
        visible={openEditModal}
        onClose={() => setOpenEditModal(!openEditModal)}
        handleSuccess={refetch}
      />
    </View>
  )
}

export default Education

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: theme.spacing?.md,
  },
  postItemContainer: {
    flexDirection: 'column',
    gap: theme.spacing?.md,
  },
  itemEditButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  }
})