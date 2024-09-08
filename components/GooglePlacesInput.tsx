import React from 'react';
import { StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { TCoords, TUserLocation } from '@/types';

export default function GooglePlacesInput({
  userLocation,
  setSearchLocation,
}: {
  userLocation: TUserLocation;
  setSearchLocation: React.Dispatch<React.SetStateAction<TCoords | undefined>>;
}) {
  return (
    <GooglePlacesAutocomplete
      query={{
        key: process.env.EXPO_PUBLIC_GCP_API_KEY,
        language: 'ko',
        components: 'country:kr',
        location: `${userLocation.latitude},${userLocation.longitude}`,
        radius: 50000,
      }}
      placeholder="장소 검색"
      styles={styles}
      enablePoweredByContainer={false}
      fetchDetails={true}
      onPress={(data, details) => {
        if (!details) return;

        console.log(
          details.geometry.location.lat,
          details.geometry.location.lng
        );

        setSearchLocation({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
        });
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    zIndex: 10,
    width: '100%',
    padding: 10,
  },
  textInputContainer: {
    flexDirection: 'row',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 44,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
  },
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: '#c8c7cc',
    borderTopWidth: 0.5,
  },
  powered: {},
  listView: {},
  row: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#c8c7cc',
  },
  description: {},
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
});
