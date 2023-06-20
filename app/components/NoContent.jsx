import React from 'react';
import { View, Text } from 'react-native';
import Button from './ButtonComponent';

function NoContent(props) {
  const { to, text = 'Cart is waiting for you . . .', icon: Icon, styleIcon = {}, name } = props;

  return (
    <View style={{ alignItems: 'center', height: 200, justifyContent: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 12, fontWeight: '700' }}>{text}</Text>
      {to && (
        <Button
          onPress={() => to()}
          title="Go Shopping"
          size="sm"
          style={{
            backgroundColor: '#323232',
            width: 120,
          }}
        />
      )}
      {Icon && <Icon style={styleIcon} size={80} name={name} />}
    </View>
  );
}

export default NoContent;
