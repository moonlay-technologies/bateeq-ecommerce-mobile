import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import ButtonSm from '../Button/ButtonSm';
// buttonContainer: {
//     flexDirection: 'row',
//     marginTop: 18,
//   },
//   cancelButton: {
//     marginRight: 10,
//     backgroundColor: '#f75a5b',
//   },
//   continueButton: {
//     backgroundColor: '#704FFE',
//   },
//   buttonText: {
//     ...FONTS.fontSm,
//     color: COLORS.white,
//   },

const OptionBar = (props) => {
    const { 
        title = "Are you sure?", 
        text=" You can continue with your previous actions. Easy to attach these to success calls." ,
        onContinue,
        toggle,
        submitText = 'Continue',
        disabled,
    } = props

    return (
        <>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: [{ translateX: -170 }, { translateY: -100 }],
                backgroundColor: '#e5e5e5',
                borderRadius: SIZES.radius,
                paddingHorizontal: 30,
                paddingVertical: 20,
                maxWidth: 340,
                zIndex: 999,
            }}>
                <Ionicons name='information-circle-sharp' style={{marginBottom:8}} color={'#704FFE'} size={60}/>
                <Text style={{...FONTS.h5,color:COLORS.title}}>{title}</Text>
                <Text style={{...FONTS.font,color:COLORS.text,textAlign:'center'}}>
                   {text}
                </Text>
                <View style={{flexDirection:'row',marginTop:18}}>
                    <ButtonSm title={'Cancel'} style={{marginRight:10}} color={'#f75a5b'} onPress={toggle}/>
                    <ButtonSm title={submitText} color={'#704FFE'} onPress={onContinue} disabled={disabled}/>
                </View>
            </View>
        </>
    );
};


export default OptionBar;