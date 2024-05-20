import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
  const { image, price, recipe, name, _id } = item;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosCommon = useAxiosCommon();
  const [, refetch] = useCart();

  const handleAddToCart = async (food) => {
    if (user && user?.email) {
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };

      try {
        const { data } = await axiosCommon.post("/carts", cartItem);
        if (data.insertedId) alert(`${name} added to cart`);
        refetch();
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("Please login");
      navigate("/login", { state: { from: location } });
    }
  };

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
          <button
            onClick={() => handleAddToCart(item)}
            className="btn btn-warning w-full"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
