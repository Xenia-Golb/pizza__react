import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function FullPizza() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState();
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://6740b1c4d0b59228b7f10754.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        console.log("error fetchPizza");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);
  if (!pizza) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <img src={pizza.imgUrl} alt="pizza-photo" />
      <h3>{pizza.title}</h3>
      <h4>{pizza.price}</h4>
    </div>
  );
}

export default FullPizza;
