import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import Button from './ButtonComponent';
import { COLORS } from '../constants/theme';

function NoContent(props) {
  const { to, text = 'Cart is waiting for you . . .', icon: Icon, styleIcon = {}, name } = props;
  const currentTheme = useSelector(state => state.Theme.mode);

  return (
    <View style={{ alignItems: 'center', height: 200, justifyContent: 'center' }}>
      <Text
        style={[
          { fontSize: 18, marginBottom: 12, fontWeight: '700' },
          currentTheme === 'dark' && { color: COLORS.mediumGray },
        ]}
      >
        {text}
      </Text>
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
      {Icon && (
        <Icon style={([styleIcon], currentTheme === 'dark' && { color: COLORS.mediumGray })} size={80} name={name} />
      )}
    </View>
  );
}

export default NoContent;
