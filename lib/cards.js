export const safeCards = [
  '/assets/safe/SWAT.webp',
  '/assets/safe/NOT TODAY.webp',
  '/assets/safe/Kiss my ass.webp',
  '/assets/safe/KNOW YOU LYIN.webp',
  '/assets/safe/fuck no.webp',
  '/assets/safe/Maybe next time.webp',
  '/assets/safe/SIKE.webp',
  '/assets/safe/TAKE IT BACK.webp'
];

export const consequenceCards = [
  '/assets/consequences/Bottoms Up.webp',
  '/assets/consequences/Drink up bitch.webp',
  '/assets/consequences/Take a shot!.webp',
  "/assets/consequences/Sip till it's gone.webp",
  '/assets/consequences/free shots for all.webp',
  '/assets/consequences/drink it raw.webp',
  '/assets/consequences/gulp gulp.webp',
  '/assets/consequences/stfu and drink.webp',
  '/assets/consequences/toss it back.webp',
  '/assets/consequences/Pass the glass.webp',
  '/assets/consequences/give the loser some juice.webp',
  '/assets/consequences/wtf just drink.webp',
  '/assets/consequences/take it to the head.webp'
];

export const secretCards = [
  {
    audience: 'woman',
    title: "IT'S A SECRET",
    text: 'Go somewhere isolated. Show your partner a nude body photo. If your partner agrees, he must return to the group and say out loud, “I eat ass.” He cannot discuss why. Or take a shot.'
  },
  {
    audience: 'woman',
    title: "IT'S A SECRET",
    text: 'Go somewhere isolated. Have your partner lie on his back. Seduce his genitals with your foot — no shoes. If he agrees, return to the group and say, “He’s a very obedient boy.” You cannot discuss why. Or take a shot.'
  },
  {
    audience: 'woman',
    title: "IT'S A SECRET",
    text: 'Go somewhere isolated. Show your partner your panties and do a 360. He cannot touch. If he agrees, he must return to the group and say, “God is a woman!” He cannot discuss why. Or take a shot.'
  },
  {
    audience: 'man',
    title: "IT'S A SECRET",
    text: 'Go somewhere isolated. Close your eyes. Your partner must rub your dick for 10 seconds. If she agrees, return to the group and announce, “Pee actually tastes good.” You cannot discuss why. Or take a shot.'
  },
  {
    audience: 'man',
    title: "IT'S A SECRET",
    text: 'Go somewhere isolated. Lift your shirt and close your eyes. She must kiss both of your nipples — no tongue allowed. If she agrees, she must return to the group and say, “What a waste of time.” She cannot discuss why. Or take a shot.'
  },
  {
    audience: 'shared',
    title: "IT'S A SECRET",
    text: 'Go somewhere isolated. One of you places your hands on the wall and spreads your legs. Receive a short sexual top-and-bottom pat-down. If successful, the searcher must return and say, “I’m never washing my face again.” You cannot discuss why. Or you both take a shot.'
  }
];

export function randomFrom(items) {
  return items[Math.floor(Math.random() * items.length)];
}
