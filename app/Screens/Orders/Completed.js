import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import CartItem from '../../components/CartItem';
// import pic1 from '../../assets/images/shop/pic1.png';
import {useQuery} from '@apollo/client';
import {GET_ORDERS} from '../../service/admin-graphql/query/orders';
import LoadingScreen from '../../components/LoadingView';

// const CartData = [
//   {
//     productId: 'BA-050423-001',
//     image: pic1,
//     title: 'JACQUARD NALIKA 011',
//     quantity: '2',
//     size: 'L',
//     // price : "$47.6",
//     date: '04 March 2023',
//     status: 'Completed',
//     desc: 'Order Received by [Louis Simatupang]',
//   },
// ];

const Completed = () => {
  const [dataOrders, setDataOrders] = useState([]);
  const {data, loading} = useQuery(GET_ORDERS, {
    fetchPolicy: 'no-cache',
    variables: {
      customerId: 'gid://shopify/Customer/7132117664027',
      query: 'financial_status:paid',
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
    dataOrders.map(e => e.totalPriceSet.presentmentMoney.amount),
  );

  return (
    <ScrollView>
      {loading && <LoadingScreen Loading2 />}
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

export default Completed;
