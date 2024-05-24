import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUtensils } from "react-icons/fa";

const imgbb_hosting_key = import.meta.env.VITE_IMGBB_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imgbb_hosting_key}`;

const UpdateItem = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure();
  const item = useLoaderData();

  const { name, category, recipe, price, _id } = item;

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

      const res = await axiosSecure.patch(`/menu/${_id}`, menuItem);
      console.log(res.data);
      if (res.data.modifiedCount) {
        reset();
        alert("Item update successfully");
      }
    }
  };

  return (
    <div>
      <SectionTitle heading={"Update item"} subHeading={"Update your item"} />
      <div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="my-6 space-y-3">
            <div>
              <label className="label-text">Recipe name*</label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Recipe name"
                className="input input-bordered w-full"
                defaultValue={name}
              />
            </div>
            <div className="flex gap-3">
              <div className="w-full">
                <label className="label-text">Category*</label>
                <select
                  {...register("category", { required: true })}
                  defaultValue={category}
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
                  defaultValue={price}
                />
              </div>
            </div>
            <div className="w-full">
              <label className="label-text">Recipe Details</label>
              <textarea
                defaultValue={recipe}
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
    </div>
  );
};

export default UpdateItem;
