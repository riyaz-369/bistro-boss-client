import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import useAllUsers from "../../../hooks/useAllUsers";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, refetch] = useAllUsers();

  const handleDeleteUser = async (user) => {
    const { data } = await axiosSecure.delete(`/users/${user?._id}`);
    if (data.deletedCount > 0) {
      alert("Delete success");
      refetch();
    }
  };

  const handleMakeAdmin = async (user) => {
    const { data } = await axiosSecure.patch(`/users/admin/${user?._id}`);
    console.log(data);
    if (data.modifiedCount > 0) {
      alert("User an admin now");
      refetch();
    }
  };

  return (
    <div>
      <div className="flex justify-evenly">
        <h3 className="text-3xl">All users</h3>
        <h3 className="text-3xl">Total users: {users.length}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <th>{idx + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-sm btn-warning"
                    >
                      <FaUsers size={20} />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-sm btn-error"
                  >
                    <FaDeleteLeft size={20} />
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

export default AllUsers;
