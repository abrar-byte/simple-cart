import { toast } from 'react-toastify';
const initialState = {
  cart: [
    {
      id: 1,
      image: "red-shirt.png",
      name: "Red Shirt",
      type:"shirt",
      color:"red",
      size:"M",
      price: 50000,
      quantity:1
    },
    {
      id: 2,
      image: "black-shirt.png",
      name: "Black Shirt",
      type:"shirt",
      color:"black",
      size:"L",
      price: 40000,
      quantity:1

    },
  ],
  shipping:0,
  vat:0,
  discount:10000,
  wishlist:[]
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      let tempcart = state.cart.filter((item) => item.id === action.payload.id);
      if (tempcart.length < 1) {
        return {
          ...state,
          cart: [...state.cart, action.payload],
          toast: toast.success("Product Added successfully!", {
                theme: "colored",      
                hideProgressBar: true,  
                autoClose: 3000,
              })
        };
      } else {
        return {...state,
          toast: toast.error("Product has been added previously", {
                  theme: "colored",      
                  hideProgressBar: true,  
                  autoClose: 3000,
                })
        
        };
      }
    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id)
      };
    case "INCREASE":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        })
      };
    case "DECREASE":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
      };
      case "ADD_TO_WISHLIST":
        const tempwishlist = state.wishlist.filter((item) => item.id === action.payload.id);
        if (tempwishlist.length < 1) {
          return {
            ...state,
            wishlist: [...state.wishlist, action.payload]
          };
        } else {
          return {
            ...state,
            wishlist: state.wishlist.filter((item) => item.id !== action.payload.id)
          };
        }
    default:
      return state;
  }
};

export default Reducer;
