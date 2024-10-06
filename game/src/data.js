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
];

const SOUNDS = {
  game_over: [
    "111117i31y3ZgU5kQpP95chrc5XXCit1CTt1pLmX5k9KUy24xNWWtZ5LF9VLQdzbjMjk3Ji626eF3dpBGYNRXdLNRhwQC34138Bfp8nSQjCXpY76wuqUn1Z9",
    "111117i31y3ZgU5kQpP95c2Dq7AHeACyt9NqQGjLy82gLLaJYjG24heqk7vsmiKqCq4tmzbrBDjsPz52KsdRFWJPd1ZAbyPAKxenSXcp5joDmwVfKmNGtnoy",
    "111117i31y3ZgU5kQpP95aVZQViVj7zKcygSuH6RZ8zhtF1KApJtvYrgHfRWRxr5oFzyjfAsnoDQ9AUjwjPKe6xXsK8n9Xj3mZUhTHmf2DTVcVz8f7hhG5mZ",
  ],
  fish_saved: [
    "5eQTpcNcY7d1g8gUP6q5QFDNs7YFYZxMDvYNQhRhL8ypVE3dn7iHqrnp6Qs43bGCWxkFo8WUFxT4qoRsbWrXGjRjWPjzr3JaUNzBh1HU3uJLhz4waxGYiTXaF",
    "5eQTpcNcY7d1g8gUP6q5QFDRimP5sb9mrvnpLG4Nd743y4z2MzVPqP3bNKzBUhBWFv1z5aCYQZH1N5q81wCJqNUq6u4itpjcVNf3jZ8nJhRyTJmLZdRT1FDuR",
    "5eQTpcNcY7d1g8gUP6q5QFCP3P6EKYBXcKeZatdoSLk1NHYd5kJG7JERca3NRUe9qi5eZLrEwmttG4kyDetCcM866Fhh5N4P7i7SFzn781iVzrLsaWdP6XmRZ",
    "5eQTpcNcY7d1g8gUP6q5QFCQu2wcdidJKpu4r7S9dLvX4geVqQ1RUcq5N1mSSukL5hJHomTiTJXNDt8aVWuWqSZcqsnmx48gp12Tt4PhHnZUXRZUabauTqz5u",
    "5eQTpcNcY7d1g8gUP6q5QFE4z4xbouJdmYNFxe2GCnMi5hAEj3duFrQPiRxNWeeBg4X5fyRQnKNsF6AG8J4Bmk52WfW4C3vYMfohKhCpmXkN5UXNHrJfLULZm",
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
    "5m27yhkgLyJxo1wksgiSNtojFQd1Zo97Uw5jSFhUvdaHvwGwSHpa9Y731rMRWSi9rgFDJW1g7QSktT5L7jhptHEBgjM5SDiqA5PE6YpGp5UDsXR9ypPBvedGs",
    "6xFruZ78byRWT6zR5et3JY975gusFY7UhVLEfHCiqRJVmjQbgNEdvR2uG63YomvLntMBu5GRZ9qZfRqMGyqVb8Xbt743L5kjJfANaqFycFjxcRc61BJKCgVJj",
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
  menu_play: [
    "57uBnWUi2thMCbDyK7mRMtU984JPJyKWqJp4DmDz3aT8uJ4bYRWobrYtJEUTBB5qzNKbzEFqa31vBiL5WcLJQrCnNN4VJ7u88yrp7awv62TECitSN2CnZntZm",
  ]
};
