import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import ButtonSm from '../Button/ButtonSm';

const OptionBar = ({text, onCancel, onContinue}) => {

    return (
        <>
            <View style={{
                alignItems:'center',
                paddingHorizontal:30,
                paddingVertical:20,
                paddingBottom:30,
                backgroundColor:COLORS.white,
                borderRadius:SIZES.radius,
                marginHorizontal:30,
                maxWidth:340,
            }}>
                <Ionicons name='information-circle-sharp' style={{marginBottom:8}} color={'#ccc'} size={60}/>
                <Text style={{...FONTS.h5,color:COLORS.title}}>Are you sure?</Text>
                <Text style={{...FONTS.font,color:COLORS.text,textAlign:'center'}}>{text}</Text>
                <View style={{flexDirection:'row',marginTop:18}}>
                    <ButtonSm title={'Cancel'} style={{marginRight:10}} color={'#f75a5b'} onPress={onCancel}/>
                    <ButtonSm title={'Continue'} color={'black'} onPress={onContinue}/>
                </View>
            </View>
        </>
    );
};


export default OptionBar;