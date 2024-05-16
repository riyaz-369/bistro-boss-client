const FoodCard = ({ item }) => {
  const { image, price, recipe, name } = item;
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={image} />
      </figure>
      <p className="bg-slate-900 text-white absolute right-0 mr-4 mt-4 py-2 px-4">
        ${price}
      </p>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-warning w-full">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
