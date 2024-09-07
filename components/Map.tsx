import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { TCoords, TGuide, TUserLocation } from '@/types';
import { getGuides, requestLocation, updateGuide } from '@/core';
import Toast from 'react-native-toast-message';

export default function Map() {
  const [userLocation, setUserLocation] = useState<TUserLocation>();
  const [destLocation, setDestLocation] = useState<TCoords>();
  const [isLocationDenied, setIsLocationDenied] = useState<boolean>(false);
  const [guides, setGuides] = useState<TGuide[]>();
  const [guideIdx, setGuideIdx] = useState<number>(0);

  const onPress = async (coords: TCoords) => {
    setDestLocation(coords);
  };

  useEffect(() => {
    requestLocation(setIsLocationDenied, setUserLocation);
  }, []);

  useEffect(() => {
    if (!userLocation || !destLocation) return;

    const navi = async () => {
      const { toast, guides: gd } = await getGuides(userLocation, destLocation);

      Toast.show(toast);

      if (!gd) return;

      setGuides(gd);

      // 직진 가이드 출력
      console.log('직진...');
    };

    navi();
  }, [destLocation]);

  useEffect(() => {
    if (!guides || !userLocation) return;

    updateGuide(guides, guideIdx, userLocation, setGuideIdx);
  }, [userLocation]);

  if (userLocation) {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={(event) => onPress(event.nativeEvent.coordinate)}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton
      >
        {destLocation && <Marker coordinate={destLocation} />}
      </MapView>
    );
  } else if (isLocationDenied) {
    return (
      <Text style={styles.err}>
        설정에서 이 앱에 대한 위치 정보 접근을 '항상 허용'으로 바꿔주세요.
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  err: {
    fontSize: 18,
    textAlign: 'center',
  },
});
