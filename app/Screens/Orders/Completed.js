import React from 'react';
import { ScrollView } from 'react-native';
import CartItem from '../../components/CartItem';
import pic1 from '../../assets/images/shop/pic1.png';

const CartData = [
  {
    productId: 'BA-050423-001',
    image: pic1,
    title: 'JACQUARD NALIKA 011',
    quantity: '2',
    size: 'L',
    // price : "$47.6",
    date: '04 March 2023',
    status: 'Completed',
    desc: 'Order Received by [Louis Simatupang]',
  },
];

function Completed() {
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

export default Completed;
