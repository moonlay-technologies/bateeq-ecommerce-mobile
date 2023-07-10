import React from 'react';
import { Modal, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import Button from './ButtonComponent';

function OptionBar(props) {
  const {
    title = 'Are you sure?',
    text = ' You can continue with your previous actions. Easy to attach these to success calls.',
    onContinue,
    toggle,
    submitText = 'Continue',
    disabled,
    visible,
    children,
    withoutIcon,
    style = {
      position: 'absolute',
      top: '50%',
    },
    btnStyle = {
      marginRight: 10,
      backgroundColor: '#d4d4d4',
    },
    confirmBtnStyle = {
      backgroundColor: '#cd5044',
    },
  } = props;

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={toggle}>
      <View
        style={[
          style,
          {
            alignItems: 'center',
            justifyContent: 'center',
            left: '50%',
            transform: [{ translateX: -170 }, { translateY: -100 }],
            backgroundColor: '#ededed',
            borderRadius: SIZES.radius,
            paddingHorizontal: 20,
            // paddingVertical: 20,
            maxWidth: 340,
            zIndex: 999,
          },
        ]}
      >
        {!withoutIcon && (
          <Ionicons name="information-circle-sharp" style={{ marginBottom: 8 }} color="#704FFE" size={50} />
        )}
        <Text style={{ ...FONTS.h5, color: COLORS.title }}>{title}</Text>
        <Text style={{ ...FONTS.font, color: COLORS.text, textAlign: 'center' }}>{text}</Text>
        {children && <View style={{ height: '50%', width: '100%' }}>{children}</View>}
        <View style={{ flexDirection: 'row', marginTop: 18 }}>
          <Button size="sm" title="Cancel" style={btnStyle} textStyle={{ color: '#555555' }} onPress={toggle} />
          <Button
            size="sm"
            title={submitText}
            style={confirmBtnStyle}
            textStyle={{
              fontWeight: '900',
            }}
            onPress={onContinue}
            disabled={disabled}
          />
        </View>
      </View>
    </Modal>
  );
}

export default OptionBar;
