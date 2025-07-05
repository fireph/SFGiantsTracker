// SF Giants Team ID in MLB API
const GIANTS_TEAM_ID = 137;
const ORACLE_PARK_VENUE_ID = 2395;

// API endpoints
const MLB_API_BASE = 'https://statsapi.mlb.com/api/v1';

// Game duration estimate (average MLB game is about 3 hours)
const AVERAGE_GAME_DURATION = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

// Team logo mapping (using ESPN's logo URLs which are more reliable)
const TEAM_LOGOS = {
    137: 'https://a.espncdn.com/i/teamlogos/mlb/500/sf.png', // SF Giants
    108: 'https://a.espncdn.com/i/teamlogos/mlb/500/laa.png', // Angels
    109: 'https://a.espncdn.com/i/teamlogos/mlb/500/ari.png', // Diamondbacks
    110: 'https://a.espncdn.com/i/teamlogos/mlb/500/bal.png', // Orioles
    111: 'https://a.espncdn.com/i/teamlogos/mlb/500/bos.png', // Red Sox
    112: 'https://a.espncdn.com/i/teamlogos/mlb/500/chc.png', // Cubs
    113: 'https://a.espncdn.com/i/teamlogos/mlb/500/cin.png', // Reds
    114: 'https://a.espncdn.com/i/teamlogos/mlb/500/cle.png', // Guardians
    115: 'https://a.espncdn.com/i/teamlogos/mlb/500/col.png', // Rockies
    116: 'https://a.espncdn.com/i/teamlogos/mlb/500/det.png', // Tigers
    117: 'https://a.espncdn.com/i/teamlogos/mlb/500/hou.png', // Astros
    118: 'https://a.espncdn.com/i/teamlogos/mlb/500/kc.png', // Royals
    119: 'https://a.espncdn.com/i/teamlogos/mlb/500/lad.png', // Dodgers
    120: 'https://a.espncdn.com/i/teamlogos/mlb/500/wsh.png', // Nationals
    121: 'https://a.espncdn.com/i/teamlogos/mlb/500/nym.png', // Mets
    133: 'https://a.espncdn.com/i/teamlogos/mlb/500/oak.png', // Athletics
    134: 'https://a.espncdn.com/i/teamlogos/mlb/500/pit.png', // Pirates
    135: 'https://a.espncdn.com/i/teamlogos/mlb/500/sd.png', // Padres
    136: 'https://a.espncdn.com/i/teamlogos/mlb/500/sea.png', // Mariners
    138: 'https://a.espncdn.com/i/teamlogos/mlb/500/stl.png', // Cardinals
    139: 'https://a.espncdn.com/i/teamlogos/mlb/500/tb.png', // Rays
    140: 'https://a.espncdn.com/i/teamlogos/mlb/500/tex.png', // Rangers
    141: 'https://a.espncdn.com/i/teamlogos/mlb/500/tor.png', // Blue Jays
    142: 'https://a.espncdn.com/i/teamlogos/mlb/500/min.png', // Twins
    143: 'https://a.espncdn.com/i/teamlogos/mlb/500/phi.png', // Phillies
    144: 'https://a.espncdn.com/i/teamlogos/mlb/500/atl.png', // Braves
    145: 'https://a.espncdn.com/i/teamlogos/mlb/500/chw.png', // White Sox
    146: 'https://a.espncdn.com/i/teamlogos/mlb/500/mia.png', // Marlins
    147: 'https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png', // Yankees
    158: 'https://a.espncdn.com/i/teamlogos/mlb/500/mil.png', // Brewers
};

// Team primary colors for text styling
const TEAM_COLORS = {
    137: '#FD5A1E', // SF Giants - Orange
    108: '#BA0021', // Angels - Red
    109: '#A71930', // Diamondbacks - Red
    110: '#DF4601', // Orioles - Orange
    111: '#BD3039', // Red Sox - Red
    112: '#0E3386', // Cubs - Blue
    113: '#C6011F', // Reds - Red
    114: '#E31937', // Guardians - Red
    115: '#33006F', // Rockies - Purple
    116: '#0C2340', // Tigers - Navy
    117: '#EB6E1F', // Astros - Orange
    118: '#004687', // Royals - Blue
    119: '#005A9C', // Dodgers - Blue
    120: '#AB0003', // Nationals - Red
    121: '#002D72', // Mets - Blue
    133: '#003831', // Athletics - Green
    134: '#FDB827', // Pirates - Gold
    135: '#2F241D', // Padres - Brown
    136: '#0C2C56', // Mariners - Navy
    138: '#C41E3A', // Cardinals - Red
    139: '#092C5C', // Rays - Navy
    140: '#003278', // Rangers - Blue
    141: '#134A8E', // Blue Jays - Blue
    142: '#002B5C', // Twins - Navy
    143: '#E81828', // Phillies - Red
    144: '#CE1141', // Braves - Red
    145: '#27251F', // White Sox - Black
    146: '#00A3E0', // Marlins - Blue
    147: '#132448', // Yankees - Navy
    158: '#12284B', // Brewers - Navy
};

class GiantsSchedule {
    constructor() {
        this.today = new Date();
        this.currentGameSection = document.getElementById('current-game');
        this.upcomingGamesSection = document.getElementById('upcoming-games');
        this.noGamesSection = document.getElementById('no-games');
        this.gamesContainer = document.getElementById('games-container');
        this.init();
    }

    getTeamLogo(teamId) {
        return TEAM_LOGOS[teamId] || 'https://a.espncdn.com/i/teamlogos/mlb/500/mlb.png';
    }

    getTeamColor(teamId) {
        const baseColor = TEAM_COLORS[teamId] || '#E5E5E5';
        
        // Lighten dark colors for better visibility on dark backgrounds
        const darkColors = {
            121: '#4A7BC8', // Mets - Lighter blue
            116: '#4A6FA5', // Tigers - Lighter navy
            136: '#5577A3', // Mariners - Lighter navy
            139: '#4A6FA5', // Rays - Lighter navy
            140: '#4A7BC8', // Rangers - Lighter blue
            141: '#4A7BC8', // Blue Jays - Lighter blue
            142: '#4A6FA5', // Twins - Lighter navy
            145: '#808080', // White Sox - Gray instead of black
            147: '#6B7BA8', // Yankees - Lighter navy
            158: '#4A6FA5', // Brewers - Lighter navy
            133: '#4D8A4D', // Athletics - Lighter green
            135: '#8B6914', // Padres - Gold instead of brown
            115: '#8A4FFF', // Rockies - Lighter purple
        };
        
        return darkColors[teamId] || baseColor;
    }

    init() {
        // Check for test mode in URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        this.testMode = urlParams.has('test');
        
        this.loadGames();
    }

    async loadGames() {
        try {
            // Get today's date and next 60 days
            const startDate = this.formatDate(this.today);
            const endDate = this.formatDate(new Date(this.today.getTime() + (60 * 24 * 60 * 60 * 1000)));

            // Fetch Giants schedule
            const scheduleUrl = `${MLB_API_BASE}/schedule?teamId=${GIANTS_TEAM_ID}&startDate=${startDate}&endDate=${endDate}&sportId=1`;
            const response = await fetch(scheduleUrl);
            const data = await response.json();

            // Filter for home games at Oracle Park
            const homeGames = this.filterHomeGames(data.dates);
            
            // Check for current game
            const currentGame = this.findCurrentGame(homeGames);
            
            // Get upcoming games
            const upcomingGames = this.getUpcomingGames(homeGames);

            // Display games
            this.displayCurrentGame(currentGame);
            this.displayUpcomingGames(upcomingGames);

        } catch (error) {
            console.error('Error loading games:', error);
            this.showError();
        }
    }

    formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    filterHomeGames(dates) {
        const homeGames = [];
        dates.forEach(date => {
            date.games.forEach(game => {
                // Check if Giants are home team and game is at Oracle Park
                if (game.teams.home.team.id === GIANTS_TEAM_ID && 
                    game.venue.id === ORACLE_PARK_VENUE_ID) {
                    homeGames.push({
                        ...game,
                        date: date.date
                    });
                }
            });
        });
        return homeGames;
    }

    findCurrentGame(games) {
        // If in test mode, create a fake current game
        if (this.testMode && games.length > 0) {
            const testGame = { ...games[0] };
            testGame.gameDate = new Date(Date.now() - (2 * 60 * 60 * 1000)); // Started 2 hours ago
            testGame.gamePk = 999999; // Fake game ID for testing
            return testGame;
        }
        
        const now = new Date();
        return games.find(game => {
            const gameDate = new Date(game.gameDate);
            const gameEndEstimate = new Date(gameDate.getTime() + AVERAGE_GAME_DURATION);
            return gameDate <= now && now <= gameEndEstimate;
        });
    }

    getUpcomingGames(games) {
        const now = new Date();
        return games.filter(game => {
            const gameDate = new Date(game.gameDate);
            return gameDate > now;
        }).slice(0, 10); // Show next 10 games
    }

    async displayCurrentGame(game) {
        if (game) {
            this.currentGameSection.classList.remove('hidden');
            
            // Set team logos
            document.getElementById('giants-logo').src = this.getTeamLogo(GIANTS_TEAM_ID);
            document.getElementById('current-opponent-logo').src = this.getTeamLogo(game.teams.away.team.id);
            
            // Set score logos
            document.getElementById('home-score-logo').src = this.getTeamLogo(GIANTS_TEAM_ID);
            document.getElementById('away-score-logo').src = this.getTeamLogo(game.teams.away.team.id);
            
            // Set team names and colors
            const opponentElement = document.getElementById('current-opponent-name');
            opponentElement.textContent = game.teams.away.team.name;
            
            // Apply team color to opponent
            const opponentContainer = document.getElementById('current-opponent');
            opponentContainer.style.color = this.getTeamColor(game.teams.away.team.id);
            document.getElementById('current-start-time').textContent = this.formatGameTime(game.gameDate);
            
            // Store current game for reference
            this.currentGame = game;
            
            // Fetch live game data
            await this.updateLiveGameData(game.gamePk);
        } else {
            this.currentGameSection.classList.add('hidden');
        }
    }

    async updateLiveGameData(gamePk) {
        try {
            // If in test mode, use fake data
            if (this.testMode) {
                this.displayTestGameData();
                return;
            }
            
            const liveDataUrl = `${MLB_API_BASE}/game/${gamePk}/linescore`;
            const response = await fetch(liveDataUrl);
            const data = await response.json();
            
            if (data.currentInning) {
                // Update inning display with arrow
                const arrow = data.inningHalf === 'Top' ? '▲' : '▼';
                document.getElementById('inning-half-arrow').textContent = arrow;
                document.getElementById('current-inning-number').textContent = data.currentInning;
                
                // Update scores
                const homeScore = data.teams.home.runs || 0;
                const awayScore = data.teams.away.runs || 0;
                
                document.getElementById('home-score').textContent = homeScore;
                document.getElementById('away-score').textContent = awayScore;
                
                // Calculate smarter end time based on inning progress
                const estimatedEndTime = this.calculateGameEndTime(data.currentInning, data.inningHalf, this.currentGame.gameDate);
                const roundedEndTime = this.roundToNearest5Minutes(estimatedEndTime);
                document.getElementById('current-end-time').textContent = this.formatGameTime(roundedEndTime);
            } else {
                // Fallback for games without live data
                document.getElementById('inning-half-arrow').textContent = '▼';
                document.getElementById('current-inning-number').textContent = '1';
                document.getElementById('home-score').textContent = '0';
                document.getElementById('away-score').textContent = '0';
                const fallbackEndTime = this.roundToNearest5Minutes(new Date(new Date().getTime() + AVERAGE_GAME_DURATION));
                document.getElementById('current-end-time').textContent = this.formatGameTime(fallbackEndTime);
            }
        } catch (error) {
            console.error('Error fetching live game data:', error);
            // Fallback display
            document.getElementById('inning-half-arrow').textContent = '▼';
            document.getElementById('current-inning-number').textContent = '1';
            document.getElementById('home-score').textContent = '0';
            document.getElementById('away-score').textContent = '0';
            const fallbackEndTime = this.roundToNearest5Minutes(new Date(new Date().getTime() + AVERAGE_GAME_DURATION));
            document.getElementById('current-end-time').textContent = this.formatGameTime(fallbackEndTime);
        }
    }

    displayTestGameData() {
        // Simulate a game in the 7th inning with some action
        document.getElementById('inning-half-arrow').textContent = '▼';
        document.getElementById('current-inning-number').textContent = '7';
        document.getElementById('home-score').textContent = '4';
        document.getElementById('away-score').textContent = '2';
        
        // Calculate end time based on 7th inning progress
        const estimatedEndTime = this.calculateGameEndTime(7, 'Bottom', this.currentGame.gameDate);
        const roundedEndTime = this.roundToNearest5Minutes(estimatedEndTime);
        document.getElementById('current-end-time').textContent = this.formatGameTime(roundedEndTime);
    }

    calculateGameEndTime(currentInning, inningHalf, gameStartTime) {
        // Average inning duration is about 20 minutes
        const AVERAGE_INNING_DURATION = 20 * 60 * 1000; // 20 minutes in milliseconds
        const BASE_GAME_TIME = 180 * 60 * 1000; // 3 hours base
        
        // Calculate progress through the game
        let inningProgress = (currentInning - 1) + (inningHalf === 'Bottom' ? 0.5 : 0);
        
        // Games typically last 9 innings, but can go longer
        const expectedTotalInnings = Math.max(9, currentInning + 1);
        
        // Calculate time based on inning progress
        const elapsedTime = Date.now() - gameStartTime.getTime();
        const averageInningTime = elapsedTime / inningProgress;
        
        // Use either calculated average or standard average, whichever seems more reasonable
        const projectedInningTime = Math.min(averageInningTime, AVERAGE_INNING_DURATION * 1.5);
        
        const remainingInnings = expectedTotalInnings - inningProgress;
        const remainingTime = remainingInnings * projectedInningTime;
        
        return new Date(Date.now() + remainingTime);
    }

    displayUpcomingGames(games) {
        this.gamesContainer.innerHTML = '';

        if (games.length === 0) {
            this.upcomingGamesSection.classList.add('hidden');
            this.noGamesSection.classList.remove('hidden');
            return;
        }

        this.upcomingGamesSection.classList.remove('hidden');
        this.noGamesSection.classList.add('hidden');

        games.forEach(game => {
            const gameCard = this.createGameCard(game);
            this.gamesContainer.appendChild(gameCard);
        });
    }

    createGameCard(game) {
        const card = document.createElement('div');
        card.className = 'game-card';

        const gameDate = new Date(game.gameDate);
        const opponent = game.teams.away.team.name;
        const giantsLogoUrl = this.getTeamLogo(GIANTS_TEAM_ID);
        const opponentLogoUrl = this.getTeamLogo(game.teams.away.team.id);
        const opponentColor = this.getTeamColor(game.teams.away.team.id);

        card.innerHTML = `
            <div class="game-info">
                <div class="teams">
                    <span class="home-team">
                        <img src="${giantsLogoUrl}" alt="SF Giants" class="team-logo">
                        SF Giants
                    </span>
                    <span class="vs">vs</span>
                    <span class="away-team" style="color: ${opponentColor};">
                        <img src="${opponentLogoUrl}" alt="${opponent}" class="team-logo">
                        ${opponent}
                    </span>
                </div>
                <div class="game-date">${this.formatGameDate(gameDate)}</div>
                <div class="game-time">
                    <span class="start-time">${this.formatGameTime(gameDate)}</span>
                </div>
            </div>
        `;

        return card;
    }

    formatGameDate(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatGameTime(date) {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    roundToNearest5Minutes(date) {
        const minutes = date.getMinutes();
        const roundedMinutes = Math.round(minutes / 5) * 5;
        const roundedDate = new Date(date);
        roundedDate.setMinutes(roundedMinutes, 0, 0); // Set seconds and milliseconds to 0
        return roundedDate;
    }

    showError() {
        this.gamesContainer.innerHTML = `
            <div class="error-message">
                <h3>Unable to load games</h3>
                <p>Please check your internet connection and try again later.</p>
            </div>
        `;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GiantsSchedule();
});

// Add some error handling for the error message styling
const style = document.createElement('style');
style.textContent = `
    .error-message {
        text-align: center;
        padding: 2rem;
        background: #f8d7da;
        border: 1px solid #f5c6cb;
        border-radius: 10px;
        color: #721c24;
    }
    
    .error-message h3 {
        margin-bottom: 1rem;
        color: #721c24;
    }
`;
document.head.appendChild(style);