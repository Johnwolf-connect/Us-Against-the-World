export const TEAM_ICONS = [
  '/assets/random team icon 1.webp',
  '/assets/random team icon 2.webp',
  '/assets/random team icon 3.webp',
  '/assets/random team icon 4.webp',
  '/assets/random team icon 5.webp'
];

export function assignRandomIcon(teams) {
  const used = new Set(teams.map((team) => team.icon));
  const available = TEAM_ICONS.filter((icon) => !used.has(icon));
  const source = available.length ? available : TEAM_ICONS;
  return source[Math.floor(Math.random() * source.length)];
}
