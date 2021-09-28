import bcryptjs from "bcryptjs";

const data = {
  users: [
    {
      name: "Ozkan",
      email: "ozkan@gmail.com",
      password: bcryptjs.hashSync("123456", 10),
      isAdmin: true,
    },
    {
      name: "John",
      email: "john@gmail.com",
      password: bcryptjs.hashSync("123456", 10),
      isAdmin: false,
    },
  ],

  products: [
    {
      name: "Nike Slim Shirt",
      category: "Shirts",
      image:
        "https://images.pexels.com/photos/9617882/pexels-photo-9617882.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      price: 120,
      countInStock: 10,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description: "high quality product",
    },
    {
      name: "Adidas Fit Shirt",
      category: "Shirts",
      image:
        "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      price: 100,
      countInStock: 20,
      brand: "Adidas",
      rating: 4.0,
      numReviews: 10,
      description: "high quality product",
    },
    {
      name: "Lacoste Free Shirt",
      category: "Shirts",
      image:
        "https://images.pexels.com/photos/9623645/pexels-photo-9623645.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      price: 220,
      countInStock: 10,
      brand: "Lacoste",
      rating: 4.8,
      numReviews: 17,
      description: "high quality product",
    },
    {
      name: "Nike Slim Pant",
      category: "Pants",
      image:
        "https://images.pexels.com/photos/9604182/pexels-photo-9604182.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      price: 78,
      countInStock: 15,
      brand: "Nike",
      rating: 4.5,
      numReviews: 14,
      description: "high quality product",
    },
    {
      name: "Puma Slim Pant",
      category: "Pants",
      image:
        "https://images.pexels.com/photos/5303044/pexels-photo-5303044.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      price: 65,
      countInStock: 5,
      brand: "Puma",
      rating: 4.5,
      numReviews: 10,
      description: "high quality product",
    },
    {
      name: "Adidas Fit Pant",
      category: "Pants",
      image:
        "https://images.pexels.com/photos/3856257/pexels-photo-3856257.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      price: 139,
      countInStock: 12,
      brand: "Adidas",
      rating: 4.5,
      numReviews: 15,
      description: "high quality product",
    },
  ],
};

export default data;
