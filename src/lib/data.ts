
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isFeatured?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "coffee",
    name: "Coffee",
    description: "Our signature espresso-based creations"
  },
  {
    id: "tea",
    name: "Tea",
    description: "Premium loose leaf teas"
  },
  {
    id: "pastry",
    name: "Pastries",
    description: "Freshly baked goods"
  },
  {
    id: "dessert",
    name: "Desserts",
    description: "Sweet treats to brighten your day"
  }
];

export const menuItems: MenuItem[] = [
  {
    id: "item1",
    name: "Signature Latte",
    description: "Our house specialty with perfectly balanced espresso and silky steamed milk",
    price: 5.50,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isFeatured: true
  },
  {
    id: "item2",
    name: "Cappuccino",
    description: "Equal parts espresso, steamed milk, and milk foam",
    price: 4.75,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isFeatured: true
  },
  {
    id: "item3",
    name: "Pour Over",
    description: "Hand-poured coffee highlighting the unique characteristics of our single-origin beans",
    price: 5.25,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "item4",
    name: "Matcha Latte",
    description: "Premium Japanese matcha whisked with steamed milk",
    price: 5.75,
    category: "tea",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isFeatured: true
  },
  {
    id: "item5",
    name: "Earl Grey Tea",
    description: "Classic black tea infused with bergamot essence",
    price: 4.50,
    category: "tea",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "item6",
    name: "Almond Croissant",
    description: "Buttery, flaky croissant filled with rich almond cream",
    price: 4.75,
    category: "pastry",
    image: "https://images.unsplash.com/photo-1623334044303-241021148842?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isFeatured: true
  },
  {
    id: "item7",
    name: "Pain au Chocolat",
    description: "Chocolate-filled French pastry made with laminated dough",
    price: 4.50,
    category: "pastry",
    image: "https://images.unsplash.com/photo-1623334044264-30a929e13942?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "item8",
    name: "Tiramisu",
    description: "Italian dessert made with espresso-dipped ladyfingers and mascarpone cream",
    price: 6.50,
    category: "dessert",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isFeatured: true
  }
];

export const getFeaturedItems = (): MenuItem[] => {
  return menuItems.filter(item => item.isFeatured);
};

export const getItemsByCategory = (categoryId: string): MenuItem[] => {
  return menuItems.filter(item => item.category === categoryId);
};

export const getItemById = (id: string): MenuItem | undefined => {
  return menuItems.find(item => item.id === id);
};
