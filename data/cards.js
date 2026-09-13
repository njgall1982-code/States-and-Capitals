/**
 * US States & Capitals - Collectible Battle Cards Catalog (100 Cards)
 * 50 State Cards + 50 Capital Cards
 * Biomes: ⛰️ 'mountain' | 🌊 'coast' | 🌾 'heartland'
 * Typing Advantage: Mountain beats Coast (+3), Coast beats Heartland (+3), Heartland beats Mountain (+3)
 * Capital Synergy: State + matching Capital in deck grants +2 Power to both!
 */

const BATTLE_BIOMES = {
  mountain: {
    name: "Mountain",
    icon: "⛰️",
    color: "#e07a5f",
    beats: "coast",
    weakTo: "heartland",
    desc: "Rugged Peaks & High Frontiers • Crushes Coastal Waves"
  },
  coast: {
    name: "Coast",
    icon: "🌊",
    color: "#38bdf8",
    beats: "heartland",
    weakTo: "mountain",
    desc: "Ocean Waves & Maritime Tides • Floods Heartland Fields"
  },
  heartland: {
    name: "Heartland",
    icon: "🌾",
    color: "#22c55e",
    beats: "mountain",
    weakTo: "coast",
    desc: "Golden Plains & Great River Valleys • Out-Supplies Mountain Peaks"
  }
};

const STATE_CARDS_DATA = [
  // --- Mountain States (16) ---
  { id: "ST_AK", stateId: "AK", name: "Alaska", kind: "state", biome: "mountain", power: 88, title: "The Arctic Titan", emoji: "🐻", perk: "Frost Shield" },
  { id: "ST_CO", stateId: "CO", name: "Colorado", kind: "state", biome: "mountain", power: 86, title: "Rocky Peak Master", emoji: "🏔️", perk: "Altitude Surge" },
  { id: "ST_AZ", stateId: "AZ", name: "Arizona", kind: "state", biome: "mountain", power: 84, title: "Grand Canyon Stalker", emoji: "🏜️", perk: "Sun Fire" },
  { id: "ST_MT", stateId: "MT", name: "Montana", kind: "state", biome: "mountain", power: 82, title: "Big Sky Sentinel", emoji: "🦅", perk: "Wild Horizon" },
  { id: "ST_ID", stateId: "ID", name: "Idaho", kind: "state", biome: "mountain", power: 78, title: "Gem Mountain Scout", emoji: "🥔", perk: "Gem Armor" },
  { id: "ST_UT", stateId: "UT", name: "Utah", kind: "state", biome: "mountain", power: 82, title: "Red Rock Sovereign", emoji: "🧗", perk: "Canyon Echo" },
  { id: "ST_WY", stateId: "WY", name: "Wyoming", kind: "state", biome: "mountain", power: 81, title: "Yellowstone Guardian", emoji: "🦬", perk: "Geyser Blast" },
  { id: "ST_NV", stateId: "NV", name: "Nevada", kind: "state", biome: "mountain", power: 80, title: "Silver Sierra Striker", emoji: "🎰", perk: "Jackpot Strike" },
  { id: "ST_NM", stateId: "NM", name: "New Mexico", kind: "state", biome: "mountain", power: 79, title: "Enchanted Mesa", emoji: "🌶️", perk: "Desert Glow" },
  { id: "ST_VT", stateId: "VT", name: "Vermont", kind: "state", biome: "mountain", power: 76, title: "Green Mountain Vanguard", emoji: "🍁", perk: "Maple Shield" },
  { id: "ST_NH", stateId: "NH", name: "New Hampshire", kind: "state", biome: "mountain", power: 77, title: "Granite Stronghold", emoji: "⛰️", perk: "Granite Wall" },
  { id: "ST_WV", stateId: "WV", name: "West Virginia", kind: "state", biome: "mountain", power: 76, title: "Ridge Runner", emoji: "⛏️", perk: "Coal Surge" },
  { id: "ST_TN", stateId: "TN", name: "Tennessee", kind: "state", biome: "mountain", power: 83, title: "Smoky Mountain Ranger", emoji: "🎸", perk: "Rhythm Clash" },
  { id: "ST_NC", stateId: "NC", name: "North Carolina", kind: "state", biome: "mountain", power: 83, title: "Blue Ridge Pioneer", emoji: "✈️", perk: "First Flight" },
  { id: "ST_OR", stateId: "OR", name: "Oregon", kind: "state", biome: "mountain", power: 82, title: "Cascade Trailblazer", emoji: "🌲", perk: "Timber Wall" },
  { id: "ST_WA", stateId: "WA", name: "Washington", kind: "state", biome: "mountain", power: 85, title: "Rainier Colossus", emoji: "🌋", perk: "Volcano Spark" },

  // --- Coast States (17) ---
  { id: "ST_CA", stateId: "CA", name: "California", kind: "state", biome: "coast", power: 88, title: "Pacific Leviathan", emoji: "🌊", perk: "Tidal Wave" },
  { id: "ST_FL", stateId: "FL", name: "Florida", kind: "state", biome: "coast", power: 87, title: "Sunshine Striker", emoji: "🐊", perk: "Gator Chomp" },
  { id: "ST_HI", stateId: "HI", name: "Hawaii", kind: "state", biome: "coast", power: 83, title: "Oceanic Volcano", emoji: "🌺", perk: "Coral Shield" },
  { id: "ST_NY", stateId: "NY", name: "New York", kind: "state", biome: "coast", power: 87, title: "Empire Harbor Colossus", emoji: "🗽", perk: "Empire Bastion" },
  { id: "ST_MA", stateId: "MA", name: "Massachusetts", kind: "state", biome: "coast", power: 82, title: "Bay Colony Corsair", emoji: "⛵", perk: "Anchor Drop" },
  { id: "ST_ME", stateId: "ME", name: "Maine", kind: "state", biome: "coast", power: 78, title: "Lighthouse Sentinel", emoji: "🦞", perk: "Pincer Strike" },
  { id: "ST_MD", stateId: "MD", name: "Maryland", kind: "state", biome: "coast", power: 80, title: "Chesapeake Corsair", emoji: "🦀", perk: "Shell Guard" },
  { id: "ST_NJ", stateId: "NJ", name: "New Jersey", kind: "state", biome: "coast", power: 81, title: "Boardwalk Blitz", emoji: "🎡", perk: "Shore Flash" },
  { id: "ST_RI", stateId: "RI", name: "Rhode Island", kind: "state", biome: "coast", power: 75, title: "Ocean State Speeder", emoji: "⚓", perk: "Swift Anchor" },
  { id: "ST_SC", stateId: "SC", name: "South Carolina", kind: "state", biome: "coast", power: 80, title: "Palmetto Coast Guard", emoji: "🌴", perk: "Reef Barrier" },
  { id: "ST_GA", stateId: "GA", name: "Georgia", kind: "state", biome: "coast", power: 84, title: "Savannah Coastrunner", emoji: "🍑", perk: "Peach Blossom" },
  { id: "ST_VA", stateId: "VA", name: "Virginia", kind: "state", biome: "coast", power: 83, title: "Cavalier Commodore", emoji: "🏛️", perk: "Old Dominion" },
  { id: "ST_LA", stateId: "LA", name: "Louisiana", kind: "state", biome: "coast", power: 82, title: "Bayou River King", emoji: "🎷", perk: "Delta Surge" },
  { id: "ST_DE", stateId: "DE", name: "Delaware", kind: "state", biome: "coast", power: 76, title: "First Bay Cruiser", emoji: "🚢", perk: "Fast Ferry" },
  { id: "ST_CT", stateId: "CT", name: "Connecticut", kind: "state", biome: "coast", power: 79, title: "Sound Mariner", emoji: "⚓", perk: "Harbor Wall" },
  { id: "ST_MI", stateId: "MI", name: "Michigan", kind: "state", biome: "coast", power: 84, title: "Great Lakes Dreadnought", emoji: "🛥️", perk: "Freshwater Gale" },

  // --- Heartland States (17) ---
  { id: "ST_TX", stateId: "TX", name: "Texas", kind: "state", biome: "heartland", power: 88, title: "The Lone Star Titan", emoji: "🤠", perk: "Bison Charge" },
  { id: "ST_IL", stateId: "IL", name: "Illinois", kind: "state", biome: "heartland", power: 85, title: "Prairie Hub Captain", emoji: "🌽", perk: "Locomotive Rush" },
  { id: "ST_OH", stateId: "OH", name: "Ohio", kind: "state", biome: "heartland", power: 84, title: "Buckeye Brawler", emoji: "🌰", perk: "Buckeye Bash" },
  { id: "ST_PA", stateId: "PA", name: "Pennsylvania", kind: "state", biome: "heartland", power: 85, title: "Keystone Bastion", emoji: "🔔", perk: "Keystone Shield" },
  { id: "ST_IN", stateId: "IN", name: "Indiana", kind: "state", biome: "heartland", power: 80, title: "Hoosier Speeder", emoji: "🏎️", perk: "Speedway Nitro" },
  { id: "ST_IA", stateId: "IA", name: "Iowa", kind: "state", biome: "heartland", power: 79, title: "Golden Corn Colossus", emoji: "🌽", perk: "Bountiful Field" },
  { id: "ST_KS", stateId: "KS", name: "Kansas", kind: "state", biome: "heartland", power: 79, title: "Sunflower Cyclone", emoji: "🌻", perk: "Prairie Gale" },
  { id: "ST_NE", stateId: "NE", name: "Nebraska", kind: "state", biome: "heartland", power: 78, title: "Cornhusker Heavy", emoji: "🌾", perk: "Plow Smash" },
  { id: "ST_MO", stateId: "MO", name: "Missouri", kind: "state", biome: "heartland", power: 82, title: "Gateway Arch Striker", emoji: "🏹", perk: "River Junction" },
  { id: "ST_MN", stateId: "MN", name: "Minnesota", kind: "state", biome: "heartland", power: 82, title: "North Star Pioneer", emoji: "🛶", perk: "Ten Thousand Lakes" },
  { id: "ST_WI", stateId: "WI", name: "Wisconsin", kind: "state", biome: "heartland", power: 81, title: "Badger Rampart", emoji: "🧀", perk: "Cheese Wedge Wall" },
  { id: "ST_KY", stateId: "KY", name: "Kentucky", kind: "state", biome: "heartland", power: 81, title: "Bluegrass Charger", emoji: "🐎", perk: "Thoroughbred Gallop" },
  { id: "ST_AL", stateId: "AL", name: "Alabama", kind: "state", biome: "heartland", power: 80, title: "Heart of Dixie Dynamo", emoji: "🚀", perk: "Rocket Boost" },
  { id: "ST_MS", stateId: "MS", name: "Mississippi", kind: "state", biome: "heartland", power: 77, title: "Magnolia Riverkeeper", emoji: "🛶", perk: "Muddy River Flow" },
  { id: "ST_AR", stateId: "AR", name: "Arkansas", kind: "state", biome: "heartland", power: 78, title: "Ozark Diamond Guard", emoji: "💎", perk: "Diamond Polish" },
  { id: "ST_OK", stateId: "OK", name: "Oklahoma", kind: "state", biome: "heartland", power: 80, title: "Boomer Sooner Titan", emoji: "🌪️", perk: "Twister Spin" },
  { id: "ST_ND", stateId: "ND", name: "North Dakota", kind: "state", biome: "heartland", power: 76, title: "Roughrider Scout", emoji: "🌾", perk: "Blizzard Stride" },
  { id: "ST_SD", stateId: "SD", name: "South Dakota", kind: "state", biome: "heartland", power: 77, title: "Rushmore Monument", emoji: "🗿", perk: "Stone Visage" }
];

// 50 Capital Cards (matching state IDs for Capital Synergy)
const CAPITAL_CARDS_DATA = [
  // Mountain Capitals
  { id: "CAP_AK", stateId: "AK", name: "Juneau", kind: "capital", biome: "mountain", power: 79, title: "Fjord Fortress", emoji: "❄️", perk: "Glacier Strike" },
  { id: "CAP_CO", stateId: "CO", name: "Denver", kind: "capital", biome: "mountain", power: 84, title: "Mile High Citadel", emoji: "🏔️", perk: "High Altitude" },
  { id: "CAP_AZ", stateId: "AZ", name: "Phoenix", kind: "capital", biome: "mountain", power: 83, title: "Solar Citadel", emoji: "🔥", perk: "Phoenix Flare" },
  { id: "CAP_MT", stateId: "MT", name: "Helena", kind: "capital", biome: "mountain", power: 77, title: "Last Chance Gulch", emoji: "🪙", perk: "Gold Pan Shield" },
  { id: "CAP_ID", stateId: "ID", name: "Boise", kind: "capital", biome: "mountain", power: 76, title: "Tree City Archer", emoji: "🌲", perk: "Forest Arrow" },
  { id: "CAP_UT", stateId: "UT", name: "Salt Lake City", kind: "capital", biome: "mountain", power: 80, title: "Wasatch Enclave", emoji: "⛸️", perk: "Salt Crystal Wall" },
  { id: "CAP_WY", stateId: "WY", name: "Cheyenne", kind: "capital", biome: "mountain", power: 75, title: "Frontier Outpost", emoji: "🤠", perk: "Rodeo Lasso" },
  { id: "CAP_NV", stateId: "NV", name: "Carson City", kind: "capital", biome: "mountain", power: 76, title: "Comstock Mint", emoji: "🪙", perk: "Silver Coin Flurry" },
  { id: "CAP_NM", stateId: "NM", name: "Santa Fe", kind: "capital", biome: "mountain", power: 78, title: "Royal Villa of Faith", emoji: "🏛️", perk: "Adobe Rampart" },
  { id: "CAP_VT", stateId: "VT", name: "Montpelier", kind: "capital", biome: "mountain", power: 74, title: "Golden Dome Keep", emoji: "✨", perk: "Gold Leaf Reflection" },
  { id: "CAP_NH", stateId: "NH", name: "Concord", kind: "capital", biome: "mountain", power: 75, title: "Harmony Bastion", emoji: "🤝", perk: "Concord Accord" },
  { id: "CAP_WV", stateId: "WV", name: "Charleston", kind: "capital", biome: "mountain", power: 75, title: "Kanawha Castle", emoji: "🛶", perk: "River Barrier" },
  { id: "CAP_TN", stateId: "TN", name: "Nashville", kind: "capital", biome: "mountain", power: 81, title: "Music City Maestro", emoji: "🎵", perk: "Harmonic Blast" },
  { id: "CAP_NC", stateId: "NC", name: "Raleigh", kind: "capital", biome: "mountain", power: 80, title: "Oak City Council", emoji: "🌳", perk: "Oak Branch Ward" },
  { id: "CAP_OR", stateId: "OR", name: "Salem", kind: "capital", biome: "mountain", power: 77, title: "Willamette Harbor", emoji: "⛵", perk: "Valley Fog" },
  { id: "CAP_WA", stateId: "WA", name: "Olympia", kind: "capital", biome: "mountain", power: 79, title: "Puget Stronghold", emoji: "🌲", perk: "Sound Mist" },

  // Coast Capitals
  { id: "CAP_CA", stateId: "CA", name: "Sacramento", kind: "capital", biome: "coast", power: 85, title: "Camellia Citadel", emoji: "🌺", perk: "Golden Gate Rush" },
  { id: "CAP_FL", stateId: "FL", name: "Tallahassee", kind: "capital", biome: "coast", power: 82, title: "Seven Hills Bastion", emoji: "🏛️", perk: "Canopy Shroud" },
  { id: "CAP_HI", stateId: "HI", name: "Honolulu", kind: "capital", biome: "coast", power: 81, title: "Sheltered Bay Haven", emoji: "🌴", perk: "Aloha Radiance" },
  { id: "CAP_NY", stateId: "NY", name: "Albany", kind: "capital", biome: "coast", power: 82, title: "Hudson River Citadel", emoji: "🚢", perk: "Canal Lock" },
  { id: "CAP_MA", stateId: "MA", name: "Boston", kind: "capital", biome: "coast", power: 84, title: "Cradle of Liberty", emoji: "📜", perk: "Freedom Beacon" },
  { id: "CAP_ME", stateId: "ME", name: "Augusta", kind: "capital", biome: "coast", power: 75, title: "Kennebec Watchtower", emoji: "⚓", perk: "Pine Needle Cloak" },
  { id: "CAP_MD", stateId: "MD", name: "Annapolis", kind: "capital", biome: "coast", power: 78, title: "Naval Vanguard", emoji: "⛵", perk: "Naval Cannon" },
  { id: "CAP_NJ", stateId: "NJ", name: "Trenton", kind: "capital", biome: "coast", power: 78, title: "Delaware Crossing Guard", emoji: "⚔️", perk: "Trenton Ambush" },
  { id: "CAP_RI", stateId: "RI", name: "Providence", kind: "capital", biome: "coast", power: 76, title: "Hope Anchor Enclave", emoji: "⚓", perk: "Hope Spark" },
  { id: "CAP_SC", stateId: "SC", name: "Columbia", kind: "capital", biome: "coast", power: 78, title: "Congaree Redoubt", emoji: "🏛️", perk: "Palmetto Leaf" },
  { id: "CAP_GA", stateId: "GA", name: "Atlanta", kind: "capital", biome: "coast", power: 85, title: "Phoenix Rising Citadel", emoji: "🔥", perk: "Crossroads Momentum" },
  { id: "CAP_VA", stateId: "VA", name: "Richmond", kind: "capital", biome: "coast", power: 81, title: "James River Redoubt", emoji: "🏛️", perk: "Historic Wall" },
  { id: "CAP_LA", stateId: "LA", name: "Baton Rouge", kind: "capital", biome: "coast", power: 80, title: "Red Stick Sentinel", emoji: "🔴", perk: "Red Stick Parry" },
  { id: "CAP_DE", stateId: "DE", name: "Dover", kind: "capital", biome: "coast", power: 74, title: "Green Green Watch", emoji: "🌱", perk: "Green Sward" },
  { id: "CAP_CT", stateId: "CT", name: "Hartford", kind: "capital", biome: "coast", power: 77, title: "Charter Oak Shield", emoji: "🌳", perk: "Charter Oak Shield" },
  { id: "CAP_MI", stateId: "MI", name: "Lansing", kind: "capital", biome: "coast", power: 80, title: "Grand River Engine", emoji: "⚙️", perk: "Steam Turbine" },

  // Heartland Capitals
  { id: "CAP_TX", stateId: "TX", name: "Austin", kind: "capital", biome: "heartland", power: 86, title: "Hill Country Haven", emoji: "🦇", perk: "Bat Flight Surge" },
  { id: "CAP_IL", stateId: "IL", name: "Springfield", kind: "capital", biome: "heartland", power: 81, title: "Lincoln Legacy Keep", emoji: "🎩", perk: "Stovepipe Armor" },
  { id: "CAP_OH", stateId: "OH", name: "Columbus", kind: "capital", biome: "heartland", power: 83, title: "Scioto River Hub", emoji: "🌟", perk: "Arch City Glow" },
  { id: "CAP_PA", stateId: "PA", name: "Harrisburg", kind: "capital", biome: "heartland", power: 80, title: "Susquehanna Bulwark", emoji: "🌉", perk: "River Bridge" },
  { id: "CAP_IN", stateId: "IN", name: "Indianapolis", kind: "capital", biome: "heartland", power: 81, title: "Circle City Spinner", emoji: "🏁", perk: "Checkered Flag" },
  { id: "CAP_IA", stateId: "IA", name: "Des Moines", kind: "capital", biome: "heartland", power: 77, title: "Raccoon River Bastion", emoji: "🦝", perk: "Golden Dome Glint" },
  { id: "CAP_KS", stateId: "KS", name: "Topeka", kind: "capital", biome: "heartland", power: 76, title: "Potawatomi Outpost", emoji: "🌻", perk: "Prairie Wind" },
  { id: "CAP_NE", stateId: "NE", name: "Lincoln", kind: "capital", biome: "heartland", power: 77, title: "Tower on the Plains", emoji: "🏛️", perk: "Sower Harvest" },
  { id: "CAP_MO", stateId: "MO", name: "Jefferson City", kind: "capital", biome: "heartland", power: 78, title: "Missouri Bluffs Citadel", emoji: "🦅", perk: "Bluff Vantage" },
  { id: "CAP_MN", stateId: "MN", name: "St. Paul", kind: "capital", biome: "heartland", power: 79, title: "Twin City Bastion", emoji: "⛪", perk: "Winter Freeze" },
  { id: "CAP_WI", stateId: "WI", name: "Madison", kind: "capital", biome: "heartland", power: 79, title: "Four Lakes Stronghold", emoji: "⛵", perk: "Isthmus Ward" },
  { id: "CAP_KY", stateId: "KY", name: "Frankfort", kind: "capital", biome: "heartland", power: 76, title: "Kentucky River Bend", emoji: "🐎", perk: "Floral Clock" },
  { id: "CAP_AL", stateId: "AL", name: "Montgomery", kind: "capital", biome: "heartland", power: 78, title: "Cradle City Beacon", emoji: "🏛️", perk: "Historic Resolve" },
  { id: "CAP_MS", stateId: "MS", name: "Jackson", kind: "capital", biome: "heartland", power: 75, title: "City with Soul", emoji: "🎷", perk: "Delta Rhythm" },
  { id: "CAP_AR", stateId: "AR", name: "Little Rock", kind: "capital", biome: "heartland", power: 76, title: "Ouachita Footing", emoji: "🪨", perk: "Rock Solid" },
  { id: "CAP_OK", stateId: "OK", name: "Oklahoma City", kind: "capital", biome: "heartland", power: 79, title: "Bricktown Dynamo", emoji: "⚡", perk: "Sonic Spark" },
  { id: "CAP_ND", stateId: "ND", name: "Bismarck", kind: "capital", biome: "heartland", power: 75, title: "Missouri River Guard", emoji: "🌾", perk: "Northern Bastion" },
  { id: "CAP_SD", stateId: "SD", name: "Pierre", kind: "capital", biome: "heartland", power: 74, title: "Oahe Dam Citadel", emoji: "🎣", perk: "Reservoir Wave" }
];

// Combine all 100 Cards into a Master Map & Array
const BATTLE_CARDS = [...STATE_CARDS_DATA, ...CAPITAL_CARDS_DATA];

const BATTLE_CARDS_MAP = {};
BATTLE_CARDS.forEach(card => {
  BATTLE_CARDS_MAP[card.id] = card;
});

// Progressive AI Challengers along the Adventure Ladder
const AI_CHALLENGERS = [
  {
    id: "challenger_1",
    name: "Campfire Scout",
    title: "Trail Rookie",
    avatar: "🏕️",
    badge: "Stage 1",
    desc: "A friendly wilderness scout learning the map trails. Plays balanced starter cards.",
    requiredCards: 0,
    difficulty: "Easy",
    deck: ["ST_VT", "CAP_DE", "ST_IA", "CAP_ID", "ST_NE"],
    strategy: "random"
  },
  {
    id: "challenger_2",
    name: "Prairie Pioneer",
    title: "Heartland Master",
    avatar: "🌾",
    badge: "Stage 2",
    desc: "A tenacious plains rover with strong Heartland cards. Bring your Coastal cards!",
    requiredCards: 5,
    difficulty: "Medium",
    deck: ["ST_KS", "CAP_TX", "ST_OH", "CAP_IL", "ST_NE"],
    strategy: "biome_heartland"
  },
  {
    id: "challenger_3",
    name: "Coastal Captain",
    title: "Pacific & Atlantic Commodore",
    avatar: "⚓",
    badge: "Stage 3",
    desc: "A salty sea captain with quick-striking Maritime cards. Overwhelm him with Mountain power!",
    requiredCards: 10,
    difficulty: "Tricky",
    deck: ["ST_CA", "CAP_FL", "ST_ME", "CAP_MA", "ST_HI"],
    strategy: "biome_coast"
  },
  {
    id: "challenger_4",
    name: "Canyon Ranger",
    title: "High Mountain Sovereign",
    avatar: "⛰️",
    badge: "Stage 4",
    desc: "Patrols the Rockies and High Sierras with heavy-hitting Mountain titans.",
    requiredCards: 15,
    difficulty: "Hard",
    deck: ["ST_CO", "CAP_AK", "ST_AZ", "CAP_UT", "ST_WY"],
    strategy: "biome_mountain"
  },
  {
    id: "challenger_5",
    name: "Liberty Titan",
    title: "Grand Champion of 50 States",
    avatar: "🦅",
    badge: "Final Boss",
    desc: "The ultimate deck master with high-power state pairs and perfect Capital Synergy.",
    requiredCards: 20,
    difficulty: "Master",
    deck: ["ST_TX", "CAP_TX", "ST_CA", "CAP_CA", "ST_NY"],
    strategy: "smart"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    BATTLE_BIOMES,
    STATE_CARDS_DATA,
    CAPITAL_CARDS_DATA,
    BATTLE_CARDS,
    BATTLE_CARDS_MAP,
    AI_CHALLENGERS
  };
}
