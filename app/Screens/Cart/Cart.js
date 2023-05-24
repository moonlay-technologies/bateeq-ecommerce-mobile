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

  useEffect(() => {
    getListCart();
  }, []);

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
      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 45,
          justifyContent: 'space-between',
          borderBottomWidth:1,
          borderBottomColor:COLORS.borderColor,
        }}>
        <IconButton
          icon={() => (
            <View
              style={{
                borderWidth:1,
                borderColor:COLORS.borderColor,
                height: 30,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
              }}>
              <FeatherIcon color={COLORS.title} size={18} name="menu" />
            </View>
          )}
          size={25}
          onPress={() => navigation.openDrawer()}
        />
        <Text style={{...FONTS.fontSatoshiBold,color:COLORS.title,flex:1, fontSize: 18,justifyContent:'center',alignItems:'center', textAlign: 'center',marginLeft:5}}>bateeq</Text>
        <TouchableOpacity onPress={handlePress}>
          <Image
            style={{width: 70, height: 35}}
            source={require('../../assets/images/logo.png')}
          />
        </TouchableOpacity>
        <IconButton
                    icon={() => <FeatherIcon color={COLORS.title} size={20} name='search'/>}
                    size={25}
                    onPress={() => navigation.navigate('Search')}
                />
        <IconButton
                    icon={() => <FeatherIcon color={COLORS.title} size={20} name='heart'/>}
                    size={25}
                    onPress={() => navigation.navigate('Wishlist')}
                />
        <IconButton
          onPress={() => navigation.navigate('Cart')}
          icon={() => (
            <View>
              <FeatherIcon color={COLORS.title} size={20} name="shopping-bag" />
              <View
                style={{
                  height: 14,
                  width: 14,
                  borderRadius: 14,
                  backgroundColor: COLORS.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: -4,
                  right: -6,
                }}>
                <Text
                  style={{...FONTS.fontXs, fontSize: 10, color: COLORS.white}}>
                  2
                </Text>
              </View>
            </View>
          )}
          size={25}
        />
      </View> */}
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
      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderColor: COLORS.borderColor,
        }}>
        <Image
          style={{
            height: 35,
            width: 35,
            borderRadius: 20,
            marginRight: 10,
          }}
          source={IMAGES.user}
        />
        <Text
          style={{
            ...FONTS.fontSm,
            ...FONTS.fontBold,
            color: COLORS.title,
            flex: 1,
          }}>
          Deliver to Yatin
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{...FONTS.fontSm, ...FONTS.fontBold, color: COLORS.primary}}>
            Ram krishan, puram
          </Text>
          <FeatherIcon
            color={COLORS.primary}
            style={{marginLeft: 2, top: 1}}
            size={16}
            name="chevron-down"
          />
        </TouchableOpacity>
      </View> */}
      <View style={{flex: 1, padding: 10}}>
        <ScrollView>
          {dataCart.map((data, index) => (
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
          {/* <View style={GlobalStyleSheet.container}>
            <Text style={{...FONTS.fontSm, ...FONTS.fontBold, marginBottom: 6}}>
              Have a coupon code ? enter here
            </Text>
            <View>
              <FeatherIcon
                style={{position: 'absolute', left: 18, top: 16}}
                size={18}
                color={COLORS.primary}
                name="scissors"
              />
              <TextInput
                style={{
                  ...FONTS.font,
                  ...FONTS.fontBold,
                  color: COLORS.title,
                  borderWidth: 1,
                  borderColor: COLORS.borderColor,
                  borderRadius: 8,
                  paddingHorizontal: 18,
                  paddingLeft: 50,
                  borderStyle: 'dashed',
                }}
                defaultValue="B2GET150"
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 0,
                  padding: 13,
                }}>
                <FeatherIcon
                  size={22}
                  color={COLORS.title}
                  name="chevron-right"
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 8,
                marginTop: 12,
              }}>
              <Text style={{...FONTS.font}}>Price : </Text>
              <Text
                style={{...FONTS.font, ...FONTS.fontBold, color: COLORS.title}}>
                $158.2
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}>
              <Text style={{...FONTS.font}}>Tax : </Text>
              <Text
                style={{...FONTS.font, ...FONTS.fontBold, color: COLORS.title}}>
                0.5%
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}>
              <Text style={{...FONTS.font}}>Delivery Fee :</Text>
              <Text
                style={{...FONTS.font, ...FONTS.fontBold, color: COLORS.title}}>
                0.5%
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
                marginTop: 5,
                alignItems: 'center',
                borderTopWidth: 1,
                borderStyle: 'dashed',
                borderColor: COLORS.borderColor,
                paddingTop: 8,
              }}>
              <Text style={{...FONTS.font}}>Total : </Text>
              <Text style={{...FONTS.h4, color: COLORS.primary}}>$215.5</Text>
            </View>
          </View> */}
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
            {/* <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#1A120B',
              gap: 12,
              paddingVertical: 16,
              paddingHorizontal: 24,
              flexDirection: 'row',
              width: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleCheckout}>
            <Text
              style={{
                color: '#fff',
                fontFamily: FontFamily.satoshiBold,
                textAlign: 'center',
                alignItems: 'center',
              }}>
              Checkout
            </Text>
            <IconAwesome
              name="arrow-right"
              size={12}
              color="#fff"
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 2,
              }}
            />
          </TouchableOpacity>
        </View> */}
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
      {/* <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderColor: COLORS.borderColor,
        }}>
        <View style={{flex: 1}}>
          <Text style={{...FONTS.h4}}>$215.5</Text>
          <TouchableOpacity
            style={{
              marginTop: -4,
            }}>
            <Text
              style={{
                ...FONTS.fontXs,
                color: COLORS.primary,
                ...FONTS.fontBold,
              }}>
              View price details
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <CustomButton
            btnSm
            onPress={() => navigation.navigate('AddDeliveryAddress')}
            title="Checkout"
          />
        </View>
      </View> */}
    </SafeAreaView>
  );
};

export default Cart;
