import { View, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'

import ModalCard from '@/components/Modal/ModalCard'
import {EditTextInput, EditTextInputDate, EditTextInputMultiline} from '@/components/Screen/EditUI/EditTextInput'
import { colors } from '@/constants/Colors'
import { addExperience } from '@/api/staff'
import dayjs from 'dayjs'


type props = {
  onClose: () => void
  token?: string
  handleSuccess: ()=> void
}

const AddExperience = ({onClose, token, handleSuccess}:props) => {
  const [position, setPosition] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleStartDateChange = (newDate:string) => {
    setStartDate(newDate)
  }

  const handleEndDateChange = (newDate:string) => {
    setEndDate(newDate)
  }

  const handleSubmit = async () => {
    if (token) {
      const expData = {
        position,
        companyName,
        location,
        description,
        startDate,
        endDate,    
      }
      
      try {
        setIsSubmitting(true);
        
        await addExperience(expData, token);
        
        Alert.alert('Success', 'Experience added successfully!');
        onClose(); // Close modal after successful submission
        handleSuccess()
      } catch (error: any) {    
        // Enhanced error alert
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to add experience. Please try again.";
        Alert.alert('Error', errorMessage);
      } finally {
        setIsSubmitting(false); 
      }
    }
  }

  return (
    <ModalCard 
      title={'Add Experience'}
      modalclose={onClose} 
      children={(
        <View style={styles.formContainer}>
          <EditTextInput 
            label={'Position'} 
            value={position} 
            handleChange={(text)=> setPosition(text)} 
            multilineText={false} 
            placholderColor={colors.tintColor}      
          />

          <EditTextInput 
            label={'Company name'} 
            value={companyName} 
            handleChange={(text)=> setCompanyName(text)} 
            multilineText={false}   
            placholderColor={colors.tintColor}     
          />
          
          <EditTextInput 
            label={'Location'} 
            value={location} 
            handleChange={(text)=> setLocation(text)} 
            multilineText={false}  
            placholderColor={colors.tintColor}     
          />

          <View style={styles.row}>
            <EditTextInputDate
              label={'Start date'}
              value={startDate}
              handleChange={handleStartDateChange}
              multilineText={false}
              formStyle={[styles.resize]}
              placholderColor={colors.tintColor}
            />
            
            <EditTextInputDate
              label={'End date'}
              value={endDate}
              handleChange={handleEndDateChange}
              multilineText={false}
              formStyle={[styles.resize]}
              placholderColor={colors.tintColor}
            />     
          </View>

          <EditTextInputMultiline 
            label={'Description'} 
            value={description} 
            handleChange={(text)=> setDescription(text)} 
            multilineText={true} 
            placholderColor={colors.tintColor}       
          />
        </View>
      )} 
      onSubmit={handleSubmit}      
    />

  )
}

export default AddExperience

const styles = StyleSheet.create({
  formContainer:{
    height:320,
    width:'100%',
    gap:16,
  },
  row:{
    flexDirection:'row',
    gap:8,
    width:'auto',
  },
  resize:{
    flexShrink:0.5
  },
})