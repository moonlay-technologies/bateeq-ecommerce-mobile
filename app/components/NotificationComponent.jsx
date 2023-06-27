import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { COLORS } from '../constants/theme';
import { CartGetList } from '../store/actions';

function Notification(props) {
  const {
    visible = false,
    text = 'Item added to cart!',
    cartId,
    CartGetList: cartGetList,
    navText = 'see cart',
    to = 'Cart',
  } = props;
  const navigation = useNavigation();
  const handleNavigation = () => {
    cartGetList({
      first: 10,
      last: 0,
      id: cartId,
    });
    navigation.navigate(`${to}`);
  };
  return (
    <View style={{ alignItems: 'center' }}>
      {visible && (
        <View style={styles.content}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={[styles.text, { flex: 1 }]}>{text}</Text>
            <Text style={styles.textNavigation} onPress={handleNavigation}>
              {navText}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

export default connect(
  ({ Cart }) => {
    const {
      options: { cartId },
    } = Cart;
    return { cartId };
  },
  { CartGetList }
)(React.memo(Notification));

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.black,
    borderRadius: 10,
    width: '70%',
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
  },
  textNavigation: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.white,
  },
});
