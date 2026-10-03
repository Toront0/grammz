export interface CameraWaypoint {
  // Camera Position (X, Y, Z)
  posX: number;
  posY: number;
  posZ: number;
  // Camera Target - What the camera is looking at (X, Y, Z)
  targetX: number;
  targetY: number;
  targetZ: number;
}

export interface CameraPoints {
  posX: number;
  posY: number;
  posZ: number;
  // Camera Target - What the camera is looking at (X, Y, Z)
  targetX: number;
  targetY: number;
  targetZ: number;
  mobile: CameraWaypoint;
}

export const cameraWaypoints: CameraPoints[] = [
  {
    posX: -0.83,
    posY: 0.308,
    posZ: 1.641,
    targetX: 0.475,
    targetY: 0.439,
    targetZ: 0.149,
    mobile: {
      posX: -0.373,
      posY: 0.13,
      posZ: 1.799,
      targetX: 0.14,
      targetY: 0.296,
      targetZ: -0.009
    }
  }, // Section 1: Hero Front view
  {
    posX: -0.271,
    posY: 0.887,
    posZ: -1.276,
    targetX: 0.104,
    targetY: 0.981,
    targetZ: -3.026,
    mobile: {
      posX: -0.4,
      posY: 0.789,
      posZ: -0.712,
      targetX: -0.4,
      targetY: 0.796,
      targetZ: -0.908
    }
  }, // Section 2: Angled Close-up
  {
    posX: 1.48,
    posY: 1.025,
    posZ: -0.746,
    targetX: 0.904,
    targetY: 0.895,
    targetZ: -1.924,
    mobile: {
      posX: 1.894,
      posY: 1.08,
      posZ: 1.563,
      targetX: 0.598,
      targetY: 0.733,
      targetZ: -2.745
    }
  }, // Section 3: Worm's eye view
  {
    posX: 2.102,
    posY: 1.863,
    posZ: 0.755,
    targetX: 2.828,
    targetY: 1.977,
    targetZ: 0.048,
    mobile: {
      posX: 1.852,
      posY: 1.593,
      posZ: 0.992,
      targetX: 2.656,
      targetY: 1.746,
      targetZ: 0.045
    }
  }, // Section 4: Bird's eye Top view, // Section 3: Worm's eye view
  {
    posX: 1.885,
    posY: -0.02,
    posZ: -1.668,
    targetX: -0.084,
    targetY: -0.324,
    targetZ: -2.603,
    mobile: {
      posX: 2.18,
      posY: -0.029,
      posZ: -1.81,
      targetX: 1.507,
      targetY: -0.051,
      targetZ: -1.75
    }
    // posX: 1.921,
    // posY: -0.757,
    // posZ: -1.644,
    // targetX: 1.564,
    // targetY: -0.855,
    // targetZ: -1.749
  } // Section 4: Bird's eye Top view, // Section 3: Worm's eye view

  // Section 4: Bird's eye Top view, // Section 3: Worm's eye view
  // {
  //   posX: 0.782,
  //   posY: 0.138,
  //   posZ: 1.724,
  //   targetX: 1.257,
  //   targetY: -0.041,
  //   targetZ: -2.76,
  //   mobile: {
  //     posX: -0.83,
  //     posY: 0.308,
  //     posZ: 1.641,
  //     targetX: 0.475,
  //     targetY: 0.439,
  //     targetZ: 0.149
  //   }
  // } // Section 4: Bird's eye Top view
];
