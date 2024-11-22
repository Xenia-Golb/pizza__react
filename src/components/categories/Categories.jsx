import { useState } from "react";

function Categories() {
  const [active, setActive] = useState(0);

  const onClickCategory = (index) => {
    setActive(index);
  };
  const categories = [
    { id: 0, name: "Все" },
    { id: 1, name: "Мясные" },
    { id: 2, name: "Вегетарианская" },
    { id: 3, name: "Гриль" },
    { id: 4, name: "Острые" },
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            key={category.id}
            className={active === i ? "active" : ""}
            onClick={() => onClickCategory(i)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
