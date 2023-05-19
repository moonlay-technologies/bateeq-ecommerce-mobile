import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DeliveryOption from '../../components/DeliveryOption';
import CustomButton from '../../components/CustomButton';
import {COLORS, FONTS} from '../../constants/theme';
import shop1 from '../../assets/images/shop/picture1.jpg';
import Header from '../../layout/Header';

const DetailCheckoutData = [
  {
    image: shop1,
    title: 'JACQUARD NALIKA 014',
    size: 'XS',
    quantity: 1,
    price: 'Rp792,000',
    oldPrice: 'Rp1,079,000',
  },
];

const Checkout = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <View style={{paddingHorizontal: 20}}>
        <Header titleLeft leftIcon={'back'} title={'Back'} />
      </View>
      <ScrollView>
        {DetailCheckoutData.map(
          ({title, size, price, quantity, image}, index) => (
            <View
              style={{
                padding: 20,
                backgroundColor: COLORS.white,
                marginTop: -80,
              }}
              key={index}>
              <Text
                style={{
                  fontSize: 18,
                  ...FONTS.fontSatoshiBold,
                  color: COLORS.title,
                  marginVertical: 20,
                }}>
                Checkout
              </Text>
              {/* <View style={{flexDirection: 'row', gap: 20, marginBottom: 20}}>
          <View>
            <Image
              style={styles.cardImage}
              source={require('../../assets/images/shop/picture1.jpg')}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 18,
                color: COLORS.title,
                ...FONTS.fontSatoshiBold,
              }}>
              JACQUARD NALIKA 014
            </Text>
            <Text>
              Size:{' '}
              <Text
                style={{
                  ...FONTS.fontSatoshiBold,
                  color: COLORS.title,
                }}>
                XS
              </Text>
            </Text>
            <View>
              <Text style={{marginTop: 36}}>Qty: 1</Text>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.title,
                  marginTop: 48,
                  ...FONTS.fontSatoshiBold,
                }}>
                Rp 792,000
              </Text>
            </View>
          </View>
        </View> */}
              <View
                activeOpacity={0.9}
                style={{
                  flexDirection: 'row',
                  //   paddingHorizontal: 5,
                  paddingBottom: 15,
                  paddingTop: 15,
                }}>
                <Image
                  style={{
                    height: 120,
                    width: 80,
                    // borderRadius:8,
                    marginRight: 12,
                  }}
                  source={image}
                />
                <View style={{flex: 1, paddingBottom: 7}}>
                  <Text
                    numberOfLines={1}
                    style={{
                      ...FONTS.fontSatoshiBold,
                      color: COLORS.title,
                      // marginBottom: 4,
                      fontSize: 16,
                    }}>
                    {title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{...FONTS.fontSatoshiRegular, color: '#BCBCBC'}}>
                    Size:{' '}
                    <Text
                      style={{color: COLORS.title, ...FONTS.fontSatoshiBold}}>
                      {size}
                    </Text>
                  </Text>
                  <Text style={{...FONTS.fontSatoshiRegular, marginTop: 12}}>
                    Qty:{' '}
                    <Text
                      style={{color: COLORS.title, ...FONTS.fontSatoshiBold}}>
                      {quantity}
                    </Text>
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 12,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                      }}>
                      <Text style={{...FONTS.fontSatoshiRegular}}>
                        {quantity > 1 ? 'and +1 item more' : null}
                      </Text>
                      {/*<Text
                style={{
                  ...FONTS.fontSm,
                  textDecorationLine: 'line-through',
                  marginLeft: 8,
                }}>
                {oldPrice}
              </Text> */}
                    </View>
                  </View>
                  {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() =>
                itemQuantity > 1 && setItemQuantity(itemQuantity - 1)
              }
              style={{
                height: 32,
                width: 30,
                borderWidth: 1,
                // borderRadius:6,
                borderColor: COLORS.borderColor,
                backgroundColor: '#AAAAAA',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FeatherIcon size={14} color={COLORS.white} name="minus" />
            </TouchableOpacity>
            <Text
              style={{
                ...FONTS.fontSatoshiBold,
                color: COLORS.title,
                width: 120,
                textAlign: 'center',
                borderWidth: 1,
                marginHorizontal: 8,
                paddingVertical: 5,
                paddingHorizontal: 50,
              }}>
              {itemQuantity}
            </Text>
            <TouchableOpacity
              onPress={() => setItemQuantity(itemQuantity + 1)}
              style={{
                height: 32,
                width: 30,
                borderWidth: 1,
                // borderRadius:6,
                backgroundColor: '#303030',
                borderColor: COLORS.borderColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FeatherIcon size={14} color={COLORS.white} name="plus" />
            </TouchableOpacity>
          </View> */}
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        ...FONTS.fontSatoshiBold,
                        color: COLORS.title,
                        marginRight: 15,
                      }}>
                      {price}
                    </Text>
                    {/* <Text style={{...FONTS.fontXs,textDecorationLine:'line-through'}}>{oldPrice}</Text> */}
                  </View>
                </View>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      ...FONTS.fontSatoshiBold,
                      marginBottom: 12,
                      color: COLORS.title,
                    }}>
                    Deliver To
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Address')}>
                    <Text
                      style={{
                        color: 'grey',
                        marginBottom: 12,
                        ...FONTS.fontSatoshiRegular,
                      }}>
                      Change
                    </Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Write Instruction Here..."
                  placeholderTextColor="gray"
                  numberOfLines={5}
                  multiline={true}
                  value={
                    'PT Moonlay Technologies\n\nSCBD, Equity Tower 25th Floor, Suite H.\nJl. Jend. Sudirman Kav. 52-53, South Jakarta,\nIndonesia 12190'
                  }
                  style={{
                    borderWidth: 1,
                    textAlignVertical: 'top',
                    padding: 15,
                    borderRadius: 6,
                    backgroundColor: '#D8D8D8',
                    ...FONTS.fontSatoshiRegular,
                  }}
                />

                <DeliveryOption
                  title="Delivery Option"
                  items={[
                    {label: 'Cash on Delivery', value: 'cashondelivery'},
                    {label: 'Credit Card', value: 'creditcard'},
                    {label: 'Not Banking', value: 'notbanking'},
                  ]}
                  showChangeButton={true}
                />
                <DeliveryOption
                  title="Rewards"
                  items={[
                    {label: 'No Reward Applied', value: 'norewardapplied'},
                  ]}
                />
                <View style={styles.wrapperTotal}>
                  <View style={styles.subtotal}>
                    <Text
                      style={{
                        color: COLORS.title,
                        ...FONTS.fontSatoshiBold,
                      }}>
                      Subtotal
                    </Text>
                    <Text
                      style={{
                        color: COLORS.title,
                        ...FONTS.fontSatoshiBold,
                      }}>
                      {price}
                    </Text>
                  </View>
                  <View style={styles.deliveryfee}>
                    <Text>Delivery Fee</Text>
                    <Text>Rp0</Text>
                  </View>
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
                    onPress={() => navigation.navigate('Payment')}
                    title="Proceed to Payment"
                    customWidth={250}
                    arrowIcon={true}
                  />
                </View>
              </View>
            </View>
          ),
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  cardImage: {
    width: 100,
    height: 170,
  },
  wrapperTotal: {
    flexDirection: 'column',
    marginTop: 20,
  },
  subtotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deliveryfee: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
