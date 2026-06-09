import type { Entity } from '../types'

export const entities: Entity[] = [
  // ============================================================
  // CRYPTO - Twitter/X followers (thousands)
  // ============================================================
  { name: 'Bitcoin', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 7200, emoji: '₿', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/250px-Bitcoin.svg.png' },
  { name: 'Ethereum', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 3500, emoji: '⟠', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Eth-diamond-rainbow.png/250px-Eth-diamond-rainbow.png' },
  { name: 'Solana', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 2800, emoji: '◎', image: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png' },
  { name: 'Dogecoin', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 3900, emoji: '🐕', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/Dogecoin_Logo.png/250px-Dogecoin_Logo.png' },
  { name: 'Cardano', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 1600, emoji: '🔷', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Cardano.svg/330px-Cardano.svg.png' },
  { name: 'Polygon', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 1300, emoji: '⬟' },
  { name: 'Chainlink', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 1100, emoji: '⬡', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Chainlink_Logo_%28Blue%29.png/330px-Chainlink_Logo_%28Blue%29.png' },
  { name: 'Uniswap', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 1200, emoji: '🦄', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Uniswap_Logo_and_Wordmark.svg/250px-Uniswap_Logo_and_Wordmark.svg.png' },
  { name: 'Arbitrum', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 1050, emoji: '🔵' },
  { name: 'Monad', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 950, emoji: '🟣' },
  { name: 'Avalanche', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 890, emoji: '🔺', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Avalanche_logo_without_text.png/250px-Avalanche_logo_without_text.png' },
  { name: 'Optimism', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 780, emoji: '🔴' },
  { name: 'Sui', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 720, emoji: '💧' },
  { name: 'Aave', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 680, emoji: '👻', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Aave_logo_%282024%29.png/330px-Aave_logo_%282024%29.png' },
  { name: 'Aptos', category: 'crypto', metric: 'twitter_followers', metricLabel: 'X Followers (K)', value: 540, emoji: '🌀' },

  // ============================================================
  // CRYPTO - Market cap (billions USD)
  // ============================================================
  { name: 'Bitcoin', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 1260, emoji: '₿', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/250px-Bitcoin.svg.png' },
  { name: 'Ethereum', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 195, emoji: '⟠', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Eth-diamond-rainbow.png/250px-Eth-diamond-rainbow.png' },
  { name: 'XRP', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 88, emoji: '✕', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/XRP_Ledger_logo_%282025%29.png/250px-XRP_Ledger_logo_%282025%29.png' },
  { name: 'BNB', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 67, emoji: '🟡', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Binance-BNB-Icon-Logo.wine.svg/250px-Binance-BNB-Icon-Logo.wine.svg.png' },
  { name: 'Solana', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 45, emoji: '◎', image: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png' },
  { name: 'Dogecoin', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 18, emoji: '🐕', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/Dogecoin_Logo.png/250px-Dogecoin_Logo.png' },
  { name: 'Cardano', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 14, emoji: '🔷', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Cardano.svg/330px-Cardano.svg.png' },
  { name: 'Toncoin', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 10, emoji: '💎', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/TON_ICON.png/250px-TON_ICON.png' },
  { name: 'Avalanche', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 6, emoji: '🔺', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Avalanche_logo_without_text.png/250px-Avalanche_logo_without_text.png' },
  { name: 'Sui', category: 'crypto', metric: 'market_cap', metricLabel: 'Market Cap ($B)', value: 8, emoji: '💧' },

  // ============================================================
  // CULTURE - Instagram followers (millions)
  // ============================================================
  { name: 'Cristiano Ronaldo', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 670, emoji: '⚽', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/President_Donald_Trump_meets_with_Cristiano_Ronaldo_in_the_Oval_Office_%2854933344262%29_%28cropped_and_rotated%29.jpg/250px-President_Donald_Trump_meets_with_Cristiano_Ronaldo_in_the_Oval_Office_%2854933344262%29_%28cropped_and_rotated%29.jpg' },
  { name: 'Lionel Messi', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 512, emoji: '🏆', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Lionel_Messi_White_House_2026_%283x4_cropped%29.jpg/250px-Lionel_Messi_White_House_2026_%283x4_cropped%29.jpg' },
  { name: 'Selena Gomez', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 414, emoji: '🎤', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Selena_Gomez_at_the_2024_Toronto_International_Film_Festival_10_%28cropped%29.jpg/250px-Selena_Gomez_at_the_2024_Toronto_International_Film_Festival_10_%28cropped%29.jpg' },
  { name: 'Kylie Jenner', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 392, emoji: '💄', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Kylie_Jenner1_%28cropped%29.png/250px-Kylie_Jenner1_%28cropped%29.png' },
  { name: 'Dwayne Johnson', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 392, emoji: '💪', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Dwayne_Johnson-1764_%284x5_cropped_with_moderate_headroom%29.jpg/250px-Dwayne_Johnson-1764_%284x5_cropped_with_moderate_headroom%29.jpg' },
  { name: 'Ariana Grande', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 372, emoji: '🎵', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Ariana_Grande_promoting_Wicked_%282024%29.jpg/250px-Ariana_Grande_promoting_Wicked_%282024%29.jpg' },
  { name: 'Kim Kardashian', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 354, emoji: '📱', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Kim_Kardashian_West_2014.jpg/250px-Kim_Kardashian_West_2014.jpg' },
  { name: 'Beyonce', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 308, emoji: '🐝', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Beyonc%C3%A9_-_Tottenham_Hotspur_Stadium_-_1st_June_2023_%2810_of_118%29_%2852946364598%29_%28best_crop%29.jpg/250px-Beyonc%C3%A9_-_Tottenham_Hotspur_Stadium_-_1st_June_2023_%2810_of_118%29_%2852946364598%29_%28best_crop%29.jpg' },
  { name: 'Khloe Kardashian', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 301, emoji: '✨' },
  { name: 'Justin Bieber', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 292, emoji: '🎸', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Justin_Bieber_in_2015.jpg/250px-Justin_Bieber_in_2015.jpg' },
  { name: 'Taylor Swift', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 281, emoji: '🎶', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Taylor_Swift_at_the_2023_MTV_Video_Music_Awards_%283%29.png/250px-Taylor_Swift_at_the_2023_MTV_Video_Music_Awards_%283%29.png' },
  { name: 'Neymar Jr', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 220, emoji: '🇧🇷', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Neymar_Jr._with_Al_Hilal%2C_3_October_2023_-_03_%28cropped%29.jpg/250px-Neymar_Jr._with_Al_Hilal%2C_3_October_2023_-_03_%28cropped%29.jpg' },
  { name: 'Zendaya', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 182, emoji: '🕷', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Zendaya_-_2019_by_Glenn_Francis.jpg/250px-Zendaya_-_2019_by_Glenn_Francis.jpg' },
  { name: 'LeBron James', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 160, emoji: '🏀', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/LeBron_James_%2851959977144%29_%28cropped2%29.jpg/250px-LeBron_James_%2851959977144%29_%28cropped2%29.jpg' },
  { name: 'Drake', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 146, emoji: '🎧', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Drake_at_The_Carter_Effect_2017_%2836818935200%29_%28cropped%29.jpg/250px-Drake_at_The_Carter_Effect_2017_%2836818935200%29_%28cropped%29.jpg' },
  { name: 'Kylian Mbappe', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 118, emoji: '⚡', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Picture_with_Mbapp%C3%A9_%28cropped_and_rotated%29.jpg/250px-Picture_with_Mbapp%C3%A9_%28cropped_and_rotated%29.jpg' },
  { name: 'MrBeast', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 85, emoji: '🎬', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/MrBeast_in_2026_%28cropped_4%29.png/250px-MrBeast_in_2026_%28cropped_4%29.png' },
  { name: 'Elon Musk', category: 'culture', metric: 'instagram', metricLabel: 'Instagram (M)', value: 42, emoji: '🚀', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Elon_Musk_-_54820081119_%28cropped%29.jpg/250px-Elon_Musk_-_54820081119_%28cropped%29.jpg' },

  // ============================================================
  // CULTURE - YouTube subscribers (millions)
  // ============================================================
  { name: 'MrBeast', category: 'culture', metric: 'youtube', metricLabel: 'YouTube Subs (M)', value: 497, emoji: '🎬', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/MrBeast_in_2026_%28cropped_4%29.png/250px-MrBeast_in_2026_%28cropped_4%29.png' },
  { name: 'T-Series', category: 'culture', metric: 'youtube', metricLabel: 'YouTube Subs (M)', value: 310, emoji: '🎶' },
  { name: 'Cocomelon', category: 'culture', metric: 'youtube', metricLabel: 'YouTube Subs (M)', value: 200, emoji: '🍉' },
  { name: 'SET India', category: 'culture', metric: 'youtube', metricLabel: 'YouTube Subs (M)', value: 175, emoji: '📺' },
  { name: 'Kids Diana Show', category: 'culture', metric: 'youtube', metricLabel: 'YouTube Subs (M)', value: 138, emoji: '👧' },
  { name: 'Like Nastya', category: 'culture', metric: 'youtube', metricLabel: 'YouTube Subs (M)', value: 131, emoji: '🧸' },
  { name: 'PewDiePie', category: 'culture', metric: 'youtube', metricLabel: 'YouTube Subs (M)', value: 110, emoji: '👊', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pewdiepie_head_shot.jpg/250px-Pewdiepie_head_shot.jpg' },

  // ============================================================
  // CULTURE - Spotify monthly listeners (millions)
  // ============================================================
  { name: 'Justin Bieber', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 139, emoji: '🎸', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Justin_Bieber_in_2015.jpg/250px-Justin_Bieber_in_2015.jpg' },
  { name: 'Bruno Mars', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 137, emoji: '🎹', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/BrunoMars24KMagicWorldTourLive_%28cropped%29.jpg/250px-BrunoMars24KMagicWorldTourLive_%28cropped%29.jpg' },
  { name: 'The Weeknd', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 116, emoji: '🌙', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/The_Weeknd_Portrait_by_Brian_Ziff.jpg/250px-The_Weeknd_Portrait_by_Brian_Ziff.jpg' },
  { name: 'Rihanna', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 112, emoji: '💎', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Rihanna_Fenty_2018.png/250px-Rihanna_Fenty_2018.png' },
  { name: 'Bad Bunny', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 102, emoji: '🐰', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Bad_Bunny_2019_by_Glenn_Francis_%28cropped%29.jpg/250px-Bad_Bunny_2019_by_Glenn_Francis_%28cropped%29.jpg' },
  { name: 'Taylor Swift', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 102, emoji: '🎶', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Taylor_Swift_at_the_2023_MTV_Video_Music_Awards_%283%29.png/250px-Taylor_Swift_at_the_2023_MTV_Video_Music_Awards_%283%29.png' },
  { name: 'Lady Gaga', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 98, emoji: '👗', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Lady_Gaga_at_Joe_Biden%27s_inauguration_%28cropped_5%29.jpg/250px-Lady_Gaga_at_Joe_Biden%27s_inauguration_%28cropped_5%29.jpg' },
  { name: 'Coldplay', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 91, emoji: '🌈', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/ColdplayWembley120925_%28cropped%29.jpg/330px-ColdplayWembley120925_%28cropped%29.jpg' },
  { name: 'Drake', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 89, emoji: '🎧', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Drake_at_The_Carter_Effect_2017_%2836818935200%29_%28cropped%29.jpg/250px-Drake_at_The_Carter_Effect_2017_%2836818935200%29_%28cropped%29.jpg' },
  { name: 'David Guetta', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 89, emoji: '🎛', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/2023-11-16_Gala_de_los_Latin_Grammy%2C_22_%28David_Guetta%29.jpg/250px-2023-11-16_Gala_de_los_Latin_Grammy%2C_22_%28David_Guetta%29.jpg' },
  { name: 'Billie Eilish', category: 'culture', metric: 'spotify', metricLabel: 'Spotify Listeners (M)', value: 84, emoji: '🖤', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/BillieEilishO2140725-39_-_54665577407_%28cropped%29.jpg/250px-BillieEilishO2140725-39_-_54665577407_%28cropped%29.jpg' },

  // ============================================================
  // GEO - Country population (millions)
  // ============================================================
  { name: 'India', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 1450, emoji: '🇮🇳', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/250px-Flag_of_India.svg.png' },
  { name: 'China', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 1410, emoji: '🇨🇳', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/250px-Flag_of_the_People%27s_Republic_of_China.svg.png' },
  { name: 'United States', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 341, emoji: '🇺🇸', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/250px-Flag_of_the_United_States.svg.png' },
  { name: 'Indonesia', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 279, emoji: '🇮🇩', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/250px-Flag_of_Indonesia.svg.png' },
  { name: 'Pakistan', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 252, emoji: '🇵🇰', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Pakistan.svg/250px-Flag_of_Pakistan.svg.png' },
  { name: 'Nigeria', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 228, emoji: '🇳🇬', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_Nigeria.svg/250px-Flag_of_Nigeria.svg.png' },
  { name: 'Brazil', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 217, emoji: '🇧🇷', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/250px-Flag_of_Brazil.svg.png' },
  { name: 'Bangladesh', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 169, emoji: '🇧🇩', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/250px-Flag_of_Bangladesh.svg.png' },
  { name: 'Mexico', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 130, emoji: '🇲🇽', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/250px-Flag_of_Mexico.svg.png' },
  { name: 'Japan', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 123, emoji: '🇯🇵', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/250px-Flag_of_Japan.svg.png' },
  { name: 'Ethiopia', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 119, emoji: '🇪🇹', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_Ethiopia.svg/250px-Flag_of_Ethiopia.svg.png' },
  { name: 'Philippines', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 118, emoji: '🇵🇭', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Flag_of_the_Philippines.svg/250px-Flag_of_the_Philippines.svg.png' },
  { name: 'Egypt', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 111, emoji: '🇪🇬', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/250px-Flag_of_Egypt.svg.png' },
  { name: 'Vietnam', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 106, emoji: '🇻🇳', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/250px-Flag_of_Vietnam.svg.png' },
  { name: 'Germany', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 84, emoji: '🇩🇪', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/250px-Flag_of_Germany.svg.png' },
  { name: 'Turkey', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 84, emoji: '🇹🇷', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/250px-Flag_of_Turkey.svg.png' },
  { name: 'France', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 68, emoji: '🇫🇷', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/250px-Flag_of_France.svg.png' },
  { name: 'United Kingdom', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 68, emoji: '🇬🇧', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/250px-Flag_of_the_United_Kingdom.svg.png' },
  { name: 'South Korea', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 52, emoji: '🇰🇷', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/250px-Flag_of_South_Korea.svg.png' },
  { name: 'Canada', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 41, emoji: '🇨🇦', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/250px-Flag_of_Canada_%28Pantone%29.svg.png' },
  { name: 'Australia', category: 'geo', metric: 'population', metricLabel: 'Population (M)', value: 27, emoji: '🇦🇺', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/250px-Flag_of_Australia_%28converted%29.svg.png' },

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
  { name: 'United States', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 31820, emoji: '🇺🇸', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/250px-Flag_of_the_United_States.svg.png' },
  { name: 'China', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 20650, emoji: '🇨🇳', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/250px-Flag_of_the_People%27s_Republic_of_China.svg.png' },
  { name: 'Germany', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 5330, emoji: '🇩🇪', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/250px-Flag_of_Germany.svg.png' },
  { name: 'India', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 4510, emoji: '🇮🇳', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/250px-Flag_of_India.svg.png' },
  { name: 'Japan', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 4460, emoji: '🇯🇵', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/250px-Flag_of_Japan.svg.png' },
  { name: 'United Kingdom', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 4300, emoji: '🇬🇧', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/250px-Flag_of_the_United_Kingdom.svg.png' },
  { name: 'France', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 3450, emoji: '🇫🇷', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/250px-Flag_of_France.svg.png' },
  { name: 'Italy', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 2530, emoji: '🇮🇹', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/250px-Flag_of_Italy.svg.png' },
  { name: 'Canada', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 2340, emoji: '🇨🇦', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/250px-Flag_of_Canada_%28Pantone%29.svg.png' },
  { name: 'Brazil', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 2280, emoji: '🇧🇷', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/250px-Flag_of_Brazil.svg.png' },
  { name: 'South Korea', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 1920, emoji: '🇰🇷', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/250px-Flag_of_South_Korea.svg.png' },
  { name: 'Australia', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 1960, emoji: '🇦🇺', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/250px-Flag_of_Australia_%28converted%29.svg.png' },
  { name: 'Mexico', category: 'geo', metric: 'gdp', metricLabel: 'GDP ($B)', value: 1520, emoji: '🇲🇽', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/250px-Flag_of_Mexico.svg.png' },

  // ============================================================
  // GEO - Country area (thousands km2)
  // ============================================================
  { name: 'Russia', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 17098, emoji: '🇷🇺', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/250px-Flag_of_Russia.svg.png' },
  { name: 'Canada', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 9985, emoji: '🇨🇦', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/250px-Flag_of_Canada_%28Pantone%29.svg.png' },
  { name: 'United States', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 9834, emoji: '🇺🇸', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/250px-Flag_of_the_United_States.svg.png' },
  { name: 'China', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 9600, emoji: '🇨🇳', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/250px-Flag_of_the_People%27s_Republic_of_China.svg.png' },
  { name: 'Brazil', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 8516, emoji: '🇧🇷', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/250px-Flag_of_Brazil.svg.png' },
  { name: 'Australia', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 7692, emoji: '🇦🇺', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/250px-Flag_of_Australia_%28converted%29.svg.png' },
  { name: 'India', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 3287, emoji: '🇮🇳', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/250px-Flag_of_India.svg.png' },
  { name: 'Argentina', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 2780, emoji: '🇦🇷', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/250px-Flag_of_Argentina.svg.png' },
  { name: 'Kazakhstan', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 2725, emoji: '🇰🇿', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Flag_of_Kazakhstan.svg/250px-Flag_of_Kazakhstan.svg.png' },
  { name: 'Algeria', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 2382, emoji: '🇩🇿', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Algeria.svg/250px-Flag_of_Algeria.svg.png' },
  { name: 'Saudi Arabia', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 2150, emoji: '🇸🇦', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/250px-Flag_of_Saudi_Arabia.svg.png' },
  { name: 'Mexico', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 1964, emoji: '🇲🇽', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/250px-Flag_of_Mexico.svg.png' },
  { name: 'France', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 641, emoji: '🇫🇷', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/250px-Flag_of_France.svg.png' },
  { name: 'Japan', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 378, emoji: '🇯🇵', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/250px-Flag_of_Japan.svg.png' },
  { name: 'United Kingdom', category: 'geo', metric: 'area', metricLabel: 'Area (K km2)', value: 243, emoji: '🇬🇧', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/250px-Flag_of_the_United_Kingdom.svg.png' },

  // ============================================================
  // SPORTS - Athlete Instagram followers (millions)
  // ============================================================
  { name: 'Virat Kohli', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 270, emoji: '🏏', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Virat_Kohli_in_PMO_New_Delhi.jpg/250px-Virat_Kohli_in_PMO_New_Delhi.jpg' },
  { name: 'Neymar Jr', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 220, emoji: '🇧🇷', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Neymar_Jr._with_Al_Hilal%2C_3_October_2023_-_03_%28cropped%29.jpg/250px-Neymar_Jr._with_Al_Hilal%2C_3_October_2023_-_03_%28cropped%29.jpg' },
  { name: 'LeBron James', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 160, emoji: '🏀', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/LeBron_James_%2851959977144%29_%28cropped2%29.jpg/250px-LeBron_James_%2851959977144%29_%28cropped2%29.jpg' },
  { name: 'Kylian Mbappe', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 118, emoji: '⚡', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Picture_with_Mbapp%C3%A9_%28cropped_and_rotated%29.jpg/250px-Picture_with_Mbapp%C3%A9_%28cropped_and_rotated%29.jpg' },
  { name: 'David Beckham', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 89, emoji: '⚽', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/David_Beckham_UNICEF_%28cropped2%29.jpg/250px-David_Beckham_UNICEF_%28cropped2%29.jpg' },
  { name: 'Ronaldinho', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 78, emoji: '🇧🇷', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Ronaldinho_in_2019.jpg/250px-Ronaldinho_in_2019.jpg' },
  { name: 'Karim Benzema', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 75, emoji: '🇫🇷', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Karim_Benzema_Pick.jpg/250px-Karim_Benzema_Pick.jpg' },
  { name: 'Conor McGregor', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 47, emoji: '🥊', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Conor_McGregor_2025.jpeg/250px-Conor_McGregor_2025.jpeg' },
  { name: 'Serena Williams', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 17, emoji: '🎾', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Guests_at_the_2026_Met_Gala_209_%28cropped%29.jpg/250px-Guests_at_the_2026_Met_Gala_209_%28cropped%29.jpg' },
  { name: 'Usain Bolt', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 14, emoji: '🏃', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Usain_Bolt_smiling_Berlin_2009.JPG/250px-Usain_Bolt_smiling_Berlin_2009.JPG' },
  { name: 'Roger Federer', category: 'sports', metric: 'athlete_instagram', metricLabel: 'Instagram (M)', value: 12, emoji: '🎾', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Roger_Federer_2015_%28cropped%29.jpg/250px-Roger_Federer_2015_%28cropped%29.jpg' },

  // ============================================================
  // SPORTS - Club/team Instagram followers (millions)
  // ============================================================
  { name: 'Real Madrid', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 180, emoji: '⚽', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/250px-Real_Madrid_CF.svg.png' },
  { name: 'FC Barcelona', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 146, emoji: '⚽', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/250px-FC_Barcelona_%28crest%29.svg.png' },
  { name: 'PSG', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 66, emoji: '⚽', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/250px-Paris_Saint-Germain_F.C..svg.png' },
  { name: 'Manchester United', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 66, emoji: '⚽', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/250px-Manchester_United_FC_crest.svg.png' },
  { name: 'Juventus', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 59, emoji: '⚽', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Juventus_FC_-_logo_black_%28Italy%2C_2020%29.svg/250px-Juventus_FC_-_logo_black_%28Italy%2C_2020%29.svg.png' },
  { name: 'Chelsea FC', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 42, emoji: '⚽', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/250px-Chelsea_FC.svg.png' },
  { name: 'Liverpool FC', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 40, emoji: '⚽', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/250px-Liverpool_FC.svg.png' },
  { name: 'Bayern Munich', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 38, emoji: '⚽', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg/250px-FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg.png' },
  { name: 'Manchester City', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 36, emoji: '⚽', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/250px-Manchester_City_FC_badge.svg.png' },
  { name: 'Golden State Warriors', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 33, emoji: '🏀', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Golden_State_Warriors_logo.svg/250px-Golden_State_Warriors_logo.svg.png' },
  { name: 'LA Lakers', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 25, emoji: '🏀', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/250px-Los_Angeles_Lakers_logo.svg.png' },
  { name: 'Dallas Cowboys', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 21, emoji: '🏈', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Dallas_Cowboys.svg/120px-Dallas_Cowboys.svg.png' },
  { name: 'Arsenal FC', category: 'sports', metric: 'club_instagram', metricLabel: 'Instagram (M)', value: 30, emoji: '⚽', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/250px-Arsenal_FC.svg.png' },

  // ============================================================
  // TECH - Company market cap (billions USD)
  // ============================================================
  { name: 'Nvidia', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 5400, emoji: '🖥', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/NVIDIA_logo.svg/330px-NVIDIA_logo.svg.png' },
  { name: 'Apple', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 4630, emoji: '🍎', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/120px-Apple_logo_black.svg.png' },
  { name: 'Alphabet (Google)', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 4630, emoji: '🔍', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Google_2026_logo.svg/330px-Google_2026_logo.svg.png' },
  { name: 'Microsoft', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 3280, emoji: '🪟', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/250px-Microsoft_logo_%282012%29.svg.png' },
  { name: 'Amazon', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 2870, emoji: '📦', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Amazon_2024.svg/250px-Amazon_2024.svg.png' },
  { name: 'TSMC', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 2000, emoji: '🔬', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Tsmc.svg/250px-Tsmc.svg.png' },
  { name: 'Broadcom', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 2010, emoji: '📡', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Broadcom_logo_%282016-present%29.svg/330px-Broadcom_logo_%282016-present%29.svg.png' },
  { name: 'Meta', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 1560, emoji: '👤', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/330px-Meta_Platforms_Inc._logo.svg.png' },
  { name: 'Tesla', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 1590, emoji: '🚗', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/120px-Tesla_Motors.svg.png' },
  { name: 'Samsung', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 1240, emoji: '📱', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Samsung_Black_icon.svg/330px-Samsung_Black_icon.svg.png' },
  { name: 'Oracle', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 410, emoji: '🗄', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/330px-Oracle_logo.svg.png' },
  { name: 'Netflix', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 348, emoji: '🎥', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/330px-Netflix_2015_logo.svg.png' },
  { name: 'Salesforce', category: 'tech', metric: 'tech_market_cap', metricLabel: 'Market Cap ($B)', value: 155, emoji: '☁', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/250px-Salesforce.com_logo.svg.png' },

  // ============================================================
  // TECH - App monthly active users (millions)
  // ============================================================
  { name: 'Facebook', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 2960, emoji: '👥', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/120px-2023_Facebook_icon.svg.png' },
  { name: 'YouTube', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 2490, emoji: '▶', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/YouTube_2024.svg/250px-YouTube_2024.svg.png' },
  { name: 'WhatsApp', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 2150, emoji: '💬', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/WhatsApp_Logo_green.svg/250px-WhatsApp_Logo_green.svg.png' },
  { name: 'Instagram', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 2000, emoji: '📸', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/250px-Instagram_logo_2022.svg.png' },
  { name: 'TikTok', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 1920, emoji: '🎵', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/250px-TikTok_logo.svg.png' },
  { name: 'Telegram', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 950, emoji: '✈', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/250px-Telegram_2019_Logo.svg.png' },
  { name: 'ChatGPT', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 1000, emoji: '🤖' },
  { name: 'Snapchat', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 850, emoji: '👻', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Snapchat_logo.svg/120px-Snapchat_logo.svg.png' },
  { name: 'X (Twitter)', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 600, emoji: '🐦' },
  { name: 'Reddit', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 430, emoji: '🟠', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Reddit_logo_2023.svg/330px-Reddit_logo_2023.svg.png' },
  { name: 'Pinterest', category: 'tech', metric: 'app_users', metricLabel: 'Monthly Users (M)', value: 530, emoji: '📌', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Pinterest_Logo_3.svg/250px-Pinterest_Logo_3.svg.png' },

  // ============================================================
  // FOOD - Fast food chain locations worldwide (thousands)
  // ============================================================
  { name: 'Mixue', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 45, emoji: '🍦' },
  { name: 'Subway', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 37, emoji: '🥖', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Subway_2016_logo.svg/250px-Subway_2016_logo.svg.png' },
  { name: "McDonald's", category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 40, emoji: '🍔', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/McDonald%27s_logo.svg/250px-McDonald%27s_logo.svg.png' },
  { name: 'Starbucks', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 40, emoji: '☕', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/250px-Starbucks_Corporation_Logo_2011.svg.png' },
  { name: 'KFC', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 32, emoji: '🍗', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/57/KFC_logo-image.svg/250px-KFC_logo-image.svg.png' },
  { name: 'Burger King', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 19, emoji: '🍔', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Burger_King_2020.svg/250px-Burger_King_2020.svg.png' },
  { name: "Domino's Pizza", category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 20, emoji: '🍕', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Domino%27s_2025.svg/250px-Domino%27s_2025.svg.png' },
  { name: 'Pizza Hut', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 19, emoji: '🍕', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Pizza_Hut_2025.svg/250px-Pizza_Hut_2025.svg.png' },
  { name: "Dunkin'", category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 14, emoji: '🍩', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Dunkin%27_2022.svg/250px-Dunkin%27_2022.svg.png' },
  { name: 'Taco Bell', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 9, emoji: '🌮', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Taco_Bell_2023.svg/250px-Taco_Bell_2023.svg.png' },
  { name: "Wendy's", category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 7, emoji: '🍔', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Wendy%27s_full_logo_2012.svg/250px-Wendy%27s_full_logo_2012.svg.png' },
  { name: 'Tim Hortons', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 6, emoji: '☕', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Tim_Hortons_Logo.svg/250px-Tim_Hortons_Logo.svg.png' },
  { name: 'Chick-fil-A', category: 'food', metric: 'locations', metricLabel: 'Locations (K)', value: 3.5, emoji: '🐔', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Chick-fil-A_Logo.svg/250px-Chick-fil-A_Logo.svg.png' },

  // ============================================================
  // FOOD - Brand revenue (billions USD)
  // ============================================================
  { name: "McDonald's", category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 48.4, emoji: '🍔', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/McDonald%27s_logo.svg/250px-McDonald%27s_logo.svg.png' },
  { name: 'Starbucks', category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 36.3, emoji: '☕', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/250px-Starbucks_Corporation_Logo_2011.svg.png' },
  { name: 'Chick-fil-A', category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 21.6, emoji: '🐔', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Chick-fil-A_Logo.svg/250px-Chick-fil-A_Logo.svg.png' },
  { name: 'Subway', category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 17.8, emoji: '🥖', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Subway_2016_logo.svg/250px-Subway_2016_logo.svg.png' },
  { name: 'Taco Bell', category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 15.1, emoji: '🌮', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Taco_Bell_2023.svg/250px-Taco_Bell_2023.svg.png' },
  { name: "Wendy's", category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 12.2, emoji: '🍔', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Wendy%27s_full_logo_2012.svg/250px-Wendy%27s_full_logo_2012.svg.png' },
  { name: 'Burger King', category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 11.9, emoji: '🍔', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Burger_King_2020.svg/250px-Burger_King_2020.svg.png' },
  { name: "Domino's Pizza", category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 8.9, emoji: '🍕', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Domino%27s_2025.svg/250px-Domino%27s_2025.svg.png' },
  { name: "Dunkin'", category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 8.1, emoji: '🍩', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Dunkin%27_2022.svg/250px-Dunkin%27_2022.svg.png' },
  { name: 'Pizza Hut', category: 'food', metric: 'food_revenue', metricLabel: 'Revenue ($B)', value: 7.5, emoji: '🍕', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Pizza_Hut_2025.svg/250px-Pizza_Hut_2025.svg.png' },

  // ============================================================
  // MONAD - Blockchain TPS comparison
  // ============================================================
  { name: 'Monad', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 10000, emoji: '🟣' },
  { name: 'Solana', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 5500, emoji: '◎', image: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png' },
  { name: 'Avalanche', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 4500, emoji: '🔺', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Avalanche_logo_without_text.png/250px-Avalanche_logo_without_text.png' },
  { name: 'Sui', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 100000, emoji: '💧' },
  { name: 'Aptos', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 100000, emoji: '🌀' },
  { name: 'Polygon', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 500, emoji: '⬟' },
  { name: 'Arbitrum', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 250, emoji: '🔵' },
  { name: 'Base', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 200, emoji: '🔵' },
  { name: 'BNB Chain', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 300, emoji: '🟡', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Binance-BNB-Icon-Logo.wine.svg/250px-Binance-BNB-Icon-Logo.wine.svg.png' },
  { name: 'Ethereum', category: 'monad', metric: 'tps', metricLabel: 'Max TPS', value: 15, emoji: '⟠', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Eth-diamond-rainbow.png/250px-Eth-diamond-rainbow.png' },

  // ============================================================
  // MONAD - Block time (seconds)
  // ============================================================
  { name: 'Aptos', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 0.038, emoji: '🌀' },
  { name: 'Sui', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 0.221, emoji: '💧' },
  { name: 'Solana', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 0.4, emoji: '◎', image: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png' },
  { name: 'Monad', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 0.4, emoji: '🟣' },
  { name: 'Avalanche', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 2, emoji: '🔺', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Avalanche_logo_without_text.png/250px-Avalanche_logo_without_text.png' },
  { name: 'BNB Chain', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 3, emoji: '🟡', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Binance-BNB-Icon-Logo.wine.svg/250px-Binance-BNB-Icon-Logo.wine.svg.png' },
  { name: 'Polygon', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 2, emoji: '⬟' },
  { name: 'Ethereum', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 12, emoji: '⟠', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Eth-diamond-rainbow.png/250px-Eth-diamond-rainbow.png' },
  { name: 'Bitcoin', category: 'monad', metric: 'block_time', metricLabel: 'Block Time (s)', value: 600, emoji: '₿', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/250px-Bitcoin.svg.png' },

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
  { name: 'Kai Cenat', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 20, emoji: '🎮', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Kai_Cenat_July_2025.jpg/250px-Kai_Cenat_July_2025.jpg' },
  { name: 'Ibai', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 19.8, emoji: '🇪🇸' },
  { name: 'Ninja', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 19, emoji: '🥷', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Krystalogy%2C_Jess%2C_Ninja%2C_and_Typical_Gamer_relaxing_in_the_State_Farm_Gamerhood_%2852899874282%29_%283x4_cropped_on_Ninja_and_rotated%29.jpg/250px-Krystalogy%2C_Jess%2C_Ninja%2C_and_Typical_Gamer_relaxing_in_the_State_Farm_Gamerhood_%2852899874282%29_%283x4_cropped_on_Ninja_and_rotated%29.jpg' },
  { name: 'Auronplay', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 17, emoji: '🇪🇸' },
  { name: 'Rubius', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 17.3, emoji: '🎬' },
  { name: 'xQc', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 12.2, emoji: '🇨🇦', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/XQc_July_4_2023.jpg/250px-XQc_July_4_2023.jpg' },
  { name: 'Tfue', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 11.3, emoji: '🎯' },
  { name: 'Shroud', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 11, emoji: '🔫' },
  { name: 'Pokimane', category: 'culture', metric: 'twitch', metricLabel: 'Twitch Followers (M)', value: 9.4, emoji: '🎀', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Pokimane_at_the_Creator_Economy_Caucus_launch%2C_2025_%28cropped%29_3.jpg/250px-Pokimane_at_the_Creator_Economy_Caucus_launch%2C_2025_%28cropped%29_3.jpg' },
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
