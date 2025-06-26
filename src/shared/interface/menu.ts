export interface MenuItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  longDescription?: string;
  prepTime?: string;
  serves?: string;
  isVegetarian?: boolean;
  allergens?: string[];
  calories?: number;
  protein?: string;
  carbs?: string;
  fat?: string;
  status: string;
  imageUrl?: string;
  ingredients?: string[];
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type FormValues = {
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  category: string;
  prepTime?: string;
  serves?: string;
  isVegetarian: boolean;
  allergens: string[];
  ingredients: { value: string }[];
  calories?: number;
  protein?: string;
  carbs?: string;
  fat?: string;
  status: string;
  reason?: string;
  rating?: number;
};

export const categories = ["Appetizer", "Main Course", "Dessert", "Beverage"];
export const allergenOptions = [
  "Gluten",
  "Peanuts",
  "Dairy",
  "Nuts",
  "Soy",
  "Eggs",
  "Fish",
  "Shellfish",
];
