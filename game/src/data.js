const LEVELS = [
  {
    title: "Tutorial",
    desc: "Using the directional keys, help the fish reach for salvation!\nYou need a minimum amount of fish to be saved, it is displayed in the bar in the bottom",
    camera_dist: 1.5,
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
    size: 2300,
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
  {
    title: "Gravitators",
    desc: "Gravitators will... uhm, drag your fishes to death! Avoid them.",
    camera_dist: 2.1,
    size: 2600,
    fish: 9,
    finish: 0.7,
    spawn: new V2d(-1700, 0),
    fish_spawn_points: [
      {
        pos: new V2d(0, -1900),
        size: 80,
      },
      {
        pos: new V2d(0, 1900),
        size: 80,
      },
      {
        pos: new V2d(1900, 0),
        size: 80,
      },
    ],
    bumpers: [
      {
        pos: new V2d(-1000, 0),
        size: 100,
      },
      {
        pos: new V2d(1000, 0),
        size: 100,
      },
      {
        pos: new V2d(0, 1000),
        size: 100,
      },
      {
        pos: new V2d(0, -1000),
        size: 100,
      },
    ],
    gravitators: [
      {
        pos: new V2d(0, 0),
        size: 650,
      },
    ],
    goal: {
      pos: new V2d(-1700, 0),
      size: 100,
    },
  },
  {
    title: "Double Gravity",
    desc: "Can they cancel each other?",
    camera_dist: 2.2,
    size: 2600,
    fish: 12,
    finish: 0.6,
    spawn: new V2d(0, 2100),
    fish_spawn_points: [
      {
        pos: new V2d(0, -1900),
        size: 100,
      },
    ],
    bumpers: [
      {
        pos: new V2d(300, 2100),
        size: 100,
      },
      {
        pos: new V2d(-300, 2100),
        size: 100,
      },
      {
        pos: new V2d(0, 1600),
        size: 100,
      },
    ],
    gravitators: [
      {
        pos: new V2d(-1500, 0),
        size: 650,
      },
      {
        pos: new V2d(1500, 0),
        size: 650,
      },
    ],
    goal: {
      pos: new V2d(0, 2100),
      size: 100,
    },
  },
  {
    title: "Gravity or Grave",
    desc: "Gravitators can sometimes oscilate sizes. Wait for the correct moment to navigate",
    camera_dist: 2.7,
    size: 3500,
    fish: 16,
    finish: 0.8,
    spawn: new V2d(0, 0),
    fish_spawn_points: [
      {
        pos: new V2d(-1800, -1800),
        size: 100,
      },
      {
        pos: new V2d(-1800, 1800),
        size: 100,
      },
      {
        pos: new V2d(1800, -1800),
        size: 100,
      },
      {
        pos: new V2d(1800, 1800),
        size: 100,
      },
    ],
    bumpers: [
      {
        pos: new V2d(-1500, -1500),
        size: 300,
      },
      {
        pos: new V2d(-1500, 1500),
        size: 300,
      },
      {
        pos: new V2d(1500, -1500),
        size: 300,
      },
      {
        pos: new V2d(1500, 1500),
        size: 300,
      },
    ],
    gravitators: [
      {
        pos: new V2d(-900, 0),
        size: 150,
        growing: 2.5,
      },
      {
        pos: new V2d(900, 0),
        size: 150,
        growing: 2.5,
      },
      {
        pos: new V2d(0, -900),
        size: 150,
        growing: 2.5,
      },
      {
        pos: new V2d(0, 900),
        size: 150,
        growing: 2.5,
      },
    ],
    goal: {
      pos: new V2d(0, 0),
      size: 250,
    },
  },
  {
    title: "Free them!",
    desc: "The fish are locked in cages. You need to find the key to free open it and then free them.",
    camera_dist: 1.7,
    size: 1600,
    fish: 5,
    finish: 0.8,
    spawn: new V2d(-1200, 0),
    fish_spawn_points: [
      {
        pos: new V2d(-300, 0),
        size: 100,
      },
    ],
    cages: [
      {
        pos: new V2d(-300, 0),
        size: 200,
        key: new V2d(800, 0),
      },
    ],
    bumpers: [
      {
        pos: new V2d(100, 0),
        size: 150,
      }
    ],
    gravitators: [
      {
        pos: new V2d(-500, -800),
        size: 150,
        growing: 4.5,
      },
      {
        pos: new V2d(-500, 800),
        size: 150,
        growing: 4.5,
      },
      {
        pos: new V2d(500, -800),
        size: 150,
        growing: 4.5,
      },
      {
        pos: new V2d(500, 800),
        size: 150,
        growing: 4.5,
      },
    ],
    goal: {
      pos: new V2d(-1200, 0),
      size: 250,
    },
  },
  {
    title: "Cages all around",
    desc: "More fish are locked, hurry, save them!",
    camera_dist: 2.0,
    size: 2200,
    fish: 12,
    finish: 0.8,
    spawn: new V2d(0, -1600),
    fish_spawn_points: [
      {
        pos: new V2d(1000, -1000),
        size: 100,
      },
      {
        pos: new V2d(-1000, -1000),
        size: 100,
      },
    ],
    cages: [
      {
        pos: new V2d(1000, -1000),
        size: 150,
        key: new V2d(-1000, -1000),
      },
      {
        pos: new V2d(-1000, -1000),
        size: 150,
        key: new V2d(0, 2000),
      },
    ],
    bumpers: [
      {
        pos: new V2d(0, 1600),
        size: 200,
      },
    ],
    gravitators: [
      {
        pos: new V2d(0, 0),
        size: 330,
        growing: 2.2,
      },
    ],
    goal: {
      pos: new V2d(0, -1600),
      size: 250,
    },
  },
];

const SOUNDS = {
  game_over: [
    "5m27yhkgLyJxo1wksgiSNtojFQd1Zo97UwsBUeVa9UjJtz23zakSAW8iVXR7LBmcn3UiYMMqVxg7Mbf7D5EiZhyc7D1QG2CME4C34aQ7S4Et3i53miXboFzp7",
    "5m27yhkgLyJxo1wksgiSNtmA3wofyooC265rLvLmBDXjV8B8YivwETvBBSFnSZH38wCiMr6rDV1qqxEmMPJqpUk86NbpnWnQJG2Q9SD3F49KEZrCC61qnfKUT",
  ],
  fish_saved: [
    "5eQTpcG5sQoRKiyRViSJ7MG6WxWPUVpofBB6pUvhi1iXwH7sXFUkZybZDBENq3RQHu3oJkB2WeYjYwHnsnUkvKjj6Z11MAm98G6CiJa143sAXrpRAtz6gUHhh",
    "5eQTpcG5sQoRKiyRViSJ7MG9NcMDoX2EJBRYk3ZNzynmR84G78FrZVrLV6MWG9Li2rKXbBs6fFNg5Dh3JCpYUxnph4KjPxCB9Fm4krRKJqzoHBWp9a8zyFz2s",
    "5eQTpcG5sQoRKiyRViSJ7ME3ABs2a6rfEsswaToTyt8zTsyZNKjqZiW8HEYoK3dEUFuVd8MP1eCCwuZsCEwsxrLQ8Ehd6sfDu3KMTTDgNuZNGQ6WicHAyHprj",
    "5eQTpcG5sQoRKiyRViSJ7MGGoDkm4EoKACRZnvkmkzWpCiTm7j6W2nEwUsFnMsmQzoC6atJzhMtbvVBUPeuoPLYwhYg4tiVPvRRBF6sfywNhPUPE9uy6SWrgF",
    "5eQTpcG5sQoRKiyRViSJ7MEjH9HNqSCwnVhq8QQ2rXWt4M6AKFfSyi7huFe7n71DdMgKVyGKY181MCJFj29YTryh8WTgStHBnL8s69936Y1PdtYwRWKHbJdrF",
  ],
  death: [
    "6PbLZxZRHbynTD3iE7M4ghPaQtnakQ7kxKu4MueSaj78xvhnbD7QhrgmihngpTUz4wKEGoRGKuZx8iKTmVdZATmFW7ZWLQoYadPQh9BXs3cvz5TmHZsmGFUqu",
    "6PbLZxZRHbynTD3iE7M4ghPKZik5MNCA7jUmZuiyQ6FMKJ8jjwRaGZAoTbzidr4BEEFq2fAX7bfbwSRVacnFnCnXT9goh9SowyLpBJFQjQHmnaUAgZK3hjUZd",
    "6PbLZxZRHbynTD3iE7M4ghP3iYkfmU3s7j55BXuvg2EjiwfiKLAL1Yn49QPmGU9xsiX9Th7R7oYzhd8ndHA6Ev7DC6d4qMCG7ujgPgByzZ88ANqLYC4VxSVqR",
  ],
  explosion: [
    "57uBnWcxt2EZVSj7AcejFpiZ3Qz7rXjD6Jzah3vY6JYAbbGpt2SS5J5TbX9pSHcUpiDDZDmNuCVehtKMKGp14x3WtZc8Js2MRAjFskJskN2L67y4Ccq3kuiHD",
    "57uBnWcxt2EZVSj7AcejFpkv74KwRMyudjYm2N1zBxNvxk74tv8Gp8zEGJM9okX6JMkCDsT8UchB3f4HzEQnaKwA79yWZ2cfM1gVJMXeWJfj7Xxk5VrcS67y1",
    "57uBnWcxt2EZVSj7AcejFpkf7b1b5BhG5Fyucbb2SqzK3d5tpYzEc1abNtfsHtgFmDEcKkrC4n8JENqMYKNHXbYJMednhh1gKdTDoeQFDR9y4hANrqdbVHzGP",
  ],
  win: [
    "57uBnWjTyq3LhgDm7btWXXF4Cvb1KYWtbvUfGGBHo6pCMEDwZNCfZywKACTpf4UiFPtPEFfYB2NHEXPyk53ZqENAF45TufynnzcMgE1nH2qdBLwFkHuR1LhVH",
    "57uBnWbbUvNYviYg72uXodLsGDoX5gYqTo8GYuwJ7yxW966w1oFyDeVJF3gFh1DoM4WvXxRzafercepppw1GU92He9X7jZqVd9gJcqqQB9DBoZz82kTqKbUk7",
  ],
  level_start: [
    "5m27yhkgLyJxo1wkscikxxUEWNNz6nL7HJCTW1wC4aLjQeyex1XzDqWEd79jGEcUqLWuTCHikyo4LFQCN9LtpDe4c5Qhtn1mgiBTzJtC4GB22Fk3zByP3STVy",
    "5m27yhkgLyJxo1wkshTRs9zsUtiPsPw9RdFFJiZLPDAVzdFsTenYc584UfBJpGprZVnc8TCCVZuEDncRRLrnct35ByWQocziv4ng9gFeKkqKPuVREmjMqKob5",
  ],
  bump: [
    "57uBnWicKKRry4j8CpDE5CwB6D8Zxtg7htK1JLvvAvFaE7AFcUb9Yoe98ek3JEyMB3DL8NmqrX7YEYQsuncEvGoRLEc7KEfcvjxriDmnFUtc84twY35qQ1Wsh",
    "57uBnWicKKRry4j8CpDE5CwEoWstRE6ctypYtkUN7TMVTdJYNfW15wco6unFa1XReB2RLRH2jAMhg6nzqcCUYybTUGpt2BH9SczD747P4r2iyGAhySWRsLTRH",
    "57uBnWicKKRry4j8CpDE5Cwt4pTQMYFUobPzX8SFh8f9aFUkjieWWQybT1kSbxz74KXWvpVu6vTZZ788wy4MVMBet3GDKQU5Jv8rhCBRXgM7bRvjhfPeCZa5d",
    "57uBnWY2Wro4WRLi6NEVXzwKwAvgcgzJZMWX75J6Y2rtnxcoWzcLCuUTJjPC4xvn7yGv7Mbnk4KDueV7MnbySxNAqWLGBe6bt8r55Yf7k4xeUCjN9cN7ChWhh",
  ],
  bump_fish: [
    "5EFnKuCaxbhBf8nij4gciH3txRBnuLAkSpe9R4JE1p9qGs8hK4RJ3JuNkW2WamvcPQiK5nwDDMpbbaDVrK8DA7SXyAhyEuTqmM9K19NBbv5arTqHf56TeckZe",
    "5EFnKuCaxbhBf8nij4gciH4NweiJcogXBXHcmrAKsWDfVgBronySHardAq8HxE5q1HZKznURfjNvuqm1L6CbQ3XrvqVxWGZYAuLgfZqFNLJN3LRdnMFkwVFWG",
    "5EFnKuCaxbhBf8nij4gciH7HhSq21Ne3KMLdqPyvCGQvTMZpmyEKt2yBeZmbbnZSnJ8YEetfcVCnUtzxAzidYy5MMXCk8SNek9tKUphuTX9o7ameYUiiK394U",
    "5EFnKuCaxbhBf8nij4gciH4iVz1gRPJ7rTU41t6BeUFmeveoGbBYvauZNJ279ZjJWTMhxLJ3mqGKr8SKUYR8ZVqwyvpN5gkq8af5pe6z9THWRP8YHBrJB8mui",
    "5EFnKuCaxbhBf8nij4gciH6W1dUkgGHVvGwoFFpSYT9uJFWaRj9CybeqBrhPXwPb3vpsXRyszYcxEXbLasCfah2THzvan2R6kN3CpvxQkfCSaFDG2PBPQGGCQ",
  ],
  menu_play: [
    "57uBnWUi2thMCbDyK7mRMtU984JPJyKWqJp4DmDz3aT8uJ4bYRWobrYtJEUTBB5qzNKbzEFqa31vBiL5WcLJQrCnNN4VJ7u88yrp7awv62TECitSN2CnZntZm",
  ],
  key_picked: [
    "5s8ueJWjWFaC3pfDn3umc4jFiKtc5b7Vx7LLmpNtPCLgV77mZQ4c8ENEtBbuAXDeBjZPqtEVaLmw3i8N1PZiwnsMqrtVEurLsoNgshHDrVbkgXHX1wjLwehNP",
    "5s8ueJWjWFaC3pfDn3umc4gro5WX8xaZLi7wZ1u9zTecBqN9Dg9bKpuQfnHA1NyBYSsKPFrZCu4dmJjcSgpSpKzgUTJbRstMJdyMSPXsd8zBwff1ytMH1rKFd",
    "5s8ueJWjWFaC3pfDn3umc4gefDDtBRKomiDFh5goeQ11zH6sJNJfoThxrU8LgsHKfuZvK92QEACzT8C835EujECRieR2KTnQsACGtthdDqWVNcTPqh1n1Bmr7",
  ],
  cage_destroyed: [
    "7BMHBGJfPzDBmVLd2wMaX5XBrGZqvxSGQNv3NMsLCg31n6hESpxznm82W8qijrcaSRdtzxH5CQapm9oACbaGUpXyd9xM794zf68Lsu3ym2jsq1wQuSgeSMwwV",
    "7BMHBGJfPzDBmVLd2wMaX5WPQzLLJ198YpiTZm9A9Krc77ty3XgutzbX3wRDJ5A7tbLa73zodngvrpfAY8yZi97mt5QPMVtH65GuzQbqtJhewraFnLnjLi3r7",
    "7BMHBGJfPzDBmVLd2wMaX5VWA28u2Lob5TEV1WoBaQuXbCGh2dXodCLoaiEiFTks4HCEfTKQ9qeNSonWdVyNGXDYz5yh8H1bsftdN4VASfuoFXPLUo8iUawKV",
  ],
};
