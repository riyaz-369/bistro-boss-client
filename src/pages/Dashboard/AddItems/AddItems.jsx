import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const imgbb_hosting_key = import.meta.env.VITE_IMGBB_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imgbb_hosting_key}`;

const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (formData) => {
    console.log(formData);
    const imgFile = { image: formData.image[0] };

    const { data } = await axiosCommon.post(image_hosting_api, imgFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (data.success) {
      // now send the menu item data to server with image url
      const menuItem = {
        name: formData.name,
        details: formData.details,
        price: parseFloat(formData.price),
        category: formData.category,
        image: data.data.display_url,
      };

      const res = await axiosSecure.post("/menu", menuItem);
      console.log(res.data);
      if (res.data.insertedId) {
        reset();
        alert("Item added successfully");
      }
    }
  };

  return (
    <div>
      <SectionTitle heading={"add an item"} subHeading={"Whats new"} />
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="my-6 space-y-3">
          <div>
            <label className="label-text">Recipe name*</label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Recipe name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex gap-3">
            <div className="w-full">
              <label className="label-text">Category*</label>
              <select
                {...register("category", { required: true })}
                className="select-bordered select w-full"
              >
                <option disabled>Select category</option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="desserts">Desserts</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>
            <div className="w-full">
              <label className="label-text">Price*</label>
              <input
                {...register("price", { required: true })}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="w-full">
            <label className="label-text">Recipe Details</label>
            <textarea
              {...register("details", { required: true })}
              type="details"
              placeholder="Recipe Details"
              className="textarea h-32 w-full border-orange-200 focus:border-orange-400"
            />
          </div>
          <div>
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>
          <button className="btn btn-warning rounded-none">
            Add Item
            <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
