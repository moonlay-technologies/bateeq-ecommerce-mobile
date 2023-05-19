import React from 'react';
import {ScrollView} from 'react-native';
import CartItem from '../../components/CartItem';
import pic1 from '../../assets/images/shop/picture1.jpg';
import pic2 from '../../assets/images/shop/picture2.jpg';
import pic3 from '../../assets/images/shop/picture3.jpg';
import pic4 from '../../assets/images/shop/picture4.jpg';

const AllCartData = [
  {
    productId: 'BA-050423-001',
    image: pic1,
    title: 'JACQUARD NALIKA 011',
    quantity: '2',
    size: 'XS',
    // price : "$47.6",
    date: '05 March 2023',
    status: 'Confirmed',
    desc: 'Order Received by [Louis Simatupang]',
  },
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
  {
    productId: 'BA-050423-001',
    image: pic3,
    title: 'JACQUARD NALIKA 011',
    quantity: '2',
    size: 'M',
    // price : "$158.2",
    date: '03 March 2023',
    status: 'On delivery',
    desc: 'On the way by Courir  [H. Stefanus]',
  },
  {
    productId: 'BA-050423-001',
    image: pic4,
    title: 'JACQUARD NALIKA 011',
    quantity: '2',
    size: 'L',
    // price : "$47.6",
    date: '04 March 2023',
    status: 'Completed',
    desc: 'Order Received by [Louis Simatupang]',
  },
];

const AllCart = () => {
  return (
    <ScrollView>
      {AllCartData.map((data, index) => (
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
};

export default AllCart;
