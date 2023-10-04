import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import CartItem from '../../components/CartItem';
// import pic1 from '../../assets/images/shop/pic1.png';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../../service/admin-graphql/query/orders';
import LoadingScreen from '../../components/LoadingView';
import { useSelector } from 'react-redux';

const Completed = () => {
  const [dataOrders, setDataOrders] = useState([]);
  const { customerInfo } = useSelector(state => state.user);
  const { data, loading } = useQuery(GET_ORDERS, {
    fetchPolicy: "cache-and-network",
    variables: {
      customerId: customerInfo.id,
      query: 'financial_status:paid',
    },
    context: {
      clientName: 'httpLink2',
    },
  });

  console.log('data complete', data);

  useEffect(() => {
    if (data) {
      setDataOrders(data?.customer?.orders?.nodes);
    }
  }, [data]);

  console.log(
    'dataOrders',
    dataOrders.map(e => e.totalPriceSet.presentmentMoney.amount)
  );

  return (
    <ScrollView>
      {loading && <LoadingScreen Loading3 />}
      {dataOrders.length === 0 && (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column', height: 500 }}>
          <Text style={{ color: 'black', fontSize: 16 }}>No data in complete</Text>
        </View>
      )}
      {dataOrders &&
        dataOrders.map(data => (
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

export default Completed;
