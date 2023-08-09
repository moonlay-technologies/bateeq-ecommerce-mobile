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
    checkoutSide,
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
            transform: [{ translateX: checkoutSide ? -170 : -140 }, { translateY: checkoutSide ? -100 : -250 }],
            backgroundColor: '#ededed',
            borderRadius: SIZES.radius,
            paddingHorizontal: 20,
            maxWidth: '86%',
            height: checkoutSide ? '56%' : '40%',
            zIndex: 999,
            elevation: 4,
          },
        ]}
      >
        {!withoutIcon && (
          <Ionicons name="information-circle-sharp" style={{ marginBottom: 8 }} color="#704FFE" size={50} />
        )}
        <View style={{ marginBottom: 20, alignItems: 'center' }}>
          <Text style={{ ...FONTS.h5, color: COLORS.title }}>{title}</Text>
          <Text style={{ ...FONTS.font, color: COLORS.text, textAlign: 'center' }}>{text}</Text>
        </View>
        {children && <View style={{ height: '60%', width: '100%' }}>{children}</View>}
        <View style={{ flexDirection: 'row', marginTop: 18 }}>
          <Button size="sm" title="Cancel" style={btnStyle} textStyle={{ color: '#555555' }} onPress={toggle} />
          <Button
            size="sm"
            title={submitText}
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
