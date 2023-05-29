import React, {useState, useEffect} from 'react';
import {
  // Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  // TouchableOpacity,
  View,
} from 'react-native';
// import {IconButton} from 'react-native-paper';
// import FeatherIcon from 'react-native-vector-icons/Feather';
import CheckoutItem from '../../components/CheckoutItem';
import {COLORS, FONTS} from '../../constants/theme';
import Header from '../../layout/Header';
import pic1 from '../../assets/images/product/product1.jpg';
import pic2 from '../../assets/images/product/product2.jpg';
import pic3 from '../../assets/images/product/product3.jpg';
// import {GlobalStyleSheet} from '../../constants/StyleSheet';
import CustomButton from '../../components/CustomButton';
import { CartApi } from '../../service/shopify-api';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [dataCart, setDataCart] = useState(null)
  const [filterData, setFilterData] = useState({
    limit: 5,
  });

  const handleInstructionChange = text => {
    setInstructuction(text);
  };

  useEffect(async () => {
    try {
     const data = await AsyncStorage.getItem('productDetail')
     console.log('asyncStorage get product',data)
    } catch (error) {
      console.log('errpr', error)
    }
   
    getListCart();
  }, []);

  const getListCart = () => {
    setIsLoading(true);
    CartApi.get(filterData)
      .then(res => {
        setIsLoading(false);
        setDataCart(res.checkouts.line_items)
        // setProductData(res.products);
      })
      .catch(error => {
        setIsLoading(false);
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
          {CheckoutData.map((data, index) => (
            <CheckoutItem
              onPress={() =>
                navigation.navigate('ProductDetail', {
                  item: {
                    imagePath: data.image,
                    title: data.title,
                    price: data.price,
                    oldPrice: data.oldPrice,  
                  },
                  category: 'Fashion',
                })
              }
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
