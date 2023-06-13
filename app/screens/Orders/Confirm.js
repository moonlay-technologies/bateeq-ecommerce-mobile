import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import CartItem from '../../components/CartItem';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../../graphql/admin/queries';
import LoadingScreen from '../../components/LoadingView';
import { useSelector } from 'react-redux';

// const CartData = [
//   {
//     productId: 'BA-050423-001',
//     image: pic1,
//     title: 'JACQUARD NALIKA 011',
//     quantity: '2',
//     size: 'XS',
//     // price : "$47.6",
//     date: '05 March 2023',
//     status: 'Confirmed',
//     desc: 'Order Received by [Louis Simatupang]',
//   },
// ];

const Confirm = () => {
  const [dataOrdersPending, setDataOrdersPending] = useState([]);
  const { customerInfo } = useSelector(state => state.user);
  const { data, loading } = useQuery(GET_ORDERS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      customerId: customerInfo.id,
      query: 'financial_status:pending',
    },
    context: {
      clientName: 'httpLink2',
    },
  });

  useEffect(() => {
    if (data) {
      setDataOrdersPending(data?.customer?.orders?.nodes);
    }
  }, [data]);
  return (
    <ScrollView>
      {loading && <LoadingScreen Loading2 />}
      {dataOrdersPending.length === 0 && (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column', height: 500 }}>
          <Text style={{ color: 'black', fontSize: 16 }}>No orders need to be confirmed</Text>
        </View>
      )}
      {dataOrdersPending &&
        dataOrdersPending.map(data => (
          <CartItem
            key={data.id}
            productId={data?.lineItems?.nodes[0]?.sku}
            imageSrc={data?.lineItems?.nodes[0]?.product?.images?.nodes[0]?.url}
            title={data.lineItems.nodes[0].product.title}
            // price={data.price}
            date={data.createdAt}
            quantity={data.lineItems.nodes[0].currentQuantity}
            size={data?.lineItems?.nodes[0]?.product?.variants?.nodes[0]?.selectedOptions[1]?.value}
            status={data.displayFinancialStatus}
          />
        ))}
    </ScrollView>
  );
};

export default Confirm;
