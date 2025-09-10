// StreamFlix JavaScript - Complete functionality

// Sample content data (simulating database)
const CONTENT_DATA = [
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
        id: "tt1234567",
        title: "Avatar: O Caminho da Água",
        year: 2022,
        rating: "7.6",
        duration: "192 min",
        seasons: null,
        episodes: null,
        genre: "Ficção Científica",
        classification: "12+",
        directors: [
            { name: "James Cameron", photo: "https://media.themoviedb.org/t/p/w200/5YkGLdPQY9lJpfLQx4LlmCGvhgX.jpg" }
        ],
        creator: null,
        creatorImage: null,
        cast: [
            { name: "Sam Worthington", photo: "https://media.themoviedb.org/t/p/w138_and_h175_face/sRLev3wJioBgun3ZoeAUFpkLy0D.jpg" },
            { name: "Zoe Saldana", photo: "https://media.themoviedb.org/t/p/w138_and_h175_face/sk15ch2IQ6k6vWu07Jr77yw4oj5.jpg" }
        ],
        description: "Jake Sully vive com sua nova família formada no planeta de Pandora. Mas a família deve deixar seu lar e explorar as regiões de Pandora.",
        fullDescription: "Jake Sully vive com sua nova família formada no planeta de Pandora. Uma vez um humano familiar, ele é um líder que veio a viver entre os nativos Na'vi. Jake e sua família estão sendo forçados a deixar sua casa e explorar as diferentes regiões de Pandora. Quando uma antiga ameaça retorna para terminar o que foi iniciado anteriormente, Jake deve trabalhar com Neytiri e o exército da raça Na'vi para proteger sua casa.",
        poster: "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
        backdrop: "https://media.themoviedb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
        embed: "https://embed.warezcdn.link/filme/tt1234567",
        featured: false,
        type: "movie"
    },
    {
        id: "tt9876543",
        title: "Stranger Things",
        year: 2016,
        rating: "8.7",
        duration: null,
        seasons: 4,
        episodes: 42,
        genre: "Ficção Científica",
        classification: "16+",
        directors: null,
        creator: "Duffer Brothers",
        creatorImage: "https://image.tmdb.org/t/p/w200/5YkGLdPQY9lJpfLQx4LlmCGvhgX.jpg",
        cast: [
            { name: "Millie Bobby Brown", photo: "https://media.themoviedb.org/t/p/w138_and_h175_face/9I17Z4Oz8tDjfxINxlcJgGFW6Pl.jpg" },
            { name: "Finn Wolfhard", photo: "https://media.themoviedb.org/t/p/w138_and_h175_face/8c06Hl6X8kFCCKKMz4wKjBtNPKZ.jpg" }
        ],
        description: "Um grupo de crianças enfrenta criaturas sobrenaturais e experiments governamentais secretos.",
        fullDescription: "Quando Will Byers desaparece, sua mãe Joyce, o chefe de polícia Hopper e seus amigos se unem para procurá-lo. Durante a busca, eles descobrem experiments extraordinários, forças sobrenaturais e uma garota muito especial.",
        poster: "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
        backdrop: "https://media.themoviedb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
        embed: "https://embed.warezcdn.link/serie/tt9876543",
        featured: false,
        type: "series"
    }
];

// Global state
let currentUser = null;
let currentPage = 'home';
let currentContent = null;
let featuredContent = null;
let searchResults = [];
let watchlist = [];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const savedUser = localStorage.getItem('streamflix_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthUI();
    }
    
    // Load watchlist
    loadWatchlist();
    
    // Set up search functionality
    setupSearch();
    
    // Navigate to home page
    navigateTo('home');
    
    // Set featured content
    featuredContent = CONTENT_DATA.find(item => item.featured) || CONTENT_DATA[0];
});

// Authentication Functions
function login(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('streamflix_users') || '[]');
    
    // Find user
    const user = users.find(u => u.username === username);
    
    if (!user) {
        showToast('Usuário não encontrado!', 'error');
        return;
    }
    
    if (user.password !== password) {
        showToast('Senha incorreta!', 'error');
        return;
    }
    
    // Login successful
    currentUser = { id: user.id, username: user.username };
    localStorage.setItem('streamflix_user', JSON.stringify(currentUser));
    
    loadWatchlist();
    updateAuthUI();
    showToast(`Bem-vindo, ${username}!`);
    navigateTo('home');
}

function register(event) {
    event.preventDefault();
    
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('streamflix_users') || '[]');
    
    // Check if username exists
    if (users.find(u => u.username === username)) {
        showToast('Nome de usuário já existe!', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: generateId(),
        username: username,
        password: password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('streamflix_users', JSON.stringify(users));
    
    // Auto login
    currentUser = { id: newUser.id, username: newUser.username };
    localStorage.setItem('streamflix_user', JSON.stringify(currentUser));
    
    loadWatchlist();
    updateAuthUI();
    showToast(`Conta criada! Bem-vindo, ${username}!`);
    navigateTo('home');
}

function logout() {
    currentUser = null;
    watchlist = [];
    localStorage.removeItem('streamflix_user');
    updateAuthUI();
    showToast('Logout realizado com sucesso!');
    navigateTo('home');
}

function updateAuthUI() {
    const authButtons = document.getElementById('authButtons');
    const userInfo = document.getElementById('userInfo');
    const usernameDisplay = document.getElementById('usernameDisplay');
    
    if (currentUser) {
        document.body.classList.add('authenticated');
        usernameDisplay.textContent = `Olá, ${currentUser.username}`;
        authButtons.style.display = 'none';
        userInfo.style.display = 'flex';
    } else {
        document.body.classList.remove('authenticated');
        authButtons.style.display = 'flex';
        userInfo.style.display = 'none';
    }
    
    // Update navigation links
    updateNavLinks();
}

function updateNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentPage}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Navigation Functions
function navigateTo(page, contentId = null) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    
    // Show target page
    const targetPage = document.getElementById(`${page}Page`);
    if (targetPage) {
        targetPage.style.display = 'block';
        currentPage = page;
        updateNavLinks();
    }
    
    // Handle page-specific logic
    switch (page) {
        case 'home':
            loadHomePage();
            break;
        case 'movies':
            loadMoviesPage();
            break;
        case 'series':
            loadSeriesPage();
            break;
        case 'watchlist':
            if (!currentUser) {
                navigateTo('login');
                return;
            }
            loadWatchlistPage();
            break;
        case 'content':
            if (contentId) {
                loadContentDetail(contentId);
            }
            break;
        case 'search':
            loadSearchPage();
            break;
    }
}

// Content Loading Functions
function loadHomePage() {
    // Load hero section
    if (featuredContent) {
        updateHeroSection(featuredContent);
    }
    
    // Load featured content
    const featured = CONTENT_DATA.filter(item => item.featured);
    renderContentGrid('featuredGrid', featured);
    
    // Load all content
    renderContentGrid('allContentGrid', CONTENT_DATA);
}

function loadMoviesPage() {
    const movies = CONTENT_DATA.filter(item => item.type === 'movie');
    const featuredMovies = movies.filter(item => item.featured);
    
    renderContentGrid('featuredMoviesGrid', featuredMovies);
    renderContentGrid('allMoviesGrid', movies);
}

function loadSeriesPage() {
    const series = CONTENT_DATA.filter(item => item.type === 'series');
    const featuredSeries = series.filter(item => item.featured);
    
    renderContentGrid('featuredSeriesGrid', featuredSeries);
    renderContentGrid('allSeriesGrid', series);
}

function loadWatchlistPage() {
    const watchlistContent = CONTENT_DATA.filter(item => watchlist.includes(item.id));
    
    const watchlistEmpty = document.getElementById('watchlistEmpty');
    const watchlistGrid = document.getElementById('watchlistGrid');
    
    if (watchlistContent.length === 0) {
        watchlistEmpty.style.display = 'block';
        watchlistGrid.innerHTML = '';
    } else {
        watchlistEmpty.style.display = 'none';
        renderContentGrid('watchlistGrid', watchlistContent);
    }
}

function loadContentDetail(contentId) {
    const content = CONTENT_DATA.find(item => item.id === contentId);
    if (!content) return;
    
    currentContent = content;
    
    // Update detail hero
    const detailHero = document.getElementById('detailHero');
    detailHero.style.backgroundImage = `url(${content.backdrop})`;
    
    document.getElementById('detailTitle').textContent = content.title;
    
    // Update meta information
    const detailMeta = document.getElementById('detailMeta');
    let metaHtml = `<span class="detail-rating">${content.rating}/10</span>`;
    metaHtml += `<span>${content.year}</span>`;
    metaHtml += `<span class="detail-classification">${content.classification}</span>`;
    
    if (content.duration) {
        metaHtml += `<span>${content.duration}</span>`;
    }
    
    if (content.seasons) {
        metaHtml += `<span>${content.seasons} ${content.seasons === 1 ? 'Temporada' : 'Temporadas'}</span>`;
    }
    
    detailMeta.innerHTML = metaHtml;
    
    document.getElementById('detailDescription').textContent = content.description;
    document.getElementById('detailFullDescription').textContent = content.fullDescription;
    document.getElementById('detailPoster').src = content.poster;
    document.getElementById('detailPoster').alt = content.title;
    
    // Update watchlist button
    updateWatchlistButton();
    
    // Update cast
    if (content.cast && content.cast.length > 0) {
        const castGrid = document.getElementById('castGrid');
        castGrid.innerHTML = content.cast.map(actor => `
            <div class="cast-member">
                <img src="${actor.photo}" alt="${actor.name}" class="cast-photo">
                <span class="cast-name">${actor.name}</span>
            </div>
        `).join('');
        document.getElementById('castSection').style.display = 'block';
    } else {
        document.getElementById('castSection').style.display = 'none';
    }
    
    // Update directors
    if (content.directors && content.directors.length > 0) {
        const directorsGrid = document.getElementById('directorsGrid');
        directorsGrid.innerHTML = content.directors.map(director => `
            <div class="cast-member">
                <img src="${director.photo}" alt="${director.name}" class="cast-photo">
                <span class="cast-name">${director.name}</span>
            </div>
        `).join('');
        document.getElementById('directorsSection').style.display = 'block';
    } else {
        document.getElementById('directorsSection').style.display = 'none';
    }
    
    // Update specs
    const detailSpecs = document.getElementById('detailSpecs');
    let specsHtml = `
        <div class="spec-item">
            <span class="spec-label">Gênero</span>
            <span class="spec-value">${content.genre}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">Ano</span>
            <span class="spec-value">${content.year}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">Classificação</span>
            <span class="spec-value">${content.classification}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">Avaliação</span>
            <span class="spec-value spec-rating">${content.rating}/10</span>
        </div>
    `;
    
    if (content.type === 'movie' && content.duration) {
        specsHtml += `
            <div class="spec-item">
                <span class="spec-label">Duração</span>
                <span class="spec-value">${content.duration}</span>
            </div>
        `;
    }
    
    if (content.type === 'series') {
        if (content.seasons) {
            specsHtml += `
                <div class="spec-item">
                    <span class="spec-label">Temporadas</span>
                    <span class="spec-value">${content.seasons}</span>
                </div>
            `;
        }
        if (content.episodes) {
            specsHtml += `
                <div class="spec-item">
                    <span class="spec-label">Episódios</span>
                    <span class="spec-value">${content.episodes}</span>
                </div>
            `;
        }
    }
    
    detailSpecs.innerHTML = specsHtml;
}

function loadSearchPage() {
    const searchTitle = document.getElementById('searchTitle');
    const searchEmpty = document.getElementById('searchEmpty');
    const searchGrid = document.getElementById('searchGrid');
    
    const searchQuery = new URLSearchParams(window.location.search).get('q') || '';
    
    if (searchQuery) {
        searchTitle.textContent = `Resultados para "${searchQuery}"`;
        
        if (searchResults.length === 0) {
            searchEmpty.style.display = 'block';
            searchGrid.innerHTML = '';
        } else {
            searchEmpty.style.display = 'none';
            renderContentGrid('searchGrid', searchResults);
        }
    } else {
        searchTitle.textContent = 'Buscar';
        searchEmpty.style.display = 'block';
        searchGrid.innerHTML = '';
    }
}

// Content Rendering Functions
function renderContentGrid(gridId, content) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    grid.innerHTML = content.map(item => `
        <div class="content-card" onclick="navigateTo('content', '${item.id}')">
            <img src="${item.poster}" alt="${item.title}" class="content-poster">
            <div class="content-overlay">
                <div class="content-info">
                    <h3 class="content-title">${item.title}</h3>
                    <p class="content-meta">${item.year} • ${item.rating}/10 • ${item.genre}</p>
                    <p class="content-type">
                        ${item.type === 'movie' ? 'Filme' : 'Série'}
                        ${item.duration ? ` • ${item.duration}` : ''}
                        ${item.seasons ? ` • ${item.seasons} ${item.seasons === 1 ? 'Temporada' : 'Temporadas'}` : ''}
                    </p>
                </div>
            </div>
        </div>
    `).join('');
}

function updateHeroSection(content) {
    const heroSection = document.getElementById('heroSection');
    const heroTitle = document.getElementById('heroTitle');
    const heroDescription = document.getElementById('heroDescription');
    
    heroSection.style.backgroundImage = `url(${content.backdrop})`;
    heroTitle.textContent = content.title;
    heroDescription.textContent = content.description;
    
    window.featuredContent = content;
}

// Search Functions
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        
        const query = this.value.trim();
        
        if (query.length === 0) {
            searchResults = [];
            return;
        }
        
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query.length > 0) {
                performSearch(query);
                navigateTo('search');
                window.history.pushState({}, '', `?q=${encodeURIComponent(query)}`);
            }
        }
    });
}

function performSearch(query) {
    const lowerQuery = query.toLowerCase();
    
    searchResults = CONTENT_DATA.filter(item => 
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.genre.toLowerCase().includes(lowerQuery) ||
        item.cast.some(actor => actor.name.toLowerCase().includes(lowerQuery))
    );
    
    // If currently on search page, update results
    if (currentPage === 'search') {
        loadSearchPage();
    }
}

// Watchlist Functions
function loadWatchlist() {
    if (currentUser) {
        const savedWatchlist = localStorage.getItem(`streamflix_watchlist_${currentUser.id}`);
        watchlist = savedWatchlist ? JSON.parse(savedWatchlist) : [];
    } else {
        watchlist = [];
    }
}

function saveWatchlist() {
    if (currentUser) {
        localStorage.setItem(`streamflix_watchlist_${currentUser.id}`, JSON.stringify(watchlist));
    }
}

function toggleWatchlist(contentId) {
    if (!currentUser) {
        showToast('Faça login para adicionar à sua lista!', 'error');
        navigateTo('login');
        return;
    }
    
    if (!contentId) return;
    
    const isInWatchlist = watchlist.includes(contentId);
    
    if (isInWatchlist) {
        watchlist = watchlist.filter(id => id !== contentId);
        showToast('Removido da sua lista!');
    } else {
        watchlist.push(contentId);
        showToast('Adicionado à sua lista!');
    }
    
    saveWatchlist();
    updateWatchlistButton();
    
    // Refresh watchlist page if currently viewing
    if (currentPage === 'watchlist') {
        loadWatchlistPage();
    }
}

function updateWatchlistButton() {
    if (!currentUser || !currentContent) return;
    
    const watchlistBtn = document.getElementById('watchlistBtn');
    if (!watchlistBtn) return;
    
    const isInWatchlist = watchlist.includes(currentContent.id);
    
    if (isInWatchlist) {
        watchlistBtn.textContent = 'Remover da Lista';
        watchlistBtn.className = 'btn btn-secondary btn-large user-only';
    } else {
        watchlistBtn.textContent = 'Adicionar à Lista';
        watchlistBtn.className = 'btn btn-secondary btn-large user-only';
    }
}

// Watch Functions
function watchContent() {
    if (featuredContent) {
        window.open(featuredContent.embed, '_blank');
    }
}

function watchCurrentContent() {
    if (currentContent) {
        window.open(currentContent.embed, '_blank');
    }
}

// Utility Functions
function generateId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
}

function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

function showLoading() {
    document.getElementById('loadingOverlay').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingOverlay').style.display = 'none';
}

// Handle browser back/forward
window.addEventListener('popstate', function() {
    const path = window.location.pathname;
    const search = window.location.search;
    
    if (search.includes('q=')) {
        const query = new URLSearchParams(search).get('q');
        document.getElementById('searchInput').value = query;
        performSearch(query);
        navigateTo('search');
    } else {
        navigateTo('home');
    }
});

// Global click handler for logo
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('logo')) {
        navigateTo('home');
    }
});

// Export functions for global access
window.navigateTo = navigateTo;
window.login = login;
window.register = register;
window.logout = logout;
window.toggleWatchlist = toggleWatchlist;
window.watchContent = watchContent;
window.watchCurrentContent = watchCurrentContent;
