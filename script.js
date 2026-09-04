(()=>{
const A='';
const ASSET_MAP=window.__ASSETS__||{};
const assetUrl=p=>ASSET_MAP[p]||p;
const ICONS=[1,2,3,4,5].map(n=>`random team icon ${n}.png`);
const CONSEQUENCES=['Bottoms Up.png','Drink up bitch.png','Take a shot!.png',"Sip till it's gone.png",'free shots for all.png','drink it raw.png','gulp gulp.png','stfu and drink.png','toss it back.png','Pass the glass.png','give the loser some juice.png','wtf just drink.png','take it to the head.png'];
const SAFE=['SWAT.png','NOT TODAY.png','Kiss my ass.png',' know you lyin.png','fuck no.png','Maybe next time.png','sike.png','Take it back.png'];
const SECRET=[
 {deck:'woman',image:'IAS 1.png'},
 {deck:'woman',image:'IAS 2.png'},
 {deck:'shared',image:'IAS 3.png'},
 {deck:'woman',image:'IAS 4.png'},
 {deck:'man',image:'IAS 5.png'},
 {deck:'woman',image:'IAS 6.png'},
 {deck:'woman',image:'IAS 7.png'},
 {deck:'shared',image:'IAS 8.png'},
 {deck:'shared',image:'IAS 9.png'},
 {deck:'shared',image:'IAS 10.png'}
];
const PROD={
 man:[...Array(9)].map((_,i)=>({image:`cards/man/MC ${i+1}.png`,type:'man'})),
 woman:[...Array(17)].map((_,i)=>({image:`cards/girl/GC ${i+1}.png`,type:'woman'})),
 shared:[...Array(19)].map((_,i)=>({image:`cards/unisex/UC ${i+1}.png`,type:'shared'}))
};
const TURN_META={
 'cards/man/MC 3.png':{turns:2,label:'STUD-D-DER'},
 'cards/man/MC 4.png':{turns:3,label:'YOU ARE NUTZ'},
 'cards/man/MC 6.png':{turns:2,label:'E-40 MODE'},
 'cards/girl/GC 7.png':{turns:3,label:'WIDE LOAD'},
 'cards/girl/GC 8.png':{turns:3,label:'BOOBIE TALK'},
 'cards/girl/GC 12.png':{turns:3,label:'HANDCUFFED'},
 'cards/girl/GC 17.png':{turns:3,label:'F#%K ME'},
 'cards/unisex/UC 6.png':{kind:'untilShot',label:'WALKIE TALKIE'},
 'cards/unisex/UC 7.png':{turns:2,label:'GET DA CHOPPA'},
 'cards/unisex/UC 9.png':{kind:'untilWin',label:'BAD BABY',global:true},
 'cards/unisex/UC 10.png':{turns:3,label:'TIPPY TOES'},
 'cards/unisex/UC 15.png':{kind:'untilWin',label:"YOU DON'T SAY"},
 'cards/unisex/UC 17.png':{turns:4,label:'TALK BACK'}
};
const CARDS={man:[],woman:[]};
const SHARED=[];
let S={teams:[],phase:'intro',winner:null,deck:null,card:null,effects:[],consequence:null,safeShown:null,secret:null,secretRevealed:false,last:{},queues:{man:[],woman:[]},secretQueue:[],handCount:0,lastSecretHand:-99,lastSecret:null};
const $=s=>document.querySelector(s); const game=$('#game');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rand=a=>a[Math.floor(Math.random()*a.length)];
function img(path,cls=''){return `<img class="${cls}" src="${assetUrl(path)}" alt="">`}
function usedIcons(){return S.teams.map(t=>t.icon)}
function pickIcon(){const left=ICONS.filter(x=>!usedIcons().includes(x));return rand(left.length?left:ICONS)}
function save(){try{localStorage.setItem('uatw-v2',JSON.stringify(S))}catch(e){}}
function load(){try{const x=JSON.parse(localStorage.getItem('uatw-v2'));if(x?.teams)S={...S,...x,queues:{man:[],woman:[],...(x.queues||{})},secretQueue:x.secretQueue||[],handCount:x.handCount||0,lastSecretHand:Number.isFinite(x.lastSecretHand)?x.lastSecretHand:-99}}catch(e){}}
function setPhase(p){S.phase=p;save();render()}
function activeStatus(){if(!S.effects.length&&!S.teams.some(t=>t.safe?.length))return'';const e=S.effects.slice(0,2).map(x=>`<div class="pill">${esc(x.player||x.teamName)}: ${esc(x.label)}${x.turns?` · ${x.turns}`:''}</div>`).join('');const safe=S.teams.filter(t=>t.safe?.length).slice(0,1).map(t=>`<div class="pill saved-mark">${esc(t.name)} · ${t.safe.length} SAFE</div>`).join('');return `<div class="status-tray">${e}${safe}</div>`}
function intro(){return `<section class="screen">${img('team name add background.png','bg')}${img('Us Against The World logo.png','logo')}<div class="intro-stack"><div class="team-list">${S.teams.map((t,i)=>`<article class="team-row"><img class="icon" src="${assetUrl(t.icon)}"><div class="copy"><div class="tname">${esc(t.name)}</div><div class="people"><span class="his">${esc(t.his)}</span><span class="her">${esc(t.her)}</span></div></div><button class="remove" data-remove="${i}">×</button></article>`).join('')}</div><div class="intro-actions"><button class="artbtn add-btn" data-act="add">${img('ui/add-team.png')}</button><button class="artbtn begin-btn" data-act="begin" ${S.teams.length<2?'disabled':''}>${img('ui/begin.png')}</button><div class="helper">${S.teams.length<2?'Add at least 2 teams to begin.':`${S.teams.length} teams ready.`}</div></div></div></section>`}
function addTeam(){return `<section class="screen">${img('team name add background.png','bg')}<form class="form-wrap" id="teamform"><div><label>TEAM NAME</label><input class="field" name="team" maxlength="24" autocomplete="off" required></div><div class="fields2"><div><label>HIS NAME</label><input class="field" name="his" maxlength="18" autocomplete="off" required></div><div><label>HER NAME</label><input class="field" name="her" maxlength="18" autocomplete="off" required></div></div><p class="form-error" id="ferr"></p><button class="artbtn create-btn" type="submit">${img('ui/create-team.png')}</button><button class="artbtn cancel-btn" type="button" data-act="cancel">${img('ui/cancel.png')}</button></form></section>`}
function winner(){return `<section class="screen">${img('Team Won background.png','bg')}<div class="winner-list">${S.teams.map((t,i)=>`<button class="winner-btn" data-win="${i}">${img('ui/team-won-banner.png','banner')}<img class="icon" src="${assetUrl(t.icon)}"><span class="wcopy">${esc(t.name)} WON</span></button>`).join('')}</div>${activeStatus()}</section>`}
function choose(){const t=S.teams[S.winner];return `<section class="screen"><div class="choose-bg" style="background-image:url('${assetUrl('man card selection background.png')}')"></div><div class="choose-top"><div class="eyebrow">${esc(t.name)} WON</div><h2>CHOOSE YOUR CARD</h2></div><div class="choice-row"><button class="choice" data-deck="man"><span>MAN</span>${img('Man card back.png')}</button><button class="choice" data-deck="woman"><span>WOMAN</span>${img('Girl card back copy.png')}</button></div>${activeStatus()}</section>`}
function reveal(){const c=S.card,meta=TURN_META[c.image];const timed=meta&&(meta.turns||meta.kind);return `<section class="screen production-card-screen"><div class="production-card-wrap"><img class="production-card" src="${assetUrl(c.image)}" alt="Game challenge card"></div><div class="production-actions">${timed?`<button class="game-btn" data-act="acceptProd">ACCEPT</button><button class="game-btn rose" data-act="shot">TAKE A SHOT</button>`:`<button class="card-hitbox" aria-label="Complete challenge" data-act="completeProd"></button>`}</div>${activeStatus()}</section>`}
function secretBack(){return `<section class="screen fullcard-screen secret-stage"><button class="fullcard-btn secret-back-btn" data-act="secretReveal"><img src="${assetUrl('secret/secret-back.png')}" alt="It's a Secret"></button><div class="helper secret-helper">Shhh… this one is only for you and your partner.</div></section>`}
function secretFront(){return `<section class="screen fullcard-screen secret-stage"><div class="secret-front-wrap"><button class="fullcard-btn secret-front-btn" data-act="secretDone"><img src="${assetUrl('secret/'+S.secret.image)}" alt="It's a Secret challenge"></button><button class="game-btn rose secret-shot" data-act="shot">TAKE A SHOT</button></div></section>`}
function safeCard(){return `<section class="screen fullcard-screen"><button class="fullcard-btn" data-act="safeSaved"><img src="${assetUrl('safe/'+S.safeShown)}" alt="Safe from taking a shot"></button><div class="helper" style="position:absolute;bottom:3%;left:10%;right:10%">Saved to ${esc(S.teams[S.winner].name)} · tap card to continue</div></section>`}
function shotChoice(){const t=S.teams[S.winner];const safes=t.safe||[];if(!safes.length)return consequence();return `<section class="screen"><div class="secret-copy" style="border-color:#d7ac47"><h2>SHOT DUE</h2><p>${esc(t.name)} has ${safes.length} Safe card${safes.length===1?'':'s'}. Use one now or save it for later?</p></div><div class="secret-actions"><button class="game-btn" data-act="useSafe">USE SAFE</button><button class="game-btn rose" data-act="takeShotNow">TAKE THE SHOT</button></div></section>`}
function consequence(){return `<section class="screen fullcard-screen"><button class="fullcard-btn" data-act="afterConsequence"><img src="${assetUrl('consequences/'+S.consequence)}" alt="Take a shot"></button><div class="helper" style="position:absolute;bottom:3%;left:10%;right:10%">Tap to continue</div></section>`}
function safeUsed(){return `<section class="screen fullcard-screen"><button class="fullcard-btn" data-act="afterSafe"><img src="${assetUrl('safe/'+S.safeShown)}" alt="Safe card used"></button></section>`}
function next(){return `<section class="screen next-screen"><button class="next-card" data-act="next">${img('Next hand.png')}</button>${activeStatus()}</section>`}
function render(){let h='';if(S.phase==='intro')h=intro();else if(S.phase==='add')h=addTeam();else if(S.phase==='winner')h=winner();else if(S.phase==='choose')h=choose();else if(S.phase==='reveal')h=reveal();else if(S.phase==='secretBack')h=secretBack();else if(S.phase==='secretFront')h=secretFront();else if(S.phase==='safeCard')h=safeCard();else if(S.phase==='shotChoice')h=shotChoice();else if(S.phase==='consequence')h=consequence();else if(S.phase==='safeUsed')h=safeUsed();else if(S.phase==='next')h=next();game.innerHTML=h;bind()}
function bind(){game.querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>act(b.dataset.act,b));game.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{S.teams.splice(+b.dataset.remove,1);save();render()});game.querySelectorAll('[data-win]').forEach(b=>b.onclick=()=>declare(+b.dataset.win));game.querySelectorAll('[data-deck]').forEach(b=>b.onclick=()=>draw(b.dataset.deck));const f=$('#teamform');if(f)f.onsubmit=e=>{e.preventDefault();const d=new FormData(f),name=String(d.get('team')).trim(),his=String(d.get('his')).trim(),her=String(d.get('her')).trim();if(!name||!his||!her){$('#ferr').textContent='Team name, his name, and her name are required.';return}if(S.teams.some(t=>t.name.toLowerCase()===name.toLowerCase())){$('#ferr').textContent='That team name is already being used.';return}S.teams.push({name,his,her,icon:pickIcon(),wins:0,safe:[]});setPhase('intro')}}
function act(a){if(a==='acceptProd'){const t=S.teams[S.winner],m=TURN_META[S.card.image]||{},player=S.deck==='man'?t.his:S.deck==='woman'?t.her:t.name;S.effects.push({team:S.winner,teamName:t.name,player,label:m.label||'ACTIVE CHALLENGE',turns:m.turns,kind:m.kind||'timed',global:!!m.global});setPhase('next');return}if(a==='completeProd'){setPhase('next');return}if(a==='add')setPhase('add');if(a==='cancel')setPhase('intro');if(a==='begin'&&S.teams.length>=2)setPhase('winner');if(a==='shot')triggerShot();if(a==='secretReveal'){S.secretRevealed=true;setPhase('secretFront')}if(a==='secretDone')setPhase('next');if(a==='safeSaved')setPhase('next');if(a==='useSafe'){const t=S.teams[S.winner];S.safeShown=t.safe.shift();save();setPhase('safeUsed')}if(a==='takeShotNow'){S.consequence=rand(CONSEQUENCES);setPhase('consequence')}if(a==='afterConsequence'||a==='afterSafe')setPhase('next');if(a==='next'){tickEffects();S.winner=null;S.card=null;S.deck=null;S.secret=null;S.safeShown=null;setPhase('winner')}}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function nextProd(deck){const pool=[...PROD[deck],...PROD.shared];S.queues=S.queues||{man:[],woman:[]};let q=S.queues[deck]||[];if(!q.length){q=shuffle(pool.map(c=>c.image));const last=S.last?.[deck];if(last&&q.length>1&&q[0]===last){const k=q.findIndex(x=>x!==last);if(k>0)[q[0],q[k]]=[q[k],q[0]]}}const image=q.shift();S.queues[deck]=q;return pool.find(c=>c.image===image)||pool[0]}
function nextSecret(){S.secretQueue=S.secretQueue||[];if(!S.secretQueue.length){S.secretQueue=shuffle(SECRET.map((_,i)=>i));if(S.lastSecret&&S.secretQueue.length>1&&SECRET[S.secretQueue[0]].image===S.lastSecret){const k=S.secretQueue.findIndex(i=>SECRET[i].image!==S.lastSecret);if(k>0)[S.secretQueue[0],S.secretQueue[k]]=[S.secretQueue[k],S.secretQueue[0]]}}const s=SECRET[S.secretQueue.shift()];S.lastSecret=s.image;return s}
function declare(i){const t=S.teams[i],already=t.wins>0;S.winner=i;t.wins++;S.handCount=(S.handCount||0)+1;S.effects=S.effects.filter(e=>!(e.kind==='untilWin'&&e.team===i));save();const eligible=already&&(S.handCount-(S.lastSecretHand??-99)>=4);if(eligible&&Math.random()<.15){S.secret=nextSecret();S.lastSecretHand=S.handCount;S.deck=S.secret.deck==='shared'?(Math.random()<.5?'man':'woman'):S.secret.deck;save();setPhase('secretBack')}else setPhase('choose')}
function draw(deck){S.deck=deck;const t=S.teams[S.winner];if((t.safe?.length||0)<2&&Math.random()<.12){S.safeShown=rand(SAFE);t.safe=t.safe||[];t.safe.push(S.safeShown);save();setPhase('safeCard');return}S.card=nextProd(deck);S.last=S.last||{};S.last[deck]=S.card.image;save();setPhase('reveal')}
function triggerShot(){const t=S.teams[S.winner];S.effects=S.effects.filter(e=>e.kind!=='untilShot');if(t?.safe?.length){setPhase('shotChoice')}else{S.consequence=rand(CONSEQUENCES);setPhase('consequence')}}
function tickEffects(){S.effects=S.effects.map(e=>e.kind==='timed'?{...e,turns:e.turns-1}:e).filter(e=>e.kind!=='timed'||e.turns>0);save()}
load();render();
})();