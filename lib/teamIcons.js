export const TEAM_ICONS = [
  '/assets/random team icon 1.png',
  '/assets/random team icon 2.png',
  '/assets/random team icon 3.png',
  '/assets/random team icon 4.png',
  '/assets/random team icon 5.png'
];

export function assignRandomIcon(teams) {
  const used = new Set(teams.map((team) => team.icon));
  const available = TEAM_ICONS.filter((icon) => !used.has(icon));
  const source = available.length ? available : TEAM_ICONS;
  return source[Math.floor(Math.random() * source.length)];
}
