# 🧡 SF Giants Schedule Tracker ⚾

A beautiful, dark-themed web application for tracking San Francisco Giants games at Oracle Park with live scores, real-time inning updates, and smart game end time predictions.

**🌐 View the live project at: https://giants.fmeyer.com**

<img src="https://a.espncdn.com/i/teamlogos/mlb/500/sf.png" alt="SF Giants Logo" width="80" height="80">

## ✨ Features

### 🏟️ **Oracle Park Games Only**
- Shows only SF Giants home games at Oracle Park
- Filters out away games automatically
- Clean focus on games you can actually attend

### 🎮 **Live Game Experience**
- **Real-time scores** with team logos
- **Current inning display** with intuitive arrows (▲ Top, ▼ Bottom)
- **Smart end time estimation** based on actual game pace and inning progress
- **Team colors** for all 30 MLB teams optimized for dark backgrounds

### 🌙 **Beautiful Dark Design**
- Sleek dark mode with SF Giants orange/black/gold branding
- Smooth animations and hover effects
- Mobile-responsive design
- Clean, modern card-based layout

### 🔧 **Developer Features**
- **Test mode** (`?test`) to preview live game functionality
- Fetches data from official MLB StatsAPI
- Rounds end times to nearest 5 minutes for better UX

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/fireph/SFGiantsTracker.git
   cd SFGiantsTracker
   ```

2. **Run locally**
   ```bash
   python3 -m http.server 8000
   ```
   
3. **Open in browser**
   - Normal mode: `http://localhost:8000`
   - Test mode: `http://localhost:8000?test`

## 📸 Screenshots

### Current Game Display
When a Giants game is happening at Oracle Park:
```
🏆 Game Happening Now
┌─────────────────────────────────────┐
│  [LAD] 2 - 4 [SF] [▼ 7]            │
│                                     │
│      [SF Logo] SF Giants            │
│             vs                      │
│   [LAD Logo] Los Angeles Dodgers    │
│                                     │
│   Started: 1:05 PM                  │
│   Est. End: 4:25 PM                 │
└─────────────────────────────────────┘
```

### Upcoming Games
Clean grid of upcoming home games with team logos and colors.

## 🎯 How It Works

### Data Source
- **MLB StatsAPI**: Official MLB data source
- **Live Updates**: Real-time scores and inning information
- **Team Assets**: ESPN logo URLs for consistent team branding

### Smart Time Estimation
The app calculates game end times using:
- Current inning progress (with top/bottom awareness)
- Elapsed time since game start
- Average inning duration (20 minutes)
- Adaptive calculation for extra innings

### Team Color Optimization
All 30 MLB team colors are optimized for dark backgrounds:
- Dark colors like Navy and Black are lightened
- Maintains team identity while ensuring readability
- Special handling for teams like Mets, Yankees, White Sox

## 🧪 Test Mode

Enable test mode to see live game features without waiting for a real game:

```
http://localhost:8000?test
```

Test mode simulates:
- A game in the 7th inning (Bottom ▼)
- Giants leading 4-2
- Realistic start time (2 hours ago)
- Smart end time calculation

## 🛠️ Technical Details

### Files
- `index.html` - Main structure and layout
- `styles.css` - SF Giants themed dark mode styling
- `script.js` - MLB API integration and live data

### Browser Support
- Modern browsers with ES6+ support
- Mobile responsive (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

### API Endpoints Used
```javascript
// Schedule data
https://statsapi.mlb.com/api/v1/schedule?teamId=137&startDate=...

// Live game data  
https://statsapi.mlb.com/api/v1/game/{gamePk}/linescore
```

## ⚾ Team Information

**SF Giants (Team ID: 137)**
- Home Venue: Oracle Park (Venue ID: 2395)
- Colors: Orange (#FD5A1E), Black (#27251F), Cream (#EFD19F)
- Founded: 1883

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **MLB** for providing the StatsAPI
- **ESPN** for team logo assets
- **San Francisco Giants** for the inspiration
- Built with ❤️ for Giants fans everywhere

---

**Go Giants!** 🧡⚾ *Fear the Beard, Respect the Orange*

*This is an unofficial fan project and is not affiliated with MLB or the San Francisco Giants.*