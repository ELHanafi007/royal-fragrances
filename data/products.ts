export interface Size {
  ml: number;
  price: number;
}

export interface FragranceNotes {
  top: string[];
  middle: string[];
  base: string[];
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  imageUrl: string;
  sizes: Size[];
  category: "men" | "women" | "unisex" | "middle eastern";
  notes: FragranceNotes;
}

export const products: Product[] = [
  // WOMEN'S FRAGRANCES
  {
    id: 1,
    name: "Coco Mademoiselle",
    brand: "CHANEL",
    description: "Fresh oriental: orange, jasmine, rose, patchouli, vetiver. Iconic feminine scent.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.611.jpg",
    category: "women",
    notes: { top: ["Orange", "Bergamot"], middle: ["Rose", "Jasmine"], base: ["Patchouli", "Vetiver"] },
    sizes: [{ ml: 5, price: 160 }, { ml: 10, price: 280 }, { ml: 30, price: 750 }]
  },
  {
    id: 2,
    name: "La vie est belle",
    brand: "Lancôme",
    description: "Sweet gourmand: iris, patchouli, vanilla, praline. Happiness in a bottle.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.14973.jpg",
    category: "women",
    notes: { top: ["Blackcurrant", "Pear"], middle: ["Iris", "Jasmine"], base: ["Vanilla", "Praline"] },
    sizes: [{ ml: 5, price: 140 }, { ml: 10, price: 240 }, { ml: 30, price: 650 }]
  },
  {
    id: 3,
    name: "N°5",
    brand: "CHANEL",
    description: "Classic floral aldehyde: ylang-ylang, rose, jasmine, sandalwood, vanilla.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.608.jpg",
    category: "women",
    notes: { top: ["Aldehydes", "Ylang-Ylang"], middle: ["Rose", "Jasmine"], base: ["Sandalwood", "Vanilla"] },
    sizes: [{ ml: 5, price: 180 }, { ml: 10, price: 320 }, { ml: 30, price: 850 }]
  },
  {
    id: 4,
    name: "Chance Eau Fraiche",
    brand: "CHANEL",
    description: "Woody citrus: citron, teakwood, jasmine, white musk, vetiver. Fresh and vibrant.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.1506.jpg",
    category: "women",
    notes: { top: ["Citron", "Water Hyacinth"], middle: ["Jasmine", "Pink Pepper"], base: ["Teak Wood", "Patchouli"] },
    sizes: [{ ml: 5, price: 150 }, { ml: 10, price: 260 }, { ml: 30, price: 700 }]
  },
  {
    id: 5,
    name: "Chance Eau Tendre",
    brand: "CHANEL",
    description: "Fruity floral: grapefruit, quince, jasmine, white musk. Romantic and soft.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.8069.jpg",
    category: "women",
    notes: { top: ["Grapefruit", "Quince"], middle: ["Jasmine", "Hyacinth"], base: ["Musk", "Iris"] },
    sizes: [{ ml: 5, price: 150 }, { ml: 10, price: 260 }, { ml: 30, price: 700 }]
  },
  {
    id: 6,
    name: "Libre",
    brand: "Yves Saint Laurent",
    description: "Lavender floral: lavender, orange blossom, vanilla, musk. Modern feminine freedom.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.56077.jpg",
    category: "women",
    notes: { top: ["Lavender", "Mandarin"], middle: ["Orange Blossom", "Jasmine"], base: ["Vanilla", "Ambergris"] },
    sizes: [{ ml: 5, price: 150 }, { ml: 10, price: 260 }, { ml: 30, price: 700 }]
  },
  {
    id: 7,
    name: "Chloé",
    brand: "Chloé",
    description: "Clean floral: peony, rose, magnolia, cedarwood. Signature feminine scent.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.1733.jpg",
    category: "women",
    notes: { top: ["Peony", "Litchi"], middle: ["Rose", "Magnolia"], base: ["Cedar", "Amber"] },
    sizes: [{ ml: 5, price: 140 }, { ml: 10, price: 240 }, { ml: 30, price: 650 }]
  },
  {
    id: 8,
    name: "Paradoxe",
    brand: "Prada",
    description: "Amber floral: bergamot, orange blossom, amber, vanilla. Modern and addictive.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.75691.jpg",
    category: "women",
    notes: { top: ["Bergamot", "Pear"], middle: ["Orange Blossom", "Neroli"], base: ["Amber", "Vanilla"] },
    sizes: [{ ml: 5, price: 160 }, { ml: 10, price: 280 }, { ml: 30, price: 750 }]
  },
  {
    id: 9,
    name: "J'adore",
    brand: "DIOR",
    description: "Floral bouquet: ylang-ylang, rose, jasmine, magnolia. Timeless elegance.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.210.jpg",
    category: "women",
    notes: { top: ["Pear", "Melon"], middle: ["Jasmine", "Rose"], base: ["Musk", "Vanilla"] },
    sizes: [{ ml: 5, price: 170 }, { ml: 10, price: 300 }, { ml: 30, price: 800 }]
  },
  {
    id: 10,
    name: "Black Opium",
    brand: "Yves Saint Laurent",
    description: "Coffee floral: coffee, vanilla, white flowers. Edgy and addictive.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.25354.jpg",
    category: "women",
    notes: { top: ["Pear", "Pink Pepper"], middle: ["Coffee", "Jasmine"], base: ["Vanilla", "Patchouli"] },
    sizes: [{ ml: 5, price: 150 }, { ml: 10, price: 260 }, { ml: 30, price: 700 }]
  },
  {
    id: 11,
    name: "Good Girl",
    brand: "Carolina Herrera",
    description: "Almond floral: jasmine, tonka, coffee, cocoa. Daring and seductive.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.39688.jpg",
    category: "women",
    notes: { top: ["Almond", "Coffee"], middle: ["Jasmine", "Tuberose"], base: ["Tonka Bean", "Cocoa"] },
    sizes: [{ ml: 5, price: 150 }, { ml: 10, price: 260 }, { ml: 30, price: 700 }]
  },
  {
    id: 12,
    name: "My Way",
    brand: "Giorgio Armani",
    description: "Fruity floral: orange blossom, tuberose, vanilla, cedar. Ethically sourced.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.62030.jpg",
    category: "women",
    notes: { top: ["Orange Blossom", "Bergamot"], middle: ["Tuberose", "Jasmine"], base: ["Vanilla", "Cedar"] },
    sizes: [{ ml: 5, price: 150 }, { ml: 10, price: 260 }, { ml: 30, price: 700 }]
  },
  {
    id: 13,
    name: "Si",
    brand: "Giorgio Armani",
    description: "Chypre: blackcurrant, rose, vanilla, patchouli. Modern sophistication.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.18453.jpg",
    category: "women",
    notes: { top: ["Cassis"], middle: ["Rose", "Freesia"], base: ["Vanilla", "Patchouli"] },
    sizes: [{ ml: 5, price: 150 }, { ml: 10, price: 260 }, { ml: 30, price: 700 }]
  },
  {
    id: 14,
    name: "Idôle",
    brand: "Lancôme",
    description: "Modern chypre: pear, rose, jasmine, white musk. Clean and contemporary.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.55731.jpg",
    category: "women",
    notes: { top: ["Pear", "Bergamot"], middle: ["Rose", "Jasmine"], base: ["Musk", "Vanilla"] },
    sizes: [{ ml: 5, price: 140 }, { ml: 10, price: 240 }, { ml: 30, price: 650 }]
  },
  {
    id: 15,
    name: "Flowerbomb",
    brand: "Viktor&Rolf",
    description: "Floral gourmand: jasmine, rose, vanilla, patchouli. Explosive femininity.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.1460.jpg",
    category: "women",
    notes: { top: ["Tea", "Bergamot"], middle: ["Jasmine", "Rose"], base: ["Patchouli", "Musk"] },
    sizes: [{ ml: 5, price: 160 }, { ml: 10, price: 280 }, { ml: 30, price: 750 }]
  },
  {
    id: 16,
    name: "Angel",
    brand: "Thierry Mugler",
    description: "Oriental gourmand: honey, caramel, vanilla, patchouli. Groundbreaking original.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.704.jpg",
    category: "women",
    notes: { top: ["Cotton Candy", "Melon"], middle: ["Honey", "Red Berries"], base: ["Patchouli", "Chocolate"] },
    sizes: [{ ml: 5, price: 150 }, { ml: 10, price: 260 }, { ml: 30, price: 700 }]
  },
  {
    id: 17,
    name: "Alien",
    brand: "Thierry Mugler",
    description: "Woody floral: jasmine, amber, cashmere wood. Mysterious and powerful.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.707.jpg",
    category: "women",
    notes: { top: ["Jasmine"], middle: ["Woody Notes"], base: ["Amber"] },
    sizes: [{ ml: 5, price: 150 }, { ml: 10, price: 260 }, { ml: 30, price: 700 }]
  },
  {
    id: 18,
    name: "Bright Crystal",
    brand: "Versace",
    description: "Fruity floral: pomegranate, peony, magnolia, musk. Fresh and youthful.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.632.jpg",
    category: "women",
    notes: { top: ["Yuzu", "Pomegranate"], middle: ["Peony", "Lotus"], base: ["Musk", "Amber"] },
    sizes: [{ ml: 5, price: 130 }, { ml: 10, price: 220 }, { ml: 30, price: 600 }]
  },
  {
    id: 19,
    name: "Light Blue",
    brand: "Dolce&Gabbana",
    description: "Citrus floral: Sicilian lemon, apple, jasmine, cedar. Summer freshness.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.485.jpg",
    category: "women",
    notes: { top: ["Lemon", "Apple"], middle: ["Jasmine", "Bamboo"], base: ["Cedar", "Musk"] },
    sizes: [{ ml: 5, price: 130 }, { ml: 10, price: 220 }, { ml: 30, price: 600 }]
  },
  {
    id: 20,
    name: "Daisy",
    brand: "Marc Jacobs",
    description: "Fresh floral: strawberry, violet, jasmine, musk. Playful and carefree.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.1361.jpg",
    category: "women",
    notes: { top: ["Strawberry", "Violet Leaf"], middle: ["Violet", "Jasmine"], base: ["Musk", "Vanilla"] },
    sizes: [{ ml: 5, price: 130 }, { ml: 10, price: 220 }, { ml: 30, price: 600 }]
  },

  // MEN'S FRAGRANCES
  {
    id: 21,
    name: "Bleu de CHANEL",
    brand: "CHANEL",
    description: "Woody aromatic: grapefruit, ginger, incense, cedar. Modern masculine icon.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.9099.jpg",
    category: "men",
    notes: { top: ["Grapefruit", "Lemon"], middle: ["Ginger", "Nutmeg"], base: ["Incense", "Cedar"] },
    sizes: [{ ml: 5, price: 170 }, { ml: 10, price: 300 }, { ml: 30, price: 800 }]
  },
  {
    id: 22,
    name: "Sauvage",
    brand: "DIOR",
    description: "Aromatic fougère: bergamot, Sichuan pepper, ambroxan, lavender. Wild and fresh.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.31861.jpg",
    category: "men",
    notes: { top: ["Bergamot", "Pepper"], middle: ["Lavender", "Vetiver"], base: ["Ambroxan", "Cedar"] },
    sizes: [{ ml: 5, price: 160 }, { ml: 10, price: 280 }, { ml: 30, price: 750 }]
  },
  {
    id: 23,
    name: "Allure Homme Sport",
    brand: "CHANEL",
    description: "Fresh citrus: orange, neroli, cedar, white musk. Energetic and refined.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.607.jpg",
    category: "men",
    notes: { top: ["Orange", "Sea Notes"], middle: ["Pepper", "Cedar"], base: ["Vanilla", "Tonka Bean"] },
    sizes: [{ ml: 5, price: 160 }, { ml: 10, price: 280 }, { ml: 30, price: 750 }]
  },
  {
    id: 24,
    name: "Terre d'Hermès",
    brand: "Hermès",
    description: "Woody earthy: orange, flint, vetiver, cedar. Elegant and grounded.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.752.jpg",
    category: "men",
    notes: { top: ["Orange", "Grapefruit"], middle: ["Flint", "Pepper"], base: ["Vetiver", "Cedar"] },
    sizes: [{ ml: 5, price: 140 }, { ml: 10, price: 240 }, { ml: 30, price: 650 }]
  },
  {
    id: 25,
    name: "Aventus",
    brand: "Creed",
    description: "Fruity smoky: pineapple, birch, blackcurrant, musk. Luxury status symbol.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.9828.jpg",
    category: "men",
    notes: { top: ["Pineapple", "Bergamot"], middle: ["Birch", "Patchouli"], base: ["Musk", "Oakmoss"] },
    sizes: [{ ml: 5, price: 280 }, { ml: 10, price: 520 }, { ml: 30, price: 1450 }]
  },
  {
    id: 26,
    name: "Le Male",
    brand: "Jean Paul Gaultier",
    description: "Oriental fougère: mint, lavender, vanilla, tonka. Iconic and seductive.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.430.jpg",
    category: "men",
    notes: { top: ["Mint", "Lavender"], middle: ["Cinnamon", "Orange Blossom"], base: ["Vanilla", "Tonka Bean"] },
    sizes: [{ ml: 5, price: 130 }, { ml: 10, price: 220 }, { ml: 30, price: 600 }]
  },
  {
    id: 27,
    name: "Boss Bottled",
    brand: "Hugo Boss",
    description: "Woody spicy: apple, cinnamon, sandalwood. Classic business sophistication.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.383.jpg",
    category: "men",
    notes: { top: ["Apple", "Plum"], middle: ["Cinnamon", "Mahogany"], base: ["Vanilla", "Sandalwood"] },
    sizes: [{ ml: 5, price: 120 }, { ml: 10, price: 200 }, { ml: 30, price: 550 }]
  },
  {
    id: 28,
    name: "Armani Code",
    brand: "Giorgio Armani",
    description: "Oriental fougère: lemon, star anise, tonka, leather. Seductive and mysterious.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.412.jpg",
    category: "men",
    notes: { top: ["Lemon", "Bergamot"], middle: ["Star Anise", "Olive Blossom"], base: ["Leather", "Tonka Bean"] },
    sizes: [{ ml: 5, price: 140 }, { ml: 10, price: 240 }, { ml: 30, price: 650 }]
  },
  {
    id: 29,
    name: "Acqua di Giò",
    brand: "Giorgio Armani",
    description: "Aquatic: bergamot, neroli, rosemary, patchouli. Mediterranean freshness.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.410.jpg",
    category: "men",
    notes: { top: ["Sea Notes", "Lime"], middle: ["Rosemary", "Jasmine"], base: ["Cedar", "Patchouli"] },
    sizes: [{ ml: 5, price: 140 }, { ml: 10, price: 240 }, { ml: 30, price: 650 }]
  },
  {
    id: 30,
    name: "1 Million",
    brand: "Paco Rabanne",
    description: "Spicy woody: grapefruit, cinnamon, rose, leather. Bold and opulent.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.3707.jpg",
    category: "men",
    notes: { top: ["Grapefruit", "Mint"], middle: ["Cinnamon", "Rose"], base: ["Leather", "Amber"] },
    sizes: [{ ml: 5, price: 130 }, { ml: 10, price: 220 }, { ml: 30, price: 600 }]
  },
  {
    id: 31,
    name: "Invictus",
    brand: "Paco Rabanne",
    description: "Fresh woody: grapefruit, bay leaf, ambergris. Energetic victory scent.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.18471.jpg",
    category: "men",
    notes: { top: ["Sea Notes", "Grapefruit"], middle: ["Bay Leaf", "Jasmine"], base: ["Ambergris", "Guaiac Wood"] },
    sizes: [{ ml: 5, price: 130 }, { ml: 10, price: 220 }, { ml: 30, price: 600 }]
  },
  {
    id: 32,
    name: "Eros",
    brand: "Versace",
    description: "Fresh woody: mint, apple, tonka, vanilla. Intense and passionate.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.16657.jpg",
    category: "men",
    notes: { top: ["Mint", "Apple"], middle: ["Tonka Bean", "Ambroxan"], base: ["Vanilla", "Cedar"] },
    sizes: [{ ml: 5, price: 130 }, { ml: 10, price: 220 }, { ml: 30, price: 600 }]
  },
  {
    id: 33,
    name: "The One",
    brand: "Dolce&Gabbana",
    description: "Woody spicy: grapefruit, coriander, ginger, amber. Sophisticated and intimate.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.2056.jpg",
    category: "men",
    notes: { top: ["Grapefruit", "Coriander"], middle: ["Ginger", "Cardamom"], base: ["Amber", "Tobacco"] },
    sizes: [{ ml: 5, price: 140 }, { ml: 10, price: 240 }, { ml: 30, price: 650 }]
  },
  {
    id: 34,
    name: "L'Homme",
    brand: "Yves Saint Laurent",
    description: "Floral woody: ginger, bergamot, cedar. Refined masculinity.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.734.jpg",
    category: "men",
    notes: { top: ["Ginger", "Bergamot"], middle: ["Spices", "White Pepper"], base: ["Cedar", "Vetiver"] },
    sizes: [{ ml: 5, price: 140 }, { ml: 10, price: 240 }, { ml: 30, price: 650 }]
  },
  {
    id: 35,
    name: "La Nuit de L'Homme",
    brand: "Yves Saint Laurent",
    description: "Spicy woody: cardamom, lavender, cedar. Seductive nighttime scent.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.5521.jpg",
    category: "men",
    notes: { top: ["Cardamom"], middle: ["Lavender", "Bergamot"], base: ["Cedar", "Vetiver"] },
    sizes: [{ ml: 5, price: 140 }, { ml: 10, price: 240 }, { ml: 30, price: 650 }]
  },
  {
    id: 36,
    name: "Ultra Male",
    brand: "Jean Paul Gaultier",
    description: "Fruity aromatic: pear, lavender, mint, vanilla. Powerful and sweet.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.31065.jpg",
    category: "men",
    notes: { top: ["Pear", "Lavender"], middle: ["Cinnamon", "Sage"], base: ["Vanilla", "Amber"] },
    sizes: [{ ml: 5, price: 140 }, { ml: 10, price: 240 }, { ml: 30, price: 650 }]
  },
  {
    id: 37,
    name: "Dior Homme",
    brand: "DIOR",
    description: "Woody iris: lavender, iris, vetiver. Elegant and sophisticated.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.58714.jpg",
    category: "men",
    notes: { top: ["Bergamot", "Pink Pepper"], middle: ["Cashmere Wood", "Cedar"], base: ["Iso E Super", "Vetiver"] },
    sizes: [{ ml: 5, price: 150 }, { ml: 10, price: 260 }, { ml: 30, price: 700 }]
  },
  {
    id: 38,
    name: "Dior Homme Intense",
    brand: "DIOR",
    description: "Iris gourmand: iris, pear, vanilla, cedar. Deep and sensual.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.1301.jpg",
    category: "men",
    notes: { top: ["Lavender"], middle: ["Iris", "Ambrette"], base: ["Cedar", "Vetiver"] },
    sizes: [{ ml: 5, price: 160 }, { ml: 10, price: 280 }, { ml: 30, price: 750 }]
  },
  {
    id: 39,
    name: "Spicebomb",
    brand: "Viktor&Rolf",
    description: "Spicy: pink pepper, cinnamon, tobacco, vanilla. Explosive and warm.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.13857.jpg",
    category: "men",
    notes: { top: ["Pink Pepper", "Elemi"], middle: ["Cinnamon", "Saffron"], base: ["Tobacco", "Leather"] },
    sizes: [{ ml: 5, price: 150 }, { ml: 10, price: 260 }, { ml: 30, price: 700 }]
  },
  {
    id: 40,
    name: "Tobacco Vanille",
    brand: "Tom Ford",
    description: "Spicy vanilla: tobacco leaf, vanilla, cocoa. Warm and indulgent.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.1825.jpg",
    category: "unisex",
    notes: { top: ["Tobacco Leaf", "Spicy Notes"], middle: ["Vanilla", "Cocoa"], base: ["Dried Fruits", "Woody Notes"] },
    sizes: [{ ml: 5, price: 220 }, { ml: 10, price: 420 }, { ml: 30, price: 1150 }]
  },

  // MIDDLE EASTERN / DUPES
  {
    id: 41,
    name: "9PM Night Out",
    brand: "Afnan",
    description: "Inspired by Ultra Male: Mandarin, caramel, amber, tonka. Sweet seductive.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.62758.jpg",
    category: "middle eastern",
    notes: { top: ["Apple", "Lavender"], middle: ["Orange Blossom", "Lily-of-the-Valley"], base: ["Vanilla", "Tonka Bean"] },
    sizes: [{ ml: 5, price: 80 }, { ml: 10, price: 140 }, { ml: 30, price: 380 }]
  },
  {
    id: 42,
    name: "Odyssey Mandarin Sky",
    brand: "Armaf",
    description: "Inspired by Scandal: Mandarin orange, caramel, ambroxan. Playful citrus.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.77254.jpg",
    category: "middle eastern",
    notes: { top: ["Mandarin", "Orange"], middle: ["Caramel", "Tonka Bean"], base: ["Ambroxan", "Vetiver"] },
    sizes: [{ ml: 5, price: 70 }, { ml: 10, price: 120 }, { ml: 30, price: 320 }]
  },
  {
    id: 43,
    name: "Odyssey Limoni",
    brand: "Armaf",
    description: "Inspired by Imagination: Lemon, grapefruit, ginger, musk. Fresh crisp.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.91678.jpg",
    category: "middle eastern",
    notes: { top: ["Lemon", "Grapefruit"], middle: ["Ginger", "Cinnamon"], base: ["Musk", "Black Tea"] },
    sizes: [{ ml: 5, price: 70 }, { ml: 10, price: 120 }, { ml: 30, price: 320 }]
  },
  {
    id: 44,
    name: "Khamrah",
    brand: "Lattafa",
    description: "Inspired by Angel's Share: Cinnamon, dates, praline, vanilla. Sweet boozy.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.75831.jpg",
    category: "middle eastern",
    notes: { top: ["Cinnamon", "Nutmeg"], middle: ["Dates", "Praline"], base: ["Vanilla", "Tonka Bean"] },
    sizes: [{ ml: 5, price: 90 }, { ml: 10, price: 160 }, { ml: 30, price: 420 }]
  },
  {
    id: 45,
    name: "Mega Man",
    brand: "Armaf",
    description: "Inspired by Y EDP: Ginger, pineapple, sage, musk. Modern fresh.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.94236.jpg",
    category: "middle eastern",
    notes: { top: ["Ginger", "Apple"], middle: ["Sage", "Juniper Berries"], base: ["Amberwood", "Tonka Bean"] },
    sizes: [{ ml: 5, price: 70 }, { ml: 10, price: 120 }, { ml: 30, price: 320 }]
  },
  {
    id: 46,
    name: "Odyssey Revolution",
    brand: "Armaf",
    description: "Inspired by Aventus + BR540: Pineapple, black currant, praline, patchouli. Fruity smoky.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.91677.jpg",
    category: "middle eastern",
    notes: { top: ["Pineapple", "Bergamot"], middle: ["Praline", "Jasmine"], base: ["Patchouli", "Musk"] },
    sizes: [{ ml: 5, price: 70 }, { ml: 10, price: 120 }, { ml: 30, price: 320 }]
  },
  {
    id: 47,
    name: "Odyssey Candee",
    brand: "Armaf",
    description: "Inspired by Burberry Elixir: Strawberry, raspberry, caramel, vanilla. Sweet playful.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.94237.jpg",
    category: "middle eastern",
    notes: { top: ["Strawberry", "Raspberry"], middle: ["Caramel", "Jasmine"], base: ["Vanilla", "Musk"] },
    sizes: [{ ml: 5, price: 70 }, { ml: 10, price: 120 }, { ml: 30, price: 320 }]
  },
  {
    id: 48,
    name: "Asad",
    brand: "Lattafa",
    description: "Inspired by Sauvage Elixir: Pineapple, black pepper, tobacco, amber. Spicy bold.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.73024.jpg",
    category: "middle eastern",
    notes: { top: ["Black Pepper", "Pineapple"], middle: ["Coffee", "Patchouli"], base: ["Vanilla", "Amber"] },
    sizes: [{ ml: 5, price: 80 }, { ml: 10, price: 140 }, { ml: 30, price: 380 }]
  },
  {
    id: 49,
    name: "Yara",
    brand: "Lattafa",
    description: "Original: Berries, vanilla, sandalwood, musk. Feminine soft.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.63226.jpg",
    category: "middle eastern",
    notes: { top: ["Orchid", "Tangerine"], middle: ["Gourmand Accord", "Tropical Fruits"], base: ["Vanilla", "Sandalwood"] },
    sizes: [{ ml: 5, price: 70 }, { ml: 10, price: 120 }, { ml: 30, price: 320 }]
  },
  {
    id: 50,
    name: "Oud Wood",
    brand: "Tom Ford",
    description: "Original: Oud, rosewood, cardamom, sandalwood. Luxurious woody.",
    imageUrl: "https://fimgs.net/mdimg/perfume/375x500.1826.jpg",
    category: "unisex",
    notes: { top: ["Rosewood", "Cardamom"], middle: ["Oud", "Sandalwood"], base: ["Vanilla", "Amber"] },
    sizes: [{ ml: 5, price: 240 }, { ml: 10, price: 450 }, { ml: 30, price: 1250 }]
  }
];
