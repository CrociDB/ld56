const LEVELS = [
  {
    title: "Tutorial",
    desc: "Using the directional keys, help the fish reach for salvation!",
    camera_dist: 1.7,
    size: 1000,
    fish: 6,
    finish: 0.5,
    spawn: new V2d(0, 0),
    fish_spawn_points: [
      {
        pos: new V2d(0, -600),
        size: 100,
      },
      {
        pos: new V2d(0, 600),
        size: 100,
      },
    ],
    goal: {
      pos: new V2d(600, 0),
      size: 100,
    },
  },
  {
    title: "Find them",
    desc: "If they're not close, you need to go find them",
    camera_dist: 2.3,
    size: 2600,
    fish: 9,
    finish: 0.7,
    spawn: new V2d(0, 0),
    fish_spawn_points: [
      {
        pos: new V2d(0, -1700),
        size: 80,
      },
      {
        pos: new V2d(0, 1700),
        size: 80,
      },
      {
        pos: new V2d(-1700, 0),
        size: 80,
      },
    ],
    goal: {
      pos: new V2d(1700, 0),
      size: 100,
    },
  },
  {
    title: "Bump it up",
    desc: "Be careful with bumpers, they'll bump you and your fish away!",
    camera_dist: 2.0,
    size: 2000,
    fish: 9,
    finish: 0.7,
    spawn: new V2d(1700, 0),
    fish_spawn_points: [
      {
        pos: new V2d(0, -1700),
        size: 80,
      },
      {
        pos: new V2d(0, 1700),
        size: 80,
      },
      {
        pos: new V2d(-1700, 0),
        size: 80,
      },
    ],
    bumpers: [
      {
        pos: new V2d(1350, 0),
        size: 150,
      },
      {
        pos: new V2d(1650, -400),
        size: 150,
      },
      {
        pos: new V2d(1650, 400),
        size: 150,
      },
    ],
    goal: {
      pos: new V2d(1700, 0),
      size: 100,
    },
  },
];
