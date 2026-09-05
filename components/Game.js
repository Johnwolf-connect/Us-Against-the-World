'use client';

import { useMemo, useRef, useState } from 'react';
import { assignRandomIcon } from '../lib/teamIcons';
import { createDecks, drawFromDeck, manChallenges, womanChallenges } from '../lib/challenges';
import { consequenceCards, randomFrom, safeCards, secretCards } from '../lib/cards';

const STAGES = {
  SETUP: 'SETUP',
  ADD_TEAM: 'ADD_TEAM',
  WHO_WON: 'WHO_WON',
  CHOOSE_CARD: 'CHOOSE_CARD',
  REVEAL: 'REVEAL',
  SECRET: 'SECRET',
  SAFE_FOUND: 'SAFE_FOUND',
  SAFE_DECISION: 'SAFE_DECISION',
  CONSEQUENCE: 'CONSEQUENCE',
  NEXT_HAND: 'NEXT_HAND'
};

const SECRET_CHANCE = 0.15;
const SECRET_COOLDOWN_HANDS = 3;
const SAFE_CHANCE = 0.18;

function TeamBanner({ team, onRemove }) {
  return (
    <article className="team-banner">
      <img className="team-banner-art" src="/assets/Intro Team banner.png" alt="" />
      <img className="team-icon" src={team.icon} alt="" />
      <div className="team-copy">
        <div className="team-title-label">TEAM NAME</div>
        <div className="team-name">{team.name}</div>
        <div className="player-grid">
          <div className="player-box"><span className="player-label his">HIS NAME</span><span className="player-name">{team.his}</span></div>
          <div className="player-box"><span className="player-label her">HER NAME</span><span className="player-name">{team.her}</span></div>
        </div>
      </div>
      <button className="remove-team" type="button" onClick={onRemove} aria-label={`Remove ${team.name}`}>×</button>
    </article>
  );
}

function SetupScreen({ teams, onAddTeam, onRemoveTeam, onBegin }) {
  return (
    <section className="screen intro-screen active">
      <img className="screen-bg" src="/assets/Intro background.png" alt="" />
      <div className="intro-content">
        <div className="team-list">{teams.map((team) => <TeamBanner key={team.id} team={team} onRemove={() => onRemoveTeam(team.id)} />)}</div>
        <button className="art-button add-team-art" type="button" onClick={onAddTeam} aria-label="Add team"><img src="/assets/Intro Add team button button.png" alt="Add Team" /></button>
        <button className="art-button begin-art" type="button" onClick={onBegin} disabled={teams.length < 2} aria-label="Let's begin"><img src="/assets/Intro background lets's begin button.png" alt="Let's Begin" /></button>
        <p className="intro-message">{teams.length < 2 ? 'Add at least 2 teams to begin.' : `${teams.length} teams ready.`}</p>
      </div>
    </section>
  );
}

function AddTeamScreen({ onCancel, onCreate }) {
  const [name, setName] = useState('');
  const [his, setHis] = useState('');
  const [her, setHer] = useState('');
  const [error, setError] = useState('');
  const submit = (event) => {
    event.preventDefault();
    if (!name.trim() || !his.trim() || !her.trim()) return setError('Complete all three names.');
    onCreate({ name: name.trim(), his: his.trim(), her: her.trim() });
  };
  return (
    <section className="screen active">
      <img className="screen-bg" src="/assets/team name add background.png" alt="" />
      <div className="add-team-layer">
        <img className="add-card-art" src="/assets/team name add card.png" alt="" />
        <form className="team-form" onSubmit={submit}>
          <label htmlFor="team-name">TEAM NAME</label><input id="team-name" autoComplete="off" maxLength={22} value={name} onChange={(e) => setName(e.target.value)} />
          <div className="name-row">
            <div><label htmlFor="his-name">HIS NAME</label><input id="his-name" autoComplete="off" maxLength={16} value={his} onChange={(e) => setHis(e.target.value)} /></div>
            <div><label htmlFor="her-name">HER NAME</label><input id="her-name" autoComplete="off" maxLength={16} value={her} onChange={(e) => setHer(e.target.value)} /></div>
          </div>
          <div className="form-error" aria-live="polite">{error}</div>
          <button className="art-button create-team-art" type="submit" aria-label="Create team"><img src="/assets/team name add button.png" alt="Create Team" /></button>
        </form>
        <button className="art-button cancel-art" type="button" onClick={onCancel} aria-label="Cancel"><img src="/assets/team name cancel button.png" alt="Cancel" /></button>
      </div>
    </section>
  );
}

function ActiveChallenges({ teams }) {
  const active = teams.flatMap((team) => (team.activeChallenges || []).map((card) => ({ ...card, teamName: team.name })));
  if (!active.length) return null;
  return (
    <details className="active-challenges">
      <summary>ACTIVE CHALLENGES <b>{active.length}</b></summary>
      <div className="active-list">
        {active.map((card) => (
          <div className="active-row" key={card.id}>
            <div><strong>{card.title}</strong><span>{card.teamName} · {card.playerName || 'TEAM'}</span></div>
            <em>{card.turnsRemaining == null ? 'ACTIVE' : `${card.turnsRemaining} TURN${card.turnsRemaining === 1 ? '' : 'S'}`}</em>
          </div>
        ))}
      </div>
    </details>
  );
}

function WinnerScreen({ teams, onWinner }) {
  return (
    <section className="screen winner-screen active">
      <img className="screen-bg" src="/assets/Team Won background.png" alt="" />
      <div className="winner-shell">
        <ActiveChallenges teams={teams} />
        <div className="winner-buttons">
          {teams.map((team) => (
            <button key={team.id} className="winner-btn" type="button" onClick={() => onWinner(team)}>
              <img className="winner-banner-art" src="/assets/Team Won banner.png" alt="" />
              <img className="winner-icon" src={team.icon} alt="" />
              <span className="winner-copy"><span className="won-team">{team.name}</span><span className="won-word">WON</span></span>
              {(team.safeCards?.length || 0) > 0 && <span className="safe-count">SAFE ×{team.safeCards.length}</span>}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChooseCardScreen({ winningTeam, onChoose }) {
  const [selected, setSelected] = useState(null);
  const choose = (gender) => {
    if (selected) return;
    setSelected(gender);
    window.setTimeout(() => onChoose(gender), 360);
  };
  return (
    <section className={`screen choose-screen active ${selected ? 'choosing' : ''}`}>
      <div className="choice-bg gold-bg" /><div className="choice-bg rose-bg" />
      <div className="choice-copy"><div className="winning-team-label">{winningTeam?.name} WON</div><h2>CHOOSE YOUR CARD</h2></div>
      <div className="choice-stage">
        <button className={`challenge-choice male-choice ${selected === 'man' ? 'selected' : ''}`} type="button" onClick={() => choose('man')}><span className="choice-label">MAN</span><img src="/assets/Man card back.png" alt="Man challenge card" /></button>
        <button className={`challenge-choice woman-choice ${selected === 'woman' ? 'selected' : ''}`} type="button" onClick={() => choose('woman')}><span className="choice-label">WOMAN</span><img src="/assets/Girl card back copy.png" alt="Woman challenge card" /></button>
      </div>
    </section>
  );
}

function RevealScreen({ gender, challenge, onComplete, onAccept, onShot }) {
  const [flipped, setFlipped] = useState(false);
  const isWoman = gender === 'woman';
  const isPersistent = !!challenge?.persistent;
  return (
    <section className="screen reveal-screen active">
      <div className="reveal-bg" style={{ backgroundImage: `url("/assets/${isWoman ? 'woman card selection background.png' : 'man card selection background.png'}")` }} />
      <div className="reveal-stage">
        <button className={`flip-card enter ${flipped ? 'flipped' : ''}`} type="button" onClick={() => setFlipped(true)} aria-label="Flip challenge card">
          <span className="flip-inner">
            <span className="flip-face flip-back"><img src={isWoman ? '/assets/Girl card back copy.png' : '/assets/Man card back.png'} alt="Challenge card back" />{!flipped && <span className="tap-to-flip">TAP TO FLIP</span>}</span>
            <span className="flip-face flip-front"><img src={isWoman ? '/assets/woman card front message.png' : '/assets/man card front message.png'} alt="" /><span className="challenge-copy"><span className="challenge-type">{challenge?.type}</span><h2>{challenge?.title}</h2><p>{challenge?.text}</p></span></span>
          </span>
        </button>
      </div>
      {flipped && (
        <div className="decision-bar show">
          {isPersistent ? <button className="decision accept" onClick={onAccept}>ACCEPT</button> : <button className="decision accept" onClick={onComplete}>COMPLETE</button>}
          <button className="decision shot" onClick={onShot}>TAKE A SHOT</button>
        </div>
      )}
    </section>
  );
}

function SecretScreen({ secret, onComplete, onShot }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <section className="screen secret-screen active">
      <div className="secret-hush">SHHH... TAKE THE PHONE SOMEWHERE PRIVATE</div>
      <button className={`secret-card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(true)} type="button">
        {!flipped ? <img src="/assets/secret/its a Secret.png" alt="It's a Secret" /> : <div className="secret-front"><h2>IT'S A SECRET</h2><p>{secret?.text}</p><small>DO NOT TELL THE GROUP.</small></div>}
      </button>
      {flipped && <div className="decision-bar secret-decisions"><button className="decision accept" onClick={onComplete}>DONE</button><button className="decision shot" onClick={onShot}>TAKE A SHOT</button></div>}
    </section>
  );
}

function SafeFoundScreen({ card, teamName, count, onContinue }) {
  return (
    <section className="screen reward-screen active">
      <div className="reward-kicker">{teamName} FOUND A SAFE CARD</div>
      <button className="reward-card" type="button" onClick={onContinue}><img src={card} alt="Safe from taking a shot" /></button>
      <div className="reward-copy">SAVED TO YOUR TEAM · {count}/2<br/><span>TAP CARD TO CONTINUE</span></div>
    </section>
  );
}

function SafeDecisionScreen({ team, onUseSafe, onTakeShot }) {
  return (
    <section className="screen safe-decision-screen active">
      <div className="safe-decision-copy"><h2>USE A SAFE?</h2><p>{team.name} can block this shot or save the card for later.</p></div>
      <div className="held-safe-grid">
        {team.safeCards.map((card, index) => <button key={`${card}-${index}`} onClick={() => onUseSafe(index)} type="button"><img src={card} alt={`Safe card ${index + 1}`} /><span>USE THIS SAFE</span></button>)}
      </div>
      <button className="take-it-button" type="button" onClick={onTakeShot}>KEEP MY SAFE · TAKE THE SHOT</button>
    </section>
  );
}

function ConsequenceScreen({ card, onContinue }) {
  return <section className="screen consequence-screen active"><button type="button" className="consequence-card" onClick={onContinue}><img src={card} alt="Take a shot consequence" /></button><div className="tap-continue">TAP CARD WHEN READY</div></section>;
}

function NextHandScreen({ onNext }) {
  return <section className="screen next-hand-screen active"><button className="next-hand-card" type="button" onClick={onNext} aria-label="Play the next hand"><img src="/assets/Next hand.png" alt="Play the Next Hand" /></button></section>;
}

export default function Game() {
  const [stage, setStage] = useState(STAGES.SETUP);
  const [teams, setTeams] = useState([]);
  const [winningTeamId, setWinningTeamId] = useState(null);
  const [gender, setGender] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [secret, setSecret] = useState(null);
  const [safeFound, setSafeFound] = useState(null);
  const [consequence, setConsequence] = useState(null);
  const [handNumber, setHandNumber] = useState(0);
  const [lastSecretHand, setLastSecretHand] = useState(-999);
  const decksRef = useRef(createDecks());
  const previousTitlesRef = useRef({ man: '', woman: '' });

  const winningTeam = teams.find((team) => team.id === winningTeamId) || null;
  const canAddTeam = teams.length < 5;

  const patchTeam = (id, updater) => setTeams((current) => current.map((team) => team.id === id ? updater(team) : team));

  const createTeam = ({ name, his, her }) => {
    if (!canAddTeam) return;
    const icon = assignRandomIcon(teams);
    setTeams((current) => [...current, { id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`, name, his, her, icon, wins: 0, safeCards: [], activeChallenges: [] }]);
    setStage(STAGES.SETUP);
  };

  const removeTeam = (id) => setTeams((current) => current.filter((team) => team.id !== id));

  const selectWinner = (team) => {
    const wasEligible = team.wins >= 1;
    const nextHandNumber = handNumber + 1;
    setHandNumber(nextHandNumber);
    setWinningTeamId(team.id);

    // Special-condition active cards end when their owner/team wins.
    setTeams((current) => current.map((t) => {
      const won = t.id === team.id;
      const activeChallenges = (t.activeChallenges || []).filter((card) => !(won && card.endCondition === 'owner-wins'));
      return won ? { ...t, wins: (t.wins || 0) + 1, activeChallenges } : { ...t, activeChallenges };
    }));

    const secretOffCooldown = nextHandNumber - lastSecretHand > SECRET_COOLDOWN_HANDS;
    if (wasEligible && secretOffCooldown && Math.random() < SECRET_CHANCE) {
      setSecret(randomFrom(secretCards));
      setLastSecretHand(nextHandNumber);
      setStage(STAGES.SECRET);
      return;
    }
    setStage(STAGES.CHOOSE_CARD);
  };

  const chooseGender = (nextGender) => {
    const team = teams.find((t) => t.id === winningTeamId);
    if (team && (team.safeCards?.length || 0) < 2 && Math.random() < SAFE_CHANCE) {
      const card = randomFrom(safeCards);
      patchTeam(team.id, (current) => ({ ...current, safeCards: [...(current.safeCards || []), card] }));
      setSafeFound(card);
      setStage(STAGES.SAFE_FOUND);
      return;
    }

    const source = nextGender === 'woman' ? womanChallenges : manChallenges;
    const { challenge: nextChallenge, remaining } = drawFromDeck(decksRef.current[nextGender], source, previousTitlesRef.current[nextGender]);
    decksRef.current[nextGender] = remaining;
    previousTitlesRef.current[nextGender] = nextChallenge?.title || '';
    setGender(nextGender);
    setChallenge(nextChallenge);
    setStage(STAGES.REVEAL);
  };

  const acceptPersistent = () => {
    if (!challenge || !winningTeam) return;
    const playerName = challenge.owner === 'team' ? `${winningTeam.his} + ${winningTeam.her}` : gender === 'woman' ? winningTeam.her : winningTeam.his;
    const activeCard = {
      id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
      title: challenge.title,
      text: challenge.text,
      playerName,
      gender,
      turnsRemaining: challenge.duration,
      endCondition: challenge.endCondition || null,
      activatedHand: handNumber
    };
    patchTeam(winningTeam.id, (team) => ({ ...team, activeChallenges: [...(team.activeChallenges || []), activeCard] }));
    setStage(STAGES.NEXT_HAND);
  };

  const requestShot = () => {
    if (winningTeam?.safeCards?.length) setStage(STAGES.SAFE_DECISION);
    else {
      setConsequence(randomFrom(consequenceCards));
      setStage(STAGES.CONSEQUENCE);
    }
  };

  const useSafe = (index) => {
    patchTeam(winningTeam.id, (team) => ({ ...team, safeCards: team.safeCards.filter((_, i) => i !== index) }));
    setStage(STAGES.NEXT_HAND);
  };

  const takeShotAnyway = () => {
    setConsequence(randomFrom(consequenceCards));
    setStage(STAGES.CONSEQUENCE);
  };

  const advanceTurnCounters = () => {
    setTeams((current) => current.map((team) => ({
      ...team,
      activeChallenges: (team.activeChallenges || []).flatMap((card) => {
        if (card.turnsRemaining == null) return [card];
        // Do not count the same transition that first activated the card as one of its turns.
        if (card.activatedHand === handNumber) return [{ ...card, activatedHand: null }];
        const remaining = card.turnsRemaining - 1;
        return remaining <= 0 ? [] : [{ ...card, turnsRemaining: remaining }];
      })
    })));
  };

  const goNextHand = () => {
    advanceTurnCounters();
    setWinningTeamId(null); setGender(null); setChallenge(null); setSecret(null); setSafeFound(null); setConsequence(null);
    setStage(STAGES.WHO_WON);
  };

  const content = useMemo(() => {
    if (stage === STAGES.ADD_TEAM) return <AddTeamScreen onCancel={() => setStage(STAGES.SETUP)} onCreate={createTeam} />;
    if (stage === STAGES.WHO_WON) return <WinnerScreen teams={teams} onWinner={selectWinner} />;
    if (stage === STAGES.CHOOSE_CARD) return <ChooseCardScreen winningTeam={winningTeam} onChoose={chooseGender} />;
    if (stage === STAGES.REVEAL) return <RevealScreen gender={gender} challenge={challenge} onComplete={() => setStage(STAGES.NEXT_HAND)} onAccept={acceptPersistent} onShot={requestShot} />;
    if (stage === STAGES.SECRET) return <SecretScreen secret={secret} onComplete={() => setStage(STAGES.NEXT_HAND)} onShot={requestShot} />;
    if (stage === STAGES.SAFE_FOUND) return <SafeFoundScreen card={safeFound} teamName={winningTeam?.name} count={winningTeam?.safeCards?.length || 0} onContinue={() => setStage(STAGES.NEXT_HAND)} />;
    if (stage === STAGES.SAFE_DECISION) return <SafeDecisionScreen team={winningTeam} onUseSafe={useSafe} onTakeShot={takeShotAnyway} />;
    if (stage === STAGES.CONSEQUENCE) return <ConsequenceScreen card={consequence} onContinue={() => setStage(STAGES.NEXT_HAND)} />;
    if (stage === STAGES.NEXT_HAND) return <NextHandScreen onNext={goNextHand} />;
    return <SetupScreen teams={teams} onAddTeam={() => canAddTeam && setStage(STAGES.ADD_TEAM)} onRemoveTeam={removeTeam} onBegin={() => teams.length >= 2 && setStage(STAGES.WHO_WON)} />;
  }, [stage, teams, winningTeam, gender, challenge, secret, safeFound, consequence, canAddTeam, handNumber]);

  return <main className="app">{content}</main>;
}
