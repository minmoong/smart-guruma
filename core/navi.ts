import { TCoords, TGuide, TUserLocation } from '@/types';
import { KAKAO_REST_API_KEY } from '@env';

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
        'Authorization': `KakaoAK ${KAKAO_REST_API_KEY}`,
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
      text1: '길찾기 성공!',
      text2: '경로 안내를 시작하겠습니다.',
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
  guides: TGuide[] | null,
  userLocation: TUserLocation | undefined
) => {
  if (!guides || !userLocation) return;

  // 가이드를 표시할 기준에 따라 코딩하기
};
