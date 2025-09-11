// StreamFlix JavaScript - Complete Netflix-style functionality

// Global state management
const AppState = {
  // Authentication
  user: null,
  isAuthenticated: false,
  
  // Content data
  allContent: [],
  featuredContent: [],
  userList: [],
  
  // UI state
  currentView: 'home',
  activeCategory: 'home',
  selectedContent: null,
  selectedCategory: null,
  searchTerm: '',
  searchResults: [],
  
  // Hero carousel
  featuredIndex: 0,
  heroProgress: 0,
  heroTimer: null,
  heroProgressTimer: null,
  
  // Modals
  showModalPlayer: false,
  showInlinePlayer: false,
  showAuthModal: false,
  authMode: 'login',
  
  // Mobile
  mobileMenuOpen: false,
  userDropdownOpen: false,
  
  // Categories
  movieCategories: [
    "Ação", "Comédia", "Drama", "Terror", "Ficção Científica", 
    "Romance", "Aventura", "Thriller", "Fantasia", "Crime"
  ],
  seriesCategories: [
    "Drama", "Comédia", "Ação", "Terror", "Ficção Científica", 
    "Romance", "Thriller", "Fantasia", "Crime", "Sobrenatural"
  ]
};

// Content data - Real data from the current system
const SAMPLE_CONTENT = [
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
    embed: "https://embed.warezcdn.link/filme/tt3402138",
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
    embed: "https://embed.warezcdn.link/filme/tt5950044",
    featured: true,
    type: "movie"
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
    embed: "https://embed.warezcdn.link/serie/tt13443470",
    featured: true,
    type: "series"
  },
  {
    id: "tt15789038",
    title: "Mufasa: O Rei Leão",
    year: 2024,
    rating: "6.9",
    duration: "118 min",
    seasons: null,
    episodes: null,
    genre: "Aventura",
    classification: "L",
    directors: [
      { name: "Barry Jenkins", photo: "https://media.themoviedb.org/t/p/w200/1YKpw3LG4SkL2N2BUmJqoOCp6RL.jpg" }
    ],
    creator: null,
    creatorImage: null,
    cast: [
      { name: "Aaron Pierre", photo: "https://media.themoviedb.org/t/p/w138_and_h175_face/1XJ33F8AcB5VYAz4tWGNJqD2CgO.jpg" },
      { name: "Kelvin Harrison Jr.", photo: "https://media.themoviedb.org/t/p/w138_and_h175_face/8cO6EcMiO3AE7ZmjAj4CePkAcSS.jpg" },
      { name: "Tiffany Boone", photo: "https://media.themoviedb.org/t/p/w138_and_h175_face/4A0d02S8WDH8d0wKHQsZp7BoR9w.jpg" }
    ],
    description: "Mufasa, um filhote órfão, perdido e sozinho, encontra um simpático leão chamado Taka, herdeiro de uma linhagem real.",
    fullDescription: "Mufasa: O Rei Leão explora o improvável nascimento do querido rei da Terra do Orgulho através de Rafiki, que conta a lenda de Mufasa para a jovem filhote Kiara, filha de Simba e Nala, com Timão e Pumba emprestando seu estilo característico. Contado em flashbacks, a história apresenta Mufasa como um filhote órfão, perdido e sozinho, até conhecer um simpático leão chamado Taka – herdeiro de uma linhagem real.",
    poster: "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/lurEK87kukWNaXd0l4iOyaa342e.jpg",
    backdrop: "https://media.themoviedb.org/t/p/original/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg",
    embed: "https://embed.warezcdn.link/filme/tt15789038",
    featured: false,
    type: "movie"
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
      { name: "Anthony Russo", photo: "https://media.themoviedb.org/t/p/w200/1zBmOp2Vw5K0FAk6SYhWGO8Pjy6.jpg" },
      { name: "Joe Russo", photo: "https://media.themoviedb.org/t/p/w200/rF5sF0H3ZPT2DhLOyX8K6v0J9fP.jpg" }
    ],
    creator: null,
    creatorImage: null,
    cast: [
      { name: "Robert Downey Jr.", photo: "https://media.themoviedb.org/t/p/w138_and_h175_face/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg" },
      { name: "Chris Evans", photo: "https://media.themoviedb.org/t/p/w138_and_h175_face/3bOGNsHlrswhyW79uvIHH1V43JI.jpg" },
      { name: "Mark Ruffalo", photo: "https://media.themoviedb.org/t/p/w138_and_h175_face/isKRBwy3rvsrDrVsKyXiX3a3U6D.jpg" }
    ],
    description: "Após os eventos devastadores de Vingadores: Guerra Infinita, o universo está em ruínas devido às ações de Thanos.",
    fullDescription: "Após os eventos devastadores de Vingadores: Guerra Infinita, o universo está em ruínas. Com a ajuda dos aliados que restaram, os Vingadores devem se reunir mais uma vez para desfazer as ações de Thanos e restaurar a ordem no universo de uma vez por todas, não importando as consequências.",
    poster: "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdrop: "https://media.themoviedb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    embed: "https://embed.warezcdn.link/filme/tt4154796",
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
    classification: "16+",
    directors: null,
    creator: "David Benioff",
    creatorImage: "https://media.themoviedb.org/t/p/w200/xvNN5huL0X8yJ7h3IZfGG4O2zBD.jpg",
    cast: [
      { name: "Emilia Clarke", photo: "https://media.themoviedb.org/t/p/w138_and_h175_face/j7d083zIMhwnKid2jUlQKtMNgBh.jpg" },
      { name: "Peter Dinklage", photo: "https://media.themoviedb.org/t/p/w138_and_h175_face/9CAd7IVAHI4zNOdxjbqp4sh8exG.jpg" },
      { name: "Kit Harington", photo: "https://media.themoviedb.org/t/p/w138_and_h175_face/4Lx0gg5fiEOng3gZbgV2SqzWk4r.jpg" }
    ],
    description: "Nove famílias nobres lutam pelo controle das terras míticas de Westeros, enquanto um inimigo antigo retorna após estar adormecido por milhares de anos.",
    fullDescription: "Game of Thrones é uma série de fantasia épica baseada na série de livros 'As Crônicas de Gelo e Fogo' de George R.R. Martin. A série se passa nos continentes fictícios de Westeros e Essos e tem várias tramas e um grande elenco, mas segue três arcos narrativos principais. O primeiro acompanha uma guerra civil entre várias casas nobres pelo Trono de Ferro dos Sete Reinos; o segundo foca na última descendente de uma dinastia destronada tentando recuperar o trono; o terceiro segue a irmandade da Patrulha da Noite, que defendem o reino contra os antigos inimigos do norte.",
    poster: "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
    backdrop: "https://media.themoviedb.org/t/p/original/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg",
    embed: "https://embed.warezcdn.link/serie/tt0944947",
    featured: false,
    type: "series"
  }
];

// Utility functions
const Utils = {
  // Local storage helpers
  getFromStorage: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting from storage:', error);
      return null;
    }
  },

  setToStorage: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting to storage:', error);
    }
  },

  removeFromStorage: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  },

  // Image helpers
  getPosterImage: (posterUrl, title = '') => {
    if (!posterUrl) return 'https://via.placeholder.com/300x450/333/fff?text=' + encodeURIComponent(title || 'No Image');
    return posterUrl;
  },

  getBannerImage: (backdropUrl, title = '') => {
    if (!backdropUrl) return 'https://via.placeholder.com/1920x1080/333/fff?text=' + encodeURIComponent(title || 'No Image');
    return backdropUrl;
  },

  getActorImage: (photoUrl, name = '') => {
    if (!photoUrl) return 'https://via.placeholder.com/150x150/333/fff?text=' + encodeURIComponent(name || 'Actor');
    return photoUrl;
  },

  getDirectorImage: (photoUrl, name = '') => {
    if (!photoUrl) return 'https://via.placeholder.com/150x150/333/fff?text=' + encodeURIComponent(name || 'Director');
    return photoUrl;
  },

  // Classification colors
  getClassificationColor: (classification) => {
    switch (classification) {
      case "L":
      case "Livre":
        return "classification-L";
      case "10+":
        return "classification-10";
      case "12+":
        return "classification-12";
      case "14+":
        return "classification-14";
      case "16+":
        return "classification-16";
      case "18+":
        return "classification-18";
      default:
        return "classification-L";
    }
  },

  // Format duration
  formatDuration: (duration) => {
    if (!duration) return '';
    return duration;
  },

  // Format seasons
  formatSeasons: (seasons) => {
    if (!seasons) return '';
    return seasons === 1 ? '1 temporada' : `${seasons} temporadas`;
  },

  // Search functionality
  searchContent: (content, query) => {
    if (!query) return [];
    const searchTerm = query.toLowerCase();
    return content.filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.genre.toLowerCase().includes(searchTerm) ||
      (item.cast && item.cast.some(actor => actor.name.toLowerCase().includes(searchTerm))) ||
      (item.directors && item.directors.some(director => director.name.toLowerCase().includes(searchTerm)))
    );
  },

  // Filter content by type
  filterByType: (content, type) => {
    return content.filter(item => item.type === type);
  },

  // Filter content by genre
  filterByGenre: (content, genre) => {
    return content.filter(item => item.genre === genre);
  },

  // Get featured content
  getFeaturedContent: (content) => {
    return content.filter(item => item.featured);
  },

  // Debounce function
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

// Toast notification system
const Toast = {
  show: (message, type = 'success') => {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'error' ? 
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>' :
      type === 'warning' ?
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' :
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20,6 9,17 4,12"/></svg>';

    toast.innerHTML = `${icon}<span>${message}</span>`;
    container.appendChild(toast);

    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);

    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (container.contains(toast)) {
          container.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
};

// Authentication system
const Auth = {
  login: async (username, password) => {
    return new Promise((resolve) => {
      // Simulate API call
      setTimeout(() => {
        if (username && password) {
          const user = { id: 1, username, name: username };
          AppState.user = user;
          AppState.isAuthenticated = true;
          Utils.setToStorage('user', user);
          Utils.setToStorage('isAuthenticated', true);
          
          // Update UI
          Auth.updateUI();
          
          resolve({ success: true, user });
        } else {
          resolve({ success: false, error: 'Credenciais inválidas' });
        }
      }, 1000);
    });
  },

  register: async (username, password) => {
    return new Promise((resolve) => {
      // Simulate API call
      setTimeout(() => {
        if (username && password.length >= 6) {
          const user = { id: Date.now(), username, name: username };
          AppState.user = user;
          AppState.isAuthenticated = true;
          Utils.setToStorage('user', user);
          Utils.setToStorage('isAuthenticated', true);
          
          // Update UI
          Auth.updateUI();
          
          resolve({ success: true, user });
        } else {
          resolve({ success: false, error: 'Dados inválidos' });
        }
      }, 1000);
    });
  },

  logout: () => {
    AppState.user = null;
    AppState.isAuthenticated = false;
    AppState.userList = [];
    Utils.removeFromStorage('user');
    Utils.removeFromStorage('isAuthenticated');
    Utils.removeFromStorage('userList');
    
    // Update UI
    Auth.updateUI();
    
    // Navigate to home
    Navigation.setActiveCategory('home');
    
    Toast.show('Logout realizado com sucesso!');
  },

  updateUI: () => {
    const authButtons = document.getElementById('authButtons');
    const userInfo = document.getElementById('userInfo');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const userOnlyElements = document.querySelectorAll('.user-only');

    if (AppState.isAuthenticated && AppState.user) {
      document.body.classList.add('authenticated');
      if (authButtons) authButtons.style.display = 'none';
      if (userInfo) userInfo.style.display = 'block';
      if (usernameDisplay) usernameDisplay.textContent = AppState.user.username;
      
      userOnlyElements.forEach(el => {
        el.style.display = 'flex';
      });
    } else {
      document.body.classList.remove('authenticated');
      if (authButtons) authButtons.style.display = 'flex';
      if (userInfo) userInfo.style.display = 'none';
      
      userOnlyElements.forEach(el => {
        el.style.display = 'none';
      });
    }
  },

  loadStoredAuth: () => {
    const storedUser = Utils.getFromStorage('user');
    const storedAuth = Utils.getFromStorage('isAuthenticated');
    
    if (storedUser && storedAuth) {
      AppState.user = storedUser;
      AppState.isAuthenticated = true;
      Auth.updateUI();
    }
  }
};

// Watchlist system
const Watchlist = {
  add: (contentId) => {
    if (!AppState.isAuthenticated) {
      Toast.show('Faça login para adicionar à sua lista', 'warning');
      return false;
    }

    if (!AppState.userList.includes(contentId)) {
      AppState.userList.push(contentId);
      Utils.setToStorage('userList', AppState.userList);
      Toast.show('Adicionado à sua lista!');
      return true;
    }
    return false;
  },

  remove: (contentId) => {
    if (!AppState.isAuthenticated) return false;

    const index = AppState.userList.indexOf(contentId);
    if (index > -1) {
      AppState.userList.splice(index, 1);
      Utils.setToStorage('userList', AppState.userList);
      Toast.show('Removido da sua lista!');
      return true;
    }
    return false;
  },

  toggle: (contentId) => {
    if (Watchlist.isInList(contentId)) {
      return Watchlist.remove(contentId);
    } else {
      return Watchlist.add(contentId);
    }
  },

  isInList: (contentId) => {
    return AppState.userList.includes(contentId);
  },

  getContent: () => {
    return AppState.allContent.filter(item => AppState.userList.includes(item.id));
  },

  loadStoredList: () => {
    const storedList = Utils.getFromStorage('userList');
    if (storedList && Array.isArray(storedList)) {
      AppState.userList = storedList;
    }
  }
};

// Hero carousel system
const HeroCarousel = {
  init: () => {
    HeroCarousel.stop();
    if (AppState.featuredContent.length > 1) {
      HeroCarousel.start();
    }
  },

  start: () => {
    if (AppState.activeCategory !== 'home') return;
    
    HeroCarousel.resetProgress();
    
    // Progress animation (10 seconds total)
    AppState.heroProgressTimer = setInterval(() => {
      AppState.heroProgress += 1;
      HeroCarousel.updateProgress();
      
      if (AppState.heroProgress >= 100) {
        HeroCarousel.next();
      }
    }, 100);
  },

  stop: () => {
    if (AppState.heroTimer) {
      clearInterval(AppState.heroTimer);
      AppState.heroTimer = null;
    }
    if (AppState.heroProgressTimer) {
      clearInterval(AppState.heroProgressTimer);
      AppState.heroProgressTimer = null;
    }
  },

  next: () => {
    AppState.featuredIndex = (AppState.featuredIndex + 1) % AppState.featuredContent.length;
    HeroCarousel.resetProgress();
    HeroCarousel.render();
  },

  previous: () => {
    AppState.featuredIndex = AppState.featuredIndex === 0 ? 
      AppState.featuredContent.length - 1 : 
      AppState.featuredIndex - 1;
    HeroCarousel.resetProgress();
    HeroCarousel.render();
  },

  resetProgress: () => {
    AppState.heroProgress = 0;
    HeroCarousel.updateProgress();
  },

  updateProgress: () => {
    const progressFill = document.getElementById('heroProgressFill');
    if (progressFill) {
      progressFill.style.width = `${AppState.heroProgress}%`;
    }
  },

  render: () => {
    const heroCarousel = document.getElementById('heroCarousel');
    if (!heroCarousel || !AppState.featuredContent.length) return;

    const currentFeatured = AppState.featuredContent[AppState.featuredIndex];
    if (!currentFeatured) return;

    heroCarousel.innerHTML = `
      <div class="hero-slide active" style="background-image: url('${Utils.getBannerImage(currentFeatured.backdrop, currentFeatured.title)}')">
        <div class="hero-content">
          <h1 class="hero-title text-shadow">${currentFeatured.title}</h1>
          
          <div class="hero-meta">
            <div class="hero-rating">
              <div class="imdb-icon">IMDb</div>
              <span>${currentFeatured.rating}</span>
            </div>
            <div class="hero-genre">${currentFeatured.genre}</div>
            ${currentFeatured.seasons ? `<span class="hero-duration">${Utils.formatSeasons(currentFeatured.seasons)}</span>` : ''}
            ${currentFeatured.duration ? `<div class="hero-duration">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
              <span>${currentFeatured.duration}</span>
            </div>` : ''}
          </div>
          
          <p class="hero-description">${currentFeatured.description}</p>
          
          <div class="hero-buttons">
            <button onclick="Player.openModal('${currentFeatured.id}')" class="btn btn-primary btn-large play-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
              Assistir Agora
            </button>
            
            <button onclick="Details.open('${currentFeatured.id}')" class="btn btn-secondary btn-large info-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              Mais Informações
            </button>
            
            ${AppState.isAuthenticated ? `
              <button onclick="Watchlist.toggle('${currentFeatured.id}'); HeroCarousel.render();" class="btn btn-secondary btn-large favorite-button ${Watchlist.isInList(currentFeatured.id) ? 'active' : ''}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="${Watchlist.isInList(currentFeatured.id) ? 'currentColor' : 'none'}" stroke="currentColor">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                ${Watchlist.isInList(currentFeatured.id) ? 'Na Minha Lista' : 'Adicionar à Lista'}
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    // Add touch gesture support
    HeroCarousel.addTouchSupport(heroCarousel);
  },

  addTouchSupport: (element) => {
    let touchStartX = 0;
    let touchEndX = 0;

    element.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    element.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const distance = touchStartX - touchEndX;
      
      if (Math.abs(distance) > 50) {
        if (distance > 0) {
          HeroCarousel.next();
        } else {
          HeroCarousel.previous();
        }
      }
    }, { passive: true });
  }
};

// Content rendering system
const ContentRenderer = {
  renderCard: (item) => {
    const isInList = Watchlist.isInList(item.id);
    
    return `
      <div class="content-card streaming-card-hover" data-content-id="${item.id}">
        <div class="content-card-image">
          <img src="${Utils.getPosterImage(item.poster, item.title)}" 
               alt="${item.title}" 
               class="content-poster" 
               loading="lazy">
          
          <div class="content-overlay">
            <h4 class="content-overlay-title">${item.title}</h4>
            
            <div class="content-overlay-meta">
              <div class="content-rating">
                <div class="imdb-icon">IMDb</div>
                <span>${item.rating}</span>
              </div>
              <span class="content-year">${item.year}</span>
            </div>
            
            <div class="content-actions">
              <button class="content-action play" onclick="Details.open('${item.id}')" title="Ver detalhes">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
              </button>
              
              ${AppState.isAuthenticated ? `
                <button class="content-action favorite ${isInList ? 'active' : ''}" 
                        onclick="ContentRenderer.toggleFavorite('${item.id}')" 
                        title="${isInList ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="${isInList ? 'currentColor' : 'none'}" stroke="currentColor">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
              ` : ''}
            </div>
          </div>
          
          <div class="content-classification ${Utils.getClassificationColor(item.classification)}">
            ${item.classification}
          </div>
        </div>
        
        <div class="content-info">
          <h4 class="content-title" onclick="Details.open('${item.id}')">${item.title}</h4>
          <div class="content-meta">
            <span class="content-meta-year">${item.year}</span>
            <span class="content-genre">${item.genre}</span>
          </div>
          ${item.duration ? `<p class="content-duration">${item.duration}</p>` : ''}
          ${item.seasons ? `<p class="content-seasons">${Utils.formatSeasons(item.seasons)}</p>` : ''}
        </div>
      </div>
    `;
  },

  toggleFavorite: (contentId) => {
    if (Watchlist.toggle(contentId)) {
      // Re-render current view to update favorite states
      Navigation.render();
    }
  },

  renderSection: (title, items) => {
    if (!items || items.length === 0) return '';
    
    return `
      <div class="content-section">
        <div class="section-header">
          <h3 class="section-title">${title}</h3>
          <div class="section-gradient"></div>
        </div>
        <div class="content-scroll">
          ${items.map(item => ContentRenderer.renderCard(item)).join('')}
        </div>
      </div>
    `;
  },

  renderCategoryCard: (category, type) => {
    return `
      <div class="category-card" onclick="Navigation.selectCategory('${category}')">
        <div class="category-card-content">
          <svg class="category-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          <h3 class="category-name">${category}</h3>
          <p class="category-description">${type === 'movie' ? 'Filmes' : 'Séries'} de ${category.toLowerCase()}</p>
        </div>
      </div>
    `;
  }
};

// Navigation system
const Navigation = {
  setActiveCategory: (category) => {
    AppState.activeCategory = category;
    AppState.selectedCategory = null;
    
    // Update nav links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.category === category) {
        link.classList.add('active');
      }
    });
    
    // Close mobile menu
    Navigation.closeMobileMenu();
    
    // Stop hero carousel if not on home
    if (category !== 'home') {
      HeroCarousel.stop();
    }
    
    Navigation.render();
  },

  selectCategory: (categoryName) => {
    AppState.selectedCategory = categoryName;
    Navigation.render();
  },

  render: () => {
    const heroSection = document.getElementById('heroSection');
    const categoryHeader = document.getElementById('categoryHeader');
    const categoryTitle = document.getElementById('categoryTitle');
    const categoryDescription = document.getElementById('categoryDescription');
    const categoryGrid = document.getElementById('categoryGrid');
    const contentSections = document.getElementById('contentSections');
    const emptyState = document.getElementById('emptyState');

    // Hide/show hero section
    if (heroSection) {
      heroSection.style.display = AppState.activeCategory === 'home' ? 'block' : 'none';
    }

    // Update category header
    let title = '';
    let description = '';

    switch (AppState.activeCategory) {
      case 'home':
        title = 'Início';
        description = 'Descubra filmes e séries incríveis';
        break;
      case 'movies':
        title = AppState.selectedCategory || 'Filmes';
        description = AppState.selectedCategory ? 
          `Filmes de ${AppState.selectedCategory.toLowerCase()}` : 
          'Explore nossa coleção de filmes';
        break;
      case 'series':
        title = AppState.selectedCategory || 'Séries';
        description = AppState.selectedCategory ? 
          `Séries de ${AppState.selectedCategory.toLowerCase()}` : 
          'Descubra séries envolventes';
        break;
      case 'mylist':
        title = 'Minha Lista';
        description = 'Seus filmes e séries favoritos';
        break;
    }

    if (categoryTitle) categoryTitle.textContent = title;
    if (categoryDescription) categoryDescription.textContent = description;

    // Render content based on active category
    let sectionsHTML = '';
    let showCategoryGrid = false;
    let showEmptyState = false;

    if (AppState.activeCategory === 'home') {
      // Home view - show hero and content sections
      if (AppState.featuredContent.length > 0) {
        HeroCarousel.render();
        HeroCarousel.init();
      }

      const movies = Utils.filterByType(AppState.allContent, 'movie');
      const series = Utils.filterByType(AppState.allContent, 'series');

      sectionsHTML = 
        ContentRenderer.renderSection('Em Destaque', AppState.featuredContent) +
        ContentRenderer.renderSection('Filmes Populares', movies.slice(0, 12)) +
        ContentRenderer.renderSection('Séries em Alta', series.slice(0, 12));

    } else if (AppState.activeCategory === 'movies') {
      if (!AppState.selectedCategory) {
        // Show movie categories
        showCategoryGrid = true;
        if (categoryGrid) {
          categoryGrid.innerHTML = AppState.movieCategories
            .map(category => ContentRenderer.renderCategoryCard(category, 'movie'))
            .join('');
        }
      } else {
        // Show movies from selected category
        const filteredMovies = Utils.filterByGenre(
          Utils.filterByType(AppState.allContent, 'movie'), 
          AppState.selectedCategory
        );
        
        if (filteredMovies.length > 0) {
          sectionsHTML = ContentRenderer.renderSection(
            `Filmes de ${AppState.selectedCategory}`, 
            filteredMovies
          );
        } else {
          showEmptyState = true;
        }
      }

    } else if (AppState.activeCategory === 'series') {
      if (!AppState.selectedCategory) {
        // Show series categories
        showCategoryGrid = true;
        if (categoryGrid) {
          categoryGrid.innerHTML = AppState.seriesCategories
            .map(category => ContentRenderer.renderCategoryCard(category, 'series'))
            .join('');
        }
      } else {
        // Show series from selected category
        const filteredSeries = Utils.filterByGenre(
          Utils.filterByType(AppState.allContent, 'series'), 
          AppState.selectedCategory
        );
        
        if (filteredSeries.length > 0) {
          sectionsHTML = ContentRenderer.renderSection(
            `Séries de ${AppState.selectedCategory}`, 
            filteredSeries
          );
        } else {
          showEmptyState = true;
        }
      }

    } else if (AppState.activeCategory === 'mylist') {
      const userContent = Watchlist.getContent();
      
      if (userContent.length > 0) {
        sectionsHTML = ContentRenderer.renderSection('Minha Lista', userContent);
      } else {
        showEmptyState = true;
      }
    }

    // Update UI elements
    if (categoryGrid) {
      categoryGrid.style.display = showCategoryGrid ? 'grid' : 'none';
    }

    if (contentSections) {
      contentSections.innerHTML = sectionsHTML;
      contentSections.style.display = sectionsHTML ? 'block' : 'none';
    }

    if (emptyState) {
      emptyState.style.display = showEmptyState ? 'block' : 'none';
    }
  },

  toggleMobileMenu: () => {
    AppState.mobileMenuOpen = !AppState.mobileMenuOpen;
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      mobileMenu.classList.toggle('open', AppState.mobileMenuOpen);
    }
  },

  closeMobileMenu: () => {
    AppState.mobileMenuOpen = false;
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      mobileMenu.classList.remove('open');
    }
  },

  toggleUserMenu: () => {
    AppState.userDropdownOpen = !AppState.userDropdownOpen;
    const userDropdown = document.getElementById('userDropdown');
    if (userDropdown) {
      userDropdown.classList.toggle('open', AppState.userDropdownOpen);
    }
  }
};

// Search system
const Search = {
  open: () => {
    AppState.currentView = 'search';
    AppState.searchTerm = '';
    AppState.searchResults = [];
    
    const searchView = document.getElementById('searchView');
    const mainContent = document.getElementById('viewContainer');
    
    if (searchView && mainContent) {
      searchView.style.display = 'block';
      mainContent.style.display = 'none';
      
      // Focus on search input
      const searchInput = document.getElementById('searchInputLarge');
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 100);
      }
    }
    
    Search.render();
  },

  close: () => {
    AppState.currentView = 'home';
    AppState.searchTerm = '';
    AppState.searchResults = [];
    
    const searchView = document.getElementById('searchView');
    const mainContent = document.getElementById('viewContainer');
    
    if (searchView && mainContent) {
      searchView.style.display = 'none';
      mainContent.style.display = 'block';
    }
  },

  handleInput: Utils.debounce((query) => {
    AppState.searchTerm = query;
    AppState.searchResults = Utils.searchContent(AppState.allContent, query);
    Search.render();
  }, 300),

  render: () => {
    const searchEmpty = document.getElementById('searchEmpty');
    const searchResultsContent = document.getElementById('searchResultsContent');
    const searchResultsTitle = document.getElementById('searchResultsTitle');
    const searchResultsGrid = document.getElementById('searchResultsGrid');

    if (!AppState.searchTerm) {
      // Show empty state
      if (searchEmpty) searchEmpty.style.display = 'block';
      if (searchResultsContent) searchResultsContent.style.display = 'none';
    } else {
      // Show results
      if (searchEmpty) searchEmpty.style.display = 'none';
      if (searchResultsContent) searchResultsContent.style.display = 'block';
      
      const resultCount = AppState.searchResults.length;
      if (searchResultsTitle) {
        searchResultsTitle.textContent = resultCount > 0 ? 
          `${resultCount} resultado${resultCount !== 1 ? 's' : ''} para "${AppState.searchTerm}"` :
          `Nenhum resultado para "${AppState.searchTerm}"`;
      }
      
      if (searchResultsGrid) {
        searchResultsGrid.innerHTML = AppState.searchResults
          .map(item => ContentRenderer.renderCard(item))
          .join('');
      }
    }
  }
};

// Details system
const Details = {
  open: (contentId) => {
    const content = AppState.allContent.find(item => item.id === contentId);
    if (!content) return;

    AppState.selectedContent = content;
    AppState.currentView = 'details';
    
    const detailsView = document.getElementById('detailsView');
    const searchView = document.getElementById('searchView');
    const mainContent = document.getElementById('viewContainer');
    
    if (detailsView) {
      detailsView.style.display = 'block';
      if (searchView) searchView.style.display = 'none';
      if (mainContent) mainContent.style.display = 'none';
      
      // Scroll to top
      detailsView.scrollTop = 0;
    }
    
    Details.render();
  },

  close: () => {
    AppState.selectedContent = null;
    AppState.showInlinePlayer = false;
    
    const detailsView = document.getElementById('detailsView');
    const inlinePlayer = document.getElementById('inlinePlayer');
    
    if (detailsView) detailsView.style.display = 'none';
    if (inlinePlayer) inlinePlayer.style.display = 'none';
    
    // Return to previous view
    if (AppState.currentView === 'details') {
      const searchView = document.getElementById('searchView');
      const mainContent = document.getElementById('viewContainer');
      
      if (AppState.searchTerm) {
        AppState.currentView = 'search';
        if (searchView) searchView.style.display = 'block';
      } else {
        AppState.currentView = 'home';
        if (mainContent) mainContent.style.display = 'block';
      }
    }
  },

  render: () => {
    const content = AppState.selectedContent;
    if (!content) return;

    const isInList = Watchlist.isInList(content.id);

    // Update backdrop
    const detailsBackdrop = document.getElementById('detailsBackdrop');
    if (detailsBackdrop) {
      detailsBackdrop.style.backgroundImage = `url('${Utils.getBannerImage(content.backdrop, content.title)}')`;
    }

    // Update classification badge
    const classificationBadge = document.getElementById('classificationBadge');
    if (classificationBadge) {
      classificationBadge.className = `classification-badge ${Utils.getClassificationColor(content.classification)}`;
      classificationBadge.textContent = content.classification;
    }

    // Update poster
    const detailsPosterSmall = document.getElementById('detailsPosterSmall');
    if (detailsPosterSmall) {
      detailsPosterSmall.innerHTML = `<img src="${Utils.getPosterImage(content.poster, content.title)}" alt="${content.title}">`;
    }

    const detailsPosterLarge = document.getElementById('detailsPosterLarge');
    if (detailsPosterLarge) {
      detailsPosterLarge.innerHTML = `<img src="${Utils.getPosterImage(content.poster, content.title)}" alt="${content.title}">`;
    }

    // Update title and meta
    const detailsTitle = document.getElementById('detailsTitle');
    if (detailsTitle) detailsTitle.textContent = content.title;

    const detailsMeta = document.getElementById('detailsMeta');
    if (detailsMeta) {
      detailsMeta.innerHTML = `
        <div class="details-rating">
          <div class="imdb-icon">IMDb</div>
          <span>${content.rating}</span>
        </div>
        <div class="details-genre">${content.genre}</div>
        <div class="details-year">${content.year}</div>
        ${content.seasons ? `<span class="details-duration">${Utils.formatSeasons(content.seasons)}</span>` : ''}
        ${content.duration ? `<div class="details-duration">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14"/>
          </svg>
          <span>${content.duration}</span>
        </div>` : ''}
      `;
    }

    // Update description
    const detailsDescription = document.getElementById('detailsDescription');
    if (detailsDescription) detailsDescription.textContent = content.description;

    const detailsFullDescription = document.getElementById('detailsFullDescription');
    if (detailsFullDescription) detailsFullDescription.textContent = content.fullDescription || content.description;

    // Update favorite button
    const favoriteButton = document.getElementById('favoriteButton');
    const favoriteIcon = document.getElementById('favoriteIcon');
    const favoriteText = document.getElementById('favoriteText');
    
    if (favoriteButton && AppState.isAuthenticated) {
      favoriteButton.style.display = 'flex';
      favoriteButton.className = `btn btn-secondary btn-large favorite-button ${isInList ? 'active' : ''}`;
      
      if (favoriteIcon) {
        favoriteIcon.setAttribute('fill', isInList ? 'currentColor' : 'none');
      }
      
      if (favoriteText) {
        favoriteText.textContent = isInList ? 'Na Minha Lista' : 'Adicionar à Lista';
      }
    } else if (favoriteButton) {
      favoriteButton.style.display = 'none';
    }

    // Update cast
    const castGrid = document.getElementById('castGrid');
    if (castGrid && content.cast) {
      castGrid.innerHTML = content.cast.map(actor => `
        <div class="cast-member">
          <img src="${Utils.getActorImage(actor.photo, actor.name)}" 
               alt="${actor.name}" 
               class="cast-photo"
               loading="lazy">
          <span class="cast-name">${actor.name}</span>
        </div>
      `).join('');
    }

    // Update directors
    const directorsGrid = document.getElementById('directorsGrid');
    const directorsSection = document.getElementById('directorsSection');
    
    if (content.directors && content.directors.length > 0) {
      if (directorsSection) directorsSection.style.display = 'block';
      if (directorsGrid) {
        directorsGrid.innerHTML = content.directors.map(director => `
          <div class="director-member">
            <img src="${Utils.getDirectorImage(director.photo, director.name)}" 
                 alt="${director.name}" 
                 class="director-photo"
                 loading="lazy">
            <span class="director-name">${director.name}</span>
          </div>
        `).join('');
      }
    } else if (content.creator) {
      if (directorsSection) {
        directorsSection.style.display = 'block';
        const directorH2 = directorsSection.querySelector('h2');
        if (directorH2) directorH2.textContent = 'Criação';
      }
      if (directorsGrid) {
        directorsGrid.innerHTML = `
          <div class="director-member">
            <img src="${Utils.getDirectorImage(content.creatorImage, content.creator)}" 
                 alt="${content.creator}" 
                 class="director-photo"
                 loading="lazy">
            <span class="director-name">${content.creator}</span>
          </div>
        `;
      }
    } else {
      if (directorsSection) directorsSection.style.display = 'none';
    }

    // Update specs
    const detailsSpecs = document.getElementById('detailsSpecs');
    if (detailsSpecs) {
      detailsSpecs.innerHTML = `
        <div class="spec-item">
          <span class="spec-label">Avaliação</span>
          <span class="spec-value spec-rating">${content.rating}/10</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">Ano</span>
          <span class="spec-value">${content.year}</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">Gênero</span>
          <span class="spec-value">${content.genre}</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">Classificação</span>
          <span class="spec-value">${content.classification}</span>
        </div>
        ${content.duration ? `
          <div class="spec-item">
            <span class="spec-label">Duração</span>
            <span class="spec-value">${content.duration}</span>
          </div>
        ` : ''}
        ${content.seasons ? `
          <div class="spec-item">
            <span class="spec-label">Temporadas</span>
            <span class="spec-value">${content.seasons}</span>
          </div>
        ` : ''}
        ${content.episodes ? `
          <div class="spec-item">
            <span class="spec-label">Episódios</span>
            <span class="spec-value">${content.episodes}</span>
          </div>
        ` : ''}
      `;
    }
  }
};

// Player system
const Player = {
  openModal: (contentId) => {
    const content = AppState.allContent.find(item => item.id === contentId);
    if (!content) return;

    AppState.selectedContent = content;
    AppState.showModalPlayer = true;
    
    const modalPlayer = document.getElementById('modalPlayer');
    const modalPlayerFrame = document.getElementById('modalPlayerFrame');
    
    if (modalPlayer && modalPlayerFrame) {
      modalPlayerFrame.src = content.embed;
      modalPlayer.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  },

  closeModal: () => {
    AppState.showModalPlayer = false;
    
    const modalPlayer = document.getElementById('modalPlayer');
    const modalPlayerFrame = document.getElementById('modalPlayerFrame');
    
    if (modalPlayer && modalPlayerFrame) {
      modalPlayer.style.display = 'none';
      modalPlayerFrame.src = '';
      document.body.style.overflow = '';
    }
  },

  openInline: () => {
    if (!AppState.selectedContent) return;

    AppState.showInlinePlayer = true;
    
    const inlinePlayer = document.getElementById('inlinePlayer');
    const inlinePlayerFrame = document.getElementById('inlinePlayerFrame');
    
    if (inlinePlayer && inlinePlayerFrame) {
      inlinePlayerFrame.src = AppState.selectedContent.embed;
      inlinePlayer.style.display = 'block';
      inlinePlayer.scrollIntoView({ behavior: 'smooth' });
    }
  },

  closeInline: () => {
    AppState.showInlinePlayer = false;
    
    const inlinePlayer = document.getElementById('inlinePlayer');
    const inlinePlayerFrame = document.getElementById('inlinePlayerFrame');
    
    if (inlinePlayer && inlinePlayerFrame) {
      inlinePlayer.style.display = 'none';
      inlinePlayerFrame.src = '';
    }
  }
};

// Auth modal system
const AuthModal = {
  show: (mode = 'login') => {
    AppState.authMode = mode;
    AppState.showAuthModal = true;
    
    const authModal = document.getElementById('authModal');
    if (authModal) {
      authModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
    
    AuthModal.render();
  },

  close: () => {
    AppState.showAuthModal = false;
    
    const authModal = document.getElementById('authModal');
    if (authModal) {
      authModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  },

  toggle: () => {
    AppState.authMode = AppState.authMode === 'login' ? 'register' : 'login';
    AuthModal.render();
  },

  render: () => {
    const authModalTitle = document.getElementById('authModalTitle');
    const authModalSubtitle = document.getElementById('authModalSubtitle');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const authToggleText = document.getElementById('authToggleText');
    const authToggleButton = document.getElementById('authToggleButton');

    if (AppState.authMode === 'login') {
      if (authModalTitle) authModalTitle.textContent = 'Entrar na sua conta';
      if (authModalSubtitle) authModalSubtitle.textContent = 'Acesse milhares de filmes e séries';
      if (loginForm) loginForm.style.display = 'block';
      if (registerForm) registerForm.style.display = 'none';
      if (authToggleText) authToggleText.textContent = 'Não tem uma conta?';
      if (authToggleButton) authToggleButton.textContent = 'Cadastre-se agora';
    } else {
      if (authModalTitle) authModalTitle.textContent = 'Criar sua conta';
      if (authModalSubtitle) authModalSubtitle.textContent = 'Junte-se a milhões de usuários';
      if (loginForm) loginForm.style.display = 'none';
      if (registerForm) registerForm.style.display = 'block';
      if (authToggleText) authToggleText.textContent = 'Já tem uma conta?';
      if (authToggleButton) authToggleButton.textContent = 'Entrar agora';
    }
  }
};

// Loading system
const Loading = {
  show: (text = 'Carregando...') => {
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingText = document.querySelector('.loading-text');
    
    if (loadingOverlay) {
      loadingOverlay.style.display = 'flex';
      if (loadingText) loadingText.textContent = text;
    }
  },

  hide: () => {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
      loadingOverlay.style.display = 'none';
    }
  }
};

// Event handlers
async function login(event) {
  event.preventDefault();
  
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  
  if (!username || !password) {
    Toast.show('Preencha todos os campos', 'error');
    return;
  }
  
  Loading.show('Entrando...');
  
  try {
    const result = await Auth.login(username, password);
    
    if (result.success) {
      AuthModal.close();
      Toast.show(`Bem-vindo, ${result.user.username}!`);
    } else {
      Toast.show(result.error || 'Erro ao fazer login', 'error');
    }
  } catch (error) {
    Toast.show('Erro interno. Tente novamente.', 'error');
  } finally {
    Loading.hide();
  }
}

async function register(event) {
  event.preventDefault();
  
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;
  
  if (!username || !password) {
    Toast.show('Preencha todos os campos', 'error');
    return;
  }
  
  if (password.length < 6) {
    Toast.show('A senha deve ter pelo menos 6 caracteres', 'error');
    return;
  }
  
  Loading.show('Criando conta...');
  
  try {
    const result = await Auth.register(username, password);
    
    if (result.success) {
      AuthModal.close();
      Toast.show(`Conta criada com sucesso! Bem-vindo, ${result.user.username}!`);
    } else {
      Toast.show(result.error || 'Erro ao criar conta', 'error');
    }
  } catch (error) {
    Toast.show('Erro interno. Tente novamente.', 'error');
  } finally {
    Loading.hide();
  }
}

function logout() {
  Auth.logout();
  Navigation.toggleUserMenu();
}

function showAuthModal(mode) {
  AuthModal.show(mode);
}

function closeAuthModal() {
  AuthModal.close();
}

function toggleAuthMode() {
  AuthModal.toggle();
}

function openSearch() {
  Search.open();
}

function closeSearch() {
  Search.close();
}

function setActiveCategory(category) {
  Navigation.setActiveCategory(category);
}

function openDetails(contentId) {
  Details.open(contentId);
}

function closeDetails() {
  Details.close();
}

function openPlayer() {
  if (AppState.selectedContent) {
    Player.openModal(AppState.selectedContent.id);
  }
}

function openInlinePlayer() {
  Player.openInline();
}

function closeInlinePlayer() {
  Player.closeInline();
}

function closeModalPlayer() {
  Player.closeModal();
}

function toggleCurrentFavorite() {
  if (AppState.selectedContent) {
    if (Watchlist.toggle(AppState.selectedContent.id)) {
      Details.render();
    }
  }
}

function toggleMobileMenu() {
  Navigation.toggleMobileMenu();
}

function closeMobileMenu() {
  Navigation.closeMobileMenu();
}

function toggleUserMenu() {
  Navigation.toggleUserMenu();
}

// Initialize app
function initApp() {
  // Load data
  AppState.allContent = [...SAMPLE_CONTENT];
  AppState.featuredContent = Utils.getFeaturedContent(AppState.allContent);
  
  // Load stored data
  Auth.loadStoredAuth();
  Watchlist.loadStoredList();
  
  // Set up search input handlers
  const searchInput = document.getElementById('searchInput');
  const searchInputLarge = document.getElementById('searchInputLarge');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      if (e.target.value) {
        AppState.searchTerm = e.target.value;
        Search.open();
        searchInputLarge.value = e.target.value;
        Search.handleInput(e.target.value);
      }
    });
  }
  
  if (searchInputLarge) {
    searchInputLarge.addEventListener('input', (e) => {
      Search.handleInput(e.target.value);
    });
  }
  
  // Set up click outside handlers
  document.addEventListener('click', (e) => {
    // Close user dropdown if clicking outside
    const userInfo = document.getElementById('userInfo');
    if (userInfo && !userInfo.contains(e.target)) {
      AppState.userDropdownOpen = false;
      const userDropdown = document.getElementById('userDropdown');
      if (userDropdown) {
        userDropdown.classList.remove('open');
      }
    }
    
    // Close mobile menu if clicking outside
    const navbar = document.querySelector('.navbar');
    if (navbar && !navbar.contains(e.target)) {
      Navigation.closeMobileMenu();
    }
  });
  
  // Set up modal backdrop handlers
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-player-backdrop')) {
      Player.closeModal();
    }
    if (e.target.classList.contains('auth-modal-backdrop')) {
      AuthModal.close();
    }
  });
  
  // Set up keyboard handlers
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (AppState.showModalPlayer) {
        Player.closeModal();
      } else if (AppState.showAuthModal) {
        AuthModal.close();
      } else if (AppState.currentView === 'search') {
        Search.close();
      } else if (AppState.currentView === 'details') {
        Details.close();
      }
    }
  });
  
  // Initial render
  Navigation.setActiveCategory('home');
  
  console.log('StreamFlix App initialized successfully!');
}

// Start the app when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
