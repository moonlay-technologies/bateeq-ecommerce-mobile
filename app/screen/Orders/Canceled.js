import React from 'react';
import { ScrollView } from 'react-native';
import CartItem from '../../components/CartItem';
import pic2 from '../../assets/images/shop/pic2.png';

const CartData = [
  {
    productId: 'BA-050423-001',
    image: pic2,
    title: 'JACQUARD NALIKA 011',
    quantity: '2',
    size: 'M',
    // price : "$158.2",
    date: '05 March 2023',
    status: 'Canceled',
    desc: 'Reach on payment due date',
  },
];

function Canceled() {
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

export default Canceled;
