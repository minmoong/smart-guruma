export const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const xDiff = (lon2 - lon1) * Math.cos((((lat1 + lat2) / 2) * Math.PI) / 180); // 경도 보정
  const yDiff = lat2 - lat1;
  const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff) * 111320; // 위도/경도 -> 미터로 변환
  return distance;
};
