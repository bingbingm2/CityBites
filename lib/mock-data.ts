import { Restaurant, Dish } from './types';

// ─── ROME ───

export const romeRestaurants: Restaurant[] = [
  {
    id: 'rome-1',
    name: 'Roscioli Caffè Pasticceria',
    address: 'Piazza Benedetto Cairoli 16, Roma',
    lat: 41.8942,
    lng: 12.4744,
    url: 'https://roscioli.com',
    whyLocalScore: 95,
    source: 'local-guide',
    neighborhood: 'Centro Storico',
  },
  {
    id: 'rome-2',
    name: 'Supplizio',
    address: 'Via dei Banchi Vecchi 143, Roma',
    lat: 41.8978,
    lng: 12.4672,
    url: 'https://supplizio.it',
    whyLocalScore: 92,
    source: 'local-guide',
    neighborhood: 'Ponte',
  },
  {
    id: 'rome-3',
    name: 'Pizzarium Bonci',
    address: 'Via della Meloria 43, Roma',
    lat: 41.9074,
    lng: 12.4463,
    url: 'https://bonci.it',
    whyLocalScore: 97,
    source: 'local-guide',
    neighborhood: 'Prati',
  },
  {
    id: 'rome-4',
    name: 'Trattoria Da Enzo al 29',
    address: 'Via dei Vascellari 29, Roma',
    lat: 41.8868,
    lng: 12.4738,
    url: 'https://daenzoal29.com',
    whyLocalScore: 98,
    source: 'local-guide',
    neighborhood: 'Trastevere',
  },
  {
    id: 'rome-5',
    name: 'Gelateria del Teatro',
    address: 'Via dei Coronari 65, Roma',
    lat: 41.9010,
    lng: 12.4693,
    url: 'https://gelateriadelteatr.it',
    whyLocalScore: 90,
    source: 'local-guide',
    neighborhood: 'Navona',
  },
  {
    id: 'rome-6',
    name: "Sant'Eustachio Il Caffè",
    address: "Piazza di Sant'Eustachio 82, Roma",
    lat: 41.8986,
    lng: 12.4747,
    url: 'https://santeustachioilcaffe.it',
    whyLocalScore: 93,
    source: 'local-guide',
    neighborhood: 'Pigna',
  },
  {
    id: 'rome-7',
    name: 'Salumeria Roscioli',
    address: 'Via dei Giubbonari 21, Roma',
    lat: 41.8951,
    lng: 12.4739,
    url: 'https://salumeriaroscioli.com',
    whyLocalScore: 96,
    source: 'local-guide',
    neighborhood: 'Centro Storico',
  },
];

export const romeMenuTexts: Record<string, string> = {
  'rome-1': `
COLAZIONE / BREAKFAST
Cornetto classico — €1.80
Cornetto con crema — €2.20
Maritozzo con panna — €3.50
Caffè espresso — €1.20
Cappuccino — €1.80

PRANZO / LUNCH
Cacio e Pepe — €12.00
Supplì al telefono — €2.50
Carbonara — €13.00
Tiramisu — €6.00
  `.trim(),
  'rome-2': `
SUPPLÌ E FRITTI
Supplì classico al ragù — €2.50
Supplì cacio e pepe — €3.00
Supplì alla carbonara — €3.00
Fiore di zucca ripieno — €3.50
Crocchetta di patate — €2.00

PANINI
Porchetta di Ariccia — €5.00
Mortadella e stracciatella — €6.00
  `.trim(),
  'rome-3': `
PIZZA AL TAGLIO
Margherita — €3.50/etto
Patate e mozzarella — €4.00/etto
Mortadella e burrata — €5.00/etto
Carciofi alla romana — €4.50/etto
Supplì — €2.50
  `.trim(),
  'rome-4': `
PRIMI
Cacio e Pepe — €11.00
Amatriciana — €12.00
Gricia — €11.50
Carbonara — €12.50
Tonnarelli cacio e pepe — €13.00

SECONDI
Saltimbocca alla Romana — €15.00
Coda alla vaccinara — €14.00

DOLCI
Tiramisù — €6.00
Panna cotta — €5.50
  `.trim(),
  'rome-5': `
GELATO ARTIGIANALE
Crema del Teatro (vanilla, caramel) — €3.00
Pistacchio di Bronte — €3.50
Ricotta e visciole — €3.00
Cioccolato fondente — €3.00
Fragola fresca — €3.00
  `.trim(),
  'rome-6': `
CAFFETTERIA
Gran Caffè (house special) — €1.50
Espresso — €1.20
Cappuccino — €2.00
Caffè con crema — €2.50
Granita di caffè — €3.50
  `.trim(),
  'rome-7': `
ANTIPASTI
Tagliere di salumi misti — €18.00
Burrata con pomodorini — €12.00
Prosciutto di Parma 24 mesi — €16.00

PRIMI
Rigatoni alla Gricia — €14.00
Pasta e fagioli — €11.00

VINI
Montepulciano d'Abruzzo (glass) — €6.00
Frascati Superiore (glass) — €5.00
  `.trim(),
};

export const romeDishes: Record<string, Dish[]> = {
  'rome-1': [
    {
      name: 'Maritozzo con Panna',
      price: '€3.50',
      category: 'Breakfast',
      explanation: 'A pillowy brioche bun split and overstuffed with fresh whipped cream. Dating back to ancient Rome where husbands ("mariti") would hide love notes inside for their wives.',
      whyCityUnique: 'This is THE Roman breakfast pastry — not found in other Italian cities. Locals eat it standing at the bar with an espresso.',
      orderingTip: 'Order with a caffè espresso. Eat immediately — the cream is best fresh.',
      imageUrl: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=300&fit=crop',
    },
    {
      name: 'Cacio e Pepe',
      price: '€12.00',
      category: 'Primo',
      explanation: 'Just three ingredients: tonnarelli pasta, Pecorino Romano cheese, and black pepper. The magic is in the technique — creating a creamy sauce from starchy pasta water and cheese.',
      whyCityUnique: 'One of Rome\'s sacred "quattro pastas." The Pecorino Romano is local to Lazio region. Every Roman nonna has her own version.',
      orderingTip: 'Never add parmesan — only Pecorino. Don\'t ask for modifications.',
      imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
    },
    {
      name: 'Supplì al Telefono',
      price: '€2.50',
      category: 'Street Food',
      explanation: 'Deep-fried rice croquette with tomato ragù and a molten mozzarella center. Called "al telefono" because when you pull it apart, the cheese stretches like a telephone cord.',
      whyCityUnique: 'Rome\'s answer to Sicilian arancini — but elongated, with ragù mixed into the rice. Found in every Roman pizzeria al taglio.',
      orderingTip: 'Best eaten as a quick snack standing up. Perfect before a sit-down meal.',
      imageUrl: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=400&h=300&fit=crop',
    },
  ],
  'rome-2': [
    {
      name: 'Supplì Cacio e Pepe',
      price: '€3.00',
      category: 'Street Food',
      explanation: 'A modern twist on the classic supplì, filled with cacio e pepe sauce instead of ragù. Created by Supplizio\'s chef to celebrate Roman flavors in street food form.',
      whyCityUnique: 'Combines two Roman icons — the supplì and cacio e pepe — into one bite. Only found in Rome.',
      orderingTip: 'Get one of each flavor. They\'re small enough to sample the whole menu.',
      imageUrl: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=400&h=300&fit=crop',
    },
    {
      name: 'Porchetta di Ariccia',
      price: '€5.00',
      category: 'Panino',
      explanation: 'Herb-stuffed slow-roasted pork belly from the Castelli Romani town of Ariccia, served in crusty bread. The skin is impossibly crispy.',
      whyCityUnique: 'Ariccia is just south of Rome — this is the original porchetta. Locals make day trips to eat it at the source.',
      orderingTip: 'Ask for extra crackling (cotenna croccante).',
      imageUrl: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=400&h=300&fit=crop',
    },
  ],
  'rome-3': [
    {
      name: 'Pizza al Taglio – Mortadella e Burrata',
      price: '€5.00/etto',
      category: 'Pizza',
      explanation: 'Gabriele Bonci\'s legendary Roman-style pizza: airy, crispy, topped with silky mortadella and creamy burrata. Sold by weight (etto = 100g).',
      whyCityUnique: 'Bonci revolutionized Roman pizza al taglio with long fermentation doughs. This style exists only in Rome.',
      orderingTip: 'Point at what you want and say "un pezzo" (a piece). They\'ll cut and weigh it.',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    },
  ],
  'rome-4': [
    {
      name: 'Carbonara',
      price: '€12.50',
      category: 'Primo',
      explanation: 'Rigatoni with guanciale (cured pork cheek), egg yolks, Pecorino Romano, and black pepper. No cream — ever. The egg creates the sauce.',
      whyCityUnique: 'Born in Rome post-WWII, possibly from American soldiers\' bacon and eggs meeting Italian pasta. The real deal uses only guanciale, never pancetta.',
      orderingTip: 'Da Enzo\'s version is legendary — arrive early as there\'s always a queue.',
      imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop',
    },
    {
      name: 'Coda alla Vaccinara',
      price: '€14.00',
      category: 'Secondo',
      explanation: 'Slow-braised oxtail in tomato sauce with celery, pine nuts, and raisins. A dish of the "quinto quarto" (fifth quarter) — offal tradition from Rome\'s slaughterhouse workers.',
      whyCityUnique: 'The ultimate Roman comfort food from Testaccio neighborhood\'s working-class tradition. You won\'t find authentic versions outside Rome.',
      orderingTip: 'Pair with a glass of Cesanese del Piglio, a local red wine.',
      imageUrl: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=400&h=300&fit=crop',
    },
  ],
  'rome-5': [
    {
      name: 'Pistacchio di Bronte',
      price: '€3.50',
      category: 'Gelato',
      explanation: 'Gelato made with pistachios from Bronte, Sicily — the world\'s finest. Vibrant green, intensely nutty, creamy without being heavy.',
      whyCityUnique: 'True pistachio gelato uses only Bronte pistachios. In Rome, artisanal gelaterias take this seriously — it\'s a point of pride.',
      orderingTip: 'Skip any gelateria where pistachio is neon green — that\'s artificial. Real pistachio gelato is muted olive-green.',
      imageUrl: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&h=300&fit=crop',
    },
  ],
  'rome-6': [
    {
      name: "Gran Caffè Sant'Eustachio",
      price: '€1.50',
      category: 'Coffee',
      explanation: 'The house specialty since 1938: espresso pre-sweetened with the first drops of the extraction beaten into sugar to create a velvety crema. The recipe is a closely guarded secret.',
      whyCityUnique: 'This caffè is a Roman institution. Locals detour across the city for it. The technique of beating sugar with the first espresso drops is unique to this bar.',
      orderingTip: 'Say "un Gran Caffè" — no need to specify anything else. Drink it standing at the bar like a local.',
      imageUrl: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=300&fit=crop',
    },
  ],
  'rome-7': [
    {
      name: 'Tagliere di Salumi Misti',
      price: '€18.00',
      category: 'Antipasto',
      explanation: 'A curated board of Italy\'s finest cured meats: prosciutto crudo, coppa, finocchiona, and more. Roscioli sources from small artisan producers across Italy.',
      whyCityUnique: 'Roscioli\'s salumeria is a Roman institution for sourcing the country\'s best ingredients. The quality here rivals anywhere in Italy.',
      orderingTip: 'Ask the staff for pairing recommendations — they have an incredible wine cellar below.',
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    },
    {
      name: 'Rigatoni alla Gricia',
      price: '€14.00',
      category: 'Primo',
      explanation: 'The "mother" of carbonara: rigatoni with guanciale and Pecorino Romano, but no egg. The purest expression of Roman pasta — rendered pork fat coats every tube.',
      whyCityUnique: 'Gricia predates both carbonara and amatriciana. It originated in the hills east of Rome with shepherds. The least known of the quattro pastas, but the most essential.',
      orderingTip: 'This is the pasta cognoscenti\'s choice. If you only eat one pasta in Rome, many locals would say gricia.',
      imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
    },
  ],
};

// ─── SAN FRANCISCO ───

export const sfRestaurants: Restaurant[] = [
  {
    id: 'sf-1',
    name: 'Tartine Bakery',
    address: '600 Guerrero St, San Francisco',
    lat: 37.7614,
    lng: -122.4241,
    url: 'https://tartinebakery.com',
    whyLocalScore: 94,
    source: 'local-guide',
    neighborhood: 'Mission District',
  },
  {
    id: 'sf-2',
    name: 'Swan Oyster Depot',
    address: '1517 Polk St, San Francisco',
    lat: 37.7907,
    lng: -122.4206,
    url: 'https://sfswanoysterdepot.com',
    whyLocalScore: 98,
    source: 'local-guide',
    neighborhood: 'Polk Gulch',
  },
  {
    id: 'sf-3',
    name: 'La Taqueria',
    address: '2889 Mission St, San Francisco',
    lat: 37.7511,
    lng: -122.4183,
    url: 'https://lataqueriasf.com',
    whyLocalScore: 96,
    source: 'local-guide',
    neighborhood: 'Mission District',
  },
  {
    id: 'sf-4',
    name: 'Liguria Bakery',
    address: '1700 Stockton St, San Francisco',
    lat: 37.8005,
    lng: -122.4091,
    url: 'https://liguriabakery.com',
    whyLocalScore: 93,
    source: 'local-guide',
    neighborhood: 'North Beach',
  },
  {
    id: 'sf-5',
    name: 'Bi-Rite Creamery',
    address: '3692 18th St, San Francisco',
    lat: 37.7617,
    lng: -122.4256,
    url: 'https://biritecreamery.com',
    whyLocalScore: 91,
    source: 'local-guide',
    neighborhood: 'Mission District',
  },
];

export const sfMenuTexts: Record<string, string> = {
  'sf-1': `
MORNING PASTRIES
Morning bun (orange, cinnamon) — $5.25
Croissant — $4.50
Pain au chocolat — $5.00
Banana cream tart — $6.50

TARTINE BREAD
Country loaf — $10.00
Sesame loaf — $11.00

LUNCH
Croque Monsieur — $16.00
Egg salad sandwich — $14.00
  `.trim(),
  'sf-2': `
RAW BAR
Oysters (6) — $24.00
Dungeness crab (seasonal) — market price
Shrimp cocktail — $18.00
Combination seafood salad — $22.00

SMOKED FISH
Smoked salmon plate — $20.00
Smoked trout — $18.00

CHOWDER
New England clam chowder — $12.00
  `.trim(),
  'sf-3': `
BURRITOS
Super burrito (carne asada) — $13.50
Super burrito (carnitas) — $12.50
Super burrito (chicken) — $12.00

TACOS
Carne asada taco — $5.50
Carnitas taco — $5.00
Chicken taco — $4.50

SIDES
Chips & salsa — $3.00
  `.trim(),
  'sf-4': `
FOCACCIA (sold until we run out)
Plain focaccia — $5.00
Tomato focaccia — $6.00
Green onion focaccia — $6.00
Mushroom focaccia — $6.50
Raisin focaccia — $5.50
  `.trim(),
  'sf-5': `
ICE CREAM
Salted caramel — $5.50
Honey lavender — $5.50
Brown sugar with ginger caramel — $5.50
Ricanelas (Mexican cinnamon) — $5.50
Strawberry balsamic — $6.00
  `.trim(),
};

export const sfDishes: Record<string, Dish[]> = {
  'sf-1': [
    {
      name: 'Morning Bun',
      price: '$5.25',
      category: 'Pastry',
      explanation: 'A croissant-meets-cinnamon-roll: laminated dough rolled with orange zest and cinnamon, baked in a muffin tin. Crispy, buttery, sweet.',
      whyCityUnique: 'Created by Chad Robertson at Tartine — this pastry has become synonymous with SF food culture. People line up before opening for it.',
      orderingTip: 'Arrive by 8am or they sell out. Best eaten warm with coffee from Four Barrel across the street.',
      imageUrl: 'https://images.unsplash.com/photo-1509365390695-33aee754301f?w=400&h=300&fit=crop',
    },
  ],
  'sf-2': [
    {
      name: 'Dungeness Crab',
      price: 'Market price',
      category: 'Seafood',
      explanation: 'Sweet, tender Pacific Dungeness crab, cracked and served simply with cocktail sauce and sourdough. Seasonal (Nov–June).',
      whyCityUnique: 'Dungeness crab IS San Francisco. The season opener is a civic event. Fisherman\'s Wharf was built on this crab.',
      orderingTip: 'Sit at the marble counter. Chat with the guys behind the bar — they\'ve been shucking here for decades.',
      imageUrl: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400&h=300&fit=crop',
    },
  ],
  'sf-3': [
    {
      name: 'Super Burrito (Carne Asada)',
      price: '$13.50',
      category: 'Burrito',
      explanation: 'The Mission-style burrito: grilled steak, rice, whole pinto beans, cheese, sour cream, avocado, and salsa wrapped in a steamed flour tortilla the size of a football.',
      whyCityUnique: 'The Mission burrito was invented in SF\'s Mission District in the 1960s. La Taqueria\'s version won "best burrito in America" — they controversially skip rice for more meat.',
      orderingTip: 'Order "super" for the works. Get the salsa on the side if you want to control the heat.',
      imageUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
    },
  ],
  'sf-4': [
    {
      name: 'Tomato Focaccia',
      price: '$6.00',
      category: 'Bread',
      explanation: 'Thick, pillowy focaccia painted with olive oil and tomato sauce. Baked fresh daily in a century-old Italian bakery — when it\'s gone, it\'s gone.',
      whyCityUnique: 'Liguria Bakery has been in North Beach since 1911 — a living piece of SF\'s Italian immigrant heritage. Cash only, no frills, perfection.',
      orderingTip: 'Cash only. Open 8am, closed by noon. Don\'t be late.',
      imageUrl: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=400&h=300&fit=crop',
    },
  ],
  'sf-5': [
    {
      name: 'Salted Caramel Ice Cream',
      price: '$5.50',
      category: 'Ice Cream',
      explanation: 'Bi-Rite\'s signature: deep butterscotch caramel with sea salt, made with local Straus Family Creamery dairy. Redefined ice cream in SF.',
      whyCityUnique: 'Bi-Rite helped launch SF\'s artisanal ice cream movement. The salted caramel flavor became iconic and spawned a million copycats nationwide.',
      orderingTip: 'Take it to Dolores Park across the street. That\'s the quintessential SF afternoon.',
      imageUrl: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop',
    },
  ],
};

// ─── Helper ───

export function getMockCityData(city: string) {
  const normalized = city.toLowerCase().trim();
  if (normalized.includes('rome') || normalized.includes('roma')) {
    return {
      restaurants: romeRestaurants,
      menuTexts: romeMenuTexts,
      dishes: romeDishes,
    };
  }
  if (
    normalized.includes('san francisco') ||
    normalized.includes('sf') ||
    normalized.includes('frisco')
  ) {
    return {
      restaurants: sfRestaurants,
      menuTexts: sfMenuTexts,
      dishes: sfDishes,
    };
  }
  // Default to Rome for unsupported cities
  return {
    restaurants: romeRestaurants,
    menuTexts: romeMenuTexts,
    dishes: romeDishes,
  };
}
