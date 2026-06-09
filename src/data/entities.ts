import type { Entity } from '../types'

export const entities: Entity[] = [
  // ============================================================
  // CRYPTO - Twitter/X followers (thousands)
  // ============================================================
  { name: 'Bitcoin', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 7200, emoji: '₿', image: '/img/entities/bitcoin.png' },
  { name: 'Ethereum', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 3500, emoji: '⟠', image: '/img/entities/ethereum.png' },
  { name: 'Solana', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 2800, emoji: '◎', image: '/img/entities/solana.png' },
  { name: 'Dogecoin', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 3900, emoji: '🐕', image: '/img/entities/dogecoin.png' },
  { name: 'Cardano', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 1600, emoji: '🔷', image: '/img/entities/cardano.png' },
  { name: 'Polygon', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 1300, emoji: '⬟', image: '/img/entities/polygon.png' },
  { name: 'Chainlink', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 1100, emoji: '⬡', image: '/img/entities/chainlink.png' },
  { name: 'Uniswap', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 1200, emoji: '🦄', image: '/img/entities/uniswap.png' },
  { name: 'Arbitrum', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 1050, emoji: '🔵', image: '/img/entities/arbitrum.png' },
  { name: 'Monad', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 950, emoji: '🟣', image: '/img/entities/monad.png' },
  { name: 'Avalanche', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 890, emoji: '🔺', image: '/img/entities/avalanche.png' },
  { name: 'Optimism', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 780, emoji: '🔴', image: '/img/entities/optimism.png' },
  { name: 'Sui', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 720, emoji: '💧', image: '/img/entities/sui.png' },
  { name: 'Aave', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 680, emoji: '👻', image: '/img/entities/aave.png' },
  { name: 'Aptos', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 540, emoji: '🌀', image: '/img/entities/aptos.png' },

  // ============================================================
  // CRYPTO - Market cap (billions USD)
  // ============================================================
  { name: 'Bitcoin', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 1260, emoji: '₿', image: '/img/entities/bitcoin.png' },
  { name: 'Ethereum', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 195, emoji: '⟠', image: '/img/entities/ethereum.png' },
  { name: 'XRP', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 88, emoji: '✕', image: '/img/entities/xrp.png' },
  { name: 'BNB', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 67, emoji: '🟡', image: '/img/entities/bnb.png' },
  { name: 'Solana', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 45, emoji: '◎', image: '/img/entities/solana.png' },
  { name: 'Dogecoin', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 18, emoji: '🐕', image: '/img/entities/dogecoin.png' },
  { name: 'Cardano', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 14, emoji: '🔷', image: '/img/entities/cardano.png' },
  { name: 'Toncoin', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 10, emoji: '💎', image: '/img/entities/toncoin.png' },
  { name: 'Avalanche', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 6, emoji: '🔺', image: '/img/entities/avalanche.png' },
  { name: 'Sui', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 8, emoji: '💧', image: '/img/entities/sui.png' },

  // ============================================================
  // CULTURE - Instagram followers (millions)
  // ============================================================
  { name: 'Cristiano Ronaldo', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 670, emoji: '⚽', image: '/img/entities/cristiano-ronaldo.jpg' },
  { name: 'Lionel Messi', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 512, emoji: '🏆', image: '/img/entities/lionel-messi.jpg' },
  { name: 'Selena Gomez', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 414, emoji: '🎤', image: '/img/entities/selena-gomez.jpg' },
  { name: 'Kylie Jenner', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 392, emoji: '💄', image: '/img/entities/kylie-jenner.png' },
  { name: 'Dwayne Johnson', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 392, emoji: '💪', image: '/img/entities/dwayne-johnson.jpg' },
  { name: 'Ariana Grande', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 372, emoji: '🎵', image: '/img/entities/ariana-grande.jpg' },
  { name: 'Kim Kardashian', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 354, emoji: '📱', image: '/img/entities/kim-kardashian.jpg' },
  { name: 'Beyonce', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 308, emoji: '🐝', image: '/img/entities/beyonce.jpg' },
  { name: 'Khloe Kardashian', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 301, emoji: '✨', image: '/img/entities/khloe-kardashian.png' },
  { name: 'Justin Bieber', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 292, emoji: '🎸', image: '/img/entities/justin-bieber.jpg' },
  { name: 'Taylor Swift', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 281, emoji: '🎶', image: '/img/entities/taylor-swift.png' },
  { name: 'Neymar Jr', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 220, emoji: '🇧🇷', image: '/img/entities/neymar-jr.jpg' },
  { name: 'Zendaya', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 182, emoji: '🕷', image: '/img/entities/zendaya.jpg' },
  { name: 'LeBron James', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 160, emoji: '🏀', image: '/img/entities/lebron-james.jpg' },
  { name: 'Drake', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 146, emoji: '🎧', image: '/img/entities/drake.jpg' },
  { name: 'Kylian Mbappe', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 118, emoji: '⚡', image: '/img/entities/kylian-mbappe.jpg' },
  { name: 'MrBeast', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 85, emoji: '🎬', image: '/img/entities/mrbeast.png' },
  { name: 'Elon Musk', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 42, emoji: '🚀', image: '/img/entities/elon-musk.jpg' },

  // ============================================================
  // CULTURE - YouTube subscribers (millions)
  // ============================================================
  { name: 'MrBeast', category: 'culture', metric: 'youtube', metricLabel: 'YouTube Subs (M)', value: 497, emoji: '🎬', image: '/img/entities/mrbeast.png' },
  { name: 'T-Series', category: 'culture', metric: 'youtube', metricLabel: 'YouTube Subs (M)', value: 310, emoji: '🎶' },
  { name: 'Cocomelon', category: 'culture', metric: 'youtube', metricLabel: 'YouTube Subs (M)', value: 200, emoji: '🍉' },
  { name: 'SET India', category: 'culture', metric: 'youtube', metricLabel: 'YouTube Subs (M)', value: 175, emoji: '📺' },
  { name: 'Kids Diana Show', category: 'culture', metric: 'youtube', metricLabel: 'YouTube Subs (M)', value: 138, emoji: '👧' },
  { name: 'Like Nastya', category: 'culture', metric: 'youtube', metricLabel: 'YouTube Subs (M)', value: 131, emoji: '🧸' },
  { name: 'PewDiePie', category: 'culture', metric: 'youtube', metricLabel: 'YouTube Subs (M)', value: 110, emoji: '👊', image: '/img/entities/pewdiepie.jpg' },

  // ============================================================
  // CULTURE - Spotify monthly listeners (millions)
  // ============================================================
  { name: 'Justin Bieber', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 139, emoji: '🎸', image: '/img/entities/justin-bieber.jpg' },
  { name: 'Bruno Mars', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 137, emoji: '🎹', image: '/img/entities/bruno-mars.jpg' },
  { name: 'The Weeknd', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 116, emoji: '🌙', image: '/img/entities/the-weeknd.jpg' },
  { name: 'Rihanna', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 112, emoji: '💎', image: '/img/entities/rihanna.png' },
  { name: 'Bad Bunny', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 102, emoji: '🐰', image: '/img/entities/bad-bunny.jpg' },
  { name: 'Taylor Swift', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 102, emoji: '🎶', image: '/img/entities/taylor-swift.png' },
  { name: 'Lady Gaga', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 98, emoji: '👗', image: '/img/entities/lady-gaga.jpg' },
  { name: 'Coldplay', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 91, emoji: '🌈', image: '/img/entities/coldplay.jpg' },
  { name: 'Drake', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 89, emoji: '🎧', image: '/img/entities/drake.jpg' },
  { name: 'David Guetta', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 89, emoji: '🎛', image: '/img/entities/david-guetta.jpg' },
  { name: 'Billie Eilish', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 84, emoji: '🖤', image: '/img/entities/billie-eilish.jpg' },

  // ============================================================
  // GEO - Country population (millions)
  // ============================================================
  { name: 'India', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 1450, emoji: '🇮🇳', image: '/img/entities/india.png' },
  { name: 'China', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 1410, emoji: '🇨🇳', image: '/img/entities/china.png' },
  { name: 'United States', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 341, emoji: '🇺🇸', image: '/img/entities/united-states.png' },
  { name: 'Indonesia', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 279, emoji: '🇮🇩', image: '/img/entities/indonesia.png' },
  { name: 'Pakistan', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 252, emoji: '🇵🇰', image: '/img/entities/pakistan.png' },
  { name: 'Nigeria', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 228, emoji: '🇳🇬', image: '/img/entities/nigeria.png' },
  { name: 'Brazil', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 217, emoji: '🇧🇷', image: '/img/entities/brazil.png' },
  { name: 'Bangladesh', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 169, emoji: '🇧🇩', image: '/img/entities/bangladesh.png' },
  { name: 'Mexico', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 130, emoji: '🇲🇽', image: '/img/entities/mexico.png' },
  { name: 'Japan', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 123, emoji: '🇯🇵', image: '/img/entities/japan.png' },
  { name: 'Ethiopia', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 119, emoji: '🇪🇹', image: '/img/entities/ethiopia.png' },
  { name: 'Philippines', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 118, emoji: '🇵🇭', image: '/img/entities/philippines.png' },
  { name: 'Egypt', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 111, emoji: '🇪🇬', image: '/img/entities/egypt.png' },
  { name: 'Vietnam', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 106, emoji: '🇻🇳', image: '/img/entities/vietnam.png' },
  { name: 'Germany', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 84, emoji: '🇩🇪', image: '/img/entities/germany.png' },
  { name: 'Turkey', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 84, emoji: '🇹🇷', image: '/img/entities/turkey.png' },
  { name: 'France', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 68, emoji: '🇫🇷', image: '/img/entities/france.png' },
  { name: 'United Kingdom', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 68, emoji: '🇬🇧', image: '/img/entities/united-kingdom.png' },
  { name: 'South Korea', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 52, emoji: '🇰🇷', image: '/img/entities/south-korea.png' },
  { name: 'Canada', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 41, emoji: '🇨🇦', image: '/img/entities/canada.png' },
  { name: 'Australia', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 27, emoji: '🇦🇺', image: '/img/entities/australia.png' },

  // ============================================================
  // GEO - City metro population (millions)
  // ============================================================
  { name: 'Tokyo', category: 'geo', metric: 'city_pop', metricLabel: 'Metro Pop (M)', value: 37, emoji: '🗼' },
  { name: 'Delhi', category: 'geo', metric: 'city_pop', metricLabel: 'Metro Pop (M)', value: 33, emoji: '🕌' },
  { name: 'Shanghai', category: 'geo', metric: 'city_pop', metricLabel: 'Metro Pop (M)', value: 29, emoji: '🏙' },
  { name: 'Mexico City', category: 'geo', metric: 'city_pop', metricLabel: 'Metro Pop (M)', value: 26, emoji: '🌮' },
  { name: 'Sao Paulo', category: 'geo', metric: 'city_pop', metricLabel: 'Metro Pop (M)', value: 23, emoji: '🌆' },
  { name: 'Cairo', category: 'geo', metric: 'city_pop', metricLabel: 'Metro Pop (M)', value: 22, emoji: '🏛' },
  { name: 'Mumbai', category: 'geo', metric: 'city_pop', metricLabel: 'Metro Pop (M)', value: 22, emoji: '🇮🇳' },
  { name: 'New York', category: 'geo', metric: 'city_pop', metricLabel: 'Metro Pop (M)', value: 20, emoji: '🗽' },
  { name: 'Dhaka', category: 'geo', metric: 'city_pop', metricLabel: 'Metro Pop (M)', value: 18, emoji: '🇧🇩' },
  { name: 'Lagos', category: 'geo', metric: 'city_pop', metricLabel: 'Metro Pop (M)', value: 17, emoji: '🌍' },
  { name: 'Istanbul', category: 'geo', metric: 'city_pop', metricLabel: 'Metro Pop (M)', value: 16, emoji: '🕌' },
  { name: 'London', category: 'geo', metric: 'city_pop', metricLabel: 'Metro Pop (M)', value: 14, emoji: '🎡' },
  { name: 'Seoul', category: 'geo', metric: 'city_pop', metricLabel: 'Metro Pop (M)', value: 26, emoji: '🇰🇷' },
  { name: 'Paris', category: 'geo', metric: 'city_pop', metricLabel: 'Metro Pop (M)', value: 11, emoji: '🗼' },
  { name: 'Jakarta', category: 'geo', metric: 'city_pop', metricLabel: 'Metro Pop (M)', value: 35, emoji: '🇮🇩' },

  // ============================================================
  // GEO - Country GDP (billions USD, nominal 2026)
  // ============================================================
  { name: 'United States', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 31820, emoji: '🇺🇸', image: '/img/entities/united-states.png' },
  { name: 'China', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 20650, emoji: '🇨🇳', image: '/img/entities/china.png' },
  { name: 'Germany', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 5330, emoji: '🇩🇪', image: '/img/entities/germany.png' },
  { name: 'India', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 4510, emoji: '🇮🇳', image: '/img/entities/india.png' },
  { name: 'Japan', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 4460, emoji: '🇯🇵', image: '/img/entities/japan.png' },
  { name: 'United Kingdom', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 4300, emoji: '🇬🇧', image: '/img/entities/united-kingdom.png' },
  { name: 'France', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 3450, emoji: '🇫🇷', image: '/img/entities/france.png' },
  { name: 'Italy', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 2530, emoji: '🇮🇹', image: '/img/entities/italy.png' },
  { name: 'Canada', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 2340, emoji: '🇨🇦', image: '/img/entities/canada.png' },
  { name: 'Brazil', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 2280, emoji: '🇧🇷', image: '/img/entities/brazil.png' },
  { name: 'South Korea', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 1920, emoji: '🇰🇷', image: '/img/entities/south-korea.png' },
  { name: 'Australia', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 1960, emoji: '🇦🇺', image: '/img/entities/australia.png' },
  { name: 'Mexico', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 1520, emoji: '🇲🇽', image: '/img/entities/mexico.png' },

  // ============================================================
  // GEO - Country area (thousands km2)
  // ============================================================
  { name: 'Russia', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 17098, emoji: '🇷🇺', image: '/img/entities/russia.png' },
  { name: 'Canada', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 9985, emoji: '🇨🇦', image: '/img/entities/canada.png' },
  { name: 'United States', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 9834, emoji: '🇺🇸', image: '/img/entities/united-states.png' },
  { name: 'China', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 9600, emoji: '🇨🇳', image: '/img/entities/china.png' },
  { name: 'Brazil', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 8516, emoji: '🇧🇷', image: '/img/entities/brazil.png' },
  { name: 'Australia', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 7692, emoji: '🇦🇺', image: '/img/entities/australia.png' },
  { name: 'India', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 3287, emoji: '🇮🇳', image: '/img/entities/india.png' },
  { name: 'Argentina', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 2780, emoji: '🇦🇷', image: '/img/entities/argentina.png' },
  { name: 'Kazakhstan', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 2725, emoji: '🇰🇿', image: '/img/entities/kazakhstan.png' },
  { name: 'Algeria', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 2382, emoji: '🇩🇿', image: '/img/entities/algeria.png' },
  { name: 'Saudi Arabia', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 2150, emoji: '🇸🇦', image: '/img/entities/saudi-arabia.png' },
  { name: 'Mexico', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 1964, emoji: '🇲🇽', image: '/img/entities/mexico.png' },
  { name: 'France', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 641, emoji: '🇫🇷', image: '/img/entities/france.png' },
  { name: 'Japan', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 378, emoji: '🇯🇵', image: '/img/entities/japan.png' },
  { name: 'United Kingdom', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 243, emoji: '🇬🇧', image: '/img/entities/united-kingdom.png' },

  // ============================================================
  // SPORTS - Athlete Instagram followers (millions)
  // ============================================================
  { name: 'Virat Kohli', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 270, emoji: '🏏', image: '/img/entities/virat-kohli.jpg' },
  { name: 'Neymar Jr', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 220, emoji: '🇧🇷', image: '/img/entities/neymar-jr.jpg' },
  { name: 'LeBron James', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 160, emoji: '🏀', image: '/img/entities/lebron-james.jpg' },
  { name: 'Kylian Mbappe', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 118, emoji: '⚡', image: '/img/entities/kylian-mbappe.jpg' },
  { name: 'David Beckham', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 89, emoji: '⚽', image: '/img/entities/david-beckham.jpg' },
  { name: 'Ronaldinho', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 78, emoji: '🇧🇷', image: '/img/entities/ronaldinho.jpg' },
  { name: 'Karim Benzema', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 75, emoji: '🇫🇷', image: '/img/entities/karim-benzema.jpg' },
  { name: 'Conor McGregor', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 47, emoji: '🥊', image: '/img/entities/conor-mcgregor.jpg' },
  { name: 'Serena Williams', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 17, emoji: '🎾', image: '/img/entities/serena-williams.jpg' },
  { name: 'Usain Bolt', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 14, emoji: '🏃', image: '/img/entities/usain-bolt.jpg' },
  { name: 'Roger Federer', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 12, emoji: '🎾', image: '/img/entities/roger-federer.jpg' },

  // ============================================================
  // SPORTS - Club/team Instagram followers (millions)
  // ============================================================
  { name: 'Real Madrid', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 180, emoji: '⚽', image: '/img/entities/real-madrid.png' },
  { name: 'FC Barcelona', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 146, emoji: '⚽', image: '/img/entities/fc-barcelona.png' },
  { name: 'PSG', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 66, emoji: '⚽', image: '/img/entities/psg.png' },
  { name: 'Manchester United', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 66, emoji: '⚽', image: '/img/entities/manchester-united.png' },
  { name: 'Juventus', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 59, emoji: '⚽', image: '/img/entities/juventus.png' },
  { name: 'Chelsea FC', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 42, emoji: '⚽', image: '/img/entities/chelsea-fc.png' },
  { name: 'Liverpool FC', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 40, emoji: '⚽', image: '/img/entities/liverpool-fc.png' },
  { name: 'Bayern Munich', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 38, emoji: '⚽', image: '/img/entities/bayern-munich.png' },
  { name: 'Manchester City', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 36, emoji: '⚽', image: '/img/entities/manchester-city.png' },
  { name: 'Golden State Warriors', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 33, emoji: '🏀', image: '/img/entities/golden-state-warriors.png' },
  { name: 'LA Lakers', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 25, emoji: '🏀', image: '/img/entities/la-lakers.png' },
  { name: 'Dallas Cowboys', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 21, emoji: '🏈', image: '/img/entities/dallas-cowboys.png' },
  { name: 'Arsenal FC', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 30, emoji: '⚽', image: '/img/entities/arsenal-fc.png' },

  // ============================================================
  // TECH - Company market cap (billions USD)
  // ============================================================
  { name: 'Nvidia', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 5400, emoji: '🖥', image: '/img/entities/nvidia.png' },
  { name: 'Apple', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 4630, emoji: '🍎', image: '/img/entities/apple.png' },
  { name: 'Alphabet (Google)', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 4630, emoji: '🔍', image: '/img/entities/alphabet-google.png' },
  { name: 'Microsoft', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 3280, emoji: '🪟', image: '/img/entities/microsoft.png' },
  { name: 'Amazon', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 2870, emoji: '📦', image: '/img/entities/amazon.png' },
  { name: 'TSMC', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 2000, emoji: '🔬', image: '/img/entities/tsmc.png' },
  { name: 'Broadcom', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 2010, emoji: '📡', image: '/img/entities/broadcom.png' },
  { name: 'Meta', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 1560, emoji: '👤', image: '/img/entities/meta.png' },
  { name: 'Tesla', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 1590, emoji: '🚗', image: '/img/entities/tesla.png' },
  { name: 'Samsung', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 1240, emoji: '📱', image: '/img/entities/samsung.png' },
  { name: 'Oracle', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 410, emoji: '🗄', image: '/img/entities/oracle.png' },
  { name: 'Netflix', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 348, emoji: '🎥', image: '/img/entities/netflix.png' },
  { name: 'Salesforce', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 155, emoji: '☁', image: '/img/entities/salesforce.png' },

  // ============================================================
  // TECH - App monthly active users (millions)
  // ============================================================
  { name: 'Facebook', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 2960, emoji: '👥', image: '/img/entities/facebook.png' },
  { name: 'YouTube', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 2490, emoji: '▶', image: '/img/entities/youtube.png' },
  { name: 'WhatsApp', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 2150, emoji: '💬', image: '/img/entities/whatsapp.png' },
  { name: 'Instagram', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 2000, emoji: '📸', image: '/img/entities/instagram.png' },
  { name: 'TikTok', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 1920, emoji: '🎵', image: '/img/entities/tiktok.png' },
  { name: 'Telegram', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 950, emoji: '✈', image: '/img/entities/telegram.png' },
  { name: 'ChatGPT', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 1000, emoji: '🤖', image: '/img/entities/chatgpt.png' },
  { name: 'Snapchat', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 850, emoji: '👻', image: '/img/entities/snapchat.png' },
  { name: 'X (Twitter)', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 600, emoji: '🐦' },
  { name: 'Reddit', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 430, emoji: '🟠', image: '/img/entities/reddit.png' },
  { name: 'Pinterest', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 530, emoji: '📌', image: '/img/entities/pinterest.png' },

  // ============================================================
  // FOOD - Fast food chain locations worldwide (thousands)
  // ============================================================
  { name: 'Mixue', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 45, emoji: '🍦' },
  { name: 'Subway', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 37, emoji: '🥖', image: '/img/entities/subway.png' },
  { name: "McDonald's", category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 40, emoji: '🍔', image: '/img/entities/mcdonald-s.png' },
  { name: 'Starbucks', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 40, emoji: '☕', image: '/img/entities/starbucks.png' },
  { name: 'KFC', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 32, emoji: '🍗', image: '/img/entities/kfc.png' },
  { name: 'Burger King', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 19, emoji: '🍔', image: '/img/entities/burger-king.png' },
  { name: "Domino's Pizza", category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 20, emoji: '🍕', image: '/img/entities/domino-s-pizza.png' },
  { name: 'Pizza Hut', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 19, emoji: '🍕', image: '/img/entities/pizza-hut.png' },
  { name: "Dunkin'", category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 14, emoji: '🍩', image: '/img/entities/dunkin.png' },
  { name: 'Taco Bell', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 9, emoji: '🌮', image: '/img/entities/taco-bell.png' },
  { name: "Wendy's", category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 7, emoji: '🍔', image: '/img/entities/wendy-s.png' },
  { name: 'Tim Hortons', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 6, emoji: '☕', image: '/img/entities/tim-hortons.png' },
  { name: 'Chick-fil-A', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 3.5, emoji: '🐔', image: '/img/entities/chick-fil-a.png' },

  // ============================================================
  // FOOD - Brand revenue (billions USD)
  // ============================================================
  { name: "McDonald's", category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 48.4, emoji: '🍔', image: '/img/entities/mcdonald-s.png' },
  { name: 'Starbucks', category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 36.3, emoji: '☕', image: '/img/entities/starbucks.png' },
  { name: 'Chick-fil-A', category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 21.6, emoji: '🐔', image: '/img/entities/chick-fil-a.png' },
  { name: 'Subway', category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 17.8, emoji: '🥖', image: '/img/entities/subway.png' },
  { name: 'Taco Bell', category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 15.1, emoji: '🌮', image: '/img/entities/taco-bell.png' },
  { name: "Wendy's", category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 12.2, emoji: '🍔', image: '/img/entities/wendy-s.png' },
  { name: 'Burger King', category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 11.9, emoji: '🍔', image: '/img/entities/burger-king.png' },
  { name: "Domino's Pizza", category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 8.9, emoji: '🍕', image: '/img/entities/domino-s-pizza.png' },
  { name: "Dunkin'", category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 8.1, emoji: '🍩', image: '/img/entities/dunkin.png' },
  { name: 'Pizza Hut', category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 7.5, emoji: '🍕', image: '/img/entities/pizza-hut.png' },

  // ============================================================
  // MONAD - Blockchain TPS comparison
  // ============================================================
  { name: 'Monad', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 10000, emoji: '🟣', image: '/img/entities/monad.png' },
  { name: 'Solana', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 5500, emoji: '◎', image: '/img/entities/solana.png' },
  { name: 'Avalanche', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 4500, emoji: '🔺', image: '/img/entities/avalanche.png' },
  { name: 'Sui', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 100000, emoji: '💧', image: '/img/entities/sui.png' },
  { name: 'Aptos', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 100000, emoji: '🌀', image: '/img/entities/aptos.png' },
  { name: 'Polygon', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 500, emoji: '⬟', image: '/img/entities/polygon.png' },
  { name: 'Arbitrum', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 250, emoji: '🔵', image: '/img/entities/arbitrum.png' },
  { name: 'Base', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 200, emoji: '🔵', image: '/img/entities/base.png' },
  { name: 'BNB Chain', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 300, emoji: '🟡', image: '/img/entities/bnb-chain.png' },
  { name: 'Ethereum', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 15, emoji: '⟠', image: '/img/entities/ethereum.png' },

  // ============================================================
  // MONAD - Block time (seconds)
  // ============================================================
  { name: 'Aptos', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 0.038, emoji: '🌀', image: '/img/entities/aptos.png' },
  { name: 'Sui', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 0.221, emoji: '💧', image: '/img/entities/sui.png' },
  { name: 'Solana', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 0.4, emoji: '◎', image: '/img/entities/solana.png' },
  { name: 'Monad', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 0.4, emoji: '🟣', image: '/img/entities/monad.png' },
  { name: 'Avalanche', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 2, emoji: '🔺', image: '/img/entities/avalanche.png' },
  { name: 'BNB Chain', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 3, emoji: '🟡', image: '/img/entities/bnb-chain.png' },
  { name: 'Polygon', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 2, emoji: '⬟', image: '/img/entities/polygon.png' },
  { name: 'Ethereum', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 12, emoji: '⟠', image: '/img/entities/ethereum.png' },
  { name: 'Bitcoin', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 600, emoji: '₿', image: '/img/entities/bitcoin.png' },

  // ============================================================
  // CRYPTO - Memecoins on Monad (market cap in millions USD)
  // ============================================================
  { name: 'CHOG', category: 'crypto', metric: 'market_cap_meme', metricLabel: 'Market Cap ($M)', value: 3, emoji: '🐸' },
  { name: 'Molandak (DAK)', category: 'crypto', metric: 'market_cap_meme', metricLabel: 'Market Cap ($M)', value: 2.1, emoji: '🦡' },
  { name: 'Moyaki (YAKI)', category: 'crypto', metric: 'market_cap_meme', metricLabel: 'Market Cap ($M)', value: 1.5, emoji: '🔥' },
  { name: 'Salmonad', category: 'crypto', metric: 'market_cap_meme', metricLabel: 'Market Cap ($M)', value: 0.8, emoji: '🐟' },
  { name: 'Mouch', category: 'crypto', metric: 'market_cap_meme', metricLabel: 'Market Cap ($M)', value: 0.4, emoji: '🪰' },
  { name: 'Moncock', category: 'crypto', metric: 'market_cap_meme', metricLabel: 'Market Cap ($M)', value: 1.2, emoji: '🐓' },
  { name: 'Spidermon', category: 'crypto', metric: 'market_cap_meme', metricLabel: 'Market Cap ($M)', value: 0.3, emoji: '🕷' },
  { name: 'Purple Pepe', category: 'crypto', metric: 'market_cap_meme', metricLabel: 'Market Cap ($M)', value: 0.5, emoji: '🟣' },

  // ============================================================
  // CULTURE - Internet memes (Google Trends peak interest score, 0-100)
  // ============================================================
  { name: 'Doge', category: 'culture', metric: 'meme_popularity', metricLabel: 'Google Trends Score', value: 100, emoji: '🐕' },
  { name: 'Pepe the Frog', category: 'culture', metric: 'meme_popularity', metricLabel: 'Google Trends Score', value: 75, emoji: '🐸' },
  { name: 'Rickroll', category: 'culture', metric: 'meme_popularity', metricLabel: 'Google Trends Score', value: 82, emoji: '🎵' },
  { name: 'Nyan Cat', category: 'culture', metric: 'meme_popularity', metricLabel: 'Google Trends Score', value: 68, emoji: '🌈' },
  { name: 'Distracted Boyfriend', category: 'culture', metric: 'meme_popularity', metricLabel: 'Google Trends Score', value: 55, emoji: '👀' },
  { name: 'Drake Hotline Bling', category: 'culture', metric: 'meme_popularity', metricLabel: 'Google Trends Score', value: 60, emoji: '🎧' },
  { name: 'This Is Fine', category: 'culture', metric: 'meme_popularity', metricLabel: 'Google Trends Score', value: 42, emoji: '🔥' },
  { name: 'Grumpy Cat', category: 'culture', metric: 'meme_popularity', metricLabel: 'Google Trends Score', value: 90, emoji: '🐱' },
  { name: 'Wojak', category: 'culture', metric: 'meme_popularity', metricLabel: 'Google Trends Score', value: 38, emoji: '😐' },
  { name: 'Gigachad', category: 'culture', metric: 'meme_popularity', metricLabel: 'Google Trends Score', value: 65, emoji: '💪' },
  { name: 'Woman Yelling at Cat', category: 'culture', metric: 'meme_popularity', metricLabel: 'Google Trends Score', value: 58, emoji: '🐱' },
  { name: 'Success Kid', category: 'culture', metric: 'meme_popularity', metricLabel: 'Google Trends Score', value: 45, emoji: '👶' },
  { name: 'Bad Luck Brian', category: 'culture', metric: 'meme_popularity', metricLabel: 'Google Trends Score', value: 52, emoji: '😬' },

  // ============================================================
  // CULTURE - Adult stars (Pornhub annual search ranking score)
  // ============================================================
  { name: 'Alex Adams', category: 'culture', metric: 'ph_searches', metricLabel: 'PH Search Rank Score', value: 100, emoji: '🔞' },
  { name: 'Angela White', category: 'culture', metric: 'ph_searches', metricLabel: 'PH Search Rank Score', value: 95, emoji: '🔞', image: '/img/entities/angela-white.jpg' },
  { name: 'Violet Myers', category: 'culture', metric: 'ph_searches', metricLabel: 'PH Search Rank Score', value: 88, emoji: '🔞' },
  { name: 'Bonnie Blue', category: 'culture', metric: 'ph_searches', metricLabel: 'PH Search Rank Score', value: 84, emoji: '🔞', image: '/img/entities/bonnie-blue.jpg' },
  { name: 'Lana Rhoades', category: 'culture', metric: 'ph_searches', metricLabel: 'PH Search Rank Score', value: 80, emoji: '🔞', image: '/img/entities/lana-rhoades.jpg' },
  { name: 'Lily Phillips', category: 'culture', metric: 'ph_searches', metricLabel: 'PH Search Rank Score', value: 76, emoji: '🔞' },
  { name: 'Mia Khalifa', category: 'culture', metric: 'ph_searches', metricLabel: 'PH Search Rank Score', value: 72, emoji: '🔞', image: '/img/entities/mia-khalifa.png' },
  { name: 'Riley Reid', category: 'culture', metric: 'ph_searches', metricLabel: 'PH Search Rank Score', value: 68, emoji: '🔞', image: '/img/entities/riley-reid.jpg' },
  { name: 'Abella Danger', category: 'culture', metric: 'ph_searches', metricLabel: 'PH Search Rank Score', value: 65, emoji: '🔞', image: '/img/entities/abella-danger.jpg' },
  { name: 'Eva Elfie', category: 'culture', metric: 'ph_searches', metricLabel: 'PH Search Rank Score', value: 62, emoji: '🔞', image: '/img/entities/eva-elfie.jpg' },

  // ============================================================
  // CULTURE - Drugs (users worldwide in millions)
  // ============================================================
  { name: 'Caffeine', category: 'culture', metric: 'drug_users', metricLabel: 'Users Worldwide (M)', value: 5000, emoji: '☕' },
  { name: 'Alcohol', category: 'culture', metric: 'drug_users', metricLabel: 'Users Worldwide (M)', value: 2000, emoji: '🍺' },
  { name: 'Nicotine', category: 'culture', metric: 'drug_users', metricLabel: 'Users Worldwide (M)', value: 1200, emoji: '🚬' },
  { name: 'Cannabis', category: 'culture', metric: 'drug_users', metricLabel: 'Users Worldwide (M)', value: 244, emoji: '🌿' },
  { name: 'Opioids', category: 'culture', metric: 'drug_users', metricLabel: 'Users Worldwide (M)', value: 61, emoji: '💊' },
  { name: 'Amphetamines', category: 'culture', metric: 'drug_users', metricLabel: 'Users Worldwide (M)', value: 31, emoji: '⚡' },
  { name: 'Cocaine', category: 'culture', metric: 'drug_users', metricLabel: 'Users Worldwide (M)', value: 25, emoji: '❄' },
  { name: 'MDMA / Ecstasy', category: 'culture', metric: 'drug_users', metricLabel: 'Users Worldwide (M)', value: 21, emoji: '💎' },
  { name: 'Kratom', category: 'culture', metric: 'drug_users', metricLabel: 'Users Worldwide (M)', value: 15, emoji: '🍃' },
  { name: 'Psilocybin', category: 'culture', metric: 'drug_users', metricLabel: 'Users Worldwide (M)', value: 36, emoji: '🍄' },
  { name: 'LSD', category: 'culture', metric: 'drug_users', metricLabel: 'Users Worldwide (M)', value: 10, emoji: '🌀' },

  // ============================================================
  // CULTURE - Twitch streamers (followers in millions)
  // ============================================================
  { name: 'Kai Cenat', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 20, emoji: '🎮', image: '/img/entities/kai-cenat.jpg' },
  { name: 'Ibai', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 19.8, emoji: '🇪🇸', image: '/img/entities/ibai.jpg' },
  { name: 'Ninja', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 19, emoji: '🥷', image: '/img/entities/ninja.jpg' },
  { name: 'Auronplay', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 17, emoji: '🇪🇸', image: '/img/entities/auronplay.jpg' },
  { name: 'Rubius', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 17.3, emoji: '🎬' },
  { name: 'xQc', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 12.2, emoji: '🇨🇦', image: '/img/entities/xqc.jpg' },
  { name: 'Tfue', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 11.3, emoji: '🎯' },
  { name: 'Shroud', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 11, emoji: '🔫' },
  { name: 'Pokimane', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 9.4, emoji: '🎀', image: '/img/entities/pokimane.jpg' },

  // ============================================================
  // SPICY - Hall of Shame (global fame score, 0-100)
  // ============================================================
  { name: 'Donald Trump', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 100, emoji: '🇺🇸', image: '/img/entities/donald-trump.jpg' },
  { name: 'Kanye West', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 96, emoji: '🎤', image: '/img/entities/kanye-west.jpg' },
  { name: 'P. Diddy', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 94, emoji: '🍼', image: '/img/entities/p-diddy.jpg' },
  { name: 'Jeffrey Epstein', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 92, emoji: '🏝', image: '/img/entities/jeffrey-epstein.jpg' },
  { name: 'Andrew Tate', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 90, emoji: '🥃', image: '/img/entities/andrew-tate.png' },
  { name: 'Mia Khalifa', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 88, emoji: '🔞', image: '/img/entities/mia-khalifa.png' },
  { name: 'El Chapo', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 85, emoji: '⛏', image: '/img/entities/el-chapo.jpg' },
  { name: 'Logan Paul', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 84, emoji: '🥊', image: '/img/entities/logan-paul.jpg' },
  { name: 'Hawk Tuah Girl', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 80, emoji: '🦅', image: '/img/entities/hawk-tuah-girl.jpg' },
  { name: 'Lana Rhoades', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 78, emoji: '🔞', image: '/img/entities/lana-rhoades.jpg' },
  { name: 'Sam Bankman-Fried', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 76, emoji: '🪙', image: '/img/entities/sam-bankman-fried.png' },
  { name: 'Bonnie Blue', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 74, emoji: '🔞', image: '/img/entities/bonnie-blue.jpg' },
  { name: 'R. Kelly', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 72, emoji: '🎙', image: '/img/entities/r-kelly.png' },
  { name: 'Sophie Rain', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 70, emoji: '🔞' },
  { name: 'Jordan Belfort', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 68, emoji: '🐺', image: '/img/entities/jordan-belfort.png' },
  { name: 'Bernie Madoff', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 66, emoji: '💸', image: '/img/entities/bernie-madoff.jpg' },
  { name: 'Nicolas Sarkozy', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 65, emoji: '🇫🇷', image: '/img/entities/nicolas-sarkozy.jpg' },
  { name: 'Belle Delphine', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 62, emoji: '🛁', image: '/img/entities/belle-delphine.png' },
  { name: 'Elizabeth Holmes', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 60, emoji: '🩸', image: '/img/entities/elizabeth-holmes.jpg' },
  { name: 'Bhad Bhabie', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 58, emoji: '😤', image: '/img/entities/bhad-bhabie.jpg' },
  { name: 'Ghislaine Maxwell', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 56, emoji: '🏝', image: '/img/entities/ghislaine-maxwell.webp' },
  { name: 'Anna Delvey', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 52, emoji: '👜', image: '/img/entities/anna-delvey.jpg' },
  { name: 'CZ (Binance)', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 50, emoji: '🟡', image: '/img/entities/cz-binance.jpg' },
  { name: 'Lily Phillips', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 48, emoji: '🔞' },
  { name: 'Do Kwon', category: 'spicy', metric: 'fame', metricLabel: 'Fame Score', value: 40, emoji: '🌙', image: '/img/entities/do-kwon.png' },
]

const GEO_REDRAW_CHANCE = 0.65

export function getRandomPair(sameCategoryOnly = true): [Entity, Entity] {
  const pool = [...entities]
  let first = pool[Math.floor(Math.random() * pool.length)]
  if (first.category === 'geo' && Math.random() < GEO_REDRAW_CHANCE) {
    first = pool[Math.floor(Math.random() * pool.length)]
  }
  const candidates = sameCategoryOnly
    ? pool.filter(e => e.metric === first.metric && e.name !== first.name)
    : pool.filter(e => e.name !== first.name || e.metric !== first.metric)
  const second = candidates[Math.floor(Math.random() * candidates.length)]
  return [first, second]
}

export function getNextEntity(current: Entity): Entity {
  const candidates = entities.filter(e => e.metric === current.metric && e.name !== current.name)
  return candidates[Math.floor(Math.random() * candidates.length)]
}

export const categoryLabels: Record<string, string> = {
  crypto: 'Crypto',
  culture: 'Pop Culture',
  geo: 'Geography',
  sports: 'Sports',
  tech: 'Tech',
  food: 'Food & Brands',
  monad: 'Blockchain',
  spicy: 'Hall of Shame',
}
