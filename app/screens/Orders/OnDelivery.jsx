import React from 'react';
import { ScrollView } from 'react-native';
import CartItem from '../../components/CartItem';
import pic3 from '../../assets/images/shop/pic3.png';
import {connect} from "react-redux";

const CartData = [
  {
    productId: 'BA-050423-001',
    image: pic3,
    title: 'JACQUARD NALIKA 011',
    quantity: '2',
    size: 'M',
    date: '03 March 2023',
    status: 'On delivery',
    desc: 'On the way by Courir  [H. Stefanus]',
  },
];

function OnDelivery() {
  return (
    <ScrollView>
      {CartData.map((data, index) => (
        <CartItem
          key={index}
          productId={data.productId}
          image={data.image}
          title={data.title}
          // price={data.price}
          date={data.date}
          quantity={data.quantity}
          size={data.size}
          status={data.status}
          desc={data.desc}
        />
      ))}
    </ScrollView>
  );
}

export default connect(({})=> {

},{})(React.memo(OnDelivery));
