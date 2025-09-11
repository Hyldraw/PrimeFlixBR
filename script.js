// Convertido de client/src/components/StreamingApp.tsx, server/storage.ts, client/src/lib/queryClient.ts, client/src/hooks/use-local-images.ts

// Estado global da aplicação - convertido dos useState hooks do React
let selectedContent = null;
let showPlayer = false;
let playerAnimating = false;
let searchTerm = "";
let activeCategory = "home";
let featuredIndex = 0;
let fadeClass = 'fade-in';
let currentView = "home";
let selectedCategory = null;
let movieCategories = [
    "Ação", "Comédia", "Drama", "Terror", "Ficção Científica", 
    "Romance", "Aventura", "Thriller", "Fantasia", "Crime"
];
let seriesCategories = [
    "Drama", "Comédia", "Ação", "Terror", "Ficção Científica", 
    "Romance", "Thriller", "Fantasia", "Crime", "Sobrenatural"
];
let touchStart = 0;
let touchEnd = 0;

// Estado do inline player
let showInlinePlayer = false;

// Progresso da auto-rotação
let progress = 0;
let progressInterval = null;
let contentInterval = null;

// Dados de conteúdo - convertidos de server/storage.ts
let allContent = [];
let featuredContent = [];
let userListContent = [];
let searchResults = [];

// User data (simulando usuário demo)
let currentUser = { id: "demo-user", username: "demo", password: "demo" };
let userLists = [];

// Função para gerar embed baseado no tipo e ID - preservada de server/storage.ts
function generateEmbed(id, type) {
  const baseUrl = 'https://embed.warezcdn.link';
  if (type === 'movie') {
    return `${baseUrl}/filme/${id}`;
  } else {
    return `${baseUrl}/serie/${id}`;
  }
}

// Sample content data - preservado integralmente de server/storage.ts
const sampleContent = [
  {
    id: "tt3402138",
    title: "Corra Que a Polícia Vem Aí!",
    year: 2025,
    rating: "6.7",
    duration: "85 min",
    seasons: null,
    episodes: null,
    genre: "Ação",
    classification: "14+",
    directors: [
      { name: "Akiva Schaffer", photo: "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/1Om7CQXHoUr4rrVrsmyutDwWfck.jpg" }
    ],
    creator: null,
    creatorImage: null,
    cast: [
      { name: "Liam Neeson", photo: "https://media.themoviedb.org/t/p/w138_and_h175_face/sRLev3wJioBgun3ZoeAUFpkLy0D.jpg" },
      { name: "Pamela Anderson", photo: "https://media.themoviedb.org/t/p/w138_and_h175_face/sk15ch2IQ6k6vWu07Jr77yw4oj5.jpg" },
      { name: "Paul Walter Hauser", photo: "https://media.themoviedb.org/t/p/w138_and_h175_face/hV2oiKF2xlDMXtuq3Si1TA4b6DA.jpg" }
    ],
    description: "Apenas um homem tem as habilidades necessárias para liderar o Esquadrão Policial e salvar o mundo.",
    fullDescription: "O filme acompanha o Tenente Frank Drebin Jr. (interpretado por Liam Neeson), o filho do lendário e falecido Tenente Frank Drebin. Após a morte do pai, Drebin Jr. segue seus passos na polícia, mas também herda sua peculiar forma de lidar com as situações.",
    poster: "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/aGnR0XntfMrlrbnVyPL8XOKAkAQ.jpg",
    backdrop: "https://img.cnmhstng.com/more/backdrop/lg/The_Naked_Gun8081.jpg",
    embed: generateEmbed("tt3402138", "movie"),
    featured: true,
    type: "movie"
  },
  {
    id: "tt5950044",
    title: "Superman",
    year: 2025,
    rating: "7.2",
    duration: "129 min",
    seasons: null,
    episodes: null,
    genre: "Ação",
    classification: "14+",
    directors: [
      { name: "James Gunn", photo: "https://m.media-amazon.com/images/M/MV5BMTYxMDgzMjA5OV5BMl5BanBnXkFtZTcwMzMwMTUxNw@@._V1_FMjpg_UX1000_.jpg" }
    ],
    creator: null,
    creatorImage: null,
    cast: [
      { name: "David Corenswet", photo: "https://media.themoviedb.org/t/p/w138_and_h175_face/qB0hBMu4wU1nPrqtdUQP3sQeN5t.jpg" },
      { name: "Rachel Brosnahan", photo: "https://media.themoviedb.org/t/p/w138_and_h175_face/1f9NK43gWrXN2uMmYMlennB7jCC.jpg" },
      { name: "Nicholas Hoult", photo: "https://media.themoviedb.org/t/p/w138_and_h175_face/laeAYQVBV9U3DkJ1B4Cn1XhpT8P.jpg" }
    ],
    description: "Segue o super-herói titular enquanto ele reconcilia sua herança com sua educação humana. Ele é a personificação da verdade, da justiça e de um futuro melhor em um mundo que vê a bondade como algo antiquado.",
    fullDescription: "Segue o super-herói titular enquanto ele reconcilia sua herança com sua educação humana. Ele é a personificação da verdade, da justiça e de um futuro melhor em um mundo que vê a bondade como algo antiquado.",
    poster: "https://i.imgur.com/bZo3fGv.jpeg",
    backdrop: "https://i.imgur.com/vjQLuTI.jpeg",
    embed: generateEmbed("tt5950044", "movie"),
    featured: true,
    type: "movie"
  },
  {
    id: "tt1630029",
    title: "Avatar: O Caminho da Água",
    year: 2022,
    rating: "8.1",
    duration: "192 min",
    seasons: null,
    episodes: null,
    genre: "Ficção Científica",
    classification: "12+",
    directors: [
      { name: "James Cameron", photo: "https://image.tmdb.org/t/p/w200/5tKTaVlBiqfTL9dZQ2Izn7kSGsf.jpg" }
    ],
    creator: null,
    creatorImage: null,
    cast: [
      { name: "Sam Worthington", photo: "https://media.themoviedb.org/t/p/w138_and_h175_face/mflBcox36s9ZPVOuhf6axaJ.jpg" },
      { name: "Zoe Saldana", photo: "https://media.themoviedb.org/t/p/w138_and_h175_face/vQBwmsSOAd0JDaEcZ5p43J9xzsY.jpg" },
      { name: "Sigourney Weaver", photo: "https://media.themoviedb.org/t/p/w138_and_h175_face/wTSnfktNBLd6kwQxgvkqYw6vEon.jpg" }
    ],
    description: "Jake Sully vive com sua nova família formada no planeta de Pandora. Quando uma ameaça familiar retorna para terminar o que foi iniciado anteriormente, Jake deve trabalhar com Neytiri e o exército da raça Na'vi para proteger seu planeta.",
    fullDescription: "Mais de uma década depois dos eventos do primeiro filme, Avatar: O Caminho da Água conta a história da família Sully (Jake, Neytiri e seus filhos), os problemas que os perseguem, até onde vão para se manter em segurança, as batalhas que lutam para se manter vivos e as tragédias que suportam. Ambientado no mundo deslumbrante de Pandora, James Cameron leva o público numa jornada emocionante e de tirar o fôlego.",
    poster: "https://lumiere-a.akamaihd.net/v1/images/image_1c148dd1.jpeg?region=0,0,540,810",
    backdrop: "https://sm.ign.com/ign_pt/gallery/e/every-acto/every-actor-and-character-confirmed-for-the-avatar-sequels_ua72.jpg",
    embed: generateEmbed("tt1630029", "movie"),
    featured: false,
    type: "movie"
  },
  {
    id: "tt1745960",
    title: "Top Gun: Maverick",
    year: 2022,
    rating: "8.5",
    duration: "131 min",
    seasons: null,
    episodes: null,
    genre: "Ação",
    classification: "14+",
    directors: [
      { name: "Joseph Kosinski", photo: "https://image.tmdb.org/t/p/w200/6l2ZjSGtNWmHbpOTaXy9nVUwkUx.jpg" }
    ],
    creator: null,
    creatorImage: null,
    cast: [
      { name: "Tom Cruise", photo: "https://image.tmdb.org/t/p/w200/eOh4ubpOm2Igdg0QH2ghj0mFtC.jpg" },
      { name: "Miles Teller", photo: "https://image.tmdb.org/t/p/w200/tkJ42CSwWKLGhUn0zJpwSywCKnD.jpg" },
      { name: "Jennifer Connelly", photo: "https://image.tmdb.org/t/p/w200/bpILtSl6z5xc6YOAiPnDBlXDYMJ.jpg" }
    ],
    description: "Depois de mais de 30 anos de serviço como um dos principais aviadores da Marinha, Pete 'Maverick' Mitchell está de volta, rompendo os limites como um piloto de testes corajoso.",
    fullDescription: "Depois de mais de 30 anos de serviço como um dos principais aviadores da Marinha, Pete 'Maverick' Mitchell está de volta, rompendo os limites como um piloto de testes corajoso e esquivando-se do avanço de patente que o colocaria em terra. Treinando graduados da TOPGUN para uma missão especializada, diferente de qualquer coisa que um piloto vivo já viu, Maverick encontra Bradley Rooster Bradshaw, filho de seu falecido amigo Nick Goose Bradshaw.",
    poster: "https://m.media-amazon.com/images/M/MV5BMDBkZDNjMWEtOTdmMi00NmExLTg5MmMtNTFlYTJlNWY5YTdmXkEyXkFqcGc@._V1_.jpg",
    backdrop: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpbl3qjKWjpCK40o2uXV4mVLtl7Fz8s5UV2A&s",
    embed: generateEmbed("tt1745960", "movie"),
    featured: false,
    type: "movie"
  },
  {
    id: "tt1160419",
    title: "Duna",
    year: 2021,
    rating: "8.0",
    duration: "155 min",
    seasons: null,
    episodes: null,
    genre: "Ficção Científica",
    classification: "14+",
    directors: [
      { name: "Denis Villeneuve", photo: "https://image.tmdb.org/t/p/w200/7pV3kOQgFSptm3kEZPXR1Nohpqw.jpg" }
    ],
    creator: null,
    creatorImage: null,
    cast: [
      { name: "Timothée Chalamet", photo: "https://image.tmdb.org/t/p/w200/BE2sdjpgsa2rNTFa66f7upUP8DW.jpg" },
      { name: "Rebecca Ferguson", photo: "https://image.tmdb.org/t/p/w200/lJloTOheuQSirSLXLTKmraWJuQ8.jpg" },
      { name: "Oscar Isaac", photo: "https://image.tmdb.org/t/p/w200/dW5U5yrIIPmMjRThR9KT2xH6nTz.jpg" }
    ],
    description: "Paul Atreides, um jovem brilhante e talentoso nascido com um grande destino além de sua compreensão, deve viajar para o planeta mais perigoso do universo para garantir o futuro de sua família e seu povo.",
    fullDescription: "Duna conta a história de Paul Atreides, um jovem brilhante e talentoso nascido com um grande destino além de sua compreensão, que deve viajar para o planeta mais perigoso do universo para garantir o futuro de sua família e seu povo. Quando forças malévolas explodem em conflito sobre o suprimento exclusivo do planeta da substância mais preciosa existente, apenas aqueles que podem conquistar seus medos sobreviverão.",
    poster: "https://upload.wikimedia.org/wikipedia/pt/thumb/a/a3/Dune_2021.jpeg/250px-Dune_2021.jpeg",
    backdrop: "https://isabelaboscov.com/wp-content/uploads/2021/10/duna_feat.jpg",
    embed: generateEmbed("tt1160419", "movie"),
    featured: false,
    type: "movie"
  },
  {
    id: "tt9114286",
    title: "Pantera Negra: Wakanda Para Sempre",
    year: 2022,
    rating: "7.8",
    duration: "161 min",
    seasons: null,
    episodes: null,
    genre: "Ação",
    classification: "12+",
    directors: [
      { name: "Ryan Coogler", photo: "https://image.tmdb.org/t/p/w200/x3IKKjl0Vq5TXcn1f2Aq3YcIeG.jpg" }
    ],
    creator: null,
    creatorImage: null,
    cast: [
      { name: "Letitia Wright", photo: "https://image.tmdb.org/t/p/w200/jsHJWQ7xw2u4E3K3Q3ysNf4fZXi.jpg" },
      { name: "Angela Bassett", photo: "https://image.tmdb.org/t/p/w200/upRJOPRpJj7a41DVjG4WRaPXtJ6.jpg" },
      { name: "Tenoch Huerta", photo: "https://image.tmdb.org/t/p/w200/4zH1VOKjuKdpXlcl3M7v7FGVJ0r.jpg" }
    ],
    description: "A rainha Ramonda, Shuri, M'Baku, Okoye e as Dora Milaje lutam para proteger sua nação das potências mundiais intervenientes após a morte do rei T'Challa.",
    fullDescription: "A rainha Ramonda, Shuri, M'Baku, Okoye e as Dora Milaje lutam para proteger sua nação das potências mundiais que intervêm após a morte do rei T'Challa. Quando Namor, rei de uma nação subaquática escondida, ameaça Wakanda, os heróis devem forjar um novo caminho para o reino de Wakanda. Apresentando Ironheart, aliada de longa data dos Vingadores e Wakanda.",
    poster: "https://upload.wikimedia.org/wikipedia/pt/3/3b/Black_Panther_Wakanda_Forever_poster.jpg",
    backdrop: "https://igormiranda.com.br/wp-content/uploads/2022/10/pantera-negra-wakanda-para-sempre-poster.jpg",
    embed: generateEmbed("tt9114286", "movie"),
    featured: false,
    type: "movie"
  },
  {
    id: "tt5180504",
    title: "The Witcher",
    year: 2019,
    rating: "8.2",
    duration: null,
    seasons: 3,
    episodes: 24,
    genre: "Fantasia",
    classification: "16+",
    directors: null,
    creator: "Lauren Schmidt",
    creatorImage: "https://image.tmdb.org/t/p/w200/3XKs4VCu0xP7g4BKSfnrpqHwfnS.jpg",
    cast: [
      { name: "Henry Cavill", photo: "https://image.tmdb.org/t/p/w200/2p62i8nJry6rNPGa3sDTjZEJftu.jpg" },
      { name: "Anya Chalotra", photo: "https://image.tmdb.org/t/p/w200/oWsVqiT3oLn6VGLwbLMTpU39CJH.jpg" },
      { name: "Freya Allan", photo: "https://image.tmdb.org/t/p/w200/8RqXxOCZKowrUpUfVzqLOKY0j7R.jpg" }
    ],
    description: "Geralt de Rivia, um caçador de monstros solitário, luta para encontrar seu lugar em um mundo onde as pessoas frequentemente se mostram mais perversas que as bestas.",
    fullDescription: "Baseada na série de livros best-seller, The Witcher é uma saga épica sobre família e destino. É a história de três pessoas cujos destinos estão ligados no vasto mundo do Continente, onde humanos, elfos, halflings, gnomos e monstros batalham para sobreviver e prosperar, e onde o bem e o mal não são facilmente identificados.",
    poster: "https://m.media-amazon.com/images/M/MV5BMTQ5MDU5MTktMDZkMy00NDU1LWIxM2UtODg5OGFiNmRhNDBjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    backdrop: "https://occ-0-8407-114.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABU7gpMAYfvyueawBTChK__g2nos9dYiy4OW7GztXMmRA5gyDCLovfugu5n_mSxXJPNaiHgNPIg3hLLuOqtIBFvfX9htxXvCpYDaT.jpg?r=3ec",
    embed: generateEmbed("tt5180504", "series"),
    featured: false,
    type: "series"
  },
  {
    id: "tt4574334",
    title: "Stranger Things",
    year: 2016,
    rating: "8.7",
    duration: null,
    seasons: 4,
    episodes: 42,
    genre: "Ficção Científica",
    classification: "14+",
    directors: null,
    creator: "Irmãos Duffer",
    creatorImage: "https://image.tmdb.org/t/p/w200/rAiKKKYcHfEW4xRQmZU6sXWeRlO.jpg",
    cast: [
      { name: "Millie Bobby Brown", photo: "https://image.tmdb.org/t/p/w200/1fLEy84obQrN5dfUKBFNPmnxEqF.jpg" },
      { name: "Finn Wolfhard", photo: "https://image.tmdb.org/t/p/w200/pPQd6nF1KqwJm2k4vK1UOx5rFr5.jpg" },
      { name: "David Harbour", photo: "https://image.tmdb.org/t/p/w200/oXSu7yMEJVfxbJFJ2cDGwG6D7wI.jpg" }
    ],
    description: "Quando um garoto desaparece, sua mãe, um chefe de polícia e seus amigos devem confrontar forças aterrorizantes para trazê-lo de volta.",
    fullDescription: "Em 1980, na cidade fictícia de Hawkins, Indiana, um grupo de amigos testemunha forças sobrenaturais e experimentos governamentais secretos. Para resolver esse mistério, eles terão que enfrentar seus piores medos e descobrir segredos sombrios. Stranger Things é uma carta de amor aos clássicos sobrenaturais dos anos 80.",
    poster: "https://musicnonstop.uol.com.br/wp-content/uploads/2022/05/novo-poster-da-quarta-temporada-de-stranger-things-1652368177430_v2_3x4.jpg",
    backdrop: "https://images.impresa.pt/expresso/2023-01-10-Stranger-Things-season-4-7542ce4.webp-efc1850f/original/mw-1920",
    embed: generateEmbed("tt4574334", "series"),
    featured: false,
    type: "series"
  },
  {
    id: "tt11198330",
    title: "House of the Dragon",
    year: 2022,
    rating: "8.5",
    duration: null,
    seasons: 2,
    episodes: 18,
    genre: "Drama",
    classification: "18+",
    directors: null,
    creator: "Ryan Condal",
    creatorImage: "https://image.tmdb.org/t/p/w200/tUMhZ4VVWK5rj9F8Uj9OUl8DClF.jpg",
    cast: [
      { name: "Paddy Considine", photo: "https://image.tmdb.org/t/p/w200/kPaobfnkpwBAdBWp95fT2VfPJ0o.jpg" },
      { name: "Emma D'Arcy", photo: "https://image.tmdb.org/t/p/w200/9P4RJOaG6FQpupZfBwfkX8sTGhM.jpg" },
      { name: "Matt Smith", photo: "https://image.tmdb.org/t/p/w200/qbBnOEqJYH2zWnqJGUNZQYXZmT3.jpg" }
    ],
    description: "200 anos antes dos eventos de Game of Thrones, a Casa Targaryen está no auge de seu poder, com mais de 15 dragões sob seu comando.",
    fullDescription: "Baseada no livro 'Fogo & Sangue' de George R.R. Martin, House of the Dragon se passa 200 anos antes dos eventos de Game of Thrones e conta a história dos Targaryen. A série se concentra na guerra civil targaryen conhecida como 'Dança dos Dragões', que ocorreu cerca de 300 anos antes dos eventos retratados em Game of Thrones.",
    poster: "https://m.media-amazon.com/images/M/MV5BM2QzMGVkNjUtN2Y4Yi00ODMwLTg3YzktYzUxYjJlNjFjNDY1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    backdrop: "https://forbes.com.br/wp-content/uploads/2024/06/House-of-The-Dragon.png",
    embed: generateEmbed("tt11198330", "series"),
    featured: false,
    type: "series"
  },
  {
    id: "tt13443470",
    title: "Wednesday",
    year: 2022,
    rating: "8.1",
    duration: null,
    seasons: 2,
    episodes: 16,
    genre: "Comédia",
    classification: "14+",
    directors: null,
    creator: "Alfred Gough",
    creatorImage: "https://image.tmdb.org/t/p/w200/5YkGLdPQY9lJpfLQx4LlmCGvhgX.jpg",
    cast: [
      { name: "Jenna Ortega", photo: "https://image.tmdb.org/t/p/w200/9I17Z4Oz8tDjfxINxlcJgGFW6Pl.jpg" },
      { name: "Catherine Zeta-Jones", photo: "https://image.tmdb.org/t/p/w200/8c06Hl6X8kFCCKKMz4wKjBtNPKZ.jpg" },
      { name: "Luis Guzmán", photo: "https://image.tmdb.org/t/p/w200/vbXJYCFnOUwsRhtRKgvHGVHUayx.jpg" }
    ],
    description: "Wednesday Addams é uma estudante na Nevermore Academy, onde tenta dominar sua habilidade psíquica emergente, impedir uma onda de assassinatos e resolver o mistério sobrenatural.",
    fullDescription: "Uma série de mistério sobrenatural que segue Wednesday Addams em seus anos como estudante na Nevermore Academy. Wednesday tenta dominar sua habilidade psíquica emergente, frustrar um monstruoso surto de assassinatos que aterrorizou a cidade local, e resolver o mistério sobrenatural que envolveu seus pais há 25 anos - tudo enquanto navega em suas novas e muito emaranhadas relações na Nevermore.",
    poster: "https://br.web.img2.acsta.net/pictures/22/09/23/20/14/0505071.jpg",
    backdrop: "https://portaln10.com.br/todocanal/wp-content/uploads/2025/08/Criadores-de-Wandinha-vao-lancar-filme.png",
    embed: generateEmbed("tt13443470", "series"),
    featured: true,
    type: "series"
  },
  {
    id: "tt4154796",
    title: "Vingadores: Ultimato",
    year: 2019,
    rating: "8.4",
    duration: "181 min",
    seasons: null,
    episodes: null,
    genre: "Ação",
    classification: "12+",
    directors: [
      { name: "Anthony Russo", photo: "https://image.tmdb.org/t/p/w200/bKBOdK8RiYrmhXXOyXH7tWcmwKJ.jpg" },
      { name: "Joe Russo", photo: "https://image.tmdb.org/t/p/w200/bKBOdK8RiYrmhXXOyXH7tWcmwKJ.jpg" }
    ],
    creator: null,
    creatorImage: null,
    cast: [
      { name: "Robert Downey Jr.", photo: "https://image.tmdb.org/t/p/w200/eOh4ubpOm2Igdg0QH2ghj0mFtC.jpg" },
      { name: "Chris Evans", photo: "https://image.tmdb.org/t/p/w200/8kBZQG1WASRrDmNkm4iJ5CqPsP6.jpg" },
      { name: "Mark Ruffalo", photo: "https://image.tmdb.org/t/p/w200/znNHyGbGOlojqQGqOgqGSqUoaF1.jpg" },
      { name: "Chris Hemsworth", photo: "https://image.tmdb.org/t/p/w200/xkdGybW7sMKKXIj7yOm3wFOgKc2.jpg" }
    ],
    description: "Após Thanos eliminar metade de todas as formas de vida, os Vingadores restantes devem fazer qualquer coisa necessária para desfazer suas ações.",
    fullDescription: "Após os eventos devastadores de Vingadores: Guerra Infinita, o universo está em ruínas devido aos esforços do Titã Louco, Thanos. Com a ajuda de aliados restantes, os Vingadores devem se reunir mais uma vez para desfazer as ações de Thanos e restaurar a ordem no universo de uma vez por todas, não importa quais sejam as consequências.",
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdrop: "https://s2.glbimg.com/2C0hMRuCY_7NfDPjby4_Bjmq8Nc=/e.glbimg.com/og/ed/f/original/2018/03/22/avengers-infinity-war-official-poster-2018-4o.jpg",
    embed: generateEmbed("tt4154796", "movie"),
    featured: false,
    type: "movie"
  },
  {
    id: "tt0460681",
    title: "Sobrenatural",
    year: 2005,
    rating: "8.4",
    duration: null,
    seasons: 15,
    episodes: 327,
    genre: "Sobrenatural",
    classification: "16+",
    directors: null,
    creator: "Eric Kripke",
    creatorImage: "https://image.tmdb.org/t/p/w200/3Y6agCgNpBzj8w5JZ9KsJfEXaJ6.jpg",
    cast: [
      { name: "Jared Padalecki", photo: "https://image.tmdb.org/t/p/w200/3DpAkgDuOeJt8m4ptXnBdyJUPGu.jpg" },
      { name: "Jensen Ackles", photo: "https://image.tmdb.org/t/p/w200/lTt0wlAjnBKgDaUOEIMvxlBKdOd.jpg" },
      { name: "Misha Collins", photo: "https://image.tmdb.org/t/p/w200/6QVT9rjFMjJCDKNiXpj9vISIJjU.jpg" }
    ],
    description: "Dois irmãos seguem o pai em uma jornada para encontrar e destruir criaturas sobrenaturais malignas.",
    fullDescription: "Sobrenatural segue os irmãos Sam e Dean Winchester, que viajam pelo país caçando demônios, fantasmas, monstros e outras criaturas sobrenaturais. A série explora temas de família, sacrifício e a luta entre o bem e o mal, enquanto os irmãos enfrentam apocalipses, anjos, demônios e outras ameaças sobrenaturais.",
    poster: "https://image.tmdb.org/t/p/w500/KoYWXbnYuS3b0GyQPkbuexlVK9.jpg",
    backdrop: "https://www.correiobraziliense.com.br/cbradar/wp-content/uploads/2025/02/supernatural.png",
    embed: generateEmbed("tt0460681", "series"),
    featured: false,
    type: "series"
  },
  {
    id: "tt0903747",
    title: "Breaking Bad",
    year: 2008,
    rating: "9.5",
    duration: null,
    seasons: 5,
    episodes: 62,
    genre: "Drama",
    classification: "16+",
    directors: null,
    creator: "Vince Gilligan",
    creatorImage: "https://image.tmdb.org/t/p/w200/vQSqLRqHpu4W0mVRX53Bj8hfWKo.jpg",
    cast: [
      { name: "Bryan Cranston", photo: "https://image.tmdb.org/t/p/w200/5XKoaXMZKbE9D0xGHTI4VGVMkGW.jpg" },
      { name: "Aaron Paul", photo: "https://image.tmdb.org/t/p/w200/khuwRCeWmjQaSTgKWfZqXm8OjhM.jpg" },
      { name: "Anna Gunn", photo: "https://image.tmdb.org/t/p/w200/cNFhYrmGE0nCVPKXjHi2P8vt4qP.jpg" },
      { name: "RJ Mitte", photo: "https://image.tmdb.org/t/p/w200/86H8YIZkJdIhYjNgpKwCn5vP9qT.jpg" }
    ],
    description: "Um professor de química do ensino médio se transforma em um fabricante de metanfetamina.",
    fullDescription: "Breaking Bad segue Walter White, um professor de química do ensino médio lutando financeiramente que é diagnosticado com câncer de pulmão inoperável. Junto com seu ex-aluno Jesse Pinkman, White se transforma no mundo do crime, produzindo e vendendo metanfetamina cristalizada para garantir o futuro financeiro de sua família antes de morrer.",
    poster: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    backdrop: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKIhThuZYgg3RGX14v7kQKvrdOxqeJc53SYQ&s",
    embed: generateEmbed("tt0903747", "series"),
    featured: false,
    type: "series"
  },
  {
    id: "tt10872600",
    title: "Homem-Aranha: Sem Volta Para Casa",
    year: 2021,
    rating: "8.2",
    duration: "148 min",
    seasons: null,
    episodes: null,
    genre: "Ação",
    classification: "12+",
    directors: [
      { name: "Jon Watts", photo: "https://image.tmdb.org/t/p/w200/6r7rXb2mDJMF1YGxbRX3uCPqzOe.jpg" }
    ],
    creator: null,
    creatorImage: null,
    cast: [
      { name: "Tom Holland", photo: "https://image.tmdb.org/t/p/w200/yQHH9Ovj7WY1Hnz56Th54tDEBpA.jpg" },
      { name: "Zendaya", photo: "https://image.tmdb.org/t/p/w200/kg1zxGHrBMQRksM8kltlmj1JLzI.jpg" },
      { name: "Benedict Cumberbatch", photo: "https://image.tmdb.org/t/p/w200/6S6I3w6jIQrEG5WBDFfV6Vt0REQ.jpg" }
    ],
    description: "Peter Parker busca a ajuda do Doutor Estranho para fazer todos esquecerem a identidade do Homem-Aranha. Quando um feitiço dá errado, inimigos perigosos de outros mundos começam a aparecer.",
    fullDescription: "Peter Parker está desenmascarado e não consegue mais separar sua vida normal dos grandes riscos de ser um super-herói. Quando ele pede ajuda ao Doutor Estranho, os riscos se tornam ainda mais perigosos, forçando-o a descobrir o que realmente significa ser o Homem-Aranha.",
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
    embed: generateEmbed("tt10872600", "movie"),
    featured: false,
    type: "movie"
  },
  {
    id: "tt0944947",
    title: "Game of Thrones",
    year: 2011,
    rating: "9.3",
    duration: null,
    seasons: 8,
    episodes: 73,
    genre: "Drama",
    classification: "18+",
    directors: null,
    creator: "David Benioff",
    creatorImage: "https://image.tmdb.org/t/p/w200/xvNN5huL0X8yJ7h3IZfGG4O2zBD.jpg",
    cast: [
      { name: "Emilia Clarke", photo: "https://image.tmdb.org/t/p/w200/dGhEWH0VvPwOGdJgAn8sJ2xJ6R8.jpg" },
      { name: "Peter Dinklage", photo: "https://image.tmdb.org/t/p/w200/9NAkHlrUc7fJ4LHW2F4lG2SOGpm.jpg" },
      { name: "Kit Harington", photo: "https://image.tmdb.org/t/p/w200/4MnqF8HY8VfLYnMaEaEQhfO01Qo.jpg" },
      { name: "Lena Headey", photo: "https://image.tmdb.org/t/p/w200/ckqcJLLG2zVFSPyBDZXKl7aKRIK.jpg" }
    ],
    description: "Nove famílias nobres lutam pelo controle das terras de Westeros, enquanto um antigo inimigo retorna.",
    fullDescription: "Game of Thrones é uma série épica de fantasia medieval que segue as lutas políticas de várias casas nobres pelo controle do Trono de Ferro dos Sete Reinos de Westeros. Baseada na série de livros 'As Crônicas de Gelo e Fogo' de George R.R. Martin, a série é conhecida por suas tramas complexas, personagens moralmente ambíguos e reviravoltas chocantes.",
    poster: "https://image.tmdb.org/t/p/w500/7WUHnWGx5OO145IRxPDUkQSh4C7.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/lGS6oOnnmWYLOnCGWZ8vSZZNaTe.jpg",
    embed: generateEmbed("tt0944947", "series"),
    featured: false,
    type: "series"
  }
];

// Função utilitária para cores de classificação - preservada do código original
const getClassificationColor = (classification) => {
  switch (classification) {
    case "L":
    case "Livre":
      return "bg-green-600";
    case "10+":
      return "bg-blue-700";
    case "12+":
      return "bg-yellow-600";
    case "14+":
      return "bg-orange-600";
    case "16+":
      return "bg-red-600";
    case "18+":
      return "bg-black";
    default:
      return "bg-gray-600";
  }
};

// Logo oficial do IMDb - preservada do código original
const IMDbIcon = (size = 16, className = "") => {
  return `<img 
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png"
    alt="IMDb"
    width="${size * 2}"
    height="${size}"
    class="${className}"
    style="object-fit: contain"
  />`;
};

// Hooks for local images - convertidas do arquivo use-local-images.ts
const getActorImage = (actorName, fallbackUrl) => {
  return fallbackUrl || `https://via.placeholder.com/48x48/ec4899/ffffff?text=${actorName.charAt(0)}`;
};

const getDirectorImage = (directorName, fallbackUrl) => {
  return fallbackUrl || `https://via.placeholder.com/48x48/666666/ffffff?text=${directorName.charAt(0)}`;
};

const getBannerImage = (fallbackUrl) => {
  return fallbackUrl || 'https://via.placeholder.com/1920x1080/333333/ffffff?text=Banner';
};

const getPosterImage = (fallbackUrl) => {
  return fallbackUrl || 'https://via.placeholder.com/300x450/666666/ffffff?text=Poster';
};

// Storage functions - convertidas de server/storage.ts
function initializeContent() {
  allContent = [...sampleContent];
  featuredContent = sampleContent.filter(item => item.featured);
  userListContent = [];
}

function getAllContent() {
  return Promise.resolve(allContent);
}

function getContentById(id) {
  const content = allContent.find(item => item.id === id);
  return Promise.resolve(content);
}

function getContentByType(type) {
  const content = allContent.filter(item => item.type === type);
  return Promise.resolve(content);
}

function getFeaturedContent() {
  return Promise.resolve(featuredContent);
}

function searchContent(query) {
  if (!query) return Promise.resolve([]);
  
  const lowerQuery = query.toLowerCase();
  const results = allContent.filter(item => 
    item.title.toLowerCase().includes(lowerQuery) ||
    item.genre.toLowerCase().includes(lowerQuery) ||
    item.description.toLowerCase().includes(lowerQuery) ||
    item.cast.some(actor => {
      const actorName = typeof actor === 'string' ? actor : actor.name;
      return actorName.toLowerCase().includes(lowerQuery);
    })
  );
  
  return Promise.resolve(results);
}

function getUserList(userId) {
  const userList = userLists.filter(item => item.userId === userId);
  return Promise.resolve(userList.map(item => item.contentId));
}

function addToUserList(userId, contentId) {
  const userList = {
    id: Date.now().toString(),
    userId: userId,
    contentId: contentId,
    addedAt: new Date().toISOString()
  };
  userLists.push(userList);
  return Promise.resolve(userList);
}

function removeFromUserList(userId, contentId) {
  const index = userLists.findIndex(item => 
    item.userId === userId && item.contentId === contentId
  );
  if (index > -1) {
    userLists.splice(index, 1);
    return Promise.resolve(true);
  }
  return Promise.resolve(false);
}

function isInUserList(userId, contentId) {
  const exists = userLists.some(item => 
    item.userId === userId && item.contentId === contentId
  );
  return Promise.resolve(exists);
}

// Simulação de API requests - convertidas de client/src/lib/queryClient.ts
async function apiRequest(method, url, data) {
  // Simulação de delay da API
  await new Promise(resolve => setTimeout(resolve, 100));
  
  if (url === "/api/content") {
    return { json: () => getAllContent() };
  } else if (url === "/api/content?featured=true") {
    return { json: () => getFeaturedContent() };
  } else if (url.startsWith("/api/content?search=")) {
    const query = decodeURIComponent(url.split("search=")[1]);
    return { json: () => searchContent(query) };
  } else if (url === "/api/user-list") {
    if (method === "POST" && data) {
      await addToUserList(currentUser.id, data.contentId);
      return { json: () => Promise.resolve({ success: true }) };
    } else {
      const contentIds = await getUserList(currentUser.id);
      const content = [];
      for (const contentId of contentIds) {
        const item = await getContentById(contentId);
        if (item) {
          content.push(item);
        }
      }
      return { json: () => Promise.resolve(content) };
    }
  } else if (url.startsWith("/api/user-list/") && method === "DELETE") {
    const contentId = url.split("/api/user-list/")[1];
    await removeFromUserList(currentUser.id, contentId);
    return { json: () => Promise.resolve({ success: true }) };
  }
  
  throw new Error(`API endpoint not found: ${url}`);
}

// Filtros de conteúdo
function getMovies() {
  return allContent.filter(item => item.type === "movie");
}

function getSeries() {
  return allContent.filter(item => item.type === "series");
}

function getContentByCategory() {
  switch(activeCategory) {
    case "movies":
      return getMovies();
    case "series":
      return getSeries();
    case "mylist":
      return userListContent;
    default:
      return allContent;
  }
}

// Navegação - convertidas das funções do React
function openDetails(content) {
  selectedContent = content;
  currentView = "details";
  window.scrollTo(0, 0);
  showDetailsView();
}

function openPlayer(content) {
  if (currentView === "details") {
    showInlinePlayer = true;
    showInlinePlayerView();
  } else {
    selectedContent = content;
    showPlayer = true;
    showPlayerModal();
  }
}

function closePlayer() {
  playerAnimating = true;
  setTimeout(() => {
    showPlayer = false;
    selectedContent = null;
    playerAnimating = false;
    hidePlayerModal();
  }, 300);
}

function goBack() {
  currentView = "home";
  selectedContent = null;
  searchTerm = "";
  selectedCategory = null;
  showInlinePlayer = false;
  hideInlinePlayerView();
  window.scrollTo(0, 0);
  showHomeView();
}

function openSearch() {
  searchTerm = "";
  currentView = "search";
  showSearchView();
}

async function toggleFavorite(contentId) {
  const isInList = userListContent.some(item => item.id === contentId);
  if (isInList) {
    await removeFromListMutation(contentId);
  } else {
    await addToListMutation(contentId);
  }
}

function isInUserList(contentId) {
  return userListContent.some(item => item.id === contentId);
}

// Mutações para lista do usuário - convertidas das mutations do React Query
async function addToListMutation(contentId) {
  try {
    await apiRequest("POST", "/api/user-list", { contentId });
    await fetchUserListContent();
    updateMyListSection();
    // Update details view if currently showing this content
    if (selectedContent && selectedContent.id === contentId) {
      updateDetailsView();
    }
  } catch (error) {
    console.error("Error adding to list:", error);
  }
}

async function removeFromListMutation(contentId) {
  try {
    await apiRequest("DELETE", `/api/user-list/${contentId}`);
    await fetchUserListContent();
    updateMyListSection();
    // Update details view if currently showing this content
    if (selectedContent && selectedContent.id === contentId) {
      updateDetailsView();
    }
  } catch (error) {
    console.error("Error removing from list:", error);
  }
}

// Fetch functions
async function fetchAllContent() {
  try {
    const response = await apiRequest("GET", "/api/content");
    allContent = await response.json();
    return allContent;
  } catch (error) {
    console.error("Error fetching content:", error);
    return [];
  }
}

async function fetchFeaturedContent() {
  try {
    const response = await apiRequest("GET", "/api/content?featured=true");
    featuredContent = await response.json();
    return featuredContent;
  } catch (error) {
    console.error("Error fetching featured content:", error);
    return [];
  }
}

async function fetchUserListContent() {
  try {
    const response = await apiRequest("GET", "/api/user-list");
    userListContent = await response.json();
    return userListContent;
  } catch (error) {
    console.error("Error fetching user list:", error);
    return [];
  }
}

async function fetchSearchResults(term) {
  if (!term) {
    searchResults = [];
    return searchResults;
  }
  try {
    const response = await apiRequest("GET", `/api/content?search=${encodeURIComponent(term)}`);
    searchResults = await response.json();
    return searchResults;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
}

// Auto-rotação de conteúdo em destaque - convertida do useEffect
function startFeaturedRotation() {
  if (featuredContent.length > 1 && activeCategory === "home") {
    progress = 0;
    
    // Limpar intervalos existentes
    if (progressInterval) clearInterval(progressInterval);
    if (contentInterval) clearInterval(contentInterval);

    // Progress animation
    progressInterval = setInterval(() => {
      progress += 1;
      if (progress >= 100) {
        progress = 0;
      }
      updateProgressBar();
    }, 100); // 100ms * 100 = 10 seconds

    // Content rotation
    contentInterval = setInterval(() => {
      fadeClass = 'fade-out';
      updateHeroFadeClass();
      setTimeout(() => {
        featuredIndex = (featuredIndex + 1) % featuredContent.length;
        fadeClass = 'fade-in';
        updateHeroFadeClass();
        updateHeroContent();
        progress = 0;
        updateProgressBar();
      }, 500);
    }, 10000);
  }
}

function stopFeaturedRotation() {
  if (progressInterval) clearInterval(progressInterval);
  if (contentInterval) clearInterval(contentInterval);
}

// Gestos de toque - convertidos dos handlers do React
function handleTouchStart(e) {
  touchStart = e.targetTouches[0].clientX;
}

function handleTouchMove(e) {
  touchEnd = e.targetTouches[0].clientX;
}

function handleTouchEnd() {
  if (!touchStart || !touchEnd) return;
  const distance = touchStart - touchEnd;
  const isLeftSwipe = distance > 50;
  const isRightSwipe = distance < -50;

  if (isLeftSwipe && featuredContent.length > 1) {
    // Swipe left - next content
    fadeClass = 'fade-out';
    updateHeroFadeClass();
    setTimeout(() => {
      featuredIndex = (featuredIndex + 1) % featuredContent.length;
      fadeClass = 'fade-in';
      updateHeroFadeClass();
      updateHeroContent();
      progress = 0;
      updateProgressBar();
    }, 500);
  }
  if (isRightSwipe && featuredContent.length > 1) {
    // Swipe right - previous content
    fadeClass = 'fade-out';
    updateHeroFadeClass();
    setTimeout(() => {
      featuredIndex = (featuredIndex - 1 + featuredContent.length) % featuredContent.length;
      fadeClass = 'fade-in';
      updateHeroFadeClass();
      updateHeroContent();
      progress = 0;
      updateProgressBar();
    }, 500);
  }
}

// ContentCard component - convertida do componente React
function createContentCard(item) {
  const isInList = isInUserList(item.id);
  const itemJsonEscaped = JSON.stringify(item).replace(/"/g, '&quot;');
  
  return `
    <div class="group relative cursor-pointer streaming-card-hover content-card fade-in" data-testid="card-content-${item.id}">
      <div class="relative aspect-[2/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/80 to-gray-900/80 mb-4 border border-gray-700/50 backdrop-blur-sm">
        <img
          src="${getPosterImage(item.poster)}"
          alt="${item.title}"
          class="w-full h-full object-cover transition-all duration-500"
          data-testid="img-poster-${item.id}"
        />
        
        <!-- Enhanced gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        
        <!-- Content overlay -->
        <div class="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div class="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
            <h4 class="text-white font-bold text-lg mb-2 line-clamp-2">${item.title}</h4>
            
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center space-x-2">
                ${IMDbIcon(16, "text-yellow-400")}
                <span class="text-white font-semibold" data-testid="text-rating-${item.id}">${item.rating}</span>
              </div>
              <span class="text-gray-300 text-sm font-medium" data-testid="text-year-${item.id}">${item.year}</span>
            </div>
            
            <div class="flex justify-center space-x-2">
              <button 
                class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg" 
                onclick="openDetails(JSON.parse('${itemJsonEscaped}'))"
                data-testid="button-play-${item.id}"
                title="Assistir"
              >
                <svg class="w-4 h-4 text-white" data-lucide="play"></svg>
              </button>
              <button 
                class="p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg ${
                  isInList 
                  ? 'bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700' 
                  : 'bg-gray-600/80 backdrop-blur-sm hover:bg-gray-600'
                }"
                onclick="toggleFavorite('${item.id}')"
                data-testid="button-favorite-${item.id}"
                title="${isInList ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"
              >
                <svg class="w-4 h-4 text-white" data-lucide="${isInList ? 'check' : 'heart'}"></svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Classification badge -->
        <div class="absolute top-3 left-3">
          <span class="${getClassificationColor(item.classification)} text-white text-xs px-3 py-1 rounded-full font-bold" data-testid="text-classification-${item.id}">
            ${item.classification}
          </span>
        </div>
      </div>
      
      <!-- Content info -->
      <div class="space-y-2 px-1">
        <h4 
          class="font-bold text-base md:text-lg leading-tight cursor-pointer hover:text-purple-400 transition-colors group-hover:text-purple-400 line-clamp-2" 
          onclick="openDetails(JSON.parse('${itemJsonEscaped}'))"
          data-testid="text-title-${item.id}"
        >
          ${item.title}
        </h4>
        <div class="flex items-center justify-between">
          <span class="text-gray-400 font-medium" data-testid="text-year-${item.id}">${item.year}</span>
          <span class="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 rounded-full text-xs font-bold border border-purple-500/30" data-testid="text-genre-${item.id}">
            ${item.genre}
          </span>
        </div>
        ${item.duration ? `<p class="text-xs text-gray-400 font-medium" data-testid="text-duration-${item.id}">${item.duration}</p>` : ''}
        ${item.seasons ? `<p class="text-xs text-gray-400 font-medium" data-testid="text-seasons-${item.id}">${item.seasons} temporadas</p>` : ''}
      </div>
    </div>
  `;
}

// Funções de atualização da UI
function updateProgressBar() {
  const progressBar = document.getElementById('hero-progress');
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
}

function updateHeroFadeClass() {
  const heroSection = document.getElementById('hero-section');
  if (heroSection) {
    heroSection.className = heroSection.className.replace(/fade-\w+/g, '') + ' ' + fadeClass;
  }
}

function updateHeroContent() {
  const currentFeatured = featuredContent[featuredIndex] || featuredContent[0];
  if (!currentFeatured) return;

  // Update background
  const heroBackground = document.getElementById('hero-background');
  if (heroBackground) {
    heroBackground.style.backgroundImage = `url(${getBannerImage(currentFeatured.backdrop)})`;
  }

  // Update title
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) {
    heroTitle.textContent = currentFeatured.title;
  }

  // Update meta information
  const heroMeta = document.getElementById('hero-meta');
  if (heroMeta) {
    heroMeta.innerHTML = `
      <span class="flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-400/30">
        ${IMDbIcon(18, "text-yellow-400")}
        <span class="font-bold" data-testid="text-hero-rating">${currentFeatured.rating}</span>
      </span>
      <span class="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm px-3 py-2 rounded-full border border-purple-400/30 font-semibold" data-testid="text-hero-genre">${currentFeatured.genre}</span>
      ${currentFeatured.seasons ? `<span class="bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full border border-white/20 font-semibold" data-testid="text-hero-seasons">${currentFeatured.seasons} temporadas</span>` : ''}
      ${currentFeatured.duration ? `<span class="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full border border-white/20"><svg class="w-3 h-3" data-lucide="clock"></svg><span class="font-semibold" data-testid="text-hero-duration">${currentFeatured.duration}</span></span>` : ''}
      <span class="bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full border border-white/20 font-semibold" data-testid="text-hero-year">${currentFeatured.year}</span>
    `;
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Update description
  const heroDescription = document.getElementById('hero-description');
  if (heroDescription) {
    heroDescription.textContent = currentFeatured.description;
  }

  // Update buttons
  const heroDetailsButton = document.getElementById('hero-details-button');
  if (heroDetailsButton) {
    heroDetailsButton.onclick = () => openDetails(currentFeatured);
  }

  const heroPlayButton = document.getElementById('hero-play-button');
  if (heroPlayButton) {
    heroPlayButton.onclick = () => openPlayer(currentFeatured);
  }
}

// Atualizar seções de conteúdo
function updateFeaturedSection() {
  const container = document.getElementById('featured-content');
  if (container && featuredContent.length > 0) {
    container.innerHTML = featuredContent.map(item => createContentCard(item)).join('');
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}

function updateMoviesSection() {
  const container = document.getElementById('movies-content');
  if (container) {
    const movies = getMovies();
    container.innerHTML = movies.map(item => createContentCard(item)).join('');
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}

function updateSeriesSection() {
  const container = document.getElementById('series-content');
  if (container) {
    const series = getSeries();
    container.innerHTML = series.map(item => createContentCard(item)).join('');
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}

function updateMyListSection() {
  const container = document.getElementById('mylist-content');
  if (container) {
    if (userListContent.length > 0) {
      container.innerHTML = userListContent.map(item => createContentCard(item)).join('');
    } else {
      container.innerHTML = `
        <div class="text-center py-12 px-6">
          <svg class="mx-auto mb-4 text-gray-600 w-16 h-16" data-lucide="heart"></svg>
          <h4 class="text-xl font-bold mb-2 text-gray-300">Sua lista está vazia</h4>
          <p class="text-gray-400">Adicione filmes e séries aos seus favoritos para vê-los aqui</p>
        </div>
      `;
    }
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}

// Funções de visualização
function showHomeView() {
  document.getElementById('home-view').style.display = 'block';
  document.getElementById('search-view').style.display = 'none';
  document.getElementById('details-view').style.display = 'none';
  
  // Update navigation
  updateNavigation('home');
  
  // Start rotation if in home
  if (activeCategory === 'home') {
    startFeaturedRotation();
  }
}

function showSearchView() {
  document.getElementById('home-view').style.display = 'none';
  document.getElementById('search-view').style.display = 'block';
  document.getElementById('details-view').style.display = 'none';
  
  stopFeaturedRotation();
  
  // Show empty state initially
  document.getElementById('search-empty-state').style.display = 'block';
  document.getElementById('search-results-container').innerHTML = '';
  
  // Focus search input
  setTimeout(() => {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.focus();
    }
  }, 100);
}

function showDetailsView() {
  document.getElementById('home-view').style.display = 'none';
  document.getElementById('search-view').style.display = 'none';
  document.getElementById('details-view').style.display = 'block';
  
  stopFeaturedRotation();
  
  if (selectedContent) {
    updateDetailsView();
  }
}

function updateDetailsView() {
  if (!selectedContent) return;

  // Update background
  const detailsBackground = document.getElementById('details-background');
  if (detailsBackground) {
    detailsBackground.style.backgroundImage = `url(${getBannerImage(selectedContent.backdrop)})`;
  }

  // Update classification
  const detailsClassification = document.getElementById('details-classification');
  if (detailsClassification) {
    detailsClassification.className = `${getClassificationColor(selectedContent.classification)} px-3 py-2 rounded-full text-white font-bold`;
    detailsClassification.textContent = selectedContent.classification;
  }

  // Update poster
  const detailsPoster = document.getElementById('details-poster');
  if (detailsPoster) {
    detailsPoster.src = getPosterImage(selectedContent.poster);
    detailsPoster.alt = selectedContent.title;
  }

  // Update title
  const detailsTitle = document.getElementById('details-title');
  if (detailsTitle) {
    detailsTitle.textContent = selectedContent.title;
  }

  // Update meta information
  const detailsMeta = document.getElementById('details-meta');
  if (detailsMeta) {
    detailsMeta.innerHTML = `
      <span class="flex items-center space-x-1 bg-gray-700/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-500/30">
        ${IMDbIcon(14, "text-white")}
        <span class="text-white font-semibold" data-testid="text-rating">${selectedContent.rating}</span>
      </span>
      <span class="bg-gray-700/80 backdrop-blur-sm px-3 py-1 rounded-full" data-testid="text-year">${selectedContent.year}</span>
      ${selectedContent.duration ? `<span class="flex items-center space-x-1 bg-gray-700/80 backdrop-blur-sm px-3 py-1 rounded-full"><svg class="w-3 h-3" data-lucide="clock"></svg><span data-testid="text-duration">${selectedContent.duration}</span></span>` : ''}
      ${selectedContent.seasons ? `<span class="bg-gray-700/80 backdrop-blur-sm px-3 py-1 rounded-full" data-testid="text-seasons">${selectedContent.seasons} temporadas • ${selectedContent.episodes} episódios</span>` : ''}
    `;
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Update synopsis header
  const detailsSynopsisHeader = document.getElementById('details-synopsis-header');
  if (detailsSynopsisHeader) {
    detailsSynopsisHeader.innerHTML = `Sinopse <span class="text-gray-400">• ${selectedContent.genre}</span>`;
  }

  // Update description
  const detailsDescription = document.getElementById('details-description');
  if (detailsDescription) {
    detailsDescription.textContent = selectedContent.fullDescription;
  }

  // Update cast
  const detailsCast = document.getElementById('details-cast');
  if (detailsCast && selectedContent.cast) {
    detailsCast.innerHTML = selectedContent.cast.map((actor, index) => {
      const actorName = typeof actor === 'string' ? actor : actor.name;
      const actorPhoto = typeof actor === 'string' ? 
        getActorImage(actorName) : 
        actor.photo || getActorImage(actorName);

      return `
        <div class="flex items-center space-x-3 flex-shrink-0">
          <img 
            src="${actorPhoto}"
            alt="${actorName}"
            class="w-12 h-12 rounded-full object-cover"
            onerror="this.src='${getActorImage(actorName)}'"
          />
          <span class="font-semibold whitespace-nowrap">${actorName}</span>
        </div>
      `;
    }).join('');
  }

  // Update favorite button
  const buttonFavorite = document.getElementById('button-favorite');
  if (buttonFavorite) {
    const isInList = isInUserList(selectedContent.id);
    buttonFavorite.className = `flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:scale-105 flex-1 ${
      isInList 
      ? 'bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white' 
      : 'bg-gray-600/80 backdrop-blur-sm hover:bg-gray-600 text-white'
    }`;
    buttonFavorite.innerHTML = `
      <svg class="w-5 h-5" data-lucide="${isInList ? 'check' : 'heart'}"></svg>
      <span>${isInList ? "Favorito" : "Favoritar"}</span>
    `;
    buttonFavorite.onclick = () => toggleFavorite(selectedContent.id);
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Update watch button
  const buttonWatch = document.getElementById('button-watch');
  if (buttonWatch) {
    buttonWatch.onclick = () => openPlayer(selectedContent);
  }
}

function showPlayerModal() {
  const playerModal = document.getElementById('player-modal');
  const playerIframe = document.getElementById('player-iframe');
  
  if (playerModal && playerIframe && selectedContent) {
    playerIframe.src = selectedContent.embed;
    playerIframe.title = selectedContent.title;
    playerModal.style.display = 'flex';
  }
}

function hidePlayerModal() {
  const playerModal = document.getElementById('player-modal');
  const playerIframe = document.getElementById('player-iframe');
  
  if (playerModal && playerIframe) {
    playerModal.style.display = 'none';
    playerIframe.src = '';
  }
}

function showInlinePlayerView() {
  const inlinePlayerContainer = document.getElementById('inline-player-container');
  const inlinePlayerIframe = document.getElementById('inline-player-iframe');
  
  if (inlinePlayerContainer && inlinePlayerIframe && selectedContent && selectedContent.embed && selectedContent.embed.trim() !== "") {
    inlinePlayerIframe.src = selectedContent.embed;
    inlinePlayerIframe.title = selectedContent.title;
    inlinePlayerContainer.style.display = 'block';
  }
}

function hideInlinePlayerView() {
  const inlinePlayerContainer = document.getElementById('inline-player-container');
  const inlinePlayerIframe = document.getElementById('inline-player-iframe');
  
  if (inlinePlayerContainer && inlinePlayerIframe) {
    inlinePlayerContainer.style.display = 'none';
    inlinePlayerIframe.src = '';
  }
  showInlinePlayer = false;
}

// Navegação
function updateNavigation(category) {
  activeCategory = category;
  
  // Update navigation buttons
  document.querySelectorAll('.nav-button').forEach(btn => {
    btn.classList.remove('active');
  });
  
  const activeBtn = document.getElementById(`nav-${category}`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
  
  // Update content visibility based on category
  if (category === 'home') {
    showHomeView();
  } else {
    stopFeaturedRotation();
  }
}

// Busca
async function performSearch(term) {
  searchTerm = term;
  
  if (!term) {
    document.getElementById('search-empty-state').style.display = 'block';
    document.getElementById('search-results-container').innerHTML = '';
    return;
  }

  document.getElementById('search-empty-state').style.display = 'none';
  
  const results = await fetchSearchResults(term);
  const container = document.getElementById('search-results-container');
  
  if (container) {
    if (results.length > 0) {
      container.innerHTML = `
        <h2 class="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Resultados para "${term}"
        </h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          ${results.map(item => createContentCard(item)).join('')}
        </div>
      `;
    } else {
      container.innerHTML = `
        <h2 class="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Nenhum resultado para "${term}"
        </h2>
        <div class="text-center py-20">
          <svg class="mx-auto mb-4 text-gray-600 w-16 h-16" data-lucide="search"></svg>
          <p class="text-gray-400 text-lg">Tente outra busca</p>
        </div>
      `;
    }
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}

// Event listeners
function setupEventListeners() {
  // Navigation
  document.getElementById('nav-home')?.addEventListener('click', () => updateNavigation('home'));
  document.getElementById('nav-search')?.addEventListener('click', openSearch);
  document.getElementById('nav-movies')?.addEventListener('click', () => updateNavigation('movies'));
  document.getElementById('nav-series')?.addEventListener('click', () => updateNavigation('series'));
  document.getElementById('nav-mylist')?.addEventListener('click', () => updateNavigation('mylist'));

  // Back buttons
  document.getElementById('button-back-search')?.addEventListener('click', goBack);
  document.getElementById('button-back')?.addEventListener('click', goBack);

  // Player controls
  document.getElementById('button-close-player')?.addEventListener('click', closePlayer);
  document.getElementById('button-close-inline-player')?.addEventListener('click', hideInlinePlayerView);

  // Search input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });
  }

  // Touch events for hero section
  const heroSection = document.getElementById('hero-section');
  if (heroSection) {
    heroSection.addEventListener('touchstart', handleTouchStart);
    heroSection.addEventListener('touchmove', handleTouchMove);
    heroSection.addEventListener('touchend', handleTouchEnd);
  }
}

// Inicialização
async function initializeApp() {
  // Initialize content
  initializeContent();
  
  // Setup event listeners
  setupEventListeners();
  
  // Fetch initial data
  await Promise.all([
    fetchAllContent(),
    fetchFeaturedContent(),
    fetchUserListContent()
  ]);
  
  // Update UI
  updateHeroContent();
  updateFeaturedSection();
  updateMoviesSection();
  updateSeriesSection();
  updateMyListSection();
  
  // Start featured rotation
  startFeaturedRotation();
  
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Expose functions to global scope for onclick handlers
window.openDetails = openDetails;
window.openPlayer = openPlayer;
window.toggleFavorite = toggleFavorite;
