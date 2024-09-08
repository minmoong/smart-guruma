import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { TCoords, TGuide, TUserLocation } from '@/types';
import { getGuides, requestLocation, updateGuide } from '@/core';
import Toast from 'react-native-toast-message';
import { getDistance } from '@/core/util';

export default function Map() {
  const [userLocation, setUserLocation] = useState<TUserLocation>();
  const [destLocation, setDestLocation] = useState<TCoords>();
  const [isLocationDenied, setIsLocationDenied] = useState<boolean>(false);
  const [guides, setGuides] = useState<TGuide[]>();
  const [guideIdx, setGuideIdx] = useState<number>(0);

  /** 시뮬 */
  const sim = async () => {
    function sleep(sec: number) {
      return new Promise((resolve) => setTimeout(resolve, sec * 1000));
    }
    const simData = [
      [36.36071847774139, 127.37082827836274],
      [36.360772477325895, 127.3708266019821],
      [36.36083025683984, 127.37082794308662],
      [36.360890196290285, 127.37082928419112],
      [36.36089694622551, 127.37089499831198],
      [36.36090288616801, 127.37095903605221],
      [36.36090558614175, 127.3710224032402],
      [36.36091125608625, 127.3710810765624],
      [36.36091503604902, 127.37118132412432],
      [36.360916656033, 127.37127184867857],
      [36.36091557604367, 127.37139824777842],
      [36.360920435995524, 127.37152833491564],
      [36.36092772592271, 127.37162992358208],
      [36.36095121568341, 127.37167820334435],
      [36.36102546488044, 127.37167350947857],
      [36.36124740205791, 127.37169362604618],
      [36.361493368190374, 127.37171038985252],
      [36.361784152615336, 127.37171072512864],
      [36.36196099869343, 127.37170301377773],
      [36.36207331599392, 127.37170401960611],
      [36.36219535287702, 127.37170469015837],
      [36.362242871611606, 127.37175531685354],
      [36.36225421130533, 127.37187299877405],
      [36.36225151137841, 127.3719910159707],
      [36.36225151137841, 127.37224817276002],
      [36.36223207190173, 127.37321209162472],
      [36.36228283052503, 127.37390846014023],
      [36.36227149083546, 127.37419310957192],
      [36.36228283052503, 127.37435102462769],
      [36.362488564605925, 127.37430911511184],
      [36.36270050793939, 127.37431213259696],
      [36.36293189000234, 127.37431347370148],
      [36.363179740737166, 127.37430777400732],
      [36.363397621940294, 127.37429905682804],
      [36.36340518162413, 127.37412303686142],
      [36.3634062615789, 127.37394232302904],
      [36.36341652114849, 127.37380553036927],
      [36.36342192092143, 127.37362381070852],
    ];
    for (let i = 0; i < simData.length; i++) {
      setUserLocation({
        latitude: simData[i][0],
        longitude: simData[i][1],
        heading: 0,
      });

      await sleep(1);
    }
  };

  const onPress = async (coords: TCoords) => {
    // setDestLocation(coords);

    /** 시뮬 */
    sim();
  };

  useEffect(() => {
    // requestLocation(setIsLocationDenied, setUserLocation);

    /** 시뮬 */
    setUserLocation({
      latitude: 36.36066870248531,
      longitude: 127.37082652080309,
      heading: 0,
    });

    setGuides([
      {
        'distance': 0,
        'duration': 0,
        'guidance': '출발지',
        'name': '출발지',
        'road_index': 0,
        'type': 100,
        'x': 127.37082652080309,
        'y': 36.36066870248531,
      },
      {
        'distance': 30,
        'duration': 7,
        'guidance': '우회전',
        'name': '',
        'road_index': 1,
        'type': 2,
        'x': 127.37084662923809,
        'y': 36.36093918236597,
      },
      {
        'distance': 80,
        'duration': 18,
        'guidance': '좌회전',
        'name': '',
        'road_index': 2,
        'type': 1,
        'x': 127.37172716024757,
        'y': 36.360907765603095,
      },
      {
        'distance': 152,
        'duration': 38,
        'guidance': '우회전',
        'name': '',
        'road_index': 3,
        'type': 2,
        'x': 127.37173850721024,
        'y': 36.36226870762521,
      },
      {
        'distance': 234,
        'duration': 68,
        'guidance': '둔산대로 방면으로 좌회전',
        'name': '한아름네 거리',
        'road_index': 4,
        'type': 1,
        'x': 127.374334851296,
        'y': 36.362264306091745,
      },
      {
        'distance': 130,
        'duration': 52,
        'guidance': '좌회전',
        'name': '',
        'road_index': 5,
        'type': 1,
        'x': 127.37433661578869,
        'y': 36.36343593583395,
      },
      {
        'distance': 39,
        'duration': 37,
        'guidance': '목적지',
        'name': '목적지',
        'road_index': -1,
        'type': 101,
        'x': 127.37390205220379,
        'y': 36.363433659524425,
      },
    ]);
  }, []);

  // useEffect(() => {
  //   if (!userLocation || !destLocation) return;

  //   const navi = async () => {
  //     const { toast, guides: gd } = await getGuides(userLocation, destLocation);

  //     Toast.show(toast);

  //     if (!gd) return;

  //     setGuides(gd);

  //     // 직진 가이드 출력
  //     console.log('직진...');
  //   };

  //   navi();
  // }, [destLocation]);

  useEffect(() => {
    if (!guides || !userLocation) return;

    /** 이미 목적지에 도착했을 경우 종료한다. */
    if (guideIdx + 1 === guides.length) return;

    // updateGuide(guides, guideIdx, userLocation, setGuideIdx);

    /** 시뮬 */
    if (userLocation && guides) {
      console.log(
        '다음 가이드와의 distance:',
        getDistance(userLocation, {
          latitude: guides[guideIdx + 1].y,
          longitude: guides[guideIdx + 1].x,
        })
      );
    }

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

        {/** 시뮬 */}
        {userLocation && <Marker coordinate={userLocation} />}
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
