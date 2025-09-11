// Código convertido de client/src/components/StreamingApp.tsx, client/src/hooks/use-local-images.ts e client/src/lib/queryClient.ts

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

// Dados - substituindo React Query
let allContent = [];
let featuredContent = [];
let userListContent = [];
let searchResults = [];

// Progresso da auto-rotação
let progress = 0;
let progressInterval = null;
let contentInterval = null;

// Estado do inline player
let showInlinePlayer = false;

// Cache simples para substituir React Query
const cache = new Map();

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

// Função de requisição API - convertida de client/src/lib/queryClient.ts
async function throwIfResNotOk(res) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

async function apiRequest(method, url, data) {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

// Cache e fetch de dados
async function fetchData(url, cacheKey) {
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const response = await fetch(url, {
      credentials: "include",
    });
    await throwIfResNotOk(response);
    const data = await response.json();
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return [];
  }
}

// Fetch de todo o conteúdo
async function fetchAllContent() {
  allContent = await fetchData("/api/content", "/api/content");
  return allContent;
}

// Fetch de conteúdo em destaque
async function fetchFeaturedContent() {
  featuredContent = await fetchData("/api/content?featured=true", "/api/content/featured");
  return featuredContent;
}

// Fetch da lista do usuário
async function fetchUserListContent() {
  userListContent = await fetchData("/api/user-list", "/api/user-list");
  return userListContent;
}

// Fetch de resultados de busca
async function fetchSearchResults(term) {
  if (!term) {
    searchResults = [];
    return searchResults;
  }
  searchResults = await fetchData(`/api/content?search=${encodeURIComponent(term)}`, `/api/content/search/${term}`);
  return searchResults;
}

// Mutações para lista do usuário - convertidas das mutations do React Query
async function addToListMutation(contentId) {
  try {
    await apiRequest("POST", "/api/user-list", { contentId });
    // Invalidar cache
    cache.delete("/api/user-list");
    await fetchUserListContent();
    updateMyListSection();
  } catch (error) {
    console.error("Error adding to list:", error);
  }
}

async function removeFromListMutation(contentId) {
  try {
    await apiRequest("DELETE", `/api/user-list/${contentId}`);
    // Invalidar cache
    cache.delete("/api/user-list");
    await fetchUserListContent();
    updateMyListSection();
  } catch (error) {
    console.error("Error removing from list:", error);
  }
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
  window.scrollTo(0, 0);
  showHomeView();
}

function openSearch() {
  searchTerm = "";
  currentView = "search";
  showSearchView();
}

function toggleFavorite(contentId) {
  const isInList = userListContent.some(item => item.id === contentId);
  if (isInList) {
    removeFromListMutation(contentId);
  } else {
    addToListMutation(contentId);
  }
}

function isInUserList(contentId) {
  return userListContent.some(item => item.id === contentId);
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
                onclick="openDetails(${JSON.stringify(item).replace(/"/g, '&quot;')})"
                data-testid="button-play-${item.id}"
                title="Assistir"
              >
                <i data-lucide="play" class="w-4 h-4 text-white"></i>
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
                <i data-lucide="${isInList ? 'check' : 'heart'}" class="w-4 h-4 text-white"></i>
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
          onclick="openDetails(${JSON.stringify(item).replace(/"/g, '&quot;')})"
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
      ${currentFeatured.duration ? `<span class="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full border border-white/20"><i data-lucide="clock" class="w-3 h-3"></i><span class="font-semibold" data-testid="text-hero-duration">${currentFeatured.duration}</span></span>` : ''}
      <span class="bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full border border-white/20 font-semibold" data-testid="text-hero-year">${currentFeatured.year}</span>
    `;
    lucide.createIcons();
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
    lucide.createIcons();
  }
}

function updateMoviesSection() {
  const container = document.getElementById('movies-content');
  if (container) {
    const movies = getMovies();
    container.innerHTML = movies.map(item => createContentCard(item)).join('');
    lucide.createIcons();
  }
}

function updateSeriesSection() {
  const container = document.getElementById('series-content');
  if (container) {
    const series = getSeries();
    container.innerHTML = series.map(item => createContentCard(item)).join('');
    lucide.createIcons();
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
          <i data-lucide="heart" class="mx-auto mb-4 text-gray-600 w-16 h-16"></i>
          <h4 class="text-xl font-bold mb-2 text-gray-300">Sua lista está vazia</h4>
          <p class="text-gray-400">Adicione filmes e séries aos seus favoritos para vê-los aqui</p>
        </div>
      `;
    }
    lucide.createIcons();
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
      ${selectedContent.duration ? `<span class="flex items-center space-x-1 bg-gray-700/80 backdrop-blur-sm px-3 py-1 rounded-full"><i data-lucide="clock" class="w-3 h-3"></i><span data-testid="text-duration">${selectedContent.duration}</span></span>` : ''}
      ${selectedContent.seasons ? `<span class="bg-gray-700/80 backdrop-blur-sm px-3 py-1 rounded-full" data-testid="text-seasons">${selectedContent.seasons} temporadas • ${selectedContent.episodes} episódios</span>` : ''}
    `;
    lucide.createIcons();
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
      <i data-lucide="${isInList ? 'check' : 'heart'}" class="w-5 h-5"></i>
      <span>${isInList ? "Favorito" : "Favoritar"}</span>
    `;
    buttonFavorite.onclick = () => toggleFavorite(selectedContent.id);
    lucide.createIcons();
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
          <i data-lucide="search" class="mx-auto mb-4 text-gray-600 w-16 h-16"></i>
          <p class="text-gray-400 text-lg">Tente outra busca</p>
        </div>
      `;
    }
    lucide.createIcons();
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
