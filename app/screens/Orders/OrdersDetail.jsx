import React, { useEffect, useState } from 'react';
import {Image, Text, View, ScrollView, useWindowDimensions} from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import { GET_ORDERS_DETAIL_BY_ID } from '../../graphql/admin/queries';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import 'moment/locale/id'
import {findKey, formatWithCommas} from '../../utils/helper';
import Header from '../../layout/Header';
import LoadingScreen from '../../components/LoadingView';

function Hero({data, ...props}){
  function getDate(format = 'DD/MM/YYYY'){
    if(data?.createdAt && moment(data?.createdAt).isValid()){
      return moment(data?.createdAt).format(format)
    }
    return ""
  }
  return (
    <View style={{
      width:"100%",
      // padding:10,
      marginBottom:10,
    }}>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
        <Text style={{color:COLORS.title,fontSize:16, fontWeight:"700"}}>{['Order',data?.name ?? "-"].join(" : ")}</Text>
        <View style={{alignItems:"flex-end"}}>
          <Text style={{fontSize:12}}>{getDate('DD/MM/YYYY')}</Text>
          <Text style={{fontSize:12}}>{getDate('HH:mm a')}</Text>
        </View>
      </View>
    </View>
  )
}

function ProductItem({data, ...props}){
  const [widthLayout,setWidthLayout ] = useState(0)
  
  const onLayout = (event)=> {
    let { width } = event.nativeEvent.layout
    setWidthLayout(width)
  }
  
  
  return (
    <View style={{
      marginBottom:10,
      padding:15,
      borderWidth:.6,
      borderColor:"rgba(0,0,0,.3)",
      borderRadius:10,
    }} onLayout={onLayout}>
      <View style={{
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom:0
      }}>
        <View style={{
          minWidth:70,
          minHeight:70,
          maxHeight:120
        }}>
          <View style={{
            width:70,
            overflow:"hidden",
            borderRadius:10,
            height:70,
            backgroundColor:COLORS.success
          }}>
            <Image
              style={{
                height: 70,
                width: "100%",
                objectFit:"cover"
              }}
              source={{ uri: data?.image?.url }}
            />
          </View>
        </View>
        <View style={{
          marginLeft:10,
          width:widthLayout > 0 ? widthLayout - (70 + 45) : widthLayout - 45,
        }}>
          <View style={{
            marginBottom:10
          }}>
            <Text numberOfLines={2} style={{
              ...FONTS.fontSatoshiBold,
              color: COLORS.title,
              fontSize: 13,
            }}>
              {data?.name ?? "-"}
            </Text>
          </View>
          {
            data?.variant && data?.variant?.selectedOptions && Array.isArray(findKey(data,['variant','selectedOptions'])) && findKey(data,['variant','selectedOptions']).length > 0 && (
              findKey(data,['variant','selectedOptions']).map((item,index)=> (
                <View style={{ ...FONTS.fontSatoshiRegular, color: 'black',flexDirection:"row" }}>
                  <Text style={{fontSize:12}}>{[item.name,":"].join(' ')} </Text>
                  <Text style={{ color: 'black', ...FONTS.fontSatoshiBold,fontSize:12 }}>{item.value}</Text>
                </View>
              ))
            )
          }
          
          <Text style={{ ...FONTS.fontSatoshiRegular, color: 'black' }}>
            Weight: <Text style={{ color: 'black', ...FONTS.fontSatoshiBold,fontSize:12 }}>{[data?.variant?.weight,data?.variant?.weightUnit].join(' ')}</Text>
          </Text>
        </View>
      </View>
      {/*<View style={{*/}
      {/*  borderWidth:.4,*/}
      {/*  marginBottom:10,*/}
      {/*  borderColor:"rgba(0,0,0,.2)",*/}
      {/*}}/>*/}
    </View>
  )
}

function FooterOrder({...props}){
  return (
    <View>
      <View style={{
        marginVertical:15,
        borderRadius:10,
        borderWidth:.4,
        borderColor:COLORS.borderColor,
        backgroundColor: '#ffffff',
      }}/>
      <View>
        <Text style={{marginBottom:5,color: 'black', ...FONTS.fontBold,fontSize:13}}>Shipping Address</Text>
        <Text numberOfLines={1} style={{fontSize:13}}>
          {Object.entries(props?.data?.shippingAddress ?? {}).map(([key,value])=> key !== '__typename' ? value: '').join(', ')}
        </Text>
      </View>
      
      <View style={{
        marginVertical:15,
        borderRadius:10,
        borderWidth:.4,
        display:"flex",
        flexDirection:"row",
        justifyContent :"space-between",
        borderColor:COLORS.borderColor,
        backgroundColor: '#ffffff',
      }}/>
      <View style={{flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>
        <View>
          <Text style={{marginBottom:5,color: 'black', ...FONTS.fontBold,fontSize:13}}>Total</Text>
          <Text numberOfLines={1} style={{fontSize:13}}>
            {
              typeof(props?.data?.totalPriceSet?.presentmentMoney?.amount) !== 'undefined' ? `RP ${formatWithCommas(Number(props?.data?.totalPriceSet?.presentmentMoney?.amount).toLocaleString())}`:"-"
            }
          </Text>
        </View>
        <View
          style={{
            borderWidth:.8,
            paddingVertical: 6,
            paddingHorizontal:20,
            borderRadius: 10,
            borderColor:
              props?.data?.displayFinancialStatus === 'PENDING'
                ? '#FFE600'
                : props?.data?.displayFinancialStatus === 'EXPIRED'
                  ? '#FFB8B8'
                  : '#659C5C',
            backgroundColor:
              props?.data?.displayFinancialStatus === 'PENDING'
                ? '#FFFDE7'
                : props?.data?.displayFinancialStatus === 'EXPIRED'
                  ? '#FFB8B8'
                  : '#EDFFEA',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              ...FONTS.fontSatoshiBold,
              fontSize: 12,
              color:
                props?.data?.displayFinancialStatus === 'PENDING'
                  ? '#FF8A00'
                  : props?.data?.displayFinancialStatus === 'EXPIRED'
                    ? '#FF3544'
                    : '#4F7E48',
            }}
          >{props?.data?.displayFinancialStatus}</Text>
        </View>
      </View>
    </View>
  )
}
function OrderDetail({ route }) {
  const { orderId } = route.params;
  const screen = useWindowDimensions();
  const [detailOrder, setOrderDetail] = useState(null);
  const { data, loading } = useQuery(GET_ORDERS_DETAIL_BY_ID, {
    fetchPolicy: 'no-cache',
    variables: {
      orderId: orderId,
    },
    context: {
      clientName: 'httpLink2',
    },
  });
  
  useEffect(() => {
    if (data) {
      setOrderDetail(data.node);
    }
  }, [data]);
  
  const dateDetailOrder = moment(detailOrder?.createdAt);
  const formattedDate = dateDetailOrder.format('MMMM Do YYYY');
  
  return (
    <React.Fragment>
      <View style={{
        backgroundColor:COLORS.white,
        width:screen.width,
        height: screen.height,
      }}>
        <Header  titleLeft leftIcon="back" title="Detail Order" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, paddingHorizontal: 15, marginVertical: 20 }}>
            {loading && (
              <View style={{ height: '100%' }}>
                <LoadingScreen />
              </View>
            )}
            
            {
              Array.isArray(detailOrder?.lineItems?.nodes) && detailOrder?.lineItems?.nodes.length > 0 ?
                <View style={{
                  
                  borderRadius:10,
                  paddingVertical:20,
                  paddingHorizontal:20,
                  borderWidth:.8,
                  shadowColor: 'rgba(0,0,0,0.3)',
                  elevation: 10,
                  backgroundColor: '#ffffff',
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 0,
                  borderColor:COLORS.borderColor
                }}>
                  <Hero data={detailOrder}/>
                  <View style={{marginBottom:10,}}>
                    <Text style={{
                      fontSize:14,
                      fontWeight:"500",
                      color:COLORS.title
                    }}>Detail Product</Text>
                  </View>
                  {
                    detailOrder?.lineItems?.nodes.map((item,index)=> (
                      <ProductItem data={item} index={index}/>
                    ))
                  }
                  
                  <FooterOrder data={detailOrder}/>
                </View>
                
                :(
                  <View>
                    <Text>Empty</Text>
                  </View>
                )
            }
            
          </View>
        </ScrollView>
      </View>
    </React.Fragment>
  );
}


function ExistingReza({formatWithCommas,formattedDate,detailOrder,...props}){
  return (
    <View
      style={{
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#AAAAAA',
        borderRadius: 10,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ ...FONTS.fontSatoshiBold, color: COLORS.title }}>{`Order ${detailOrder?.name}`}</Text>
        <Text style={{ ...FONTS.fontSatoshiBold, color: COLORS.title }}>{formattedDate}</Text>
      </View>
      <View>
        <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
          <Text style={{ color: 'black', ...FONTS.fontBold, marginRight: 5 }}>Status:</Text>
          <Text
            style={{
              color: detailOrder?.displayFulfillmentStatus === 'UNFULFILLED' ? '#F2BE22' : '#EDFFEA',
              ...FONTS.fontBold,
            }}
          >{`${detailOrder?.displayFulfillmentStatus}`}</Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            paddingVertical: 10,
            borderRadius: 10,
            borderColor:
              detailOrder?.displayFinancialStatus === 'PENDING'
                ? '#FFE600'
                : detailOrder?.displayFinancialStatus === 'EXPIRED'
                  ? '#FFB8B8'
                  : '#659C5C',
            backgroundColor:
              detailOrder?.displayFinancialStatus === 'PENDING'
                ? '#FFFDE7'
                : detailOrder?.displayFinancialStatus === 'EXPIRED'
                  ? '#FFB8B8'
                  : '#EDFFEA',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              ...FONTS.fontSatoshiBold,
              fontSize: 16,
              color:
                detailOrder?.displayFinancialStatus === 'PENDING'
                  ? '#FF8A00'
                  : detailOrder?.displayFinancialStatus === 'EXPIRED'
                    ? '#FF3544'
                    : '#4F7E48',
            }}
          >{`Payment Status : ${detailOrder?.displayFinancialStatus}`}</Text>
        </View>
        <Text style={{ marginTop: 10, ...FONTS.fontBold, color: 'black' }}>
          <Text style={{ color: 'black', fontWeight: '100' }}>Shipping Address :</Text>
          {`${detailOrder?.shippingAddress?.address1} ${detailOrder?.shippingAddress?.address2} ${detailOrder?.shippingAddress?.city} ${detailOrder?.shippingAddress?.province} ${detailOrder?.shippingAddress?.country}   `}
        </Text>
      </View>
      {detailOrder?.lineItems?.nodes?.map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingBottom: 15,
            paddingTop: 15,
          }}
        >
          <Image
            style={{
              height: 120,
              width: 80,
              marginRight: 12,
            }}
            source={{ uri: item.image.url }}
          />
          <View style={{ flex: 1, paddingBottom: 7 }}>
            <Text
              numberOfLines={1}
              style={{
                ...FONTS.fontSatoshiBold,
                color: COLORS.title,
                fontSize: 16,
              }}
            >
              {item.name}
            </Text>
            <Text style={{ ...FONTS.fontSatoshiRegular, marginTop: 20, color: 'black' }}>
              Variant: <Text style={{ color: 'black', ...FONTS.fontSatoshiBold }}>{item.variantTitle}</Text>
            </Text>
            <Text style={{ ...FONTS.fontSatoshiRegular, marginTop: 20, color: 'black' }}>
              Qty: <Text style={{ color: 'black', ...FONTS.fontSatoshiBold }}>{item.quantity}</Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 12,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}
              ></View>
            </View>
          </View>
        </View>
      ))}
      <View
        style={{
          borderWidth: 1,
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ color: 'black', fontSize: 16, ...FONTS.fontBold }}>Total</Text>
        <Text
          style={{
            textAlign: 'left',
            ...FONTS.fontSatoshiBold,
            fontSize: 16,
            color: 'black',
          }}
        >
          RP {formatWithCommas(Number(detailOrder?.totalPriceSet?.presentmentMoney?.amount).toLocaleString())}
        </Text>
      </View>
    </View>
  )
}

export default OrderDetail;