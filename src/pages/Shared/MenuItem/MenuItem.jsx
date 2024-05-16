const MenuItem = ({ item }) => {
  const { image, price, recipe, name } = item;
  return (
    <div className="flex space-x-4 mb-12">
      <img
        className="w-[120px] rounded-t-none rounded-r-[200px] rounded-b-[200px] rounded-l-[200px]"
        src={image}
        alt=""
      />
      <div>
        <h3 className="uppercase ">{name}------------</h3>
        <p>{recipe}</p>
        <p className="text-[#BB8506]">${price}</p>
      </div>
    </div>
  );
};

export default MenuItem;
