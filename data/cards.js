/**
 * US States & Capitals - Collectible Battle Cards Catalog (100 Cards)
 * 50 State Cards + 50 Capital Cards
 * Biomes: ⛰️ 'mountain' | 🌊 'coast' | 🌾 'heartland'
 * Base Powers: 1 to 5
 * - Titans (4-5): Pure brute strength
 * - Anchors (3): Reliable stats + Capital synergy
 * - Underdogs (1-2): Conditional swing (+3 on matching Biome node)
 * Capital Synergy: State + matching Capital on the same node grants +2 Power to both!
 */

const BATTLE_BIOMES = {
  mountain: {
    name: "Mountain",
    icon: "⛰️",
    color: "#e07a5f",
    beats: "coast",
    weakTo: "heartland",
    desc: "Rugged Peaks & High Frontiers • Strong in High Altitudes"
  },
  coast: {
    name: "Coast",
    icon: "🌊",
    color: "#38bdf8",
    beats: "heartland",
    weakTo: "mountain",
    desc: "Ocean Waves & Maritime Tides • Strong in Coastal Waters"
  },
  heartland: {
    name: "Heartland",
    icon: "🌾",
    color: "#22c55e",
    beats: "mountain",
    weakTo: "coast",
    desc: "Golden Plains & Great River Valleys • Strong in Open Fields"
  }
};

// Node Objectives Catalog for Lane Battler Arena
const BATTLE_NODES = [
  {
    id: "node_rocky",
    name: "Rocky Ridge",
    biome: "mountain",
    icon: "⛰️",
    bonusBiome: "mountain",
    bonusPower: 2,
    desc: "⛰️ Mountain +2 Power"
  },
  {
    id: "node_pacific",
    name: "Pacific Bay",
    biome: "coast",
    icon: "🌊",
    bonusBiome: "coast",
    bonusPower: 2,
    desc: "🌊 Coast +2 Power"
  },
  {
    id: "node_plains",
    name: "Heartland Prairie",
    biome: "heartland",
    icon: "🌾",
    bonusBiome: "heartland",
    bonusPower: 2,
    desc: "🌾 Heartland +2 Power"
  },
  {
    id: "node_citadel",
    name: "Independence Hall",
    biome: "neutral",
    icon: "🏛️",
    bonusKind: "capital",
    bonusPower: 1,
    desc: "⭐ Capitals +1 Power"
  },
  {
    id: "node_crossroads",
    name: "Route 66",
    biome: "neutral",
    icon: "🛣️",
    bonusPower: 0,
    desc: "Neutral Battlefield"
  },
  {
    id: "node_appalachian",
    name: "Appalachian Trail",
    biome: "mountain",
    icon: "🌲",
    bonusBiome: "mountain",
    bonusPower: 2,
    desc: "⛰️ Mountain +2 Power"
  }
];

const STATE_CARDS_DATA = [
  // --- Mountain States (16) ---
  { id: "ST_AK", stateId: "AK", name: "Alaska", kind: "state", biome: "mountain", power: 5, title: "The Arctic Titan", emoji: "🐻", perk: "Massive Arctic Power" },
  { id: "ST_CO", stateId: "CO", name: "Colorado", kind: "state", biome: "mountain", power: 4, title: "Rocky Peak Master", emoji: "🏔️", perk: "High Altitude Bastion" },
  { id: "ST_AZ", stateId: "AZ", name: "Arizona", kind: "state", biome: "mountain", power: 4, title: "Grand Canyon Stalker", emoji: "🏜️", perk: "Canyon Sun Surge" },
  { id: "ST_WA", stateId: "WA", name: "Washington", kind: "state", biome: "mountain", power: 4, title: "Rainier Colossus", emoji: "🌋", perk: "Volcanic Strength" },
  { id: "ST_TN", stateId: "TN", name: "Tennessee", kind: "state", biome: "mountain", power: 3, title: "Smoky Mountain Ranger", emoji: "🎸", perk: "Ridge Harmony" },
  { id: "ST_NC", stateId: "NC", name: "North Carolina", kind: "state", biome: "mountain", power: 3, title: "Blue Ridge Pioneer", emoji: "✈️", perk: "Flight Pioneer" },
  { id: "ST_OR", stateId: "OR", name: "Oregon", kind: "state", biome: "mountain", power: 3, title: "Cascade Trailblazer", emoji: "🌲", perk: "Timber Wall" },
  { id: "ST_UT", stateId: "UT", name: "Utah", kind: "state", biome: "mountain", power: 3, title: "Red Rock Sovereign", emoji: "🧗", perk: "Red Rock Guard" },
  { id: "ST_MT", stateId: "MT", name: "Montana", kind: "state", biome: "mountain", power: 3, title: "Big Sky Sentinel", emoji: "🦅", perk: "Wide Sky Vista" },
  { id: "ST_WY", stateId: "WY", name: "Wyoming", kind: "state", biome: "mountain", power: 2, title: "Yellowstone Guardian", emoji: "🦬", perk: "+3 on Mountain Node", perkBonus: 3, perkCondition: "mountain" },
  { id: "ST_NV", stateId: "NV", name: "Nevada", kind: "state", biome: "mountain", power: 2, title: "Silver Sierra Striker", emoji: "🎰", perk: "+3 on Mountain Node", perkBonus: 3, perkCondition: "mountain" },
  { id: "ST_NM", stateId: "NM", name: "New Mexico", kind: "state", biome: "mountain", power: 2, title: "Enchanted Mesa", emoji: "🌶️", perk: "+3 on Mountain Node", perkBonus: 3, perkCondition: "mountain" },
  { id: "ST_ID", stateId: "ID", name: "Idaho", kind: "state", biome: "mountain", power: 2, title: "Gem Mountain Scout", emoji: "🥔", perk: "+3 on Mountain Node", perkBonus: 3, perkCondition: "mountain" },
  { id: "ST_NH", stateId: "NH", name: "New Hampshire", kind: "state", biome: "mountain", power: 2, title: "Granite Stronghold", emoji: "⛰️", perk: "+3 on Mountain Node", perkBonus: 3, perkCondition: "mountain" },
  { id: "ST_WV", stateId: "WV", name: "West Virginia", kind: "state", biome: "mountain", power: 1, title: "Ridge Runner", emoji: "⛏️", perk: "+3 on Mountain Node", perkBonus: 3, perkCondition: "mountain" },
  { id: "ST_VT", stateId: "VT", name: "Vermont", kind: "state", biome: "mountain", power: 1, title: "Green Mountain Vanguard", emoji: "🍁", perk: "+3 on Mountain Node", perkBonus: 3, perkCondition: "mountain" },

  // --- Coast States (17) ---
  { id: "ST_CA", stateId: "CA", name: "California", kind: "state", biome: "coast", power: 5, title: "Pacific Leviathan", emoji: "🌊", perk: "Massive Coastal Power" },
  { id: "ST_NY", stateId: "NY", name: "New York", kind: "state", biome: "coast", power: 5, title: "Empire Harbor Colossus", emoji: "🗽", perk: "Harbor Metropolis" },
  { id: "ST_FL", stateId: "FL", name: "Florida", kind: "state", biome: "coast", power: 4, title: "Sunshine Striker", emoji: "🐊", perk: "Tropical Surge" },
  { id: "ST_GA", stateId: "GA", name: "Georgia", kind: "state", biome: "coast", power: 4, title: "Savannah Coastrunner", emoji: "🍑", perk: "Deep South Coast" },
  { id: "ST_MI", stateId: "MI", name: "Michigan", kind: "state", biome: "coast", power: 4, title: "Great Lakes Dreadnought", emoji: "🛥️", perk: "Freshwater Gale" },
  { id: "ST_VA", stateId: "VA", name: "Virginia", kind: "state", biome: "coast", power: 3, title: "Cavalier Commodore", emoji: "🏛️", perk: "Colonial Anchor" },
  { id: "ST_LA", stateId: "LA", name: "Louisiana", kind: "state", biome: "coast", power: 3, title: "Bayou River King", emoji: "🎷", perk: "Delta Waters" },
  { id: "ST_MA", stateId: "MA", name: "Massachusetts", kind: "state", biome: "coast", power: 3, title: "Bay Colony Corsair", emoji: "⛵", perk: "Atlantic Navigator" },
  { id: "ST_HI", stateId: "HI", name: "Hawaii", kind: "state", biome: "coast", power: 3, title: "Oceanic Volcano", emoji: "🌺", perk: "Pacific Bastion" },
  { id: "ST_NJ", stateId: "NJ", name: "New Jersey", kind: "state", biome: "coast", power: 2, title: "Boardwalk Blitz", emoji: "🎡", perk: "+3 on Coast Node", perkBonus: 3, perkCondition: "coast" },
  { id: "ST_SC", stateId: "SC", name: "South Carolina", kind: "state", biome: "coast", power: 2, title: "Palmetto Coast Guard", emoji: "🌴", perk: "+3 on Coast Node", perkBonus: 3, perkCondition: "coast" },
  { id: "ST_MD", stateId: "MD", name: "Maryland", kind: "state", biome: "coast", power: 2, title: "Chesapeake Corsair", emoji: "🦀", perk: "+3 on Coast Node", perkBonus: 3, perkCondition: "coast" },
  { id: "ST_CT", stateId: "CT", name: "Connecticut", kind: "state", biome: "coast", power: 2, title: "Sound Mariner", emoji: "⚓", perk: "+3 on Coast Node", perkBonus: 3, perkCondition: "coast" },
  { id: "ST_ME", stateId: "ME", name: "Maine", kind: "state", biome: "coast", power: 2, title: "Lighthouse Sentinel", emoji: "🦞", perk: "+3 on Coast Node", perkBonus: 3, perkCondition: "coast" },
  { id: "ST_DE", stateId: "DE", name: "Delaware", kind: "state", biome: "coast", power: 1, title: "First Bay Cruiser", emoji: "🚢", perk: "+3 on Coast Node", perkBonus: 3, perkCondition: "coast" },
  { id: "ST_RI", stateId: "RI", name: "Rhode Island", kind: "state", biome: "coast", power: 1, title: "Ocean State Speeder", emoji: "⚓", perk: "+3 on Coast Node", perkBonus: 3, perkCondition: "coast" },

  // --- Heartland States (17) ---
  { id: "ST_TX", stateId: "TX", name: "Texas", kind: "state", biome: "heartland", power: 5, title: "The Lone Star Titan", emoji: "🤠", perk: "Massive Heartland Power" },
  { id: "ST_IL", stateId: "IL", name: "Illinois", kind: "state", biome: "heartland", power: 4, title: "Prairie Hub Captain", emoji: "🌽", perk: "Railroad Empire" },
  { id: "ST_PA", stateId: "PA", name: "Pennsylvania", kind: "state", biome: "heartland", power: 4, title: "Keystone Bastion", emoji: "🔔", perk: "Keystone Shield" },
  { id: "ST_OH", stateId: "OH", name: "Ohio", kind: "state", biome: "heartland", power: 4, title: "Buckeye Brawler", emoji: "🌰", perk: "Great River Frontier" },
  { id: "ST_MO", stateId: "MO", name: "Missouri", kind: "state", biome: "heartland", power: 3, title: "Gateway Arch Striker", emoji: "🏹", perk: "Gateway Portal" },
  { id: "ST_MN", stateId: "MN", name: "Minnesota", kind: "state", biome: "heartland", power: 3, title: "North Star Pioneer", emoji: "🛶", perk: "Ten Thousand Lakes" },
  { id: "ST_IN", stateId: "IN", name: "Indiana", kind: "state", biome: "heartland", power: 3, title: "Hoosier Speeder", emoji: "🏎️", perk: "Crossroads Turbo" },
  { id: "ST_WI", stateId: "WI", name: "Wisconsin", kind: "state", biome: "heartland", power: 3, title: "Badger Rampart", emoji: "🧀", perk: "Badger Defense" },
  { id: "ST_KY", stateId: "KY", name: "Kentucky", kind: "state", biome: "heartland", power: 3, title: "Bluegrass Charger", emoji: "🐎", perk: "Derby Surge" },
  { id: "ST_AL", stateId: "AL", name: "Alabama", kind: "state", biome: "heartland", power: 2, title: "Heart of Dixie Dynamo", emoji: "🚀", perk: "+3 on Heartland Node", perkBonus: 3, perkCondition: "heartland" },
  { id: "ST_OK", stateId: "OK", name: "Oklahoma", kind: "state", biome: "heartland", power: 2, title: "Boomer Sooner Titan", emoji: "🌪️", perk: "+3 on Heartland Node", perkBonus: 3, perkCondition: "heartland" },
  { id: "ST_IA", stateId: "IA", name: "Iowa", kind: "state", biome: "heartland", power: 2, title: "Golden Corn Colossus", emoji: "🌽", perk: "+3 on Heartland Node", perkBonus: 3, perkCondition: "heartland" },
  { id: "ST_KS", stateId: "KS", name: "Kansas", kind: "state", biome: "heartland", power: 2, title: "Sunflower Cyclone", emoji: "🌻", perk: "+3 on Heartland Node", perkBonus: 3, perkCondition: "heartland" },
  { id: "ST_NE", stateId: "NE", name: "Nebraska", kind: "state", biome: "heartland", power: 2, title: "Cornhusker Heavy", emoji: "🌾", perk: "+3 on Heartland Node", perkBonus: 3, perkCondition: "heartland" },
  { id: "ST_AR", stateId: "AR", name: "Arkansas", kind: "state", biome: "heartland", power: 2, title: "Ozark Diamond Guard", emoji: "💎", perk: "+3 on Heartland Node", perkBonus: 3, perkCondition: "heartland" },
  { id: "ST_MS", stateId: "MS", name: "Mississippi", kind: "state", biome: "heartland", power: 1, title: "Magnolia Riverkeeper", emoji: "🛶", perk: "+3 on Heartland Node", perkBonus: 3, perkCondition: "heartland" },
  { id: "ST_SD", stateId: "SD", name: "South Dakota", kind: "state", biome: "heartland", power: 1, title: "Rushmore Monument", emoji: "🗿", perk: "+3 on Heartland Node", perkBonus: 3, perkCondition: "heartland" },
  { id: "ST_ND", stateId: "ND", name: "North Dakota", kind: "state", biome: "heartland", power: 1, title: "Roughrider Scout", emoji: "🌾", perk: "+3 on Heartland Node", perkBonus: 3, perkCondition: "heartland" }
];

// 50 Capital Cards (matching state IDs for Capital Synergy)
const CAPITAL_CARDS_DATA = [
  // Mountain Capitals
  { id: "CAP_CO", stateId: "CO", name: "Denver", kind: "capital", biome: "mountain", power: 4, title: "Mile High Citadel", emoji: "🏔️", perk: "High Altitude Hub" },
  { id: "CAP_AZ", stateId: "AZ", name: "Phoenix", kind: "capital", biome: "mountain", power: 4, title: "Solar Citadel", emoji: "🔥", perk: "Desert Heat" },
  { id: "CAP_TN", stateId: "TN", name: "Nashville", kind: "capital", biome: "mountain", power: 3, title: "Music City Maestro", emoji: "🎵", perk: "Grand Echo" },
  { id: "CAP_NC", stateId: "NC", name: "Raleigh", kind: "capital", biome: "mountain", power: 3, title: "Oak City Council", emoji: "🌳", perk: "Oak Guard" },
  { id: "CAP_UT", stateId: "UT", name: "Salt Lake City", kind: "capital", biome: "mountain", power: 3, title: "Wasatch Enclave", emoji: "⛸️", perk: "Wasatch Fortress" },
  { id: "CAP_AK", stateId: "AK", name: "Juneau", kind: "capital", biome: "mountain", power: 3, title: "Fjord Fortress", emoji: "❄️", perk: "Glacier Rampart" },
  { id: "CAP_WA", stateId: "WA", name: "Olympia", kind: "capital", biome: "mountain", power: 3, title: "Puget Stronghold", emoji: "🌲", perk: "Evergreen Shield" },
  { id: "CAP_NM", stateId: "NM", name: "Santa Fe", kind: "capital", biome: "mountain", power: 2, title: "Royal Villa of Faith", emoji: "🏛️", perk: "+3 on Mountain Node", perkBonus: 3, perkCondition: "mountain" },
  { id: "CAP_OR", stateId: "OR", name: "Salem", kind: "capital", biome: "mountain", power: 2, title: "Willamette Harbor", emoji: "⛵", perk: "+3 on Mountain Node", perkBonus: 3, perkCondition: "mountain" },
  { id: "CAP_MT", stateId: "MT", name: "Helena", kind: "capital", biome: "mountain", power: 2, title: "Last Chance Gulch", emoji: "🪙", perk: "+3 on Mountain Node", perkBonus: 3, perkCondition: "mountain" },
  { id: "CAP_ID", stateId: "ID", name: "Boise", kind: "capital", biome: "mountain", power: 2, title: "Tree City Archer", emoji: "🌲", perk: "+3 on Mountain Node", perkBonus: 3, perkCondition: "mountain" },
  { id: "CAP_NV", stateId: "NV", name: "Carson City", kind: "capital", biome: "mountain", power: 2, title: "Comstock Mint", emoji: "🪙", perk: "+3 on Mountain Node", perkBonus: 3, perkCondition: "mountain" },
  { id: "CAP_NH", stateId: "NH", name: "Concord", kind: "capital", biome: "mountain", power: 1, title: "Harmony Bastion", emoji: "🤝", perk: "+3 on Mountain Node", perkBonus: 3, perkCondition: "mountain" },
  { id: "CAP_WV", stateId: "WV", name: "Charleston", kind: "capital", biome: "mountain", power: 1, title: "Kanawha Castle", emoji: "🛶", perk: "+3 on Mountain Node", perkBonus: 3, perkCondition: "mountain" },
  { id: "CAP_WY", stateId: "WY", name: "Cheyenne", kind: "capital", biome: "mountain", power: 1, title: "Frontier Outpost", emoji: "🤠", perk: "+3 on Mountain Node", perkBonus: 3, perkCondition: "mountain" },
  { id: "CAP_VT", stateId: "VT", name: "Montpelier", kind: "capital", biome: "mountain", power: 1, title: "Golden Dome Keep", emoji: "✨", perk: "+3 on Mountain Node", perkBonus: 3, perkCondition: "mountain" },

  // Coast Capitals
  { id: "CAP_GA", stateId: "GA", name: "Atlanta", kind: "capital", biome: "coast", power: 4, title: "Phoenix Rising Citadel", emoji: "🔥", perk: "Southern Terminus" },
  { id: "CAP_CA", stateId: "CA", name: "Sacramento", kind: "capital", biome: "coast", power: 4, title: "Camellia Citadel", emoji: "🌺", perk: "Gold Rush Capital" },
  { id: "CAP_MA", stateId: "MA", name: "Boston", kind: "capital", biome: "coast", power: 4, title: "Cradle of Liberty", emoji: "📜", perk: "Beacon of Freedom" },
  { id: "CAP_FL", stateId: "FL", name: "Tallahassee", kind: "capital", biome: "coast", power: 3, title: "Seven Hills Bastion", emoji: "🏛️", perk: "Canopy Shroud" },
  { id: "CAP_NY", stateId: "NY", name: "Albany", kind: "capital", biome: "coast", power: 3, title: "Hudson River Citadel", emoji: "🚢", perk: "Empire Waterway" },
  { id: "CAP_VA", stateId: "VA", name: "Richmond", kind: "capital", biome: "coast", power: 3, title: "James River Redoubt", emoji: "🏛️", perk: "River Capital" },
  { id: "CAP_HI", stateId: "HI", name: "Honolulu", kind: "capital", biome: "coast", power: 3, title: "Sheltered Bay Haven", emoji: "🌴", perk: "Island Sanctuary" },
  { id: "CAP_MI", stateId: "MI", name: "Lansing", kind: "capital", biome: "coast", power: 3, title: "Grand River Engine", emoji: "⚙️", perk: "Inland Port" },
  { id: "CAP_LA", stateId: "LA", name: "Baton Rouge", kind: "capital", biome: "coast", power: 3, title: "Red Stick Sentinel", emoji: "🔴", perk: "Missisippi Bluff" },
  { id: "CAP_NJ", stateId: "NJ", name: "Trenton", kind: "capital", biome: "coast", power: 2, title: "Delaware Crossing Guard", emoji: "⚔️", perk: "+3 on Coast Node", perkBonus: 3, perkCondition: "coast" },
  { id: "CAP_SC", stateId: "SC", name: "Columbia", kind: "capital", biome: "coast", power: 2, title: "Congaree Redoubt", emoji: "🏛️", perk: "+3 on Coast Node", perkBonus: 3, perkCondition: "coast" },
  { id: "CAP_MD", stateId: "MD", name: "Annapolis", kind: "capital", biome: "coast", power: 2, title: "Naval Vanguard", emoji: "⛵", perk: "+3 on Coast Node", perkBonus: 3, perkCondition: "coast" },
  { id: "CAP_CT", stateId: "CT", name: "Hartford", kind: "capital", biome: "coast", power: 2, title: "Charter Oak Shield", emoji: "🌳", perk: "+3 on Coast Node", perkBonus: 3, perkCondition: "coast" },
  { id: "CAP_RI", stateId: "RI", name: "Providence", kind: "capital", biome: "coast", power: 1, title: "Hope Anchor Enclave", emoji: "⚓", perk: "+3 on Coast Node", perkBonus: 3, perkCondition: "coast" },
  { id: "CAP_ME", stateId: "ME", name: "Augusta", kind: "capital", biome: "coast", power: 1, title: "Kennebec Watchtower", emoji: "⚓", perk: "+3 on Coast Node", perkBonus: 3, perkCondition: "coast" },
  { id: "CAP_DE", stateId: "DE", name: "Dover", kind: "capital", biome: "coast", power: 1, title: "Green Green Watch", emoji: "🌱", perk: "+3 on Coast Node", perkBonus: 3, perkCondition: "coast" },

  // Heartland Capitals
  { id: "CAP_TX", stateId: "TX", name: "Austin", kind: "capital", biome: "heartland", power: 4, title: "Hill Country Haven", emoji: "🦇", perk: "Colorado River Crest" },
  { id: "CAP_OH", stateId: "OH", name: "Columbus", kind: "capital", biome: "heartland", power: 4, title: "Scioto River Hub", emoji: "🌟", perk: "Heartland Crossroads" },
  { id: "CAP_IN", stateId: "IN", name: "Indianapolis", kind: "capital", biome: "heartland", power: 3, title: "Circle City Spinner", emoji: "🏁", perk: "Circle Monument" },
  { id: "CAP_IL", stateId: "IL", name: "Springfield", kind: "capital", biome: "heartland", power: 3, title: "Lincoln Legacy Keep", emoji: "🎩", perk: "Prairie Pillar" },
  { id: "CAP_PA", stateId: "PA", name: "Harrisburg", kind: "capital", biome: "heartland", power: 3, title: "Susquehanna Bulwark", emoji: "🌉", perk: "River Span" },
  { id: "CAP_MN", stateId: "MN", name: "St. Paul", kind: "capital", biome: "heartland", power: 3, title: "Twin City Bastion", emoji: "⛪", perk: "North Star Dome" },
  { id: "CAP_WI", stateId: "WI", name: "Madison", kind: "capital", biome: "heartland", power: 3, title: "Four Lakes Stronghold", emoji: "⛵", perk: "Isthmus Fortress" },
  { id: "CAP_OK", stateId: "OK", name: "Oklahoma City", kind: "capital", biome: "heartland", power: 3, title: "Bricktown Dynamo", emoji: "⚡", perk: "Plains Citadel" },
  { id: "CAP_AL", stateId: "AL", name: "Montgomery", kind: "capital", biome: "heartland", power: 2, title: "Cradle City Beacon", emoji: "🏛️", perk: "+3 on Heartland Node", perkBonus: 3, perkCondition: "heartland" },
  { id: "CAP_MO", stateId: "MO", name: "Jefferson City", kind: "capital", biome: "heartland", power: 2, title: "Missouri Bluffs Citadel", emoji: "🦅", perk: "+3 on Heartland Node", perkBonus: 3, perkCondition: "heartland" },
  { id: "CAP_IA", stateId: "IA", name: "Des Moines", kind: "capital", biome: "heartland", power: 2, title: "Raccoon River Bastion", emoji: "🦝", perk: "+3 on Heartland Node", perkBonus: 3, perkCondition: "heartland" },
  { id: "CAP_NE", stateId: "NE", name: "Lincoln", kind: "capital", biome: "heartland", power: 2, title: "Tower on the Plains", emoji: "🏛️", perk: "+3 on Heartland Node", perkBonus: 3, perkCondition: "heartland" },
  { id: "CAP_KS", stateId: "KS", name: "Topeka", kind: "capital", biome: "heartland", power: 2, title: "Potawatomi Outpost", emoji: "🌻", perk: "+3 on Heartland Node", perkBonus: 3, perkCondition: "heartland" },
  { id: "CAP_AR", stateId: "AR", name: "Little Rock", kind: "capital", biome: "heartland", power: 2, title: "Ouachita Footing", emoji: "🪨", perk: "+3 on Heartland Node", perkBonus: 3, perkCondition: "heartland" },
  { id: "CAP_KY", stateId: "KY", name: "Frankfort", kind: "capital", biome: "heartland", power: 2, title: "Kentucky River Bend", emoji: "🐎", perk: "+3 on Heartland Node", perkBonus: 3, perkCondition: "heartland" },
  { id: "CAP_MS", stateId: "MS", name: "Jackson", kind: "capital", biome: "heartland", power: 1, title: "City with Soul", emoji: "🎷", perk: "+3 on Heartland Node", perkBonus: 3, perkCondition: "heartland" },
  { id: "CAP_ND", stateId: "ND", name: "Bismarck", kind: "capital", biome: "heartland", power: 1, title: "Missouri River Guard", emoji: "🌾", perk: "+3 on Heartland Node", perkBonus: 3, perkCondition: "heartland" },
  { id: "CAP_SD", stateId: "SD", name: "Pierre", kind: "capital", biome: "heartland", power: 1, title: "Oahe Dam Citadel", emoji: "🎣", perk: "+3 on Heartland Node", perkBonus: 3, perkCondition: "heartland" }
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
    badge: "Stage 1 (2 Nodes)",
    desc: "A friendly wilderness scout learning the map trails. Stage 1 plays across 2 simple objective nodes.",
    requiredCards: 0,
    difficulty: "Easy",
    nodeCount: 2,
    deck: ["ST_VT", "CAP_DE", "ST_IA", "CAP_ID", "ST_NE"],
    strategy: "rookie"
  },
  {
    id: "challenger_2",
    name: "Prairie Pioneer",
    title: "Heartland Master",
    avatar: "🌾",
    badge: "Stage 2 (3 Nodes)",
    desc: "A tenacious plains rover with strong Heartland cards. Plays 3-lane objectives.",
    requiredCards: 5,
    difficulty: "Medium",
    nodeCount: 3,
    deck: ["ST_KS", "CAP_TX", "ST_OH", "CAP_IL", "ST_NE", "CAP_IN"],
    strategy: "heartland_lanes"
  },
  {
    id: "challenger_3",
    name: "Coastal Captain",
    title: "Pacific & Atlantic Commodore",
    avatar: "⚓",
    badge: "Stage 3 (3 Nodes)",
    desc: "A salty sea captain with maritime cards. Watch out for his coastal lane control!",
    requiredCards: 10,
    difficulty: "Tricky",
    nodeCount: 3,
    deck: ["ST_CA", "CAP_FL", "ST_ME", "CAP_MA", "ST_HI", "CAP_GA"],
    strategy: "coast_lanes"
  },
  {
    id: "challenger_4",
    name: "Canyon Ranger",
    title: "High Mountain Sovereign",
    avatar: "⛰️",
    badge: "Stage 4 (3 Nodes)",
    desc: "Patrols the Rockies and High Sierras with heavy-hitting Mountain titans.",
    requiredCards: 15,
    difficulty: "Hard",
    nodeCount: 3,
    deck: ["ST_CO", "CAP_AK", "ST_AZ", "CAP_UT", "ST_WY", "CAP_CO"],
    strategy: "mountain_lanes"
  },
  {
    id: "challenger_5",
    name: "Liberty Titan",
    title: "Grand Champion of 50 States",
    avatar: "🦅",
    badge: "Final Boss (3 Nodes)",
    desc: "The ultimate deck master with high-power state pairs and perfect Capital Synergy.",
    requiredCards: 20,
    difficulty: "Master",
    nodeCount: 3,
    deck: ["ST_TX", "CAP_TX", "ST_CA", "CAP_CA", "ST_NY", "CAP_NY"],
    strategy: "master"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    BATTLE_BIOMES,
    BATTLE_NODES,
    STATE_CARDS_DATA,
    CAPITAL_CARDS_DATA,
    BATTLE_CARDS,
    BATTLE_CARDS_MAP,
    AI_CHALLENGERS
  };
}
