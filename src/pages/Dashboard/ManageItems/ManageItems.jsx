import { FaDeleteLeft } from "react-icons/fa6";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
  const [menu, isLoading, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  const handleDelete = async (item) => {
    const { data } = await axiosSecure.delete(`/menu/${item._id}`);
    console.log(data);
    if (data.deletedCount > 0) {
      refetch();
      alert("delete successful");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // const handleUpdate = (item) => {};

  return (
    <div>
      <SectionTitle heading={"Manage all item"} subHeading={"harry up"} />
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item, idx) => (
                <tr key={item._id}>
                  <th>{idx + 1}</th>
                  <td>
                    <img className="w-16" src={item.image} alt="" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <Link
                      to={`/dashboard/updateItem/${item._id}`}
                      className="btn btn-sm btn-primary"
                    >
                      <FaEdit />
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn btn-sm btn-error"
                    >
                      <FaDeleteLeft />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
