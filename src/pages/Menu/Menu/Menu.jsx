import { Helmet } from "react-helmet";
import Cover from "../../Shared/Cover/Cover";
import img from "../../../assets/menu/banner3.jpg";
import PopulerMenu from "../../Home/PopulerMenu/PopulerMenu";

const Menu = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>
      <Cover img={img} title={"our menu"} />
      <PopulerMenu />
      <Cover img={img} title={"our menu"} />
      <PopulerMenu />
      <Cover img={img} title={"our menu"} />
      <PopulerMenu />
    </div>
  );
};

export default Menu;
