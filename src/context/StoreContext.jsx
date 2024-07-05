
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode';

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([])

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                await axios.post(url + "/api/cart/add", { itemId }, config);
            } catch (error) {
                console.error("Error adding to cart:", error);
                // Handle error (e.g., show user a message, rollback cart change)
            }
        }
    }
    
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                await axios.post(url + "/api/cart/remove", { itemId }, config);
            } catch (error) {
                console.error("Error removing from cart:", error);
                // Handle error (e.g., show user a message, rollback cart change)
            }
        }
    }


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }

        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list");
        setFoodList (response.data.data)
    }

    const loadCartData = async (token) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.get(url + "/api/cart/get", {}, config);
            setCartItems(response.data.cartData);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle unauthorized error
                setToken("");
                localStorage.removeItem("token");
                console.log("Authentication failed. Please log in again.");
            } else {
                console.error("Error loading cart data:", error);
            }
        }
    }

    const isTokenValid = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Convert to seconds
            return decodedToken.exp > currentTime;
        } catch (error) {
            console.error("Error decoding token:", error);
            return false;
        }
    };

    useEffect(()=>{
        async function loadData() {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken && isTokenValid(storedToken)) {
              setToken(storedToken);
              await loadCartData(storedToken);
            } else {
              localStorage.removeItem("token");
              setToken("");
            }
          }
          loadData();
        },[])
        
    
    
        const contextValue = {
            food_list,
            cartItems,
            setCartItems,
            addToCart,
            removeFromCart,
            getTotalCartAmount,
            url,
            token,
            setToken
        }
        return (
            <StoreContext.Provider value={contextValue}>
                {props.children}
            </StoreContext.Provider>
        )
    }
    
    export default StoreContextProvider;
          
    /*
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if(token){
            await axios.post(url+"/api/cart/add", {itemId}, {headers:{token}})
        }
    }


    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token){
            await axios.post(url+"/api/cart/remove", {itemId}, {headers:{token}});
        }
    }
        */

       
      //  async function loadData() {
  //await fetchFoodList();
  //const storedToken = localStorage.getItem("token");
 // if (storedToken && isTokenValid(storedToken)) {
   // setToken(storedToken);
  //  await loadCartData(storedToken);
  //} else {
  //  localStorage.removeItem("token");
  //  setToken("");
 // }
//}
       

/*May inayos na code
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [foodList, setFoodList] = useState([]);

    const url = "http://localhost:4000";

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
        if (token) {
            try {
                await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
        }));
        if (token) {
            try {
                await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const itemInfo = foodList.find((food) => food._id === itemId);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[itemId];
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        };

        fetchData();
    }, []);

    const contextValue = {
        foodList,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
*/
