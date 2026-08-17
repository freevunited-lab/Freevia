// ===== Elements =====
const searchInput = document.querySelector('#searchInput');
const clearSearch = document.querySelector('#clearSearch');
const backToTop = document.querySelector('#backToTop');
const filters = [...document.querySelectorAll('.filter')];
const gameGrid = document.querySelector('#gameGrid');
const emptyState = document.querySelector('#emptyState');
const resultCount = document.querySelector('#resultCount');
const libraryCount = document.querySelector('#libraryCount');
const libraryButton = document.querySelector('#libraryButton');
const libraryPanel = document.querySelector('#libraryPanel');
const libraryClose = document.querySelector('#libraryClose');
const libraryList = document.querySelector('#libraryList');
const libraryEmpty = document.querySelector('#libraryEmpty');
const scrim = document.querySelector('#scrim');
const navToggle = document.querySelector('#navToggle');
const primaryNav = document.querySelector('#primaryNav');
const navLinks = [...primaryNav.querySelectorAll('a')];
const navSections = ['nouveautes', 'jeux', 'apropos'].map((id) => document.querySelector(`#${id}`));
const toast = document.querySelector('#toast');
const toastText = document.querySelector('#toastText');
const topbar = document.querySelector('#topbar');
const appLandmarks = [...document.querySelectorAll('header, main, footer')];
const gameDialog = document.querySelector('#gameDialog');
const gameDialogClose = document.querySelector('#gameDialogClose');
const detailKicker = document.querySelector('#detailKicker');
const detailTitle = document.querySelector('#detailTitle');
const detailMeta = document.querySelector('#detailMeta');
const detailStory = document.querySelector('#detailStory');
const detailCover = document.querySelector('#detailCover');
const detailArtLabel = document.querySelector('#detailArtLabel');
const detailArtCaption = document.querySelector('#detailArtCaption');
const detailArtContainer = document.querySelector('.detail-art');
const detailZoom = document.querySelector('#detailZoom');
const imageLightbox = document.querySelector('#imageLightbox');
const imageLightboxClose = document.querySelector('#imageLightboxClose');
const lightboxImage = document.querySelector('#lightboxImage');
const lightboxCaption = document.querySelector('#lightboxCaption');
const detailGalleryCover = document.querySelector('#detailGalleryCover');
const detailAddButton = document.querySelector('#detailAddButton');
const tutorialVideo = document.querySelector('#tutorialVideo');
const tutorialVideoSlot = document.querySelector('#tutorialVideoSlot');
const detailShotOne = document.querySelector('#detailShotOne');
const detailShotTwo = document.querySelector('#detailShotTwo');
const detailShotThree = document.querySelector('#detailShotThree');
const detailShotFour = document.querySelector('#detailShotFour');
const officialDownload = document.querySelector('#officialDownload');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(pointer: coarse)').matches;

let selectedFilter = 'all';

// Centralized game data makes future replacements quick: edit a title here and
// its card, search result and collection entry all update together.
const games = [
  { title: '007 First Light', line: '007<br>FIRST LIGHT', meta: 'ACTION · AVENTURE', category: 'action aventure', tag: 'ESPIONNAGE', mark: '007', desc: 'Une mission d’espionnage au style cinématographique.', start: '#d8c089', end: '#372819', ink: '#15130e', image: 'images/007-first-light/cover.jpg', story: "Dans cette histoire d’origine, James Bond est encore une jeune recrue du MI6. Il doit apprendre à faire confiance à son instinct et à mériter le numéro 007.", download: 'downloads/007-first-light/contenu-autorise.torrent', gallery: ['images/007-first-light/gallery-01.jpg', 'images/007-first-light/gallery-02.jpg', 'images/007-first-light/gallery-03.jpg', 'images/007-first-light/gallery-04.jpg'], thumbnails: ['images/007-first-light/thumb-01.webp', 'images/007-first-light/thumb-02.webp', 'images/007-first-light/thumb-03.webp', 'images/007-first-light/thumb-04.webp'] },
  { title: 'Call of Duty: Black Ops 6', line: 'BLACK OPS<br>6', meta: 'ACTION · FPS', category: 'action', tag: 'OPÉRATIONS', mark: 'VI', desc: 'L’intensité Black Ops, entre missions et affrontements.', start: '#ff6a38', end: '#301317', ink: '#170b09', image: 'images/black-ops-6/cover.jpg', story: "Au début des années 1990, une force clandestine s’est infiltrée au plus haut niveau. Une escouade rebelle tente de révéler la vérité au fil d’opérations sous haute tension.", download: 'downloads/black-ops-6/contenu-autorise.torrent', gallery: ['images/black-ops-6/gallery-01.jpg', 'images/black-ops-6/gallery-02.jpg', 'images/black-ops-6/gallery-03.jpg', 'images/black-ops-6/gallery-04.jpg'], thumbnails: ['images/black-ops-6/thumb-01.webp', 'images/black-ops-6/thumb-02.webp', 'images/black-ops-6/thumb-03.webp', 'images/black-ops-6/thumb-04.webp'] },
  { title: 'Cyberpunk 2077', line: 'CYBERPUNK<br>2077', meta: 'RPG · ACTION', category: 'rpg action', tag: 'NIGHT CITY', mark: '77', desc: 'Un RPG d’action futuriste dans les néons de Night City.', start: '#f6de25', end: '#fa4a94', ink: '#18100c', image: 'images/cyberpunk-2077/cover.jpg', story: "À Night City, V, mercenaire en quête de gloire, se retrouve lié à un implant expérimental qui contient la personnalité de Johnny Silverhand. Le destin de la ville est entre ses mains.", download: 'downloads/cyberpunk-2077/contenu-autorise.torrent', gallery: ['images/cyberpunk-2077/gallery-01.jpg', 'images/cyberpunk-2077/gallery-02.jpg', 'images/cyberpunk-2077/gallery-03.jpg', 'images/cyberpunk-2077/gallery-04.jpg'], thumbnails: ['images/cyberpunk-2077/thumb-01.webp', 'images/cyberpunk-2077/thumb-02.webp', 'images/cyberpunk-2077/thumb-03.webp', 'images/cyberpunk-2077/thumb-04.webp'] },
  { title: 'Elden Ring', line: 'ELDEN<br>RING', meta: 'RPG · AVENTURE', category: 'rpg aventure', tag: 'ENTRE-TERRE', mark: 'ER', desc: 'Une quête sombre et grandiose au cœur de l’Entre-terre.', start: '#948957', end: '#1d2620', ink: '#f4edcf', image: 'images/elden-ring/cover.jpg', story: "Un Sans-éclat traverse l’Entre-terre, un royaume en ruines dirigé par des demi-dieux. Son objectif : restaurer le Cercle d’Elden et devenir Seigneur d’Elden.", download: 'downloads/elden-ring/contenu-autorise.torrent', gallery: ['images/elden-ring/gallery-01.jpg', 'images/elden-ring/gallery-02.jpg', 'images/elden-ring/gallery-03.jpg', 'images/elden-ring/gallery-04.jpg'], thumbnails: ['images/elden-ring/thumb-01.webp', 'images/elden-ring/thumb-02.webp', 'images/elden-ring/thumb-03.webp', 'images/elden-ring/thumb-04.webp'] },
  { title: 'Grand Theft Auto V', line: 'GRAND THEFT<br>AUTO V', meta: 'ACTION · AVENTURE', category: 'action aventure', tag: 'LOS SANTOS', mark: 'V', desc: 'Los Santos, ses routes et ses histoires à parcourir.', start: '#b6e0c4', end: '#3d7786', ink: '#102424', image: 'images/gta-v/cover.jpg', story: "Michael, Franklin et Trevor voient leurs destins se croiser à Los Santos. Braquages, rivalités et coups impossibles les entraînent dans une fuite en avant.", download: 'downloads/gta-v/contenu-autorise.torrent', gallery: ['images/gta-v/gallery-01.jpg', 'images/gta-v/gallery-02.jpg', 'images/gta-v/gallery-03.jpg', 'images/gta-v/gallery-04.jpg'], thumbnails: ['images/gta-v/thumb-01.webp', 'images/gta-v/thumb-02.webp', 'images/gta-v/thumb-03.webp', 'images/gta-v/thumb-04.webp'] },
  { title: 'LEGO Batman: Legacy of the Dark Knight', line: 'LEGO BATMAN<br>LEGACY', meta: 'ACTION · AVENTURE', category: 'action aventure', tag: 'GOTHAM', mark: '✦', desc: 'L’univers LEGO et le Chevalier Noir réunis à Gotham.', start: '#ffc92c', end: '#332462', ink: '#171224', image: 'images/lego-batman/cover.jpg', story: "Bruce Wayne devient peu à peu le héros de Gotham. Avec ses alliés, Batman affronte les grands criminels de la ville dans une aventure LEGO pleine d’action et d’humour.", download: 'downloads/lego-batman/contenu-autorise.torrent', gallery: ['images/lego-batman/gallery-01.jpg', 'images/lego-batman/gallery-02.jpg', 'images/lego-batman/gallery-03.jpg', 'images/lego-batman/gallery-04.jpg'], thumbnails: ['images/lego-batman/thumb-01.webp', 'images/lego-batman/thumb-02.webp', 'images/lego-batman/thumb-03.webp', 'images/lego-batman/thumb-04.webp'], compact: true },
  { title: 'Marvel’s Spider-Man: Miles Morales', line: 'MILES<br>MORALES', meta: 'ACTION · AVENTURE', category: 'action aventure', tag: 'MARVEL', mark: 'MM', desc: 'New York en hauteur avec un nouveau Spider-Man.', start: '#e72c43', end: '#160e2b', ink: '#fff4f1', image: 'images/miles-morales/cover.jpg', story: "Miles Morales apprend à trouver sa place comme nouveau Spider-Man. Alors qu’une guerre énergétique menace Harlem, il doit protéger sa ville et définir son propre style de héros.", download: 'downloads/miles-morales/contenu-autorise.torrent', gallery: ['images/miles-morales/gallery-01.jpg', 'images/miles-morales/gallery-02.jpg', 'images/miles-morales/gallery-03.jpg', 'images/miles-morales/gallery-04.jpg'], thumbnails: ['images/miles-morales/thumb-01.webp', 'images/miles-morales/thumb-02.webp', 'images/miles-morales/thumb-03.webp', 'images/miles-morales/thumb-04.webp'] },
  { title: 'Red Dead Redemption', line: 'RED DEAD<br>REDEMPTION', meta: 'ACTION · AVENTURE', category: 'action aventure', tag: 'WESTERN', mark: 'RDR', desc: 'Une épopée dans l’Ouest sauvage au début du siècle.', start: '#e1b78e', end: '#973330', ink: '#20110d', image: 'images/red-dead-redemption/cover.jpg', story: "L’ancien hors-la-loi John Marston est forcé de traquer les membres de son ancien gang. Son voyage à travers l’Ouest devient une quête de rédemption et de survie.", download: 'downloads/red-dead-redemption/contenu-autorise.torrent', gallery: ['images/red-dead-redemption/gallery-01.jpg', 'images/red-dead-redemption/gallery-02.jpg', 'images/red-dead-redemption/gallery-03.jpg', 'images/red-dead-redemption/gallery-04.jpg'], thumbnails: ['images/red-dead-redemption/thumb-01.webp', 'images/red-dead-redemption/thumb-02.webp', 'images/red-dead-redemption/thumb-03.webp', 'images/red-dead-redemption/thumb-04.webp'], compact: true },
  { title: 'Batman Arkham Collection', line: 'BATMAN<br>ARKHAM', meta: 'ACTION · AVENTURE', category: 'action aventure', tag: 'COLLECTION', mark: '◒', desc: 'Asylum, City, Origins et Knight dans l’univers Arkham.', start: '#91a9bf', end: '#162434', ink: '#edf6ff', image: 'images/batman-arkham/cover.jpg', story: "De l’asile d’Arkham aux rues de Gotham, cette collection rassemble les grandes enquêtes du Chevalier Noir. Batman doit arrêter ses ennemis les plus dangereux.", download: 'downloads/batman-arkham/contenu-autorise.torrent', gallery: ['images/batman-arkham/gallery-01.jpg', 'images/batman-arkham/gallery-02.jpg', 'images/batman-arkham/gallery-03.jpg', 'images/batman-arkham/gallery-04.jpg'], thumbnails: ['images/batman-arkham/thumb-01.webp', 'images/batman-arkham/thumb-02.webp', 'images/batman-arkham/thumb-03.webp', 'images/batman-arkham/thumb-04.webp'] },
  { title: 'Forza Horizon 6', line: 'FORZA<br>HORIZON 6', meta: 'COURSE · MONDE OUVERT', category: 'course', tag: 'HORIZON', mark: 'FH', desc: 'La vitesse, les grands paysages et la route ouverte.', start: '#f252af', end: '#4b3a9d', ink: '#fff8ff', image: 'images/forza-horizon-6/cover.jpg', story: "Le festival Horizon prend la route du Japon. Entre routes de montagne, rues urbaines et voitures d’exception, chaque course est une invitation à explorer et à rouler librement.", download: 'downloads/forza-horizon-6/contenu-autorise.torrent', gallery: ['images/forza-horizon-6/gallery-01.jpg', 'images/forza-horizon-6/gallery-02.jpg', 'images/forza-horizon-6/gallery-03.jpg', 'images/forza-horizon-6/gallery-04.jpg'], thumbnails: ['images/forza-horizon-6/thumb-01.webp', 'images/forza-horizon-6/thumb-02.webp', 'images/forza-horizon-6/thumb-03.webp', 'images/forza-horizon-6/thumb-04.webp'] },
  { title: 'God of War Ragnarök', line: 'GOD OF WAR<br>RAGNARÖK', meta: 'ACTION · AVENTURE', category: 'action aventure', tag: 'NORDIQUE', mark: 'Ω', desc: 'Une aventure mythologique, entre combats et légendes.', start: '#bde6ee', end: '#436993', ink: '#112439', image: 'images/god-of-war-ragnarok/cover.jpg', story: "Kratos et Atreus traversent les Neuf Royaumes alors que le Ragnarök approche. Père et fils doivent choisir leur voie face aux dieux nordiques et à leur propre destin.", download: 'downloads/god-of-war-ragnarok/contenu-autorise.torrent', gallery: ['images/god-of-war-ragnarok/gallery-01.jpg', 'images/god-of-war-ragnarok/gallery-02.jpg', 'images/god-of-war-ragnarok/gallery-03.jpg', 'images/god-of-war-ragnarok/gallery-04.jpg'], thumbnails: ['images/god-of-war-ragnarok/thumb-01.webp', 'images/god-of-war-ragnarok/thumb-02.webp', 'images/god-of-war-ragnarok/thumb-03.webp', 'images/god-of-war-ragnarok/thumb-04.webp'], compact: true },
  { title: 'Marvel’s Spider-Man Remastered', line: 'SPIDER-MAN<br>REMASTERED', meta: 'ACTION · AVENTURE', category: 'action aventure', tag: 'MARVEL', mark: 'SM', desc: 'L’aventure Spider-Man dans une version remasterisée.', start: '#e93440', end: '#1d56a6', ink: '#fff6f3', image: 'images/spider-man-remastered/cover.jpg', story: "Peter Parker tente d’équilibrer sa vie personnelle et sa mission de Spider-Man. Quand de nouveaux ennemis menacent New York, il doit sauver la ville sans perdre ce qui compte pour lui.", download: 'downloads/spider-man-remastered/contenu-autorise.torrent', gallery: ['images/spider-man-remastered/gallery-01.jpg', 'images/spider-man-remastered/gallery-02.jpg', 'images/spider-man-remastered/gallery-03.jpg', 'images/spider-man-remastered/gallery-04.jpg'], thumbnails: ['images/spider-man-remastered/thumb-01.webp', 'images/spider-man-remastered/thumb-02.webp', 'images/spider-man-remastered/thumb-03.webp', 'images/spider-man-remastered/thumb-04.webp'], compact: true },
  { title: 'Marvel’s Spider-Man 2', line: 'SPIDER-MAN<br>2', meta: 'ACTION · AVENTURE', category: 'action aventure', tag: 'MARVEL', mark: '2', desc: 'Deux héros, une ville et de nouveaux défis à relever.', start: '#db2a39', end: '#232042', ink: '#fff7f5', image: 'images/spider-man-2/cover.jpg', story: "Peter Parker et Miles Morales font équipe pour protéger New York. Leur plus grand défi arrive avec Kraven, puis Venom, qui pousse les deux héros dans leurs retranchements.", download: 'downloads/spider-man-2/contenu-autorise.torrent', gallery: ['images/spider-man-2/gallery-01.jpg', 'images/spider-man-2/gallery-02.jpg', 'images/spider-man-2/gallery-03.jpg', 'images/spider-man-2/gallery-04.jpg'], thumbnails: ['images/spider-man-2/thumb-01.webp', 'images/spider-man-2/thumb-02.webp', 'images/spider-man-2/thumb-03.webp', 'images/spider-man-2/thumb-04.webp'] },
  { title: 'Red Dead Redemption II', line: 'RED DEAD<br>REDEMPTION II', meta: 'ACTION · AVENTURE', category: 'action aventure', tag: 'WESTERN', mark: 'II', desc: 'Une grande fresque de l’Ouest américain à explorer.', start: '#d74535', end: '#211d26', ink: '#fff4e4', image: 'images/red-dead-redemption-2/cover.jpg', story: "En 1899, Arthur Morgan et le gang de Van der Linde sont contraints de fuir après un braquage raté. Entre loyauté, liberté et modernité, Arthur cherche sa propre rédemption.", download: 'downloads/red-dead-redemption-2/contenu-autorise.torrent', gallery: ['images/red-dead-redemption-2/gallery-01.jpg', 'images/red-dead-redemption-2/gallery-02.jpg', 'images/red-dead-redemption-2/gallery-03.jpg', 'images/red-dead-redemption-2/gallery-04.jpg'], thumbnails: ['images/red-dead-redemption-2/thumb-01.webp', 'images/red-dead-redemption-2/thumb-02.webp', 'images/red-dead-redemption-2/thumb-03.webp', 'images/red-dead-redemption-2/thumb-04.webp'], compact: true },
  { title: 'Alien: Isolation', line: 'ALIEN<br>ISOLATION', meta: 'HORROR · SURVIE', category: 'action aventure horror', tag: 'NOSTROMO', mark: 'AI', desc: 'Survis à une présence implacable dans l’espace.', start: '#253e40', end: '#111417', ink: '#e5f0ed', image: 'images/alien-isolation/cover.jpg', story: "Amanda Ripley se rend à la station Sevastopol pour retrouver les traces de sa mère. Elle y découvre une station en ruine et une créature qui ne cesse jamais de chasser.", gallery: ['images/alien-isolation/gallery-01.jpg', 'images/alien-isolation/gallery-02.jpg', 'images/alien-isolation/gallery-03.jpg', 'images/alien-isolation/gallery-04.jpg'], thumbnails: ['images/alien-isolation/thumb-01.webp', 'images/alien-isolation/thumb-02.webp', 'images/alien-isolation/thumb-03.webp', 'images/alien-isolation/thumb-04.webp'], download: '', compact: true },
  { title: 'Black Myth: Wukong', line: 'BLACK MYTH<br>WUKONG', meta: 'ACTION · RPG', category: 'action rpg', tag: 'DESTINÉ', mark: 'BM', desc: 'Une épopée mythologique inspirée de la Chine ancienne.', start: '#d9b56c', end: '#211914', ink: '#fff5d9', image: 'images/black-myth-wukong/cover.jpg', story: "Le Destiné traverse un monde inspiré du Voyage en Occident. Chaque territoire révèle des légendes, des adversaires redoutables et les fragments d’une vérité oubliée.", gallery: ['images/black-myth-wukong/gallery-01.jpg', 'images/black-myth-wukong/gallery-02.jpg', 'images/black-myth-wukong/gallery-03.jpg', 'images/black-myth-wukong/gallery-04.jpg'], thumbnails: ['images/black-myth-wukong/thumb-01.webp', 'images/black-myth-wukong/thumb-02.webp', 'images/black-myth-wukong/thumb-03.webp', 'images/black-myth-wukong/thumb-04.webp'], download: '' },
  { title: 'Clair Obscur: Expedition 33', line: 'EXPEDITION<br>33', meta: 'RPG · TOUR PAR TOUR', category: 'rpg aventure', tag: 'LUMIÈRE', mark: '33', desc: 'Une expédition face à une mystérieuse Peintresse.', start: '#b6a2d7', end: '#242137', ink: '#f8f0ff', image: 'images/clair-obscur-expedition-33/cover.jpg', story: "Chaque année, la Peintresse efface les personnes ayant atteint un âge précis. L’Expédition 33 part briser ce cycle et sauver ceux qui restent.", gallery: ['images/clair-obscur-expedition-33/gallery-01.jpg', 'images/clair-obscur-expedition-33/gallery-02.jpg', 'images/clair-obscur-expedition-33/gallery-03.jpg', 'images/clair-obscur-expedition-33/gallery-04.jpg'], thumbnails: ['images/clair-obscur-expedition-33/thumb-01.webp', 'images/clair-obscur-expedition-33/thumb-02.webp', 'images/clair-obscur-expedition-33/thumb-03.webp', 'images/clair-obscur-expedition-33/thumb-04.webp'], download: '', compact: true },
  { title: 'F1 22', line: 'F1<br>22', meta: 'COURSE · SIMULATION', category: 'course', tag: 'GRAND PRIX', mark: 'F1', desc: 'La saison de Formule 1 au rythme des circuits.', start: '#ed4a45', end: '#181d28', ink: '#fff5f4', image: 'images/f1-22/cover.jpg', story: "Prends le volant des monoplaces de la saison 2022, développe ton écurie et affronte les circuits emblématiques du calendrier mondial.", gallery: ['images/f1-22/gallery-01.jpg', 'images/f1-22/gallery-02.jpg', 'images/f1-22/gallery-03.jpg', 'images/f1-22/gallery-04.jpg'], thumbnails: ['images/f1-22/thumb-01.webp', 'images/f1-22/thumb-02.webp', 'images/f1-22/thumb-03.webp', 'images/f1-22/thumb-04.webp'], download: '' },
  { title: 'Resident Evil Requiem', line: 'RESIDENT EVIL<br>REQUIEM', meta: 'HORROR · SURVIE', category: 'action horror', tag: 'RACCOON', mark: 'RE', desc: 'Un nouveau cauchemar dans l’univers Resident Evil.', start: '#c6d6e2', end: '#202631', ink: '#eef8ff', image: 'images/resident-evil-requiem/cover.jpg', story: "Une nouvelle enquête ramène les survivants au cœur des secrets laissés par Raccoon City. Chaque indice rapproche d’une menace qui refuse de disparaître.", gallery: ['images/resident-evil-requiem/gallery-01.jpg', 'images/resident-evil-requiem/gallery-02.jpg', 'images/resident-evil-requiem/gallery-03.jpg', 'images/resident-evil-requiem/gallery-04.jpg'], thumbnails: ['images/resident-evil-requiem/thumb-01.webp', 'images/resident-evil-requiem/thumb-02.webp', 'images/resident-evil-requiem/thumb-03.webp', 'images/resident-evil-requiem/thumb-04.webp'], download: '', compact: true },
  { title: 'Star Wars Jedi: Survivor', line: 'JEDI<br>SURVIVOR', meta: 'ACTION · AVENTURE', category: 'action aventure', tag: 'GALAXIE', mark: 'JS', desc: 'Cal Kestis poursuit son combat contre l’Empire.', start: '#d16e38', end: '#122030', ink: '#fff5e9', image: 'images/star-wars-jedi-survivor/cover.jpg', story: "Cinq ans après Fallen Order, Cal Kestis cherche un refuge pour l’Ordre Jedi. Sa mission l’entraîne vers des mondes inconnus et de nouveaux dangers.", gallery: ['images/star-wars-jedi-survivor/gallery-01.jpg', 'images/star-wars-jedi-survivor/gallery-02.jpg', 'images/star-wars-jedi-survivor/gallery-03.jpg', 'images/star-wars-jedi-survivor/gallery-04.jpg'], thumbnails: ['images/star-wars-jedi-survivor/thumb-01.webp', 'images/star-wars-jedi-survivor/thumb-02.webp', 'images/star-wars-jedi-survivor/thumb-03.webp', 'images/star-wars-jedi-survivor/thumb-04.webp'], download: '' },
  { title: 'Final Fantasy XV Windows Edition', line: 'FINAL FANTASY<br>XV', meta: 'RPG · AVENTURE', category: 'rpg aventure', tag: 'EOS', mark: 'XV', desc: 'Un road trip fantastique entre amis et royaumes.', start: '#5f83aa', end: '#162239', ink: '#edf6ff', image: 'images/final-fantasy-xv/cover.jpg', story: "Le prince Noctis entreprend un voyage avec ses compagnons pour reprendre son royaume et accomplir un destin qui dépasse sa propre histoire.", gallery: ['images/final-fantasy-xv/gallery-01.jpg', 'images/final-fantasy-xv/gallery-02.jpg', 'images/final-fantasy-xv/gallery-03.jpg', 'images/final-fantasy-xv/gallery-04.jpg'], thumbnails: ['images/final-fantasy-xv/thumb-01.webp', 'images/final-fantasy-xv/thumb-02.webp', 'images/final-fantasy-xv/thumb-03.webp', 'images/final-fantasy-xv/thumb-04.webp'], download: '', compact: true },
  { title: 'LEGO Horizon Adventures', line: 'LEGO HORIZON<br>ADVENTURES', meta: 'ACTION · AVENTURE', category: 'action aventure', tag: 'BRIQUES', mark: 'LH', desc: 'Aloy et les machines dans un monde LEGO coloré.', start: '#7cc8d3', end: '#315c7e', ink: '#f0fbff', image: 'images/lego-horizon-adventures/cover.jpg', story: "Aloy explore un monde post-apocalyptique entièrement recréé en briques LEGO. Avec ses alliés, elle affronte les machines et protège les tribus.", gallery: ['images/lego-horizon-adventures/gallery-01.jpg', 'images/lego-horizon-adventures/gallery-02.jpg', 'images/lego-horizon-adventures/gallery-03.jpg', 'images/lego-horizon-adventures/gallery-04.jpg'], thumbnails: ['images/lego-horizon-adventures/thumb-01.webp', 'images/lego-horizon-adventures/thumb-02.webp', 'images/lego-horizon-adventures/thumb-03.webp', 'images/lego-horizon-adventures/thumb-04.webp'], download: '', compact: true },
  { title: 'The Forest', line: 'THE<br>FOREST', meta: 'SURVIE · HORROR', category: 'action aventure horror', tag: 'SAUVAGE', mark: 'TF', desc: 'Survis sur une île aussi belle que dangereuse.', start: '#60975f', end: '#1d2b1d', ink: '#f1ffe9', image: 'images/the-forest/cover.jpg', story: "Après un crash aérien, un père explore une péninsule mystérieuse pour retrouver son fils. La forêt abrite des ressources, mais aussi des créatures hostiles.", gallery: ['images/the-forest/gallery-01.jpg', 'images/the-forest/gallery-02.jpg', 'images/the-forest/gallery-03.jpg', 'images/the-forest/gallery-04.jpg'], thumbnails: ['images/the-forest/thumb-01.webp', 'images/the-forest/thumb-02.webp', 'images/the-forest/thumb-03.webp', 'images/the-forest/thumb-04.webp'], download: '' },

];

function buildCatalog() {
  gameGrid.innerHTML = games.map((game, index) => `
    <article class="game-card ${index === 0 ? 'featured' : ''}" data-category="${game.category}" data-title="${game.title}" data-game-index="${index}" style="--card-delay:${Math.min(index, 9) * 55}ms">
      <div class="card-glare" aria-hidden="true"></div>
      <div class="cover cover-title has-image ${game.compact ? 'is-compact' : ''}" style="--cover-start:${game.start};--cover-end:${game.end};--cover-ink:${game.ink}">
        <img class="cover-image" src="${game.image}" alt="" decoding="async" ${index < 3 ? 'fetchpriority="high"' : 'loading="lazy"'}>
        <span class="cover-kicker">${game.tag}</span>
        <span class="cover-number">${String(index + 1).padStart(2, '0')}</span>
        <strong>${game.line}</strong>
        <span class="cover-open-hint">DÉCOUVRIR <b aria-hidden="true">↗</b></span>
        <span class="cover-symbol" aria-hidden="true">${game.mark}</span>
      </div>
      <div class="game-info">
        <div class="game-summary"><p>${game.meta}</p><h3>${game.title}</h3><span>${game.desc}</span></div>
        <div class="game-actions">
          <button class="card-details" type="button" aria-label="Voir les détails de ${game.title}"><span aria-hidden="true">↗</span></button>
          <button class="download" type="button" aria-label="Ajouter ${game.title} à ma collection"><span aria-hidden="true">＋</span></button>
        </div>
      </div>
    </article>`).join('');
}

buildCatalog();
let cards = [...document.querySelectorAll('.game-card')];
let lastDetailTrigger = null;
let activeDetailGame = null;
let detailVisuals = [];
let activeDetailVisualIndex = 0;
let detailSlideshowTimer = null;
let dialogCloseTimer = null;
const tutorialVideoUrl = 'https://www.youtube.com/embed/sYwpoIXCRnE?rel=0&modestbranding=1';

function openImageLightbox() {
  if (!detailCover.currentSrc && !detailCover.src) return;
  lightboxImage.src = detailCover.currentSrc || detailCover.src;
  lightboxImage.alt = detailCover.alt;
  lightboxCaption.textContent = detailArtCaption.textContent;
  gameDialog.inert = true;
  imageLightbox.inert = false;
  imageLightbox.hidden = false;
  window.setTimeout(() => imageLightboxClose.focus(), 20);
}

function closeImageLightbox() {
  if (imageLightbox.hidden) return;
  imageLightbox.hidden = true;
  imageLightbox.inert = true;
  gameDialog.inert = false;
  detailZoom.focus();
}

function setDialogIsolation(isOpen) {
  // Prevent keyboard focus from escaping behind the modal even in browsers
  // where a focus trap can be bypassed by assistive technology shortcuts.
  appLandmarks.forEach((landmark) => {
    landmark.inert = isOpen;
    landmark.setAttribute('aria-hidden', String(isOpen));
  });
}

function getDialogFocusable() {
  return [...gameDialog.querySelectorAll('a[href], button:not([disabled])')]
    .filter((element) => element.offsetParent !== null);
}

function trapDialogFocus(event) {
  if (event.key !== 'Tab') return;
  const focusable = getDialogFocusable();
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function stopTutorialVideo() {
  // Resetting the iframe stops YouTube playback whenever the game detail closes.
  tutorialVideo.src = 'about:blank';
}

function loadTutorialVideo() {
  tutorialVideo.src = tutorialVideoUrl;
  tutorialVideoSlot.hidden = false;
}

function restartDetailGalleryProgress() {
  if (prefersReducedMotion) return;
  const activeItem = document.querySelector('.detail-gallery-item.active');
  if (!activeItem) return;
  activeItem.classList.remove('slideshow-progress');
  // Restart the three-second timeline cleanly after a manual selection or slide.
  void activeItem.offsetWidth;
  activeItem.classList.add('slideshow-progress');
}

function stopDetailSlideshow() {
  window.clearInterval(detailSlideshowTimer);
  detailSlideshowTimer = null;
  document.querySelectorAll('.detail-gallery-item').forEach((item) => item.classList.remove('slideshow-progress'));
}

function startDetailSlideshow() {
  stopDetailSlideshow();
  if (prefersReducedMotion || document.hidden || detailVisuals.length < 2 || gameDialog.hidden) return;
  restartDetailGalleryProgress();
  detailSlideshowTimer = window.setInterval(() => {
    selectDetailVisual((activeDetailVisualIndex + 1) % detailVisuals.length);
    restartDetailGalleryProgress();
  }, 3000);
}

function selectDetailVisual(index) {
  const visual = detailVisuals[index];
  if (!visual) return;
  activeDetailVisualIndex = index;
  detailCover.src = visual.src;
  detailCover.alt = visual.alt;
  if (!prefersReducedMotion && typeof detailCover.animate === 'function') {
    detailCover.animate([
      { opacity: 0.25, transform: 'scale(1.025)' },
      { opacity: 1, transform: 'scale(1)' },
    ], { duration: 320, easing: 'cubic-bezier(.16,1,.3,1)' });
  }
  detailArtLabel.textContent = `VISUEL ${String(index + 1).padStart(2, '0')} / ${String(detailVisuals.length).padStart(2, '0')}`;
  detailArtCaption.textContent = visual.caption;
  document.querySelectorAll('.detail-gallery-item').forEach((item, itemIndex) => {
    const selected = itemIndex === index;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
}

function openGameDialog(game, trigger) {
  lastDetailTrigger = trigger;
  activeDetailGame = game;
  detailKicker.textContent = game.tag;
  detailTitle.textContent = game.title;
  detailMeta.textContent = game.meta;
  detailStory.textContent = game.story;
  // Open on a 1440px gameplay visual for a sharper first impression in the enlarged dialog.
  detailCover.onerror = () => {
    if (detailCover.getAttribute('src') === game.image) return;
    detailCover.src = game.image;
  };
  detailVisuals = [
    { src: game.gallery[0], alt: `Capture d’écran de ${game.title}`, caption: 'IMAGE DE JEU · 01' },
    { src: game.gallery[1], alt: `Capture d’écran de ${game.title}`, caption: 'IMAGE DE JEU · 02' },
    { src: game.gallery[2], alt: `Capture d’écran de ${game.title}`, caption: 'IMAGE DE JEU · 03' },
    { src: game.gallery[3], alt: `Capture d’écran de ${game.title}`, caption: 'IMAGE DE JEU · 04' },
    { src: game.image, alt: `Jaquette de ${game.title}`, caption: 'JAQUETTE OFFICIELLE' },
  ];
  detailGalleryCover.src = game.thumbnails[0];
  detailGalleryCover.alt = detailVisuals[0].alt;
  detailShotOne.src = game.thumbnails[1];
  detailShotOne.alt = detailVisuals[1].alt;
  detailShotTwo.src = game.thumbnails[2];
  detailShotTwo.alt = detailVisuals[2].alt;
  detailShotThree.src = game.thumbnails[3];
  detailShotThree.alt = detailVisuals[3].alt;
  detailShotFour.src = detailVisuals[4].src;
  detailShotFour.alt = detailVisuals[4].alt;
  selectDetailVisual(0);
  const hasDownload = Boolean(game.download);
  officialDownload.hidden = !hasDownload;
  if (hasDownload) {
    officialDownload.href = game.download;
    officialDownload.setAttribute('download', '');
    officialDownload.setAttribute('aria-label', `Télécharger ${game.title}`);
  } else {
    officialDownload.removeAttribute('href');
    officialDownload.removeAttribute('download');
  }
  detailAddButton.setAttribute('aria-label', `Ajouter ${game.title} à ma collection`);
  window.clearTimeout(dialogCloseTimer);
  gameDialog.classList.remove('is-closing');
  gameDialog.hidden = false;
  document.body.classList.add('dialog-open');
  setDialogIsolation(true);
  stopTutorialVideo();
  loadTutorialVideo();
  startDetailSlideshow();
  gameDialog.addEventListener('keydown', trapDialogFocus);
  window.setTimeout(() => gameDialogClose.focus(), 20);
}

function closeGameDialog() {
  if (gameDialog.hidden || gameDialog.classList.contains('is-closing')) return;
  closeImageLightbox();
  stopDetailSlideshow();
  stopTutorialVideo();
  tutorialVideoSlot.hidden = true;

  const finishClose = () => {
    gameDialog.hidden = true;
    gameDialog.classList.remove('is-closing');
    document.body.classList.remove('dialog-open');
    setDialogIsolation(false);
    gameDialog.removeEventListener('keydown', trapDialogFocus);
    if (lastDetailTrigger) lastDetailTrigger.focus();
  };

  if (prefersReducedMotion) {
    finishClose();
  } else {
    gameDialog.classList.add('is-closing');
    dialogCloseTimer = window.setTimeout(finishClose, 220);
  }
}

cards.forEach((card, index) => {
  card.addEventListener('click', (event) => {
    if (event.target.closest('.download')) return;
    openGameDialog(games[index], card);
  });
});

gameDialogClose.addEventListener('click', closeGameDialog);
gameDialog.addEventListener('click', (event) => {
  if (event.target === gameDialog) closeGameDialog();
});

document.querySelectorAll('.detail-gallery-item').forEach((item) => item.addEventListener('click', () => {
  selectDetailVisual(Number(item.dataset.galleryIndex));
  startDetailSlideshow();
}));

// Pause while a visitor is examining the large image, then resume the 3-second rotation.
detailArtContainer.addEventListener('pointerenter', stopDetailSlideshow);
detailArtContainer.addEventListener('pointerleave', startDetailSlideshow);

detailAddButton.addEventListener('click', () => {
  if (activeDetailGame) addGameToLibrary(activeDetailGame.title, detailAddButton);
});

detailZoom.addEventListener('click', openImageLightbox);
detailCover.addEventListener('click', openImageLightbox);
imageLightboxClose.addEventListener('click', closeImageLightbox);
imageLightbox.addEventListener('click', (event) => {
  if (event.target === imageLightbox) closeImageLightbox();
});

// Smoothly reveal local cover art and give cards a restrained 3D response on desktop.
document.querySelectorAll('.cover-image').forEach((image) => {
  const markLoaded = () => image.classList.add('is-loaded');
  if (image.complete && image.naturalWidth > 0) markLoaded();
  else {
    image.addEventListener('load', markLoaded, { once: true });
    image.addEventListener('error', markLoaded, { once: true });
  }
});

if (!isTouch && !prefersReducedMotion) {
  cards.forEach((card) => {
    let tiltFrame = null;
    let pointerX = 0;
    let pointerY = 0;
    card.addEventListener('pointermove', (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (tiltFrame) return;
      tiltFrame = window.requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = (pointerX - rect.left) / rect.width - 0.5;
        const y = (pointerY - rect.top) / rect.height - 0.5;
        card.style.setProperty('--tilt-x', `${-y * 4.5}deg`);
        card.style.setProperty('--tilt-y', `${x * 5.5}deg`);
        card.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`);
        card.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`);
        tiltFrame = null;
      });
    });
    card.addEventListener('pointerleave', () => {
      if (tiltFrame) window.cancelAnimationFrame(tiltFrame);
      tiltFrame = null;
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      card.style.setProperty('--glow-x', '50%');
      card.style.setProperty('--glow-y', '50%');
    });
  });
}

// ===== Library storage (migrates old string-only format) =====
function loadLibrary() {
  let raw = [];
  try {
    raw = JSON.parse(localStorage.getItem('freevia-library-v2') || '[]');
  } catch (err) {
    raw = [];
  }
  const map = new Map();
  raw.forEach((entry) => {
    if (typeof entry === 'string') {
      map.set(entry, { title: entry, href: '' });
    } else if (entry && entry.title) {
      map.set(entry.title, entry);
    }
  });
  return map;
}

let library = loadLibrary();

function saveLibrary() {
  localStorage.setItem('freevia-library-v2', JSON.stringify([...library.values()]));
}

function updateLibraryCount() {
  libraryCount.textContent = library.size;
}

function renderLibraryPanel() {
  libraryList.innerHTML = '';
  const entries = [...library.values()];
  libraryEmpty.hidden = entries.length !== 0;
  entries.forEach((entry) => {
    const li = document.createElement('li');
    li.className = 'library-item';

    const label = document.createElement('span');
    label.textContent = entry.title;
    li.appendChild(label);

    const actions = document.createElement('div');

    if (entry.href) {
      const link = document.createElement('a');
      link.href = entry.href;
      link.className = 'remove';
      link.setAttribute('aria-label', `Ouvrir ${entry.title}`);
      link.textContent = '↗';
      actions.appendChild(link);
    }

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove';
    removeBtn.setAttribute('aria-label', `Retirer ${entry.title} de la collection`);
    removeBtn.textContent = '✕';
    removeBtn.addEventListener('click', () => {
      library.delete(entry.title);
      saveLibrary();
      updateLibraryCount();
      renderLibraryPanel();
    });
    actions.appendChild(removeBtn);

    li.appendChild(actions);
    libraryList.appendChild(li);
  });
}

// ===== Toast =====
let toastTimer = null;
function showToast(message) {
  toastText.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

// ===== Catalog search / filter =====
// Cards fade out first, THEN get [hidden] once the transition ends, so filtering
// no longer cuts cards instantly — matches the .game-card.filtering-out CSS transition.
function renderCatalog() {
  const query = searchInput.value.trim().toLocaleLowerCase('fr');
  let visibleCount = 0;
  cards.forEach((card) => {
    const matchesFilter = selectedFilter === 'all' || card.dataset.category.includes(selectedFilter);
    const matchesSearch = card.dataset.title.toLocaleLowerCase('fr').includes(query);
    const visible = matchesFilter && matchesSearch;

    if (visible) {
      card.hidden = false;
      // allow the browser to register hidden=false before removing the class,
      // so the entrance transition actually plays
      requestAnimationFrame(() => card.classList.remove('filtering-out'));
      visibleCount += 1;
    } else if (!card.hidden) {
      card.classList.add('filtering-out');
      window.setTimeout(() => {
        if (card.classList.contains('filtering-out')) card.hidden = true;
      }, prefersReducedMotion ? 0 : 220);
    } else {
      card.classList.add('filtering-out');
    }
  });
  emptyState.hidden = visibleCount !== 0;
  clearSearch.hidden = query.length === 0;
  resultCount.textContent = visibleCount
    ? `${visibleCount} titre${visibleCount > 1 ? 's' : ''} affiché${visibleCount > 1 ? 's' : ''}`
    : '';
  if (!prefersReducedMotion) {
    resultCount.classList.remove('is-updated');
    void resultCount.offsetWidth;
    resultCount.classList.add('is-updated');
  }
}

filters.forEach((button) => button.addEventListener('click', () => {
  filters.forEach((filter) => {
    filter.classList.remove('active');
    filter.setAttribute('aria-pressed', 'false');
  });
  button.classList.add('active');
  button.setAttribute('aria-pressed', 'true');
  selectedFilter = button.dataset.filter;
  renderCatalog();
}));

searchInput.addEventListener('input', renderCatalog);
clearSearch.addEventListener('click', () => {
  searchInput.value = '';
  renderCatalog();
  searchInput.focus();
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }));

// ===== Personal collection =====
function addGameToLibrary(title, trigger) {
  const isNew = !library.has(title);
  library.set(title, { title });
  saveLibrary();
  updateLibraryCount();
  renderLibraryPanel();

  if (isNew && trigger) {
    trigger.classList.add('just-added');
    window.setTimeout(() => trigger.classList.remove('just-added'), 500);
  }
  showToast(isNew ? `« ${title} » ajouté à ta collection.` : `« ${title} » est déjà dans ta collection.`);
}

document.querySelectorAll('.download').forEach((link) => link.addEventListener('click', () => {
  const card = link.closest('.game-card');
  addGameToLibrary(card.dataset.title, link);
}));

// ===== Library panel open/close =====
// Bug fix: the dialog had no focus trap, so Tab could escape it while open
// and land on elements hidden behind the scrim. trapFocus() keeps Tab/Shift+Tab
// cycling within the panel's focusable elements until it closes.
function getFocusable(container) {
  return [...container.querySelectorAll('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])')]
    .filter((el) => el.offsetParent !== null);
}

function trapFocus(event) {
  if (event.key !== 'Tab') return;
  const focusable = getFocusable(libraryPanel);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function openLibrary() {
  renderLibraryPanel();
  libraryPanel.hidden = false;
  scrim.hidden = false;
  libraryButton.setAttribute('aria-expanded', 'true');
  libraryPanel.addEventListener('keydown', trapFocus);
  window.setTimeout(() => libraryClose.focus(), 20);
}

function closeLibrary() {
  libraryPanel.hidden = true;
  scrim.hidden = navMenuIsOpen() ? false : true;
  libraryButton.setAttribute('aria-expanded', 'false');
  libraryPanel.removeEventListener('keydown', trapFocus);
  libraryButton.focus();
}

libraryButton.addEventListener('click', () => {
  if (libraryPanel.hidden) openLibrary();
  else closeLibrary();
});
libraryClose.addEventListener('click', closeLibrary);

// ===== Mobile nav =====
function navMenuIsOpen() {
  return primaryNav.classList.contains('open');
}

function openNav() {
  primaryNav.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
  scrim.hidden = false;
}

function closeNav() {
  primaryNav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  scrim.hidden = libraryPanel.hidden;
}

navToggle.addEventListener('click', () => {
  if (navMenuIsOpen()) closeNav();
  else openNav();
});

primaryNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));

scrim.addEventListener('click', () => {
  if (!libraryPanel.hidden) closeLibrary();
  if (navMenuIsOpen()) closeNav();
});

document.addEventListener('visibilitychange', () => {
  if (gameDialog.hidden) return;
  if (document.hidden) stopDetailSlideshow();
  else startDetailSlideshow();
});

document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    searchInput.focus();
    return;
  }
  if (event.key === 'Escape' && document.activeElement === searchInput && searchInput.value) {
    searchInput.value = '';
    renderCatalog();
    return;
  }
  if (event.key === 'Escape') {
    if (!imageLightbox.hidden) {
      closeImageLightbox();
      return;
    }
    if (!gameDialog.hidden) closeGameDialog();
    if (!libraryPanel.hidden) closeLibrary();
    if (navMenuIsOpen()) closeNav();
  }
});

// ===== Scroll progress bar =====
const scrollProgress = document.querySelector('#scrollProgress');
function updateActiveNavigation() {
  const marker = window.scrollY + topbar.offsetHeight + 40;
  let activeId = 'jeux';
  navSections.forEach((section) => {
    if (section && section.offsetTop <= marker) activeId = section.id;
  });
  navLinks.forEach((link) => {
    const active = link.getAttribute('href') === `#${activeId}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function updateScrollProgress() {
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
  scrollProgress.style.width = `${pct}%`;
  topbar.classList.toggle('is-scrolled', window.scrollY > 16);
  backToTop.hidden = doc.scrollTop < 620;
  updateActiveNavigation();
}
document.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

// ===== Cursor glow (desktop only) =====
const cursorGlow = document.querySelector('#cursorGlow');
if (!isTouch && !prefersReducedMotion) {
  let cursorFrame = null;
  let cursorX = 0;
  let cursorY = 0;
  window.addEventListener('mousemove', (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
    if (cursorFrame) return;
    cursorFrame = window.requestAnimationFrame(() => {
      cursorGlow.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
      cursorGlow.classList.add('active');
      cursorFrame = null;
    });
  }, { passive: true });
  window.addEventListener('mouseleave', () => {
    if (cursorFrame) window.cancelAnimationFrame(cursorFrame);
    cursorFrame = null;
    cursorGlow.classList.remove('active');
  });
}

// ===== Magnetic buttons =====
// Writes CSS custom properties instead of el.style.transform directly, so the
// element's own :hover / transition rules stay in control of the transform
// (previously the inline transform silenced the hover lift entirely).
if (!isTouch && !prefersReducedMotion) {
  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('mousemove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      el.style.setProperty('--mx', `${x * 0.18}px`);
      el.style.setProperty('--my', `${y * 0.28}px`);
    });
    el.addEventListener('mouseleave', () => {
      el.style.setProperty('--mx', '0px');
      el.style.setProperty('--my', '0px');
    });
  });
}

// ===== Hero wave canvas =====
const waveCanvas = document.querySelector('#waveCanvas');
if (waveCanvas) {
  const ctx = waveCanvas.getContext('2d');
  const heroEl = waveCanvas.closest('.hero');
  let width = 0;
  let height = 0;
  let dots = [];
  let animId = null;
  let t = 0;
  let heroVisible = true; // updated by IntersectionObserver below
  let canvasResizeFrame = null;

  function buildDots() {
    dots = [];
    // Keep roughly the same visual density without spending thousands of draw calls on 4K screens.
    const targetDots = isTouch ? 520 : 1200;
    const spacing = Math.max(isTouch ? 38 : 30, Math.ceil(Math.sqrt((width * height) / targetDots)));
    const cols = Math.floor(width / spacing);
    const rows = Math.floor(height / spacing);
    for (let x = 0; x <= cols; x += 1) {
      for (let y = 0; y <= rows; y += 1) {
        dots.push({ x: x * spacing, y: y * spacing, baseY: y * spacing });
      }
    }
  }

  function resizeCanvas() {
    width = waveCanvas.width = heroEl.offsetWidth;
    height = waveCanvas.height = heroEl.offsetHeight;
    buildDots();
  }

  function drawFrame() {
    ctx.clearRect(0, 0, width, height);
    dots.forEach((dot) => {
      const wave = Math.sin((dot.x * 0.01) + t) * 10;
      const dy = dot.baseY + wave;
      const alpha = 0.06 + Math.abs(Math.sin((dot.x * 0.01) + t)) * 0.1;
      ctx.fillStyle = `rgba(235,147,80,${alpha})`;
      ctx.beginPath();
      ctx.arc(dot.x, dy, 1.4, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function animate() {
    t += 0.012;
    drawFrame();
    // Bug fix: only keep requesting frames while the hero is actually on screen
    // and the tab is visible — previously this ran forever, burning CPU/battery
    // even after scrolling far past the hero.
    if (heroVisible && !document.hidden) {
      animId = window.requestAnimationFrame(animate);
    } else {
      animId = null;
    }
  }

  function startAnimating() {
    if (!animId && !prefersReducedMotion && heroVisible && !document.hidden) {
      animate();
    }
  }

  window.addEventListener('resize', () => {
    if (canvasResizeFrame) window.cancelAnimationFrame(canvasResizeFrame);
    canvasResizeFrame = window.requestAnimationFrame(() => {
      resizeCanvas();
      canvasResizeFrame = null;
    });
  }, { passive: true });
  resizeCanvas();
  // Bug fix: web fonts loading after first paint can change the hero's height,
  // leaving the canvas sized for the pre-font-swap layout. Re-measure once fonts settle.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(resizeCanvas);
  }

  if (prefersReducedMotion) {
    drawFrame();
  } else if ('IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver((entries) => {
      heroVisible = entries[0].isIntersecting;
      if (heroVisible) startAnimating();
    }, { threshold: 0 });
    heroObserver.observe(heroEl);
    startAnimating();
  } else {
    animate();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && animId) {
      window.cancelAnimationFrame(animId);
      animId = null;
    } else if (!document.hidden) {
      startAnimating();
    }
  });
}

// ===== Scroll reveal =====
if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in-view'));
}

// ===== Init =====
updateLibraryCount();
renderCatalog();
