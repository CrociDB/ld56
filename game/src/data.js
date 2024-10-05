const LEVELS = [
  {
    title: "Tutorial",
    desc: "Using the directional keys, help the fish reach for salvation!",
    camera_dist: 2,
    size: 1000,
    fish: 10,
    finish: .9,
    spawn: new V2d(0, 0),
    fish_spawn_points: [
      {
        pos: new V2d(0, -100),
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
    camera_dist: 3,
    size: 2000,
    fish: 15,
    finish: .8,
    spawn: new V2d(0, 0),
    fish_spawn_points: [
      {
        pos: new V2d(0, -100),
        size: 100,
      },
    ],
    goal: {
      pos: new V2d(1300, 0),
      size: 100,
    },
  },
];
