import React, { useEffect, useState } from 'react';
import { Image, Text, View, ScrollView } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import { GET_ORDERS_DETAIL_BY_ID } from '../../graphql/admin/queries';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import { formatWithCommas } from '../../utils/helper';
import Header from '../../layout/Header';
import LoadingScreen from '../../components/LoadingView';

function OrderDetail({ route }) {
  const { orderId } = route.params;
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 15, marginVertical: 20 }}>
        {loading && (
          <View style={{ height: '100%' }}>
            <LoadingScreen />
          </View>
        )}
        <Header titleLeft leftIcon="back" title="Detail Order" />
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
            <Text style={{ marginTop: 10, ...FONTS.fontBold }}>
              <Text style={{ color: 'black' }}>Shipping Address :</Text>{' '}
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
                <Text style={{ ...FONTS.fontSatoshiRegular, marginTop: 20 }}>
                  Variant: <Text style={{ color: COLORS.title, ...FONTS.fontSatoshiBold }}>{item.variantTitle}</Text>
                </Text>
                <Text style={{ ...FONTS.fontSatoshiRegular, marginTop: 20 }}>
                  Qty: <Text style={{ color: COLORS.title, ...FONTS.fontSatoshiBold }}>{item.quantity}</Text>
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
      </View>
    </ScrollView>
  );
}

export default OrderDetail;
