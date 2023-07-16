import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import CartItem from '../../components/CartItem';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../../graphql/admin/queries';
import LoadingScreen from '../../components/LoadingView';
import {connect} from 'react-redux';
const Canceled = ({...props}) => {
  let { info } = props
  const [dataOrders, setDataOrders] = useState([]);
  const { data, loading } = useQuery(GET_ORDERS, {
    fetchPolicy: 'no-cache',
    variables: {
      customerId: info?.id,
      query: 'financial_status:expired',
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
      {loading && (
        <View style={{ height: '50%', backgroundColor: 'red' }}>
          <LoadingScreen Loading3 />
        </View>
      )}
      {dataOrders.length === 0 && (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column', height: 500 }}>
          <Text style={{ color: 'black', fontSize: 16 }}>{`Yeay, No orders were canceled :D`}</Text>
        </View>
      )}
      {dataOrders &&
        dataOrders.map(data => (
          <CartItem
            key={data.id}
            orderId= {data.id}
            productId={data?.lineItems?.nodes[0]?.sku}
            imageSrc={data?.lineItems?.nodes[0]?.product?.images?.nodes[0]?.url}
            title={data.lineItems.nodes[0].product.title}
            // price={data.price}
            date={data.createdAt}
            quantity={data?.subtotalLineItemsQuantity}
            size={data?.lineItems?.nodes[0]?.product?.variants?.nodes[0]?.selectedOptions[1]?.value}
            status={data.displayFinancialStatus}
          />
        ))}
    </ScrollView>
  );
};
export default connect(({User})=> {
  let { options } = User
  let { info } = options
  return { info }
})(Canceled);
