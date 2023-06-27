import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const DeliveryMap = (props) => {
    return (
        <View style={{ height: 200, width: 350 }}>
            <MapView
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
                initialRegion={{
                    latitude: -6.226327704929946,
                    longitude: 106.80883617404749,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}
                zoomEnabled={true}
            >
                <Marker
                    coordinate={{
                        latitude: -6.226327704929946,
                        longitude: 106.80883617404749,
                    }}
                    title="Equity Tower"
                    description="SCBD, Jakarta"
                />
            </MapView>
        </View>
    );
};

export default DeliveryMap;
