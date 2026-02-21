// ─── CityBites Core Types ───

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  url: string;
  whyLocalScore: number;
  source: string;
  neighborhood: string;
}

export interface Dish {
  name: string;
  price?: string;
  category?: string;
  explanation?: string;
  whyCityUnique?: string;
  orderingTip?: string;
  imageUrl?: string;
}

export interface Stop {
  restaurantId: string;
  timeBlock: string;
  type: 'coffee' | 'snack' | 'brunch' | 'lunch' | 'afternoon-tea' | 'dinner' | 'late-bite';
  signatureDishes: Dish[];
  whyThisStop: string;
  walkToNextMins?: number;
}

export interface ActionLogEntry {
  timestamp: string;
  message: string;
  status: 'pending' | 'running' | 'done' | 'error';
}

export interface UserLog {
  restaurantId: string;
  dishes: string[];
  loggedAt: string;
}

export interface TasteLevel {
  level: number;
  label: string;
}

export interface Journey {
  id: string;
  city: string;
  hours: number;
  vibeTags: string[];
  createdAt: string;
  restaurants: Restaurant[];
  stops: Stop[];
  actionLog: ActionLogEntry[];
  userLogs: UserLog[];
  level: TasteLevel;
  status: 'created' | 'running' | 'completed' | 'error';
}

export interface UserProfile {
  journeys: Journey[];
  tasteIdentity: string;
  totalRestaurants: number;
  totalDishes: number;
}

// ─── MCP Tool I/O Types ───

export interface DiscoverRestaurantsInput {
  city: string;
  vibeTags?: string[];
  limit?: number;
}

export interface FetchMenuInput {
  restaurantUrl: string;
}

export interface FetchMenuOutput {
  menuText: string;
  menuSourceType: 'html' | 'pdf' | 'unknown';
  rawLinks?: string[];
}

export interface ExtractDishesInput {
  menuText: string;
  city: string;
}

export interface ExplainDishesInput {
  city: string;
  restaurantName: string;
  dishes: { name: string; price?: string; category?: string }[];
  vibeTags?: string[];
}

export interface FindDishImagesInput {
  dishes: string[];
}

export interface ComposeItineraryInput {
  city: string;
  hours: number;
  restaurants: Restaurant[];
  explainedDishes: Map<string, Dish[]> | Record<string, Dish[]>;
  startTime?: string;
}

export interface ComputeLevelInput {
  restaurantsVisitedCount: number;
  dayWindowHours?: number;
}
