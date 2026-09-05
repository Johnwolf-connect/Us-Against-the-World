export const safeCards = [
  '/assets/safe/SWAT.png',
  '/assets/safe/NOT TODAY.png',
  '/assets/safe/Kiss my ass.png',
  '/assets/safe/KNOW YOU LYIN.png',
  '/assets/safe/fuck no.png',
  '/assets/safe/Maybe next time.png',
  '/assets/safe/SIKE.png',
  '/assets/safe/TAKE IT BACK.png'
];

export const consequenceCards = [
  '/assets/consequences/Bottoms Up.png',
  '/assets/consequences/Drink up bitch.png',
  '/assets/consequences/Take a shot!.png',
  "/assets/consequences/Sip till it's gone.png",
  '/assets/consequences/free shots for all.png',
  '/assets/consequences/drink it raw.png',
  '/assets/consequences/gulp gulp.png',
  '/assets/consequences/stfu and drink.png',
  '/assets/consequences/toss it back.png',
  '/assets/consequences/Pass the glass.png',
  '/assets/consequences/give the loser some juice.png',
  '/assets/consequences/wtf just drink.png',
  '/assets/consequences/take it to the head.png'
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
