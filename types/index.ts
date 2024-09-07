export type TCoords = {
  latitude: number;
  longitude: number;
};

export type TUserLocation = TCoords & {
  heading: number;
};

export type TGuide = {
  distance: number;
  duration: number;
  guidance: string;
  name: string;
  road_index: number;
  type: number;
  x: number;
  y: number;
};
