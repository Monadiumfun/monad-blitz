const cryptoSlugs: Record<string, string> = {
  'Bitcoin': 'bitcoin-btc',
  'Ethereum': 'ethereum-eth',
  'Solana': 'solana-sol',
  'Dogecoin': 'dogecoin-doge',
  'Cardano': 'cardano-ada',
  'Polygon': 'polygon-matic',
  'Chainlink': 'chainlink-link',
  'Uniswap': 'uniswap-uni',
  'Arbitrum': 'arbitrum-arb',
  'Avalanche': 'avalanche-avax',
  'Optimism': 'optimism-ethereum-op',
  'Sui': 'sui-sui',
  'Aave': 'aave-aave',
  'Aptos': 'aptos-apt',
  'XRP': 'xrp-xrp',
  'BNB': 'bnb-bnb',
  'Toncoin': 'toncoin-ton',
  'Monad': 'monad-mon',
  'Base': 'base-base',
  'BNB Chain': 'bnb-bnb',
}

const countryCodes: Record<string, string> = {
  'India': 'in', 'China': 'cn', 'United States': 'us', 'Indonesia': 'id',
  'Brazil': 'br', 'Nigeria': 'ng', 'Japan': 'jp', 'Mexico': 'mx',
  'Germany': 'de', 'France': 'fr', 'United Kingdom': 'gb', 'South Korea': 'kr',
  'Canada': 'ca', 'Australia': 'au', 'Russia': 'ru', 'Turkey': 'tr',
  'Italy': 'it', 'Spain': 'es', 'Saudi Arabia': 'sa', 'Argentina': 'ar',
  'Netherlands': 'nl', 'Switzerland': 'ch', 'Sweden': 'se', 'Norway': 'no',
  'Poland': 'pl', 'Belgium': 'be', 'Austria': 'at', 'Denmark': 'dk',
  'Singapore': 'sg', 'Israel': 'il', 'Ireland': 'ie', 'Thailand': 'th',
  'Egypt': 'eg', 'South Africa': 'za', 'Pakistan': 'pk', 'Bangladesh': 'bd',
  'Philippines': 'ph', 'Vietnam': 'vn', 'Colombia': 'co', 'Chile': 'cl',
  'Ethiopia': 'et', 'DR Congo': 'cd',
}

const instagramHandles: Record<string, string> = {
  'Cristiano Ronaldo': 'cristiano',
  'Lionel Messi': 'leomessi',
  'Selena Gomez': 'selenagomez',
  'Kylie Jenner': 'kyliejenner',
  'Dwayne Johnson': 'therock',
  'Ariana Grande': 'arianagrande',
  'Kim Kardashian': 'kimkardashian',
  'Beyonce': 'beyonce',
  'Khloe Kardashian': 'khloekardashian',
  'Justin Bieber': 'justinbieber',
  'Taylor Swift': 'taylorswift',
  'Neymar Jr': 'neymarjr',
  'Zendaya': 'zendaya',
  'LeBron James': 'kingjames',
  'Drake': 'champagnepapi',
  'Kylian Mbappe': 'k.mbappe',
  'MrBeast': 'mrbeast',
  'Elon Musk': 'elonmusk',
  'Bruno Mars': 'brunomars',
  'The Weeknd': 'theweeknd',
  'Rihanna': 'badgalriri',
  'Bad Bunny': 'badbunnypr',
  'Billie Eilish': 'billieeilish',
  'Ed Sheeran': 'teddysphotos',
  'Post Malone': 'postmalone',
  'Dua Lipa': 'dualipa',
  'Travis Scott': 'travisscott',
  'Eminem': 'eminem',
  'Kanye West': 'kanyewest',
  'Ninja': 'ninja',
  'Kai Cenat': 'kaicenat',
  'Ibai': 'ibaillanos',
  'Rubius': 'elrubiuswtf',
  'Auronplay': 'auronplay',
  'xQc': 'xqc',
  'Pokimane': 'pokimane',
  'Shroud': 'shroud',
  'Tfue': 'tfue',
  'Lana Rhoades': 'lanarhoades',
  'Mia Khalifa': 'miakhalifa',
  'Sophie Rain': 'sophieraiin',
  'Lily Phillips': 'lilyphillip_s',
  'Violet Myers': 'violetmyers',
  'Bonnie Blue': 'bonnie_blue_xox',
  'Riley Reid': 'titsoutrileyyy',
  'Abella Danger': 'danger',
  'Angela White': 'angelawhite',
  'Eva Elfie': 'eva.elfie',
  'Real Madrid': 'realmadrid',
  'FC Barcelona': 'fcbarcelona',
  'Manchester United': 'manchesterunited',
  'Liverpool FC': 'liverpoolfc',
  'PSG': 'psg',
  'Juventus': 'juventus',
  'Bayern Munich': 'fcbayern',
  'Chelsea FC': 'chelseafc',
  'Manchester City': 'mancity',
  'Arsenal': 'arsenal',
  'Virat Kohli': 'virat.kohli',
  'Roger Federer': 'rogerfederer',
  'Serena Williams': 'serenawilliams',
  'Conor McGregor': 'thenotoriousmma',
  'Stephen Curry': 'stephencurry30',
  'Tom Brady': 'tombrady',
  'Lewis Hamilton': 'lewishamilton',
  'Usain Bolt': 'usainbolt',
}

const companyDomains: Record<string, string> = {
  'Apple': 'apple.com',
  'Microsoft': 'microsoft.com',
  'Nvidia': 'nvidia.com',
  'Google': 'google.com',
  'Amazon': 'amazon.com',
  'Meta': 'meta.com',
  'Tesla': 'tesla.com',
  'TSMC': 'tsmc.com',
  'Samsung': 'samsung.com',
  'Broadcom': 'broadcom.com',
  'Netflix': 'netflix.com',
  'Spotify': 'spotify.com',
  'TikTok': 'tiktok.com',
  'Snapchat': 'snapchat.com',
  'Telegram': 'telegram.org',
  'Pinterest': 'pinterest.com',
  'Reddit': 'reddit.com',
  'X': 'x.com',
  'Discord': 'discord.com',
  'ChatGPT': 'openai.com',
  'WhatsApp': 'whatsapp.com',
  'Instagram': 'instagram.com',
  'YouTube': 'youtube.com',
  'Facebook': 'facebook.com',
  "McDonald's": 'mcdonalds.com',
  'Starbucks': 'starbucks.com',
  'Subway': 'subway.com',
  'KFC': 'kfc.com',
  'Burger King': 'bk.com',
  "Domino's": 'dominos.com',
  "Pizza Hut": 'pizzahut.com',
  "Dunkin'": 'dunkindonuts.com',
  'Tim Hortons': 'timhortons.com',
  "Chick-fil-A": 'chick-fil-a.com',
  'Taco Bell': 'tacobell.com',
  "Popeyes": 'popeyes.com',
  "Wendy's": 'wendys.com',
  'Chipotle': 'chipotle.com',
  'Mixue': 'muxue.com',
}

export function getEntityImage(name: string, category: string): string | undefined {
  if (category === 'crypto' || category === 'monad') {
    const slug = cryptoSlugs[name]
    if (slug) return `https://cryptologos.cc/logos/${slug}-logo.png?v=040`
  }

  if (category === 'geo') {
    const code = countryCodes[name]
    if (code) return `https://flagcdn.com/w160/${code}.png`
  }

  if (category === 'tech' || category === 'food') {
    const domain = companyDomains[name]
    if (domain) return `https://logo.clearbit.com/${domain}`
  }

  const handle = instagramHandles[name]
  if (handle) return `https://unavatar.io/instagram/${handle}`

  return undefined
}
