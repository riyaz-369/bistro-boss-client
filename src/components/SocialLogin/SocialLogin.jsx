import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosCommon = useAxiosCommon();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      // console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      const { data } = await axiosCommon.post("/users", userInfo);
      console.log(data);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="divider"></div>
      <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">
        {" "}
        Google
        <FaGoogle />
      </button>
    </div>
  );
};

export default SocialLogin;
