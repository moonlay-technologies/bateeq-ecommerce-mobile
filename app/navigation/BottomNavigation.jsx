import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/theme';

import footerMenuItem from './routes/footer-menu-item';

function CustomBottomNavigation({ isAuthenticated }) {
  const navigation = useNavigation();

  const [selected, setSelected] = useState('');

  return (
    <View>
      {isAuthenticated.every(i => i === true) && (
        <View
          style={{
            height: 60,
            borderTopWidth: 1,
            borderColor: COLORS.borderColor,
            backgroundColor: COLORS.white,
            flexDirection: 'row',
            paddingTop: 4,
          }}
        >
          {footerMenuItem.map((route, index) => {
            const { icon, name, navigate } = route;
            const isFocused = name === selected;
            const onNavigate = (nav, nm) => {
              setSelected(nm);
              navigation.navigate(`${nav}`);
            };

            return (
              <View
                key={name}
                style={{
                  width: '25%',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={() => onNavigate(navigate, name)}
                  style={{
                    alignItems: 'center',
                    paddingVertical: 9,
                  }}
                >
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      marginTop: 5,
                      tintColor: isFocused ? COLORS.title : COLORS.dark,
                    }}
                    source={icon}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

export default CustomBottomNavigation;
