export const PIKMIN_COLORS = ["Red", "Yellow", "Blue", "Purple", "White", "Winged", "Rock", "Ice"] as const;
const classic = PIKMIN_COLORS.slice(0, 7);
const rgb = PIKMIN_COLORS.slice(0, 3);

type SetDefinition = { category: string; decor: string; colors?: readonly string[]; event?: boolean };

export const STANDARD_PIKMIN_SETS: SetDefinition[] = [
  {category:"Restaurant",decor:"Chef Hat",colors:PIKMIN_COLORS},{category:"Restaurant",decor:"Chef Hat (Rare)",colors:PIKMIN_COLORS},
  {category:"Café",decor:"Coffee Cup",colors:PIKMIN_COLORS},{category:"Café",decor:"Coffee Cup (Rare)",colors:classic},
  {category:"Sweetshop",decor:"Macaron",colors:classic},{category:"Sweetshop",decor:"Donut",colors:classic},{category:"Movie Theater",decor:"Popcorn Snack",colors:classic},
  {category:"Pharmacy",decor:"Toothbrush",colors:classic},{category:"Pharmacy",decor:"Toothbrush (Rare)",colors:classic},{category:"Zoo",decor:"Dandelion",colors:classic},
  {category:"Forest",decor:"Stag Beetle",colors:PIKMIN_COLORS},{category:"Forest",decor:"Acorn",colors:PIKMIN_COLORS},
  {category:"Waterside",decor:"Fishing Lure",colors:classic},{category:"Waterside",decor:"Fishing Lure (Rare)",colors:classic},{category:"Post Office",decor:"Stamp",colors:classic},
  {category:"Art Gallery",decor:"Picture Frame",colors:classic},{category:"Airport",decor:"Toy Airplane",colors:classic},
  {category:"Station",decor:"Paper Train",colors:classic},{category:"Station",decor:"Ticket",colors:classic},{category:"Station",decor:"Ticket (Rare)",colors:classic},
  {category:"Beach",decor:"Shell",colors:classic},{category:"Burger Place",decor:"Burger",colors:classic},{category:"Corner Store",decor:"Bottle Cap",colors:classic},{category:"Corner Store",decor:"Snack",colors:classic},
  {category:"Supermarket",decor:"Mushroom",colors:classic},{category:"Supermarket",decor:"Banana",colors:classic},{category:"Supermarket",decor:"Banana (Rare)",colors:classic},
  {category:"Bakery",decor:"Baguette",colors:PIKMIN_COLORS},{category:"Bakery",decor:"Baguette (Rare)",colors:classic},{category:"Hair Salon",decor:"Scissors",colors:classic},{category:"Hair Salon",decor:"Scissors (Rare)",colors:classic},
  {category:"Clothes Store",decor:"Hair Tie",colors:classic},{category:"Park",decor:"Clover",colors:PIKMIN_COLORS},{category:"Park",decor:"Four-Leaf Clover",colors:PIKMIN_COLORS},{category:"Park",decor:"Clover (Rare)",colors:PIKMIN_COLORS},{category:"Park",decor:"Four-Leaf Clover (Rare)",colors:PIKMIN_COLORS},
  {category:"Library & Bookstore",decor:"Tiny Book",colors:classic},{category:"Sushi Restaurant",decor:"Sushi",colors:classic},{category:"Mountain",decor:"Mountain Pin Badge",colors:classic},
  {category:"Rainy Day",decor:"Leaf Hat 1",colors:["Blue"]},{category:"Rainy Day",decor:"Leaf Hat 2",colors:["Blue"]},{category:"Rainy Day",decor:"Leaf Hat 3",colors:["Blue"]},
  {category:"Stadium",decor:"Ball Keychain",colors:classic},{category:"Stadium",decor:"Ball Keychain (Rare)",colors:classic},
  {category:"Theme Park",decor:"Ferris Wheel Ticket",colors:rgb},{category:"Theme Park",decor:"Pirate Ship Ticket",colors:rgb},{category:"Bus Stop",decor:"Bus Papercraft",colors:classic},
  {category:"Italian Restaurant",decor:"Pizza",colors:classic},{category:"Italian Restaurant",decor:"Pasta",colors:classic},{category:"Ramen Restaurant",decor:"Ramen Keychain",colors:classic},
  {category:"Bridge",decor:"Bridge Pin Badge",colors:classic},{category:"Hotel",decor:"Hotel Amenities",colors:classic},{category:"Makeup Store",decor:"Makeup",colors:classic},
  {category:"Shrine & Temple",decor:"Fortune — Daikichi",colors:classic},{category:"Shrine & Temple",decor:"Fortune — Kichi",colors:classic},{category:"Shrine & Temple",decor:"Fortune — Chukichi",colors:classic},{category:"Shrine & Temple",decor:"Fortune — Shokichi",colors:classic},{category:"Shrine & Temple",decor:"Fortune — Suekichi",colors:classic},
  {category:"Appliances Store",decor:"Battery",colors:["Yellow"]},{category:"Appliances Store",decor:"Fairy Lights",colors:["Yellow"]},{category:"Curry Restaurant",decor:"Curry Bowl",colors:classic},
  {category:"DIY Store",decor:"Tool",colors:classic},{category:"University & College",decor:"College Crest Patch",colors:rgb},{category:"Mexican Restaurant",decor:"Taco",colors:classic},
  {category:"Laundromats & Dry Cleaners",decor:"Laundry Item",colors:classic},{category:"Korean Restaurant",decor:"Kimchi",colors:PIKMIN_COLORS},{category:"Stationery Store",decor:"Stationery",colors:PIKMIN_COLORS},
  {category:"Roadside",decor:"Green Sticker",colors:PIKMIN_COLORS},{category:"Roadside",decor:"Blue Sticker",colors:PIKMIN_COLORS},{category:"Roadside",decor:"Orange Sticker",colors:PIKMIN_COLORS},{category:"Roadside",decor:"Coin",colors:PIKMIN_COLORS},{category:"Roadside",decor:"Coin (Rare)",colors:PIKMIN_COLORS},
];

export function expandPikminSets(sets: SetDefinition[]) {
  return sets.flatMap((set) => (set.colors || PIKMIN_COLORS).map((color) => ({ category: set.category, decor: set.decor, color, event: set.event || false, owned: false, active: true })));
}
