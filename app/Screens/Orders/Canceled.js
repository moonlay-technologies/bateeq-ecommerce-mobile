import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text} from 'react-native';
import CartItem from '../../components/CartItem';
// import pic2 from '../../assets/images/shop/pic2.png';
import {useQuery} from '@apollo/client';
import {GET_ORDERS} from '../../service/admin-graphql/query/orders';
import LoadingScreen from '../../components/LoadingView';

// const CartData = [
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
// ];

const Canceled = () => {
  const [dataOrders, setDataOrders] = useState([]);
  const {data, loading} = useQuery(GET_ORDERS, {
    fetchPolicy: 'no-cache',
    variables: {
      customerId: 'gid://shopify/Customer/7132117664027',
      query: 'financial_status:voided',
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
  return (
    <ScrollView>
    {loading && <LoadingScreen Loading2 />}
    {dataOrders.length === 0 && <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column', height: 500}}><Text style={{color: 'black', fontSize: 20}}>No DATA</Text></View>}
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
          size={
            data?.lineItems?.nodes[0]?.product?.variants?.nodes[0]
              ?.selectedOptions[1]?.value
          }
          status={data.displayFinancialStatus}
        />
      ))}
    </ScrollView>
  );
};

export default Canceled;
