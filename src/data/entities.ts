import type { Entity } from '../types'

export const entities: Entity[] = [
  // ============================================================
  // CRYPTO - Twitter/X followers (thousands)
  // ============================================================
  { name: 'Bitcoin', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 7200, emoji: '₿' },
  { name: 'Ethereum', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 3500, emoji: '⟠' },
  { name: 'Solana', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 2800, emoji: '◎' },
  { name: 'Dogecoin', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 3900, emoji: '🐕' },
  { name: 'Cardano', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 1600, emoji: '🔷' },
  { name: 'Polygon', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 1300, emoji: '⬟' },
  { name: 'Chainlink', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 1100, emoji: '⬡' },
  { name: 'Uniswap', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 1200, emoji: '🦄' },
  { name: 'Arbitrum', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 1050, emoji: '🔵' },
  { name: 'Monad', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 950, emoji: '🟣' },
  { name: 'Avalanche', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 890, emoji: '🔺' },
  { name: 'Optimism', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 780, emoji: '🔴' },
  { name: 'Sui', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 720, emoji: '💧' },
  { name: 'Aave', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 680, emoji: '👻' },
  { name: 'Aptos', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 540, emoji: '🌀' },

  // ============================================================
  // CRYPTO - Market cap (billions USD)
  // ============================================================
  { name: 'Bitcoin', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 1260, emoji: '₿' },
  { name: 'Ethereum', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 195, emoji: '⟠' },
  { name: 'XRP', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 88, emoji: '✕' },
  { name: 'BNB', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 67, emoji: '🟡' },
  { name: 'Solana', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 45, emoji: '◎' },
  { name: 'Dogecoin', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 18, emoji: '🐕' },
  { name: 'Cardano', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 14, emoji: '🔷' },
  { name: 'Toncoin', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 10, emoji: '💎' },
  { name: 'Avalanche', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 6, emoji: '🔺' },
  { name: 'Sui', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 8, emoji: '💧' },

  // ============================================================
  // CULTURE - Instagram followers (millions)
  // ============================================================
  { name: 'Cristiano Ronaldo', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 670, emoji: '⚽' },
  { name: 'Lionel Messi', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 512, emoji: '🏆' },
  { name: 'Selena Gomez', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 414, emoji: '🎤' },
  { name: 'Kylie Jenner', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 392, emoji: '💄' },
  { name: 'Dwayne Johnson', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 392, emoji: '💪' },
  { name: 'Ariana Grande', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 372, emoji: '🎵' },
  { name: 'Kim Kardashian', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 354, emoji: '📱' },
  { name: 'Beyonce', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 308, emoji: '🐝' },
  { name: 'Khloe Kardashian', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 301, emoji: '✨' },
  { name: 'Justin Bieber', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 292, emoji: '🎸' },
  { name: 'Taylor Swift', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 281, emoji: '🎶' },
  { name: 'Neymar Jr', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 220, emoji: '🇧🇷' },
  { name: 'Zendaya', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 182, emoji: '🕷' },
  { name: 'LeBron James', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 160, emoji: '🏀' },
  { name: 'Drake', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 146, emoji: '🎧' },
  { name: 'Kylian Mbappe', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 118, emoji: '⚡' },
  { name: 'MrBeast', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 85, emoji: '🎬' },
  { name: 'Elon Musk', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 42, emoji: '🚀' },

  // ============================================================
  // CULTURE - YouTube subscribers (millions)
  // ============================================================
  { name: 'MrBeast', category: 'culture', metric: 'youtube', metricLabel: 'YouTube Subs (M)', value: 497, emoji: '🎬' },
  { name: 'T-Series', category: 'culture', metric: 'youtube', metricLabel: 'YouTube Subs (M)', value: 310, emoji: '🎶' },
  { name: 'Cocomelon', category: 'culture', metric: 'youtube', metricLabel: 'YouTube Subs (M)', value: 200, emoji: '🍉' },
  { name: 'SET India', category: 'culture', metric: 'youtube', metricLabel: 'YouTube Subs (M)', value: 175, emoji: '📺' },
  { name: 'Kids Diana Show', category: 'culture', metric: 'youtube', metricLabel: 'YouTube Subs (M)', value: 138, emoji: '👧' },
  { name: 'Like Nastya', category: 'culture', metric: 'youtube', metricLabel: 'YouTube Subs (M)', value: 131, emoji: '🧸' },
  { name: 'PewDiePie', category: 'culture', metric: 'youtube', metricLabel: 'YouTube Subs (M)', value: 110, emoji: '👊' },

  // ============================================================
  // CULTURE - Spotify monthly listeners (millions)
  // ============================================================
  { name: 'Justin Bieber', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 139, emoji: '🎸' },
  { name: 'Bruno Mars', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 137, emoji: '🎹' },
  { name: 'The Weeknd', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 116, emoji: '🌙' },
  { name: 'Rihanna', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 112, emoji: '💎' },
  { name: 'Bad Bunny', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 102, emoji: '🐰' },
  { name: 'Taylor Swift', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 102, emoji: '🎶' },
  { name: 'Lady Gaga', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 98, emoji: '👗' },
  { name: 'Coldplay', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 91, emoji: '🌈' },
  { name: 'Drake', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 89, emoji: '🎧' },
  { name: 'David Guetta', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 89, emoji: '🎛' },
  { name: 'Billie Eilish', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 84, emoji: '🖤' },

  // ============================================================
  // GEO - Country population (millions)
  // ============================================================
  { name: 'India', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 1450, emoji: '🇮🇳' },
  { name: 'China', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 1410, emoji: '🇨🇳' },
  { name: 'United States', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 341, emoji: '🇺🇸' },
  { name: 'Indonesia', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 279, emoji: '🇮🇩' },
  { name: 'Pakistan', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 252, emoji: '🇵🇰' },
  { name: 'Nigeria', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 228, emoji: '🇳🇬' },
  { name: 'Brazil', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 217, emoji: '🇧🇷' },
  { name: 'Bangladesh', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 169, emoji: '🇧🇩' },
  { name: 'Mexico', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 130, emoji: '🇲🇽' },
  { name: 'Japan', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 123, emoji: '🇯🇵' },
  { name: 'Ethiopia', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 119, emoji: '🇪🇹' },
  { name: 'Philippines', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 118, emoji: '🇵🇭' },
  { name: 'Egypt', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 111, emoji: '🇪🇬' },
  { name: 'Vietnam', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 106, emoji: '🇻🇳' },
  { name: 'Germany', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 84, emoji: '🇩🇪' },
  { name: 'Turkey', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 84, emoji: '🇹🇷' },
  { name: 'France', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 68, emoji: '🇫🇷' },
  { name: 'United Kingdom', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 68, emoji: '🇬🇧' },
  { name: 'South Korea', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 52, emoji: '🇰🇷' },
  { name: 'Canada', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 41, emoji: '🇨🇦' },
  { name: 'Australia', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 27, emoji: '🇦🇺' },

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
  { name: 'United States', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 31820, emoji: '🇺🇸' },
  { name: 'China', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 20650, emoji: '🇨🇳' },
  { name: 'Germany', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 5330, emoji: '🇩🇪' },
  { name: 'India', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 4510, emoji: '🇮🇳' },
  { name: 'Japan', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 4460, emoji: '🇯🇵' },
  { name: 'United Kingdom', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 4300, emoji: '🇬🇧' },
  { name: 'France', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 3450, emoji: '🇫🇷' },
  { name: 'Italy', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 2530, emoji: '🇮🇹' },
  { name: 'Canada', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 2340, emoji: '🇨🇦' },
  { name: 'Brazil', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 2280, emoji: '🇧🇷' },
  { name: 'South Korea', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 1920, emoji: '🇰🇷' },
  { name: 'Australia', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 1960, emoji: '🇦🇺' },
  { name: 'Mexico', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 1520, emoji: '🇲🇽' },

  // ============================================================
  // GEO - Country area (thousands km2)
  // ============================================================
  { name: 'Russia', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 17098, emoji: '🇷🇺' },
  { name: 'Canada', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 9985, emoji: '🇨🇦' },
  { name: 'United States', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 9834, emoji: '🇺🇸' },
  { name: 'China', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 9600, emoji: '🇨🇳' },
  { name: 'Brazil', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 8516, emoji: '🇧🇷' },
  { name: 'Australia', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 7692, emoji: '🇦🇺' },
  { name: 'India', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 3287, emoji: '🇮🇳' },
  { name: 'Argentina', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 2780, emoji: '🇦🇷' },
  { name: 'Kazakhstan', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 2725, emoji: '🇰🇿' },
  { name: 'Algeria', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 2382, emoji: '🇩🇿' },
  { name: 'Saudi Arabia', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 2150, emoji: '🇸🇦' },
  { name: 'Mexico', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 1964, emoji: '🇲🇽' },
  { name: 'France', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 641, emoji: '🇫🇷' },
  { name: 'Japan', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 378, emoji: '🇯🇵' },
  { name: 'United Kingdom', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 243, emoji: '🇬🇧' },

  // ============================================================
  // SPORTS - Athlete Instagram followers (millions)
  // ============================================================
  { name: 'Virat Kohli', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 270, emoji: '🏏' },
  { name: 'Neymar Jr', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 220, emoji: '🇧🇷' },
  { name: 'LeBron James', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 160, emoji: '🏀' },
  { name: 'Kylian Mbappe', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 118, emoji: '⚡' },
  { name: 'David Beckham', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 89, emoji: '⚽' },
  { name: 'Ronaldinho', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 78, emoji: '🇧🇷' },
  { name: 'Karim Benzema', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 75, emoji: '🇫🇷' },
  { name: 'Conor McGregor', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 47, emoji: '🥊' },
  { name: 'Serena Williams', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 17, emoji: '🎾' },
  { name: 'Usain Bolt', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 14, emoji: '🏃' },
  { name: 'Roger Federer', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 12, emoji: '🎾' },

  // ============================================================
  // SPORTS - Club/team Instagram followers (millions)
  // ============================================================
  { name: 'Real Madrid', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 180, emoji: '⚽' },
  { name: 'FC Barcelona', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 146, emoji: '⚽' },
  { name: 'PSG', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 66, emoji: '⚽' },
  { name: 'Manchester United', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 66, emoji: '⚽' },
  { name: 'Juventus', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 59, emoji: '⚽' },
  { name: 'Chelsea FC', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 42, emoji: '⚽' },
  { name: 'Liverpool FC', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 40, emoji: '⚽' },
  { name: 'Bayern Munich', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 38, emoji: '⚽' },
  { name: 'Manchester City', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 36, emoji: '⚽' },
  { name: 'Golden State Warriors', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 33, emoji: '🏀' },
  { name: 'LA Lakers', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 25, emoji: '🏀' },
  { name: 'Dallas Cowboys', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 21, emoji: '🏈' },
  { name: 'Arsenal FC', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 30, emoji: '⚽' },

  // ============================================================
  // TECH - Company market cap (billions USD)
  // ============================================================
  { name: 'Nvidia', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 5400, emoji: '🖥' },
  { name: 'Apple', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 4630, emoji: '🍎' },
  { name: 'Alphabet (Google)', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 4630, emoji: '🔍' },
  { name: 'Microsoft', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 3280, emoji: '🪟' },
  { name: 'Amazon', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 2870, emoji: '📦' },
  { name: 'TSMC', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 2000, emoji: '🔬' },
  { name: 'Broadcom', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 2010, emoji: '📡' },
  { name: 'Meta', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 1560, emoji: '👤' },
  { name: 'Tesla', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 1590, emoji: '🚗' },
  { name: 'Samsung', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 1240, emoji: '📱' },
  { name: 'Oracle', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 410, emoji: '🗄' },
  { name: 'Netflix', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 348, emoji: '🎥' },
  { name: 'Salesforce', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 155, emoji: '☁' },

  // ============================================================
  // TECH - App monthly active users (millions)
  // ============================================================
  { name: 'Facebook', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 2960, emoji: '👥' },
  { name: 'YouTube', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 2490, emoji: '▶' },
  { name: 'WhatsApp', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 2150, emoji: '💬' },
  { name: 'Instagram', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 2000, emoji: '📸' },
  { name: 'TikTok', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 1920, emoji: '🎵' },
  { name: 'Telegram', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 950, emoji: '✈' },
  { name: 'ChatGPT', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 1000, emoji: '🤖' },
  { name: 'Snapchat', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 850, emoji: '👻' },
  { name: 'X (Twitter)', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 600, emoji: '🐦' },
  { name: 'Reddit', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 430, emoji: '🟠' },
  { name: 'Pinterest', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 530, emoji: '📌' },

  // ============================================================
  // FOOD - Fast food chain locations worldwide (thousands)
  // ============================================================
  { name: 'Mixue', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 45, emoji: '🍦' },
  { name: 'Subway', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 37, emoji: '🥖' },
  { name: "McDonald's", category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 40, emoji: '🍔' },
  { name: 'Starbucks', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 40, emoji: '☕' },
  { name: 'KFC', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 32, emoji: '🍗' },
  { name: 'Burger King', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 19, emoji: '🍔' },
  { name: "Domino's Pizza", category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 20, emoji: '🍕' },
  { name: 'Pizza Hut', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 19, emoji: '🍕' },
  { name: "Dunkin'", category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 14, emoji: '🍩' },
  { name: 'Taco Bell', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 9, emoji: '🌮' },
  { name: "Wendy's", category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 7, emoji: '🍔' },
  { name: 'Tim Hortons', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 6, emoji: '☕' },
  { name: 'Chick-fil-A', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 3.5, emoji: '🐔' },

  // ============================================================
  // FOOD - Brand revenue (billions USD)
  // ============================================================
  { name: "McDonald's", category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 48.4, emoji: '🍔' },
  { name: 'Starbucks', category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 36.3, emoji: '☕' },
  { name: 'Chick-fil-A', category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 21.6, emoji: '🐔' },
  { name: 'Subway', category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 17.8, emoji: '🥖' },
  { name: 'Taco Bell', category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 15.1, emoji: '🌮' },
  { name: "Wendy's", category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 12.2, emoji: '🍔' },
  { name: 'Burger King', category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 11.9, emoji: '🍔' },
  { name: "Domino's Pizza", category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 8.9, emoji: '🍕' },
  { name: "Dunkin'", category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 8.1, emoji: '🍩' },
  { name: 'Pizza Hut', category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 7.5, emoji: '🍕' },

  // ============================================================
  // MONAD - Blockchain TPS comparison
  // ============================================================
  { name: 'Monad', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 10000, emoji: '🟣' },
  { name: 'Solana', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 5500, emoji: '◎' },
  { name: 'Avalanche', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 4500, emoji: '🔺' },
  { name: 'Sui', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 100000, emoji: '💧' },
  { name: 'Aptos', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 100000, emoji: '🌀' },
  { name: 'Polygon', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 500, emoji: '⬟' },
  { name: 'Arbitrum', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 250, emoji: '🔵' },
  { name: 'Base', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 200, emoji: '🔵' },
  { name: 'BNB Chain', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 300, emoji: '🟡' },
  { name: 'Ethereum', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 15, emoji: '⟠' },

  // ============================================================
  // MONAD - Block time (seconds)
  // ============================================================
  { name: 'Aptos', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 0.038, emoji: '🌀' },
  { name: 'Sui', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 0.221, emoji: '💧' },
  { name: 'Solana', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 0.4, emoji: '◎' },
  { name: 'Monad', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 0.4, emoji: '🟣' },
  { name: 'Avalanche', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 2, emoji: '🔺' },
  { name: 'BNB Chain', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 3, emoji: '🟡' },
  { name: 'Polygon', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 2, emoji: '⬟' },
  { name: 'Ethereum', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 12, emoji: '⟠' },
  { name: 'Bitcoin', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 600, emoji: '₿' },

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
  { name: 'Angela White', category: 'culture', metric: 'ph_searches', metricLabel: 'PH Search Rank Score', value: 95, emoji: '🔞' },
  { name: 'Violet Myers', category: 'culture', metric: 'ph_searches', metricLabel: 'PH Search Rank Score', value: 88, emoji: '🔞' },
  { name: 'Bonnie Blue', category: 'culture', metric: 'ph_searches', metricLabel: 'PH Search Rank Score', value: 84, emoji: '🔞' },
  { name: 'Lana Rhoades', category: 'culture', metric: 'ph_searches', metricLabel: 'PH Search Rank Score', value: 80, emoji: '🔞' },
  { name: 'Lily Phillips', category: 'culture', metric: 'ph_searches', metricLabel: 'PH Search Rank Score', value: 76, emoji: '🔞' },
  { name: 'Mia Khalifa', category: 'culture', metric: 'ph_searches', metricLabel: 'PH Search Rank Score', value: 72, emoji: '🔞' },
  { name: 'Riley Reid', category: 'culture', metric: 'ph_searches', metricLabel: 'PH Search Rank Score', value: 68, emoji: '🔞' },
  { name: 'Abella Danger', category: 'culture', metric: 'ph_searches', metricLabel: 'PH Search Rank Score', value: 65, emoji: '🔞' },
  { name: 'Eva Elfie', category: 'culture', metric: 'ph_searches', metricLabel: 'PH Search Rank Score', value: 62, emoji: '🔞' },

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
  { name: 'Kai Cenat', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 20, emoji: '🎮' },
  { name: 'Ibai', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 19.8, emoji: '🇪🇸' },
  { name: 'Ninja', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 19, emoji: '🥷' },
  { name: 'Auronplay', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 17, emoji: '🇪🇸' },
  { name: 'Rubius', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 17.3, emoji: '🎬' },
  { name: 'xQc', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 12.2, emoji: '🇨🇦' },
  { name: 'Tfue', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 11.3, emoji: '🎯' },
  { name: 'Shroud', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 11, emoji: '🔫' },
  { name: 'Pokimane', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 9.4, emoji: '🎀' },
]

export function getRandomPair(sameCategoryOnly = true): [Entity, Entity] {
  const pool = [...entities]
  const first = pool[Math.floor(Math.random() * pool.length)]
  const candidates = sameCategoryOnly
    ? pool.filter(e => e.metric === first.metric && e.name !== first.name)
    : pool.filter(e => e.name !== first.name || e.metric !== first.metric)
  const second = candidates[Math.floor(Math.random() * candidates.length)]
  return [first, second]
}

export const categoryLabels: Record<string, string> = {
  crypto: 'Crypto',
  culture: 'Pop Culture',
  geo: 'Geography',
  sports: 'Sports',
  tech: 'Tech',
  food: 'Food & Brands',
  monad: 'Blockchain',
}
