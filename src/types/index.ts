export interface Product {
  id: string;
  name: string;
  service: string;
  type: string;
  duration: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  available: boolean;
  category: string;
  logo: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AppContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (logged: boolean) => void;
}

export interface NavigationItem {
  name: string;
  page: string;
}