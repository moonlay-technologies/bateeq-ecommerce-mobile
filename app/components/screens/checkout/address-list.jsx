import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Button from '../../ButtonComponent';
import { COLORS, SIZES } from '../../../constants/theme';
import { getAddressList } from '../../../store/actions';

function ViewAddressList(props) {
  const {
    token,
    address,
    addressList,
    defaultAddress,
    actionLoading,
    setShowModal,
    getAddressList: getAddress,
  } = props;

  const [selectedAddress, setSelectedAddress] = useState('');

  useEffect(() => {
    getAddress({ token, limit: 10 });
  }, []);

  const handleSelectAddress = data => {
    setShowModal(prev => ({
      ...prev,
      data,
    }));
    setSelectedAddress(data);
  };

  return (
    <ScrollView>
      {addressList.data.length > 0 &&
        addressList.data.map(data => {
          const { address1, company, id } = data;

          return (
            <View
              style={[
                styles.addressContainer,
                ((!selectedAddress && defaultAddress?.data?.id === id) || selectedAddress?.id === id) && {
                  backgroundColor: COLORS.infoLight,
                },
              ]}
              key={id}
            >
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: '900' }}>{company}</Text>
                {defaultAddress?.data?.id !== id ? (
                  <Button
                    size="xs"
                    onPress={() => handleSelectAddress(data)}
                    title={selectedAddress?.id === id ? 'Selected' : 'Select'}
                    outline
                  />
                ) : (
                  <View style={styles.circle} />
                )}
              </View>
              <Text>{address1}</Text>
            </View>
          );
        })}
    </ScrollView>
  );
}

export default connect(
  ({ User, Address }) => {
    const {
      options: { token },
      collections: { address },
    } = User;
    const { addressList, defaultAddress, actionLoading } = Address;
    return { token, address, addressList, defaultAddress, actionLoading };
  },
  { getAddressList }
)(React.memo(ViewAddressList));

const styles = StyleSheet.create({
  addressContainer: {
    marginVertical: 2,
    borderBottomColor: COLORS.borderColor,
    borderBottomWidth: 1,
    paddingHorizontal: 5,
  },
  circle: {
    backgroundColor: COLORS.info,
    alignSelf: 'center',
    height: 10,
    width: 10,
    borderRadius: SIZES.radius,
  },
});
