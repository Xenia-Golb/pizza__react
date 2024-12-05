import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./FullPizza.scss";

interface Pizza {
  imageUrl: string;
  title: string;
  price: number;
}

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<Pizza | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    async function fetchPizza() {
      try {
        const { data } = await axios.get<Pizza>(
          `https://6740b1c4d0b59228b7f10754.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы!");
        navigate("/");
      }
    }

    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return (
      <div className="loader">
        <div className="spinner"></div>
        <div className="loading-text">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="container-full-pizza ">
      <img src={pizza.imageUrl} alt={pizza.title} /> <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
