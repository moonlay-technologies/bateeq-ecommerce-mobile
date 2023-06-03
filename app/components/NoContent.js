import React from "react"
import { View, Text } from 'react-native'
import ButtonSm from "./Button/ButtonSm"

const NoContent = (props) => {
    const { to, text='Cart is waiting for you . . .' } = props

    return (
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 18, marginBottom: 12 , fontWeight: '700'}}>
          {text}
        </Text>
        <ButtonSm 
          title='Go Shopping'
          onPress={()=> to() }
          style={{
              backgroundColor: '#323232',
              width: 120
          }}
          color={'#704FFE'}  />
      </View>
    )
}

export default NoContent;