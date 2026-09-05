const shared = [
  { type: 'SHARED', title: 'MUTE', text: 'Hold your tongue with your fingers and say a phrase. Everyone else gets 3 guesses each. If anyone guesses correctly, you take a shot. If nobody gets it, everyone else takes a shot.' },
  { type: 'SHARED', title: 'SAY IT IN MY EAR', text: 'Your partner closes her eyes. Whisper three things into her ear — 2 things you genuinely like about her and 1 freaky thing you would do to her. If she likes the way you talk, your team survives. If not, take a drink.' },
  { type: 'SHARED', title: 'FEEL ME', text: 'Your partner closes her eyes. Touch her butt using anything except your hand or privates. She must guess what part of your body touched her. Correct? Your team is safe — pick someone to drink. Wrong? You both drink.' },
  { type: 'SHARED', title: 'THE SLOW TOUCH', text: 'Starting at your partner’s shoulder, slowly trace one finger around their body. Stop where you think might be her G-spot. If you are wrong, you must drink.' },
  { type: 'SHARED', title: 'VOODOO DOLL', text: 'Pick a team and make them stand face-to-face. Stand behind the man where only his partner can see you. He cannot move. Touch yourself in 3 different places; his partner must copy each touch on him. If he flinches or moves, they both take a shot. If he survives all 3, your team takes a shot.' },
  { type: 'SHARED', title: 'BOOTY TELEPHONE', text: 'Pick 1 woman from every team. Each woman gets 10 seconds to whisper something freaky into her partner’s ear. The men must keep a straight face. First man to react makes his team take a shot. Last man standing picks another team to drink.' },
  { type: 'SHARED', title: 'PICK ME UP', text: 'Pick up your partner and hold them for 10 seconds. Drop them early or can’t do it? Take a shot.' },
  { type: 'SHARED', title: 'TIPPY TOES', text: 'Walk only on your tippy toes for 3 turns. Get caught walking normally? Take a shot.', persistent: true, duration: 3, owner: 'drawer' },
  { type: 'SHARED', title: 'HANDCUFFED', text: 'You and your partner must hold hands for 3 turns. Let go early? Take a shot.', persistent: true, duration: 3, owner: 'team' },
  { type: 'SHARED', title: 'BOOTY BOOP', text: 'For 3 turns, work “booty boop big time” into the middle of every sentence. Forget? Take a shot.', persistent: true, duration: 3, owner: 'drawer' },
  { type: 'SHARED', title: 'STUD-DA-DER', text: 'You must dramatically stutter when you talk for 2 turns. Forget? Take a shot.', persistent: true, duration: 2, owner: 'drawer' },
  { type: 'SHARED', title: 'WALKIE TALKIE', text: 'Everyone must end everything they say with “over” until your partner is forced or chooses to take a shot.', persistent: true, duration: null, endCondition: 'partner-shot', owner: 'everyone' },
  { type: 'SHARED', title: 'BAD BABY', text: 'Until your personal hand wins, “shit” and “damn” are banned words for everyone. Say either one? Your partner must smack those buns and make it feel good. Don’t want the smack? Take a shot instead.', persistent: true, duration: null, endCondition: 'owner-wins', owner: 'everyone' }
];

export const manChallenges = [
  { type: 'MALE TASK', title: 'MOTORBOAT', text: 'Motorboat your partner for 10 seconds, or take a shot.' },
  { type: 'MALE TASK', title: 'KISS TEST', text: 'Kiss your partner somewhere above the shoulders. No hickeys. She rates it 1–10. Score below 7? Take a shot.' },
  { type: 'MALE TASK', title: 'PRIVATE DANCER', text: 'Give your partner a 15-second lap-dance-style performance. She chooses the song. Refuse? Take a shot.' },
  { type: 'MALE TASK', title: 'THE STARE DOWN', text: 'Get nose-to-nose with your partner and hold eye contact for 20 seconds without laughing. First person to laugh takes a shot.' },
  { type: 'MALE TASK', title: 'LOVE SONG', text: 'Hum the chorus of a love song directly to your partner. No hiding behind the group. If she can guess it, everyone else drinks.' },
  { type: 'MALE TEAM', title: 'ROCK PAPER LOVERS', text: 'Play best-of-three rock-paper-scissors against your partner. Loser takes the team’s shot. Three draws in a row and every other team drinks.' },
  { type: 'MALE TEAM', title: 'TONGUE TWISTER', text: 'Choose one team to say a tongue twister three times quickly. If they fail, they both drink. If they pass, you drink.' },
  { type: 'MALE TEAM', title: 'DANCE PARTNERS', text: 'Your team gets 20 seconds to dance and perform “Jump on It” by The Sugarhill Gang together. The group decides if you survive.' },
  { type: 'MALE TEAM', title: 'PUSH BACK', text: 'Pick 2 teams. Both partners do as many push-ups as they can. Add each team’s push-ups together. Highest combined total wins. Losing team takes a shot.' },
  { type: 'MALE TEAM', title: 'HAND TALK', text: 'Take a seat and place your hands in your pockets. Your partner stands behind you and puts their arms through yours. Talk for 1 minute while they use their hands to act out everything you’re saying. If the group agrees it was funny, pick someone to take a shot. If not, your team takes a shot.' },
  { type: 'MALE WINGMAN', title: 'WINGMAN WAR', text: 'Pick two teams. One person from each team must moonwalk. Best moonwalk wins. Losing couple drinks.' },
  { type: 'MALE WINGMAN', title: 'FREEZE FRAME', text: 'Pick another couple. Both of them dance until someone yells “FREEZE!” First to move afterward drinks.' },
  { type: 'MALE TASK', title: 'SNOOP MODE', text: 'Talk only like Snoop Dogg for 2 turns. Break character? Take a shot.', persistent: true, duration: 2, owner: 'drawer' },
  { type: 'MALE TASK', title: 'WEEZY MODE', text: 'Talk only like Lil Wayne for 2 turns. Break character? Take a shot.', persistent: true, duration: 2, owner: 'drawer' },
  { type: 'MALE TASK', title: 'BATMAN', text: 'Talk only like Batman for 2 turns. Break character? Take a shot.', persistent: true, duration: 2, owner: 'drawer' },
  { type: 'MALE TASK', title: 'E-40 MODE', text: 'Talk only like E-40 for 2 turns. Break character? Take a shot.', persistent: true, duration: 2, owner: 'drawer' },
  { type: 'MALE TASK', title: 'DAT AZZ', text: 'Hug your partner and give her a quick ass grab. If she likes it, she picks someone to take a shot. If she doesn’t, you’re her dog for 3 turns — you can only communicate by barking.', persistentOnFail: { title: 'HER DOG', duration: 3 } },
  { type: 'MALE TASK', title: 'GET TO DA CHOPPA!', text: 'Talk like an exaggerated Arnold Schwarzenegger for 2 rounds. Break character? Take a shot.', persistent: true, duration: 2, owner: 'drawer' },
  { type: 'MALE TASK', title: 'YOU ARE NUTZ', text: 'Your hand is glued to your nuts. Move them with every word you say for 3 turns. You may only let go to play your card. Let go for anything else? Drink up.', persistent: true, duration: 3, owner: 'drawer' },
  ...shared
];

export const womanChallenges = [
  { type: 'GIRL TASK', title: 'GODDESS MODE', text: 'Your new name is “Goddess of All Bitches.” Everyone must address you by the full title until your next winning turn. The first person who gets it wrong causes everyone except your team to drink.', persistent: true, duration: null, endCondition: 'owner-wins', owner: 'drawer' },
  { type: 'GIRL TASK', title: 'TOUCH & GUESS', text: 'Walk away from the group with your partner. Touch him somewhere, anywhere, the other teams cannot see. Return to the group. Each team gets one guess at where you touched him. Closest team is safe. Everyone else drinks.' },
  { type: 'GIRL TASK', title: 'THE SUSPECT', text: 'Your partner is a suspect. Place his hands on his head and perform a seductive pat-down. When you’re finished, ask if you turned him on. If he admits it, take a shot — or pick someone else to take your shot for you.' },
  { type: 'GIRL TEAM', title: 'TWERK CONTEST', text: 'Pick a song and 1 woman from every team. You’re the judge. Play the song for 1 minute. Best performances are safe. Worst performance takes a shot.' },
  { type: 'GIRL TEAM', title: 'GHETTO BALLERINA', text: 'Pick 3 judges — 2 women and 1 man. You have 2 dance moves to impress them. Win over 2 judges and your partner takes your shot. Lose the vote and you take the shot.' },
  { type: 'GIRL TASK', title: 'ONE AND DONE', text: 'Sit on your partner’s back while he attempts 1 push-up. If he fails, take a shot.' },
  { type: 'GIRL TASK', title: 'NOSE JOB', text: 'Make your tongue touch your nose. Can’t do it? Take a shot.' },
  { type: 'GIRL TASK', title: 'DAT AZZ', text: 'Hug your partner and receive a quick ass massage. If you like it, pick someone to take a shot. If you don’t, he becomes your dog for 2 turns — he can only communicate by barking.' },
  { type: 'GIRL TASK', title: 'SIGN LANGUAGE', text: 'You must sign everything you want to say for 2 turns. Speak instead? Take a shot.', persistent: true, duration: 2, owner: 'drawer' },
  { type: 'GIRL TASK', title: 'WIDE LOAD', text: 'Walk like you have the world’s biggest butt for 3 turns. Break character? Take a shot.', persistent: true, duration: 3, owner: 'drawer' },
  { type: 'GIRL TASK', title: 'DIRTY BIRD', text: 'Walk pigeon-toed for 2 turns. Forget? Take a shot.', persistent: true, duration: 2, owner: 'drawer' },
  { type: 'GIRL TASK', title: 'BOOBIE TALK', text: 'Your hands are now glued to your breasts. Move them with every word you say for 3 turns. You may only let go to play your card. Let go for anything else? Drink up.', persistent: true, duration: 3, owner: 'drawer' },
  { type: 'GIRL TASK', title: 'QUEEN BEE', text: 'For 2 rounds, whenever you ask, your partner must kiss your ass. Refuse? Take a shot.', persistent: true, duration: 2, owner: 'drawer' },
  ...shared
];

export function shuffleDeck(cards) {
  const deck = [...cards];
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function createDecks() {
  return { man: shuffleDeck(manChallenges), woman: shuffleDeck(womanChallenges) };
}

export function drawFromDeck(deck, sourceCards, previousTitle = '') {
  let working = deck.length ? [...deck] : shuffleDeck(sourceCards);
  if (working.length > 1 && working[0]?.title === previousTitle) {
    const swapIndex = working.findIndex((card, index) => index > 0 && card.title !== previousTitle);
    if (swapIndex > 0) [working[0], working[swapIndex]] = [working[swapIndex], working[0]];
  }
  const [challenge, ...remaining] = working;
  return { challenge, remaining };
}
