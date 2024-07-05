/*import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
const{url,token} = useContext(StoreContext)
    const [data,setdata] = useState([]);

   const fetchOrders = async () => {
    const response = await axios.post(`${url}"api/order/userorders"`,{},{headers:{token}});
    setdata(response.data.data);
    console.log(response.data.data);
   }
    

    useEffect(()=>{
        if (token) {
            fetchOrders();
        }
    },[token])

  return (
    <div className='my-orders'>
     <h2>My Orders</h2>
     <div className="container">
        {data.map((order,index)=>{
            return(
                <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index)=>{
                            if (index==order.items.length-1) {
                                return item.name+ " x "+item.quantity
                            }
                            else{
                                return item.name+ " x "+item.quantity+", "
                            }
                        })}</p>
                        <p>Php{order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> <br>{order.status}</br></p>
                        <button>Track Order</button>
                </div>
            )
        })}
     </div>
    </div>
  )
}

export default MyOrders
*/
import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(`${url}/api/order/userorders`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error.response || error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token, url]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => (
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item, idx) => (
                            idx === order.items.length - 1 ? `${item.name} x ${item.quantity}` : `${item.name} x ${item.quantity}, `
                        ))}</p>
                        <p>Php {order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span><br />{order.status}</p>
                        <button>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;

