import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import CheckoutItem from '../../components/CheckoutItem';
import {COLORS, FONTS} from '../../constants/theme';
import Header from '../../layout/Header';
import pic1 from '../../assets/images/product/product1.jpg';
import pic2 from '../../assets/images/product/product2.jpg';
import pic3 from '../../assets/images/product/product3.jpg';
import CustomButton from '../../components/CustomButton';
import { CartApi } from '../../service/shopify-api';
import { useQuery, gql } from "@apollo/client";


const CheckoutData = [
  {
    image: pic1,
    title: 'JACQUARD NALIKA 014',
    size: 'XS',
    quantity: 1,
    price: 'Rp792,000',
    oldPrice: 'Rp1,079,000',
  },
  {
    image: pic2,
    title: 'JACQUARD NALIKA 014',
    size: 'XS',
    quantity: 1,
    price: 'Rp792,000',
    oldPrice: 'Rp1,079,000',
  },
  {
    image: pic3,
    title: 'JACQUARD NALIKA 014',
    size: 'XS',
    quantity: 1,
    price: 'Rp792,000',
    oldPrice: 'Rp1,079,000',
  },
];

const Cart = ({navigation}) => {
  const handlePress = () => {
    navigation.navigate('Home');
  };

  const [instruction, setInstructuction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dataCart, setDataCart] = useState(CheckoutData)
  const [filterData, setFilterData] = useState({
    limit: 5,
  });

  const handleInstructionChange = text => {
    setInstructuction(text);
  };

  // useEffect(() => {
  //   getListCart();
  // }, []);

  const getListCart = () => {
    setIsLoading(true);
    CartApi.get(filterData)
      .then(res => {
        console.log('resss cart', res.checkouts);
        // console.log(res.products[0].images.map(src => src.src));
        setIsLoading(false);
        setDataCart(res.checkouts.line_items)
        // setProductData(res.products);
      })
      .catch(error => {
        setIsLoading(false);
        console.log('errorrr', error);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <View style={{paddingHorizontal: 20}}>
        <Header
          backAction={() => navigation.navigate('Home')}
          titleLeft
          title={'back'}
          leftIcon={'back'}
        />
      </View>
      <Text
        style={{
          color: COLORS.title,
          fontSize: 24,
          ...FONTS.fontSatoshiBold,
          paddingHorizontal: 20,
          paddingTop: 20,
        }}>
        My Cart
      </Text>
      <View style={{flex: 1, padding: 10}}>
        <ScrollView>
          {dataCart?.map((data, index) => (
            <CheckoutItem
              onPress={() =>{
                  // navigation.navigate('ProductDetail', {
                  //     item: {
                  //         imagePath: data.image,
                  //         title: data.title,
                  //         price: data.price,
                  //         oldPrice: data.oldPrice,
                  //     },
                  //     category: 'Fashion',
                  // })
              }}
              key={index}
              image={data.image}
              title={data.title}
              size={data.size}
              quantity={data.quantity}
              price={data.price}
              oldPrice={data.oldPrice}
            />
          ))}
          <View style={{padding: 20}}>
            <Text style={{...FONTS.fontSatoshiBold, marginBottom: 12}}>
              Special Instruction
            </Text>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Write Instruction Here..."
              placeholderTextColor="gray"
              numberOfLines={5}
              multiline={true}
              onChangeText={handleInstructionChange}
              value={instruction}
              style={{
                borderWidth: 1,
                textAlignVertical: 'top',
                padding: 15,
                ...FONTS.fontSatoshiRegular,
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 100,
            }}>
            <CustomButton
              // btnSm
              // onPress={() => navigation.navigate('AddDeliveryAddress')}
              onPress={() => navigation.navigate('Checkout')}
              title="Checkout"
              customWidth={200}
              arrowIcon={true}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Cart;
