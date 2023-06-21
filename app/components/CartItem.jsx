import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import moment from 'moment/moment';
import { useNavigation } from '@react-navigation/native';
import {findKey, formatWithCommas} from "../utils/helper";

function CartItem({
  orderId,
  // productId,
  // image,
  orderName,
  // title,
  // quantity,
  // size,
  status,

  // desc,
  date,
...props
}) {
  const dateOrders = moment(date);

  const navigation = useNavigation();
  const formattedDate = dateOrders.format('MMMM Do YYYY');

  const handleClick = () => {
    navigation.navigate('OrderDetail', { orderId: orderId });
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 15, marginTop:20 }}>
      <TouchableOpacity
          activeOpacity={1}
        style={{
            elevation:undefined,
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderWidth: .5,
          borderColor: '#AAAAAA',
          borderRadius: 10,
        }}
        // onPress={handleClick}
      >

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                {/*<Text>{JSON.stringify(props?.lineItems?.nodes,null,2)}</Text>*/}

                    {
                        props?.lineItems &&
                        Array.isArray(props?.lineItems?.nodes) &&
                        props?.lineItems?.nodes.length > 0 ?
                            <View style={{flexDirection:'row',width:100}}>
                                {
                                    props?.lineItems?.nodes?.slice(0,2).map((item,index)=> (
                                        <View style={{width:50,height:50,overflow:"hidden", left:index > 0 ? index * -35 : 0,zIndex:2, borderRadius:50, backgroundColor:"rgba(55,55,255,.5)"}}>
                                            {
                                                item?.product?.images && item?.product?.images?.nodes && Array.isArray(item?.product?.images?.nodes) && item?.product?.images?.nodes.length > 0 &&
                                                <Image source={{uri:item?.product?.images?.nodes[0]?.url}} style={{height:50,width:50}}/>
                                            }
                                        </View>
                                    ))
                                }
                                {
                                    props?.lineItems?.nodes?.length > 2 && (
                                        <View style={{
                                            width:50,
                                            height:50,
                                            left:-70,
                                            flexDirection:'row',
                                            alignItems:"center",
                                            justifyContent:"center",
                                            borderRadius:50,
                                            elevation:14,

                                            backgroundColor:"#ffffff",
                                            shadowColor: '#000',
                                            shadowOffset: {
                                                width:0,
                                                height: 4,
                                            },
                                            shadowOpacity: 1,
                                            shadowRadius:0,
                                            zIndex:3,}}>
                                            <Text style={{fontSize:16,fontWeight:"600"}}>
                                                {props?.lineItems?.nodes.length ?? 0}
                                            </Text>
                                        </View>
                                    )
                                }
                            </View>
                        :
                        <View style={{flexDirection:'row',width:100}}>
                                <View style={{
                                    width:50,
                                    height:50,
                                    left:-70,
                                    flexDirection:'row',
                                    alignItems:"center",
                                    justifyContent:"center",
                                    borderRadius:50,
                                    elevation:14,

                                    backgroundColor:"#ffffff",
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width:0,
                                        height: 4,
                                    },
                                    shadowOpacity: 1,
                                    shadowRadius:0,
                                    zIndex:3,}}>
                                    <Text style={{fontSize:16,fontWeight:"600"}}>
                                        {findKey(props,['lineItems'])?.nodes.length ?? 0}
                                    </Text>
                                </View>
                        </View>
                    }
                <View>
                    <Text style={{fontSize:16,fontWeight:"600",marginBottom:2}}>{['Order',props?.name].join(' : ') ?? "-"}</Text>
                    <Text style={{fontSize:16,fontWeight:"bold"}}>{['Rp',formatWithCommas(props?.totalPriceSet?.presentmentMoney?.amount ?? 0)].join('. ') ?? "-"}</Text>
                    <View style={{flexDirection:"row",marginVertical:4}}>
                        <Text style={{fontSize:13}}>{'Total Quantity : '}</Text>
                        <Text style={{fontSize:13,fontWeight:"bold"}}>{findKey(props,['subtotalLineItemsQuantity']) ?? "-"}</Text>
                    </View>
                    <View
                        style={{
                            marginTop:10,
                            borderWidth: 1,
                            paddingVertical: 6,
                            paddingHorizontal:6,
                            borderRadius: 10,
                            borderColor: status === 'PENDING' ? '#FFE600' : status === 'EXPIRED' ? '#FFB8B8' : '#659C5C',
                            backgroundColor: status === 'PENDING' ? '#FFFDE7' : status === 'EXPIRED' ? '#FFB8B8' : '#EDFFEA',
                        }}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                ...FONTS.fontSatoshiBold,
                                fontSize: 10,
                                color: status === 'PENDING' ? '#FF8A00' : status === 'EXPIRED' ? '#FF3544' : '#4F7E48',
                            }}
                        >
                            {status === 'PAID' ? 'COMPLETE' : status === 'PENDING' ? 'CONFIRM' : 'CANCELED'}
                        </Text>
                    </View>
                </View>
            </View>
          <View style={{flexDirection:"column",alignItems:"flex-end"}}>
              <Text style={{ ...FONTS.fontSatoshiBold, fontSize:12, color: COLORS.text }}>{moment(props?.createdAt).format("DD/MM/YYYY")}</Text>
              <Text style={{ ...FONTS.fontSatoshiBold, fontSize:12, color: COLORS.text }}>{moment(props?.createdAt).format("HH:mm")}</Text>

          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default CartItem;
