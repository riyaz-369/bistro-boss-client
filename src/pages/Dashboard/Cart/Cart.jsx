import { FaDeleteLeft } from "react-icons/fa6";
import useCart from "../../../hooks/useCart";
import { FaEdit } from "react-icons/fa";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = useCart();
  const axiosCommon = useAxiosCommon();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleDelete = async (id) => {
    try {
      const { data } = await axiosCommon.delete(`/carts/${id}`);
      if (data.deletedCount > 0) {
        alert("success");
        refetch();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-evenly">
        <h2 className="text-4xl">Items: {cart.length}</h2>
        <h2 className="text-4xl">Total Price: {totalPrice}</h2>
        {cart.length ? (
          <Link to="/dashboard/payment">
            <button className="btn btn-primary">Pay</button>
          </Link>
        ) : (
          <button disabled className="btn btn-primary">
            Pay
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={item._id}>
                <th>{idx + 1}</th>
                <td>
                  <img className="w-20 rounded-md" src={item.image} alt="" />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-sm btn-error"
                  >
                    <FaDeleteLeft />
                  </button>
                  <button
                    // onClick={() => handleUpdate(item._id)}
                    className="btn btn-sm btn-primary"
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
