import React, {useState} from 'react';
import {Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Quantity from '../../components/CustomQuantity';
import {COLORS, FONTS} from '../../constants/theme';

const Slider = () => {
  const navigation = useNavigation();
  // const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');

  const handleSizeSelection = selectedSize => {
    setSize(selectedSize);
  };

  // const handleQuantityChange = action => {
  //   if (action === 'add') {
  //     setQuantity(quantity + 1);
  //   } else if (action === 'subtract' && quantity > 1) {
  //     setQuantity(quantity - 1);
  //   }
  // };
  return (
    <View style={{paddingHorizontal: 20}}>
      <Text style={styles.titleSlider}>Best Seller Product</Text>
      <Swiper
        paginationStyle={{bottom: 10}}
        dotStyle={{
          backgroundColor: 'rgba(255,255,255,.3)',
          width: 8,
          height: 8,
        }}
        activeDotStyle={{backgroundColor: '#fff', width: 8, height: 8}}>
        <Image
          source={require('../../assets/images/product/product2.jpg')}
          style={{width: '100%', height: '100%'}}
        />
        <Image
          source={require('../../assets/images/product/product5.jpg')}
          style={{width: '100%', height: '100%'}}
        />
        <Image
          source={require('../../assets/images/product/product6.jpg')}
          style={{width: '100%', height: '100%'}}
        />
      </Swiper>
      <View style={{paddingVertical: 10}}>
        <Text
          style={{...FONTS.fontSatoshiBold, fontSize: 24, color: COLORS.title}}>
          JACQUARD NALIKA 014
        </Text>
        <Text
          style={{
            ...FONTS.fontSatoshiRegular,
            fontSize: 18,
            color: COLORS.title,
          }}>
          Rp 792,000{' '}
          <Text
            style={{
              fontWeight: 'normal',
              fontSize: 16,
              color: 'gray',
              textDecorationLine: 'line-through',
            }}>
            Rp 1,079,200
          </Text>
        </Text>
        <Text style={{marginTop: 10, ...FONTS.fontSatoshiRegular}}>
          Our latest collection to elevate your beauty and elegance. With finest
          touch from our founder and carefully hand-crafted by our local
          workers, this outfit proudly presented for you
        </Text>
      </View>
      <View>
        <Text style={{...FONTS.fontSatoshiBold, fontSize: 16}}>
          Choose Size:
        </Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <TouchableOpacity
            onPress={() => handleSizeSelection('S')}
            style={{
              marginRight: 10,
              borderWidth: size === 'S' ? 2 : 0,
              borderColor: COLORS.title,
              borderRadius: 10,
              padding: 10,
            }}>
            <Text>S</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSizeSelection('M')}
            style={{
              marginRight: 10,
              borderWidth: size === 'M' ? 2 : 0,
              borderColor: COLORS.title,
              borderRadius: 10,
              padding: 10,
            }}>
            <Text>M</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSizeSelection('L')}
            style={{
              marginRight: 10,
              borderWidth: size === 'L' ? 2 : 0,
              borderColor: COLORS.title,
              borderRadius: 10,
              padding: 10,
            }}>
            <Text>L</Text>
          </TouchableOpacity>
        </View>
        <Quantity
          title="Quantity"
          textStyle={{paddingHorizontal: 111}}
          wrapperQuantity={{marginTop: 20}}
        />
        <View style={{marginTop: 20, backgroundColor: 'black', padding: 10}}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            onPress={() => navigation.navigate('Cart')}>
            <Text
              style={{
                color: COLORS.white,
                fontSize: 14,
                ...FONTS.fontSatoshiBold,
                flex: 1,
                textAlign: 'center',
              }}>
              Add to Cart
            </Text>
            <FeatherIcon color={COLORS.white} size={20} name="shopping-bag" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  titleSlider: {
    textAlign: 'center',
    marginVertical: 32,
    color: COLORS.title,
    fontSize: 20,
    ...FONTS.fontSatoshiBold,
  },
});
