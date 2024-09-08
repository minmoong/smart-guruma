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

export enum EGuideDirection {
  /** 직진 */
  Straight = 0,

  /** 좌회전 */
  TurnLeft = 1,

  /** 우회전 */
  TurnRight = 2,

  /** 왼쪽 방향 */
  Left = 5,

  /** 오른쪽 방향 */
  Right = 6,

  /** 오른쪽 1시 방향 */
  Right1OClock = 18,

  /** 오른쪽 2시 방향 */
  Right2OClock = 19,

  /** 오른쪽 3시 방향 */
  Right3OClock = 20,

  /** 오른쪽 4시 방향 */
  Right4OClock = 21,

  /** 오른쪽 5시 방향 */
  Right5OClock = 22,

  /** 왼쪽 7시 방향 */
  Left7OClock = 24,

  /** 왼쪽 8시 방향 */
  Left8OClock = 25,

  /** 왼쪽 9시 방향 */
  Left9OClock = 26,

  /** 왼쪽 10시 방향 */
  Left10OClock = 27,

  /** 왼쪽 11시 방향 */
  Left11OClock = 28,

  /** 12시 방향 */
  TwelveOClock = 29,

  /** 로터리에서 6시 방향 */
  Rotary6OClock = 35,

  /** 로터리에서 12시 방향 */
  RotaryTwelveOClock = 41,

  /** 회전 교차로에서 6시 방향 */
  Roundabout6OClock = 75,

  /** 회전 교차로에서 12시 방향 */
  RoundaboutTwelveOClock = 81,

  /** 왼쪽 직진 */
  LeftStraight = 82,

  /** 오른쪽 직진 */
  RightStraight = 83,

  /** 목적지 */
  Destination = 101,
}

export enum EUserDirection {
  /** 직진 */
  Straight = 'STRAIGHT',

  /** 왼쪽 */
  Left = 'LEFT',

  /** 오른쪽 */
  Right = 'RIGHT',

  /** 유턴 */
  UTurn = 'UTURN',

  /** 도착 */
  Dest = 'DEST',

  /** 모름 */
  Unknown = 'UNKNOWN',
}

export const getUserDirection = (guideDirection: EGuideDirection) => {
  switch (guideDirection) {
    /** 직진 관련 */
    case EGuideDirection.Straight:
    case EGuideDirection.TwelveOClock:
    case EGuideDirection.LeftStraight:
    case EGuideDirection.RightStraight:
    case EGuideDirection.RotaryTwelveOClock:
    case EGuideDirection.RoundaboutTwelveOClock:
      return EUserDirection.Straight;

    /** 왼쪽 관련 */
    case EGuideDirection.TurnLeft:
    case EGuideDirection.Left:
    case EGuideDirection.Left9OClock:
    case EGuideDirection.Left10OClock:
    case EGuideDirection.Left11OClock:
      return EUserDirection.Left;

    /** 오른쪽 관련 */
    case EGuideDirection.TurnRight:
    case EGuideDirection.Right:
    case EGuideDirection.Right1OClock:
    case EGuideDirection.Right2OClock:
    case EGuideDirection.Right3OClock:
      return EUserDirection.Right;

    /** 유턴 관련 */
    case EGuideDirection.Left7OClock:
    case EGuideDirection.Left8OClock:
    case EGuideDirection.Right4OClock:
    case EGuideDirection.Right5OClock:
    case EGuideDirection.Rotary6OClock:
    case EGuideDirection.Roundabout6OClock:
      return EUserDirection.UTurn;

    /** 목적지 도착 */
    case EGuideDirection.Destination:
      return EUserDirection.Dest;

    /** 기본값 */
    default:
      return EUserDirection.Unknown;
  }
};
