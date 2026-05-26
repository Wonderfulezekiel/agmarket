import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'farmer' | 'buyer' | 'admin';
  avatar: string;
  storeName?: string;
  storeSlug?: string;
  location?: string;
  bio?: string;
  bannerUrl?: string;
  logoUrl?: string;
  isVerified?: boolean;
}

export interface Product {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerSlug: string;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  location: string;
  status: 'draft' | 'published' | 'out_of_stock';
  images: string[];
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  unit: string;
}

export interface Order {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerPhone: string;
  farmerId: string;
  farmerName: string;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'pending' | 'accepted' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  text: string;
  createdAt: string;
  productId?: string;
  productName?: string;
}

export interface Review {
  id: string;
  buyerId: string;
  buyerName: string;
  farmerId: string;
  productId?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface AppState {
  currentUser: User | null;
  users: User[];
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  messages: Message[];
  reviews: Review[];
  
  // Actions
  login: (email: string, role: 'farmer' | 'buyer' | 'admin') => boolean;
  logout: () => void;
  register: (user: Partial<User>) => boolean;
  updateUser: (updates: Partial<User>) => void;
  
  // Product CRUD
  addProduct: (product: Omit<Product, 'id' | 'farmerId' | 'farmerName' | 'farmerSlug' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Cart Actions
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Order Actions
  checkout: (deliveryAddress: string) => void;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
  
  // Chat Actions
  sendMessage: (receiverId: string, text: string, productId?: string, productName?: string) => void;
  
  // Review Actions
  addReview: (review: Omit<Review, 'id' | 'buyerId' | 'buyerName' | 'createdAt'>) => void;
  
  // Admin Actions
  verifyFarmer: (farmerId: string, verify: boolean) => void;
  deleteUser: (userId: string) => void;
  
  // System Switcher (For demo)
  switchUserRole: (role: 'farmer' | 'buyer' | 'admin') => void;
}

const DEFAULT_USERS: User[] = [
  {
    id: 'f1',
    name: 'Adebayo Farms',
    email: 'adebayo@farms.com',
    phone: '+234 803 123 4567',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop',
    storeName: 'Adebayo Organic Foods',
    storeSlug: 'adebayo-organic-foods',
    location: 'Oyo State, Nigeria',
    bio: 'Freshly harvested organic crops straight from our family farm. We specialize in tubers, fresh vegetables, and organic grains.',
    bannerUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop',
    logoUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=150&auto=format&fit=crop',
    isVerified: true
  },
  {
    id: 'f2',
    name: 'Chioma Poultry',
    email: 'chioma@poultry.com',
    phone: '+234 812 987 6543',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop',
    storeName: 'Chioma Fresh Poultry & Eggs',
    storeSlug: 'chioma-poultry',
    location: 'Enugu State, Nigeria',
    bio: 'Premium quality livestock, broilers, layers, and farm fresh crates of eggs delivered daily to households and businesses.',
    bannerUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&auto=format&fit=crop',
    logoUrl: 'https://images.unsplash.com/photo-1604848698030-c434ba086c9c?w=150&auto=format&fit=crop',
    isVerified: true
  },
  {
    id: 'b1',
    name: 'John Doe',
    email: 'john@buyer.com',
    phone: '+234 905 555 1234',
    role: 'buyer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop',
    location: 'Lagos, Nigeria'
  },
  {
    id: 'a1',
    name: 'Admin Master',
    email: 'admin@agmarket.com',
    phone: '+234 701 000 9999',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop'
  }
];

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'p1',
    farmerId: 'f1',
    farmerName: 'Adebayo Organic Foods',
    farmerSlug: 'adebayo-organic-foods',
    name: 'Premium Parboiled Rice',
    category: 'Grains',
    description: 'High-quality local parboiled rice, stone-free and nutritious. Excellent for all rice delicacies and bulk storage.',
    price: 32000,
    quantity: 150,
    unit: '50kg Bag',
    location: 'Oyo State, Nigeria',
    status: 'published',
    images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop'],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'p2',
    farmerId: 'f1',
    farmerName: 'Adebayo Organic Foods',
    farmerSlug: 'adebayo-organic-foods',
    name: 'Fresh Vine Tomatoes',
    category: 'Vegetables',
    description: 'Juicy, plump red tomatoes harvested this morning. Zero chemical preservatives. Packaged in local baskets.',
    price: 8500,
    quantity: 45,
    unit: 'Large Basket',
    location: 'Oyo State, Nigeria',
    status: 'published',
    images: ['https://images.unsplash.com/photo-1595855759920-86582396756a?w=600&auto=format&fit=crop'],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'p3',
    farmerId: 'f2',
    farmerName: 'Chioma Fresh Poultry & Eggs',
    farmerSlug: 'chioma-poultry',
    name: 'Golden Yolk Farm Eggs',
    category: 'Livestock & Poultry',
    description: 'Fresh organic farm eggs with large, golden yolks. Rich in protein, collected daily from healthy layers.',
    price: 4200,
    quantity: 80,
    unit: 'Crate (30 Eggs)',
    location: 'Enugu State, Nigeria',
    status: 'published',
    images: ['https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?w=600&auto=format&fit=crop'],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'p4',
    farmerId: 'f2',
    farmerName: 'Chioma Fresh Poultry & Eggs',
    farmerSlug: 'chioma-poultry',
    name: 'Live Broiler Chicken',
    category: 'Livestock & Poultry',
    description: 'Big, healthy farm-raised broilers. Average weight 2.5kg - 3.0kg. Cleaned and dressed option available on request.',
    price: 7500,
    quantity: 35,
    unit: 'Bird',
    location: 'Enugu State, Nigeria',
    status: 'published',
    images: ['https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&auto=format&fit=crop'],
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'p5',
    farmerId: 'f1',
    farmerName: 'Adebayo Organic Foods',
    farmerSlug: 'adebayo-organic-foods',
    name: 'Sweet White Yam',
    category: 'Roots & Tubers',
    description: 'Dry, sweet white yams from the heart of Abuja/Oyo yam farms. Perfect for boiling, frying, or pounding.',
    price: 1800,
    quantity: 200,
    unit: 'Tubers (Medium)',
    location: 'Oyo State, Nigeria',
    status: 'published',
    images: ['https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=600&auto=format&fit=crop'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'p6',
    farmerId: 'f1',
    farmerName: 'Adebayo Organic Foods',
    farmerSlug: 'adebayo-organic-foods',
    name: 'Organic Hass Avocado',
    category: 'Fruits',
    description: 'Creamy, rich Hass avocados. Handpicked at peak maturity. Sold in batches of 6 pieces.',
    price: 2500,
    quantity: 30,
    unit: 'Pack of 6',
    location: 'Oyo State, Nigeria',
    status: 'published',
    images: ['https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const DEFAULT_ORDERS: Order[] = [
  {
    id: 'o1',
    buyerId: 'b1',
    buyerName: 'John Doe',
    buyerPhone: '+234 905 555 1234',
    farmerId: 'f1',
    farmerName: 'Adebayo Organic Foods',
    items: [
      {
        id: 'oi1',
        productId: 'p2',
        name: 'Fresh Vine Tomatoes',
        price: 8500,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=600&auto=format&fit=crop',
        unit: 'Large Basket'
      },
      {
        id: 'oi2',
        productId: 'p5',
        name: 'Sweet White Yam',
        price: 1800,
        quantity: 5,
        image: 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=600&auto=format&fit=crop',
        unit: 'Tubers (Medium)'
      }
    ],
    totalAmount: 26000,
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    deliveryAddress: 'Block B, Flat 3, Ikoyi Heights, Ikoyi, Lagos',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'o2',
    buyerId: 'b1',
    buyerName: 'John Doe',
    buyerPhone: '+234 905 555 1234',
    farmerId: 'f2',
    farmerName: 'Chioma Fresh Poultry & Eggs',
    items: [
      {
        id: 'oi3',
        productId: 'p3',
        name: 'Golden Yolk Farm Eggs',
        price: 4200,
        quantity: 3,
        image: 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?w=600&auto=format&fit=crop',
        unit: 'Crate (30 Eggs)'
      }
    ],
    totalAmount: 12600,
    paymentStatus: 'paid',
    orderStatus: 'processing',
    deliveryAddress: 'Block B, Flat 3, Ikoyi Heights, Ikoyi, Lagos',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const DEFAULT_MESSAGES: Message[] = [
  {
    id: 'm1',
    senderId: 'b1',
    senderName: 'John Doe',
    receiverId: 'f1',
    text: 'Hello Adebayo Farms, are the sweet yams dry enough for immediate pounding?',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    productId: 'p5',
    productName: 'Sweet White Yam'
  },
  {
    id: 'm2',
    senderId: 'f1',
    senderName: 'Adebayo Organic Foods',
    receiverId: 'b1',
    text: 'Yes John, they are very dry and perfect for pounding. We harvested them 3 weeks ago.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000).toISOString(),
    productId: 'p5',
    productName: 'Sweet White Yam'
  },
  {
    id: 'm3',
    senderId: 'b1',
    senderName: 'John Doe',
    receiverId: 'f2',
    text: 'Do you offer bulk discount on live chickens? I want to buy 10 birds.',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    productId: 'p4',
    productName: 'Live Broiler Chicken'
  }
];

const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'r1',
    buyerId: 'b1',
    buyerName: 'John Doe',
    farmerId: 'f1',
    productId: 'p2',
    rating: 5,
    comment: 'Extremely fresh tomatoes. They lasted over two weeks in my fridge. Excellent packaging too!',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'r2',
    buyerId: 'b1',
    buyerName: 'John Doe',
    farmerId: 'f1',
    productId: 'p5',
    rating: 4,
    comment: 'Yams were sweet and pounded perfectly. A bit smaller than expected but quality is top-notch.',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 2 * 60 * 1000).toISOString()
  }
];

// Helper to check for client-side environment
const getInitialState = () => {
  if (typeof window === 'undefined') {
    return {
      currentUser: DEFAULT_USERS[2], // John Doe (Buyer) by default for demo
      users: DEFAULT_USERS,
      products: DEFAULT_PRODUCTS,
      cart: [],
      orders: DEFAULT_ORDERS,
      messages: DEFAULT_MESSAGES,
      reviews: DEFAULT_REVIEWS
    };
  }
  
  const saved = localStorage.getItem('agmarket_state');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Error parsing saved state, using defaults", e);
    }
  }
  
  return {
    currentUser: DEFAULT_USERS[2], // Default to John Doe
    users: DEFAULT_USERS,
    products: DEFAULT_PRODUCTS,
    cart: [],
    orders: DEFAULT_ORDERS,
    messages: DEFAULT_MESSAGES,
    reviews: DEFAULT_REVIEWS
  };
};

const saveState = (state: Partial<AppState>) => {
  if (typeof window !== 'undefined') {
    const serializeState = {
      currentUser: state.currentUser,
      users: state.users,
      products: state.products,
      cart: state.cart,
      orders: state.orders,
      messages: state.messages,
      reviews: state.reviews
    };
    localStorage.setItem('agmarket_state', JSON.stringify(serializeState));
  }
};

export const useAppStore = create<AppState>((set, get) => ({
  ...getInitialState(),

  login: (email, role) => {
    const { users } = get();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
    if (found) {
      set({ currentUser: found });
      saveState(get());
      return true;
    }
    return false;
  },

  logout: () => {
    set({ currentUser: null, cart: [] });
    saveState(get());
  },

  register: (userData) => {
    const { users } = get();
    if (users.find(u => u.email.toLowerCase() === userData.email?.toLowerCase())) {
      return false; // Email already exists
    }

    const newUser: User = {
      id: `u_${Date.now()}`,
      name: userData.name || 'Anonymous User',
      email: userData.email || '',
      phone: userData.phone || '',
      role: userData.role || 'buyer',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop',
      location: userData.location || '',
      ...(userData.role === 'farmer' ? {
        storeName: userData.storeName || `${userData.name}'s Farm`,
        storeSlug: userData.storeSlug || (userData.storeName || userData.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        bio: userData.bio || 'Welcome to our farm!',
        bannerUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop',
        logoUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=150&auto=format&fit=crop',
        isVerified: false
      } : {})
    };

    set({ users: [...users, newUser], currentUser: newUser });
    saveState(get());
    return true;
  },

  updateUser: (updates) => {
    const { currentUser, users } = get();
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...updates };
    const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);
    
    // Update products farmer info if user is farmer
    let updatedProducts = get().products;
    if (currentUser.role === 'farmer') {
      updatedProducts = updatedProducts.map(p => {
        if (p.farmerId === currentUser.id) {
          return {
            ...p,
            farmerName: updatedUser.storeName || p.farmerName,
            farmerSlug: updatedUser.storeSlug || p.farmerSlug,
            location: updatedUser.location || p.location
          };
        }
        return p;
      });
    }

    set({ currentUser: updatedUser, users: updatedUsers, products: updatedProducts });
    saveState(get());
  },

  addProduct: (productData) => {
    const { currentUser, products } = get();
    if (!currentUser || currentUser.role !== 'farmer') return;

    const newProduct: Product = {
      ...productData,
      id: `p_${Date.now()}`,
      farmerId: currentUser.id,
      farmerName: currentUser.storeName || currentUser.name,
      farmerSlug: currentUser.storeSlug || '',
      createdAt: new Date().toISOString()
    };

    set({ products: [newProduct, ...products] });
    saveState(get());
  },

  updateProduct: (id, updates) => {
    const { products } = get();
    const updated = products.map(p => p.id === id ? { ...p, ...updates } : p);
    set({ products: updated });
    saveState(get());
  },

  deleteProduct: (id) => {
    const { products } = get();
    set({ products: products.filter(p => p.id !== id) });
    saveState(get());
  },

  addToCart: (product, quantity) => {
    const { cart } = get();
    const existing = cart.find(item => item.product.id === product.id);

    let updatedCart;
    if (existing) {
      updatedCart = cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...cart, { product, quantity }];
    }

    set({ cart: updatedCart });
    saveState(get());
  },

  removeFromCart: (productId) => {
    const { cart } = get();
    set({ cart: cart.filter(item => item.product.id !== productId) });
    saveState(get());
  },

  updateCartQuantity: (productId, quantity) => {
    const { cart } = get();
    if (quantity <= 0) {
      set({ cart: cart.filter(item => item.product.id !== productId) });
    } else {
      set({
        cart: cart.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      });
    }
    saveState(get());
  },

  clearCart: () => {
    set({ cart: [] });
    saveState(get());
  },

  checkout: (deliveryAddress) => {
    const { cart, currentUser, orders, products } = get();
    if (!currentUser || cart.length === 0) return;

    // Group items by farmer, because we create separate orders per farmer
    const itemsByFarmer = cart.reduce((acc, item) => {
      const fId = item.product.farmerId;
      if (!acc[fId]) acc[fId] = [];
      acc[fId].push(item);
      return acc;
    }, {} as Record<string, CartItem[]>);

    const newOrders: Order[] = Object.entries(itemsByFarmer).map(([farmerId, items]) => {
      const firstItem = items[0].product;
      const orderItems: OrderItem[] = items.map(item => ({
        id: `oi_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0],
        unit: item.product.unit
      }));

      const totalAmount = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      // Decrement product inventory quantities
      items.forEach(item => {
        const prod = products.find(p => p.id === item.product.id);
        if (prod) {
          const newQty = Math.max(0, prod.quantity - item.quantity);
          get().updateProduct(item.product.id, {
            quantity: newQty,
            status: newQty === 0 ? 'out_of_stock' : prod.status
          });
        }
      });

      return {
        id: `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 90 + 10)}`,
        buyerId: currentUser.id,
        buyerName: currentUser.name,
        buyerPhone: currentUser.phone,
        farmerId: farmerId,
        farmerName: firstItem.farmerName,
        items: orderItems,
        totalAmount,
        paymentStatus: 'paid', // Simulate pre-paid checkout
        orderStatus: 'pending',
        deliveryAddress,
        createdAt: new Date().toISOString()
      };
    });

    set({ orders: [...newOrders, ...orders], cart: [] });
    saveState(get());
  },

  updateOrderStatus: (orderId, status) => {
    const { orders } = get();
    set({
      orders: orders.map(o => o.id === orderId ? { ...o, orderStatus: status } : o)
    });
    saveState(get());
  },

  sendMessage: (receiverId, text, productId, productName) => {
    const { currentUser, messages, users } = get();
    if (!currentUser) return;

    const receiver = users.find(u => u.id === receiverId);
    const receiverName = receiver ? (receiver.role === 'farmer' ? receiver.storeName || receiver.name : receiver.name) : 'User';

    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.role === 'farmer' ? currentUser.storeName || currentUser.name : currentUser.name,
      receiverId,
      text,
      createdAt: new Date().toISOString(),
      productId,
      productName
    };

    set({ messages: [...messages, newMsg] });
    saveState(get());

    // Auto-respond if messaging a farmer for high-fidelity interactive simulation
    if (currentUser.role === 'buyer' && receiver?.role === 'farmer') {
      setTimeout(() => {
        const { messages: currentMessages } = get();
        const autoResponses = [
          "Thank you for contacting us! Yes, it is available. We harvest fresh and deliver fast. When would you like it delivered?",
          "Hello! Thanks for checking our store. We have plenty in stock. We can ship this out by tomorrow morning.",
          "Hi there! Yes, the pricing is fixed, but for bulk orders above 5 units, we can offer a 5% discount. Send us an offer!",
          "Yes, we deliver to your location. Delivery fees are calculated based on distance. Let me check the rate."
        ];
        const randomResponse = autoResponses[Math.floor(Math.random() * autoResponses.length)];
        
        const autoMsg: Message = {
          id: `msg_${Date.now() + 1}`,
          senderId: receiverId,
          senderName: receiverName,
          receiverId: currentUser.id,
          text: randomResponse,
          createdAt: new Date().toISOString(),
          productId,
          productName
        };
        
        set({ messages: [...currentMessages, autoMsg] });
        saveState(get());
      }, 2000);
    }
  },

  addReview: (reviewData) => {
    const { currentUser, reviews } = get();
    if (!currentUser) return;

    const newReview: Review = {
      ...reviewData,
      id: `r_${Date.now()}`,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      createdAt: new Date().toISOString()
    };

    set({ reviews: [newReview, ...reviews] });
    saveState(get());
  },

  verifyFarmer: (farmerId, verify) => {
    const { users } = get();
    const updatedUsers = users.map(u => {
      if (u.id === farmerId) {
        return { ...u, isVerified: verify };
      }
      return u;
    });

    // Update active user state if the verified farmer is logged in
    const { currentUser } = get();
    const updatedCurrentUser = currentUser && currentUser.id === farmerId
      ? { ...currentUser, isVerified: verify }
      : currentUser;

    set({ users: updatedUsers, currentUser: updatedCurrentUser });
    saveState(get());
  },

  deleteUser: (userId) => {
    const { users } = get();
    set({ users: users.filter(u => u.id !== userId) });
    saveState(get());
  },

  switchUserRole: (role) => {
    const { users } = get();
    let found = users.find(u => u.role === role);
    if (!found) {
      // Create user if not exists
      if (role === 'farmer') found = DEFAULT_USERS[0];
      else if (role === 'buyer') found = DEFAULT_USERS[2];
      else found = DEFAULT_USERS[3];
    }
    set({ currentUser: found, cart: [] });
    saveState(get());
  }
}));
