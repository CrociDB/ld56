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
];

const SOUNDS = {
  game_over: [
    "111117i31y3ZgU5kQpP95chrc5XXCit1CTt1pLmX5k9KUy24xNWWtZ5LF9VLQdzbjMjk3Ji626eF3dpBGYNRXdLNRhwQC34138Bfp8nSQjCXpY76wuqUn1Z9",
    "111117i31y3ZgU5kQpP95c2Dq7AHeACyt9NqQGjLy82gLLaJYjG24heqk7vsmiKqCq4tmzbrBDjsPz52KsdRFWJPd1ZAbyPAKxenSXcp5joDmwVfKmNGtnoy",
    "111117i31y3ZgU5kQpP95aVZQViVj7zKcygSuH6RZ8zhtF1KApJtvYrgHfRWRxr5oFzyjfAsnoDQ9AUjwjPKe6xXsK8n9Xj3mZUhTHmf2DTVcVz8f7hhG5mZ",
  ],
  fish_saved: [
    "111115w8EWmiTY44AS46J12ep1dn1Dgbr87JprBUopN4BL9WmK3FdtcBmuBrQi3KQhTfjr5CQghr7gnbLxZvZnBGGZz3m5MmpceafhFYgaYMfCkjNXG3UoX5",
    "111115w8EWmiTY44AS46J2g38JvanSYhuEinVyu6LyVEQxo4wU4evUCtoXWGm3DjpdZsgXW98BHxrXBz4oWkWCzxvYXVsykGUaCGFh4BBAA2gBf6WDckR7nf",
    "111115w8EWmiTY44AS46Hzhx2zWoU3VcN4FNcpXMh4ikG7Dw6kgJsHfoUmmHgerJHkbGn2BmWrs7CidbhsSReWG1X46T16PyjoaMrsXFQA4oGTKTEiq86Nh5",
    "111115w8EWmiTY44AS46J2ssiNMirw5T9Wagum4rskKL2DBkPD2jXnbJQRx3tpMGWYNHEqZigBb8xsDsGuunwPFUmyoBe5LZZcRJ2DKpXQe44j33TtgjzixX",
    "111115w8EWmiTY44AS46J1cCotP5xV15Vc4qn4EfEBQyZbwQL3Jh6fpxddZeSVuVgWxbHcQBXwvtHRaB37huED1YpTs3Hn6kAwW6TEp362fZN4mcWdRaonXZ",
  ],
  death: [
    "7BMHBGJ9vK3UVLWjaP4C8DeTwNt7686jwKhBBmv1jPAkLKfSn5ERxvkCetGxiTcaGrvX4LjDn1FdgRbbMvrngQyic3X35j58dkPzPZ5Jua6798nmqL5acpjGB",
    "8Ar4pMdeVCShMqqB5ju2JbPDe7pRByEMkhu9J881V6Ufp2qyTyhLW8PN2Z5XqNCDjFiSwKU3iu5hvhBKEoxJqmpzLQX1ANnnXyA35xBLjYZGDjHpjMUt7Yo43",
    "8wk6Ri6m2XfFnNxosFszRLG3UTB6qSjZytfxkAjZNqEt1nLTBKhNAZnkWpLFvf27ywvZnSuMGqEZi8wmwWP1qLGwDaUQbzBa3EbEizwD4aBmTsWmH6UbQC4p4",
  ],
  explosion: [
    "7BMHBGPo3upELsMGaLUmZxtWasQNuZjJrhcAorKpgzqtg5SSMHaHbadhsEmdRsUb9b2JsTJdvXo7m7PgVoR9qTC3ronUCdm2TxrXc93ogeeaxAbRFtfab77sd",
    "7BMHBGPo3upELsMGaLUmZxtzLkwsbmffCed5dSdFt4AWeyvuPoWnyhxVdWwnxYX8FocwhuZgsQc84zeRZP5YY11HzLrKShHACpuQkX5k1d31cMfQNe1JVwbbu",
    "7BMHBGPo3upELsMGaLUmZxsxfNbvEav77QsFAqk2xMCuLj1zbMbJAebwG1BBeocCc7dzjWrhoXXvVZrxH8CY49vcvezRsFzvyG3cF2euFwybmmxZhzHES6Yas",
  ],
  win: [
    "34T6PkqSmFpPeM6f15yLhLD5TbSNvsVB4mkZubS7ZuNjHAyf6DbPPkbM3Y8jHzRCNmVhNbJ2LcsPQVRniRGgrEtykuvgA2BTemP9SQdY5LhaGM8c476YBiEeb",
    "34T6PkqSmFpPeM6f15yLhLEcyKUbXRrVzKBDnbqcfvV3oJ6fXsHVg57TB5aYS93nU3BzC59cxW4f4mT4EbdtTtkBLoGoAabkJ16xmmsuwKGMqBerVCruiCB5h",
  ],
  level_start: [
    "111117bootzA9BvfQ9ZcVLqmVQshYxH2CtWHR2KMote7tF95T6q7NzpackaRaf6vv84MuYPW5gkHQGucQ45324gC7DkMXhBjAzC4a3o8QCWHvenny8p2izns",
    "111117bootzA9BvfQ9ZcVMcc5pLizHocFGW2aTcw6Beg3Cb3eTqp4jnQPb41LMMivRoZzfjzp18fm6d5Rr7vBBG326D9jYbYttQH33LpkhGUnZiTsvZVQuPV",
    "111117bootzA9BvfQ9ZcVLavhUPMoYFX47esavdHm2S1yfALjr7ugoPhjTE8tHQpXAkNb7oKWqGcHRD3cJsrBX7ETvDYomBNduL5FoyFGpHT2nV27pKmURMZ",
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
  ],
};
