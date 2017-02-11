// config/seed-values.js
module.exports = {
  seedValues: {
    rewards: [
      {
        name: 'Take Feedback Survey',
        value: 100,
        link: 'https://gyoperalto.typeform.com/to/ECEHy9'
      },
      {
        name: 'Share on Facebook',
        value: 100,
        link: '#'
      }
    ],
    analysts: [
      {
        name: {
          first: 'Joanna',
          last: 'Isadoa'
        },
        cost: 1000,
        depth: 5,
        education: 'PhD in Economics from Harvard',
        story: 'Joanna graduated at the top of her class, became an absolute star in the financial industry. She later landed a position on the board of Goldman Sachs.'
      },
      {
        name: {
          first: 'Matsuchi',
          last: 'Miamori'
        },
        cost: 750,
        depth: 4,
        education: 'MS, Computer Science, Tokyo University',
        story: 'Not to be mistaken for the Iron Chef, Matsuchi has a infinite breadth of financial experience.'
      },
      {
        name: {
          first: 'Billiam',
          last: 'Yates'
        },
        cost: 500,
        depth: 2,
        education: 'BA, Boston College',
        story: 'Most students graduate college in debt. Bill, however, made enough money to pay for college from the stock market. Now he is on to bigger and better things.'
      },
      {
        name: {
          first: 'Joey',
          last: 'Doodab'
        },
        cost: 250,
        depth: 1,
        education: 'Currently in High School',
        story: 'Joey is a pretty nerdy kid. He spends the majority of his time on Google.'
      }
    ],
    trainers: [
      {
        name: {
          first: 'Miranda',
          last: 'Wallard'
        },
        cost: 100,
        depth: 2,
        chance: 80,
        story: 'Miranda is the best of the best. She frequently doles out priceless life lessons to some of the most iconic figures in humanity.'
      },
      {
        name: {
          first: 'Jay',
          last: 'Lopez'
        },
        cost: 50,
        depth: 1,
        chance: 40,
        story: 'Claims to be the long lost brother of the popular Tai Lopez. His advice has also helped a few famous athletes go a long way.'
      },
      {
        name: {
          first: 'Leroy',
          last: 'Johnson'
        },
        cost: 25,
        depth: 1,
        chance: 20,
        story: 'Leroy is a fairly well-known life coach at the company he works for. In his spare time he helps those in need find their purpose.'
      },
      {
        name: {
          first: 'Ashley',
          last: 'Burtham'
        },
        cost: 10,
        depth: 1,
        chance: 10,
        story: 'Ashley motivates herself every day to wake up. Never underestimate her strong will.'
      }
    ],
    champions: [
      {
        name: 'Amumu',
        icon: '/assets/images/icons/champions/amumu.png',
        lanes: [
          {
            lane: 'Jungle',
            tier: 'A'
          }
        ]
      },
      {
        name: 'Anivia',
        icon: '/assets/images/icons/champions/anivia.png',
        lanes: [
          {
            lane: 'Mid',
            tier: 'A'
          }
        ]
      },
      {
        name: 'Annie',
        icon: '/assets/images/icons/champions/annie.png',
        lanes: [
          {
            lane: 'Mid',
            tier: 'S'
          },
          {
            lane: 'Support',
            tier: 'E'
          }
        ]
      },
      {
        name: 'Ashe',
        icon: '/assets/images/icons/champions/ashe.png',
        lanes: [
          {
            lane: 'ADC',
            tier: 'A'
          }
        ]
      },
      {
        name: 'Brand',
        icon: '/assets/images/icons/champions/brand.png',
        lanes: [
          {
            lane: 'Mid',
            tier: 'B'
          },
          {
            lane: 'Support',
            tier: 'A'
          }
        ]
      },
      {
        name: 'Braum',
        icon: '/assets/images/icons/champions/braum.png',
        lanes: [
          {
            lane: 'Support',
            tier: 'A'
          }
        ]
      },
      {
        name: 'Caitlyn',
        icon: '/assets/images/icons/champions/caitlyn.png',
        lanes: [
          {
            lane: 'ADC',
            tier: 'S'
          }
        ]
      },
      {
        name: 'Corki',
        icon: '/assets/images/icons/champions/corki.png',
        lanes: [
          {
            lane: 'Mid',
            tier: 'C'
          },
          {
            lane: 'ADC',
            tier: 'D'
          }
        ]
      },
      {
        name: 'Diana',
        icon: '/assets/images/icons/champions/diana.png',
        lanes: [
          {
            lane: 'Mid',
            tier: 'C'
          }
        ]
      },
      {
        name: 'Elise',
        icon: '/assets/images/icons/champions/elise.png',
        lanes: [
          {
            lane: 'Jungle',
            tier: 'A'
          }
        ]
      },
      {
        name: 'Ezreal',
        icon: '/assets/images/icons/champions/ezreal.png',
        lanes: [
          {
            lane: 'ADC',
            tier: 'A'
          }
        ]
      },
      {
        name: 'Fizz',
        icon: '/assets/images/icons/champions/fizz.png',
        lanes: [
          {
            lane: 'Top',
            tier: 'C'
          },
          {
            lane: 'Mid',
            tier: 'B'
          }
        ]
      },
      {
        name: 'Gragas',
        icon: '/assets/images/icons/champions/gragas.png',
        lanes: [
          {
            lane: 'Jungle',
            tier: 'B'
          }
        ]
      },
      {
        name: 'Jax',
        icon: '/assets/images/icons/champions/jax.png',
        lanes: [
          {
            lane: 'Top',
            tier: 'C'
          },
          {
            lane: 'Jungle',
            tier: 'D'
          }
        ]
      },
      {
        name: 'Karthus',
        icon: '/assets/images/icons/champions/karthus.png',
        lanes: [
          {
            lane: 'Mid',
            tier: 'C'
          }
        ]
      },
      {
        name: 'Kha\'Zix',
        icon: '/assets/images/icons/champions/khazix.png',
        lanes: [
          {
            lane: 'Jungle',
            tier: 'A'
          }
        ]
      },
      {
        name: 'Lulu',
        icon: '/assets/images/icons/champions/lulu.png',
        lanes: [
          {
            lane: 'Top',
            tier: 'D'
          },
          {
            lane: 'Mid',
            tier: 'D'
          },
          {
            lane: 'Support',
            tier: 'B'
          }
        ]
      },
      {
        name: 'Morgana',
        icon: '/assets/images/icons/champions/morgana.png',
        lanes: [
          {
            lane: 'Support',
            tier: 'A'
          }
        ]
      },
      {
        name: 'Nasus',
        icon: '/assets/images/icons/champions/nasus.png',
        lanes: [
          {
            lane: 'Top',
            tier: 'B'
          }
        ]
      },
      {
        name: 'Nautilus',
        icon: '/assets/images/icons/champions/nautilus.png',
        lanes: [
          {
            lane: 'Top',
            tier: 'S'
          },
          {
            lane: 'Jungle',
            tier: 'F'
          }
        ]
      },
      {
        name: 'Nunu',
        icon: '/assets/images/icons/champions/nunu.png',
        lanes: [
          {
            lane: 'Jungle',
            tier: 'E'
          },
          {
            lane: 'Support',
            tier: 'F'
          }
        ]
      },
      {
        name: 'Rammus',
        icon: '/assets/images/icons/champions/rammus.png',
        lanes: [
          {
            lane: 'Jungle',
            tier: 'D'
          }
        ]
      },
      {
        name: 'Sejuani',
        icon: '/assets/images/icons/champions/sejuani.png',
        lanes: [
          {
            lane: 'Jungle',
            tier: 'A'
          }
        ]
      },
      {
        name: 'Shaco',
        icon: '/assets/images/icons/champions/shaco.png',
        lanes: [
          {
            lane: 'Jungle',
            tier: 'A'
          }
        ]
      },
      {
        name: 'Shen',
        icon: '/assets/images/icons/champions/shen.png',
        lanes: [
          {
            lane: 'Top',
            tier: 'B'
          },
          {
            lane: 'Jungle',
            tier: 'F'
          },
          {
            lane: 'Support',
            tier: 'C'
          }
        ]
      },
      {
        name: 'Sion',
        icon: '/assets/images/icons/champions/sion.png',
        lanes: [
          {
            lane: 'Top',
            tier: 'B'
          },
          {
            lane: 'Support',
            tier: 'C'
          }
        ]
      },
      {
        name: 'Sivir',
        icon: '/assets/images/icons/champions/sivir.png',
        lanes: [
          {
            lane: 'ADC',
            tier: 'A'
          }
        ]
      },
      {
        name: 'Soraka',
        icon: '/assets/images/icons/champions/soraka.png',
        lanes: [
          {
            lane: 'Support',
            tier: 'A'
          }
        ]
      },
      {
        name: 'Syndra',
        icon: '/assets/images/icons/champions/syndra.png',
        lanes: [
          {
            lane: 'Mid',
            tier: 'A'
          }
        ]
      },
      {
        name: 'Thresh',
        icon: '/assets/images/icons/champions/thresh.png',
        lanes: [
          {
            lane: 'Support',
            tier: 'A'
          }
        ]
      },
      {
        name: 'Trundle',
        icon: '/assets/images/icons/champions/trundle.png',
        lanes: [
          {
            lane: 'Jungle',
            tier: 'C'
          },
          {
            lane: 'Support',
            tier: 'C'
          },
        ]
      },
      {
        name: 'Twisted Fate',
        icon: '/assets/images/icons/champions/twisted_fate.png',
        lanes: [
          {
            lane: 'Mid',
            tier: 'A'
          }
        ]
      },
      {
        name: 'Twitch',
        icon: '/assets/images/icons/champions/twitch.png',
        lanes: [
          {
            lane: 'ADC',
            tier: 'S'
          }
        ]
      },
      {
        name: 'Udyr',
        icon: '/assets/images/icons/champions/udyr.png',
        lanes: [
          {
            lane: 'Jungle',
            tier: 'E'
          }
        ]
      },
      {
        name: 'Vayne',
        icon: '/assets/images/icons/champions/vayne.png',
        lanes: [
          {
            lane: 'ADC',
            tier: 'S'
          }
        ]
      },
      {
        name: 'Veigar',
        icon: '/assets/images/icons/champions/veigar.png',
        lanes: [
          {
            lane: 'Mid',
            tier: 'B'
          }
        ]
      },
      {
        name: 'Vi',
        icon: '/assets/images/icons/champions/vi.png',
        lanes: [
          {
            lane: 'Jungle',
            tier: 'S'
          }
        ]
      },
      {
        name: 'Vladimir',
        icon: '/assets/images/icons/champions/vladimir.png',
        lanes: [
          {
            lane: 'Top',
            tier: 'C'
          },
          {
            lane: 'Mid',
            tier: 'E'
          },
        ]
      },
      {
        name: 'Volibear',
        icon: '/assets/images/icons/champions/volibear.png',
        lanes: [
          {
            lane: 'Top',
            tier: 'E'
          },
          {
            lane: 'Jungle',
            tier: 'B'
          },
        ]
      },
      {
        name: 'Xerath',
        icon: '/assets/images/icons/champions/xerath.png',
        lanes: [
          {
            lane: 'Mid',
            tier: 'D'
          }
        ]
      },
      {
        name: 'Yasuo',
        icon: '/assets/images/icons/champions/yasuo.png',
        lanes: [
          {
            lane: 'Top',
            tier: 'S'
          },
          {
            lane: 'Mid',
            tier: 'C'
          }
        ]
      },
      {
        name: 'Zac',
        icon: '/assets/images/icons/champions/zac.png',
        lanes: [
          {
            lane: 'Jungle',
            tier: 'B'
          }
        ]
      },
      {
        name: 'Zed',
        icon: '/assets/images/icons/champions/zed.png',
        lanes: [
          {
            lane: 'Mid',
            tier: 'B'
          }
        ]
      },
    ],
    moods: [
      {
        name: 'Motivated',
        threshold: 7,
        win_multiplier: 2,
        loss_multiplier: 0.25
      },
      {
        name: 'Calm',
        threshold: 4,
        win_multiplier: 1.5,
        loss_multiplier: 0.5
      },
      {
        name: 'Anxious',
        threshold: 2,
        win_multiplier: 1,
        loss_multiplier: 1
      },
      {
        name: 'Bored',
        threshold: 1,
        win_multiplier: 0.5,
        loss_multiplier: 1.5
      },
      {
        name: 'Apathetic',
        threshold: 0,
        win_multiplier: 0.25,
        loss_multiplier: 2
      }
    ]
  }
};