function Categories({ value, onChangeCategory }) {
  const categories = [
    { id: 0, name: "Все" },
    { id: 1, name: "Мясные" },
    { id: 2, name: "Вегетарианская" },
    { id: 3, name: "Гриль" },
    { id: 4, name: "Острые" },
    { id: 5, name: "Детские" },
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            key={category.id}
            className={value === i ? "active" : ""}
            onClick={() => onChangeCategory(i)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
