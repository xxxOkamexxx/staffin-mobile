import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import { MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from 'dayjs';

import {ProfileCard, ProfileCardFotter, ProfileCardAdd} from '../../../components/UI/profileCards';
import Colors from '@/constants/Colors';
import { globalStyles } from '@/constants/GlobalStyle';
import { Post } from '@/store/slice/communitySlice';
import { StarRatingReadOnly } from '@/components/UI/StarRating';

import { User } from '@/constants/types/UserType';

interface UserProfileProps {
  data: User
  posts: Post[]
}

const styles = StyleSheet.create({
  row:{
    flexDirection: 'row',
    alignItems: 'center',
    gap:8,
    width: '100%',
  },
  col:{
    flex:1,
    flexDirection:'column',
    gap:8,
    width:'100%'
  },
  rowWrap:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    gap:8,
  },
  skillButton:{
    backgroundColor:`${Colors.primaryLight}`,
    padding:8,
    borderRadius:4
  },
  headerCcontainer:{
    width:'100%',
    margin:0,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  layout:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    paddingHorizontal:16,
  },
  menuContainer:{
    flexDirection:'row', 
    justifyContent:'space-between', 
    padding:16, 
    marginTop: 16,
  },
})


const UserProfile = ({data, posts}: UserProfileProps) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <>
    {/* Overview */}
      {data && 
        <>
          {/* User Information */}
          <ProfileCard
            title='User Information' 
            cardBody= {(
              <View style={styles.col}>
                <View style={styles.row}>
                  <MaterialCommunityIcons name='account-outline' size={16} color={Colors.textGray}/>
                  <Text style={globalStyles.fontSemibold}>Full Name:</Text>
                  <Text>{data?.firstName} {data?.lastName}</Text>
                </View>

                <View style={styles.row}>
                  <MaterialCommunityIcons name='map-marker' size={16} color={Colors.textGray}/>
                 <Text style={globalStyles.fontSemibold}>Location:</Text>
                 <Text>{data?.city}</Text>
                </View>

                <View style={styles.row}>
                  <MaterialCommunityIcons name='email-outline' size={16} color={Colors.textGray}/>
                  <Text style={globalStyles.fontSemibold}>Email:</Text>
                  <Text>{data?.email}</Text>
                </View>

              </View>
            )}
            handleEdit={() => {}}
          />

          {/* About */}
          <ProfileCard 
            title='About'
            cardBody={(
              <View>
                <Text>{data?.about}</Text>
              </View>
            )}
            handleEdit={() => {}}
          />

          {/* Activity */}
          <ProfileCardFotter 
            title='Activity'
            cardBody={(
              <View style={styles.col}>
                {posts && posts
                .slice(0, 3)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map(post => (
                  <View 
                    key={post.postId} 
                    style={[styles.row, {alignItems: 'flex-start' }]} 
                  >
                    <View style={[{flex:1, gap:8}]}>
                      <Text 
                        numberOfLines={expanded ? undefined : 2} 
                        style={{ width:'100%'}}
                      >
                        {post.content} 
                      </Text>

                      {!expanded && post.content.length > 0 && (
                        <TouchableOpacity onPress={() => setExpanded(true)}>
                          <Text 
                            style={{
                              color: Colors.primary, 
                              textDecorationLine: 'underline', 
                              textDecorationColor: Colors.primary
                            }}
                          >
                            ...Read more
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    {post.image && (
                      <View>
                        <Image 
                          source={{ uri: post.image }} 
                          style={{ width: 80, height: 80, marginLeft: 8 }} 
                        />
                      </View>
                    )}
                    
                  </View>
                ))}
              </View>
            )}
            footerText='See All Activities'
          />


          {/* Experience */}
          <ProfileCardAdd
            title='Experience'
            cardBody={(
              <View style={styles.col}>
                {data.experience.map(exp => 
                  <View key={exp.id} style={styles.col}>

                    <View style={{flexDirection:'column', gap:0,}}>
                      <Text style={[globalStyles.fontSemibold, {fontSize:16}]}>
                        {exp.position}
                      </Text>
                  
                      <Text style={[globalStyles.textSm,]}>
                        {exp.companyName}
                      </Text>

                      <Text style={[globalStyles.textSm, {color:`${Colors.textGray}`}]}>
                        {exp.location}
                      </Text> 

                    </View>

                    <Text>{exp.description}</Text>
                    <Text style={[globalStyles.textSm, {color:`${Colors.textGray}`}]}>
                      {dayjs(exp.startDate).format('YYYY-MM-DD')} - {dayjs(exp.endDate).format('YYYY-MM-DD')}
                    </Text>

                    <View style={[globalStyles.divider]} />
                  </View>
                )}

              </View>
            )}
            handleEdit={() => {console.log('edit Experience');
            }}
            handleAdd={() => {console.log('add Experience');
            }}
          />

          {/* Education */}
          <ProfileCardAdd
            title='Education'
            cardBody={(
              <View>
                 {data.educations.map(education => 
                    <View key={education.id}>
                      <Text>Institution: {education.institution}</Text>
                      <Text>Name:{education.name}</Text>
                      <Text>Date: {dayjs(education.startDate).format('YYYY-MM-DD')} - {dayjs(education.endDate).format('YYYY-MM-DD')}</Text>
                    </View>
                  )}

              </View>
            )}
            handleEdit={() => {console.log('edit Education');
            }}
            handleAdd={() => {console.log('add Education');
            }}
          />
        
          {/* Skills */}
          <ProfileCardAdd
            title='Skills'
            cardBody={(
              <View style={styles.rowWrap}>
                {data.skills.map(skill => 
                  <View key={skill.id} style={styles.skillButton}>
                    <Text>{skill.name}</Text>
                  </View>
                )}
              </View>
            )}
            handleEdit={() => {console.log('edit Skills');
            }}
            handleAdd={() => {console.log('add Skills');
            }}
          />

          {/* Languages */}
          <ProfileCardAdd
            title='Languages'
            cardBody={(
              <View style={styles.col}>
                {data.languages
                .slice() 
                .sort((a, b) => b.rating - a.rating)
                .map((language) => (
                  <View key={language.id} style={[styles.row, { justifyContent: 'space-between' }]}>
                    <Text>{language.name}</Text>
                    <StarRatingReadOnly rating={language.rating} />
                  </View>
                ))}
              </View>
            )}
            handleEdit={() => {console.log('edit Skills');
            }}
            handleAdd={() => {console.log('add Skills');
            }}
          />
        </>
      }
    </>
  )
}

export default UserProfile
