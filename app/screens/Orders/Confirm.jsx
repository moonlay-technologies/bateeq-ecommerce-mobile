import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import CartItem from '../../components/CartItem';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../../graphql/admin/queries';
import LoadingScreen from '../../components/LoadingView';
import { connect } from 'react-redux';

const Confirm = ({ ...props }) => {
  let { info } = props;
  const [dataOrders, setDataOrders] = useState([]);
  const { data, loading } = useQuery(GET_ORDERS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      customerId: info?.id,
      query: 'financial_status:pending',
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
        <View style={{ height: '50%' }}>
          <LoadingScreen Loading3 />
        </View>
      )}
      {dataOrders.length === 0 && (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column', height: 500 }}>
          <Text style={{ color: 'black', fontSize: 16 }}>{`no orders confirmed`}</Text>
        </View>
      )}
      {dataOrders &&
        dataOrders.map(data => (
          <CartItem
            {...data}
            key={data.id}
            orderId={data.id}
            productId={data?.lineItems?.nodes[0]?.sku}
            orderName={data?.name}
            // title={data.lineItems.nodes[0].product.title}
            // price={data.price}
            date={data.createdAt}
            // quantity={data?.subtotalLineItemsQuantity}
            // size={data?.lineItems?.nodes[0]?.product?.variants?.nodes[0]?.selectedOptions[1]?.value}
            status={data.displayFinancialStatus}
          />
        ))}
    </ScrollView>
  );
};
export default connect(({ User }) => {
  let { options } = User;
  let { info } = options;
  return { info };
})(Confirm);
