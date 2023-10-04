import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import CartItem from '../../components/CartItem';
// import pic1 from '../../assets/images/shop/picture1.jpg';
// import pic2 from '../../assets/images/shop/picture2.jpg';
// import pic3 from '../../assets/images/shop/picture3.jpg';
// import pic4 from '../../assets/images/shop/picture4.jpg';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../../service/admin-graphql/query/orders';
import LoadingScreen from '../../components/LoadingView';
import NoContent from '../../components/NoContent';
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';

// const AllCartData = [
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
//   {
//     productId: 'BA-050423-001',
//     image: pic2,
//     title: 'JACQUARD NALIKA 011',
//     quantity: '2',
//     size: 'M',
//     // price : "$158.2",
//     date: '05 March 2023',
//     status: 'Canceled',
//     desc: 'Reach on payment due date',
//   },
//   {
//     productId: 'BA-050423-001',
//     image: pic3,
//     title: 'JACQUARD NALIKA 011',
//     quantity: '2',
//     size: 'M',
//     // price : "$158.2",
//     date: '03 March 2023',
//     status: 'On delivery',
//     desc: 'On the way by Courir  [H. Stefanus]',
//   },
//   {
//     productId: 'BA-050423-001',
//     image: pic4,
//     title: 'JACQUARD NALIKA 011',
//     quantity: '2',
//     size: 'L',
//     // price : "$47.6",
//     date: '04 March 2023',
//     status: 'Completed',
//     desc: 'Order Received by [Louis Simatupang]',
//   },
// ];

const AllCart = () => {
  const [dataOrders, setDataOrders] = useState([]);
  const { customerInfo } = useSelector(state => state.user);
  const navigation = useNavigation();
  const { data, loading } = useQuery(GET_ORDERS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      customerId: customerInfo.id,
      query: '',
    },
    context: {
      clientName: 'httpLink2',
    },
  });

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
      {loading && <LoadingScreen Loading2 />}
      {dataOrders.length === 0 && (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column', height: 500 }}>
          <NoContent to={() => navigation.navigate('Home')} text="No orders yet" />
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

export default AllCart;
