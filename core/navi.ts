import { TCoords, TGuide, TUserLocation } from '@/types';
import { getDistance } from './util';

export const getGuides = async (
  userLocation: TCoords,
  destLocation: TCoords
): Promise<{ toast: Object; guides: TGuide[] | null }> => {
  let toast = {};
  let guides: TGuide[] | null = null;

  const params = {
    origin: `${userLocation.longitude},${userLocation.latitude}`,
    destination: `${destLocation.longitude},${destLocation.latitude}`,
  };
  const res = await fetch(
    'https://apis-navi.kakaomobility.com/v1/directions?' +
      new URLSearchParams(params),
    {
      method: 'GET',
      headers: {
        'Authorization': `KakaoAK ${process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();

  if ('code' in data && 'msg' in data) {
    toast = {
      type: 'error',
      text1: '내부 오류',
      text2: data.msg,
    };
  } else if ('routes' in data && data.routes[0].result_code === 0) {
    toast = {
      type: 'success',
      text1: '경로 안내 시작!',
      text2: '출발시 지도에 표시된 선을 따라 출발하세요.',
    };

    guides = data.routes[0].sections[0].guides;
  } else if ('routes' in data && data.routes[0].result_code !== 0) {
    toast = {
      type: 'error',
      text1: '길찾기 실패',
      text2: data.routes[0].result_msg,
    };
  } else {
    toast = {
      type: 'error',
      text1: '내부 오류',
      text2: '알 수 없는 오류가 발생했습니다.',
    };
  }

  return { toast, guides };
};

export const updateGuide = (
  guides: TGuide[],
  guideIdx: number,
  userLocation: TUserLocation,
  setGuideIdx: React.Dispatch<React.SetStateAction<number>>
) => {
  guides.forEach((guide, idx) => {
    const distanceToGuide = getDistance(
      {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      },
      { latitude: guide.y, longitude: guide.x }
    );

    // 현재 가이드와 멀어졌을 때
    if (idx === guideIdx && distanceToGuide > 5) {
      // 직진 가이드 출력
      console.log('직진...');
    }

    // 새 가이드에 근접했을 때
    if (idx !== guideIdx && distanceToGuide <= 10) {
      setGuideIdx(idx);

      // 가이드 내용 출력
      console.log(`가이드: ${guide.guidance}`);
    }
  });
};
