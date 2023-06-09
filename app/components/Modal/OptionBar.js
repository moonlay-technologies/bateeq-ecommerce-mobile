import React, { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import ButtonSm from '../Button/ButtonSm';

const OptionBar = (props) => {
    const { 
        title = "Are you sure?", 
        text=" You can continue with your previous actions. Easy to attach these to success calls." ,
        onContinue,
        toggle,
        submitText = 'Continue',
        disabled,
        visible,
    } = props

    return (
        <Modal  
          animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={toggle}
        >
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: [{ translateX: -170 }, { translateY: -100 }],
                backgroundColor: '#ededed',
                borderRadius: SIZES.radius,
                paddingHorizontal: 30,
                paddingVertical: 20,
                maxWidth: 340,
                zIndex: 999,
            }}>
                <Ionicons name='information-circle-sharp' style={{marginBottom:8}} color={'#704FFE'} size={50}/>
                <Text style={{...FONTS.h5,color:COLORS.title}}>{title}</Text>
                <Text style={{...FONTS.font,color:COLORS.text,textAlign:'center'}}>
                   {text}
                </Text>
                <View style={{flexDirection:'row',marginTop:18}}>
                    <ButtonSm 
                        title={'Cancel'} 
                        style={{
                        marginRight:10,
                        backgroundColor: '#d4d4d4'
                        }} 
                        textStyle={{color:'#555555'}}
                        onPress={toggle}
                    />
                    <ButtonSm 
                        title={submitText} 
                        style={{
                            backgroundColor: '#cd5044'
                        }}
                        textStyle={{
                            fontWeight: '900'
                        }}
                        color={'#704FFE'} 
                        onPress={onContinue} 
                        disabled={disabled}
                    />
                </View>
            </View>
        </Modal>
    );
};


export default OptionBar;