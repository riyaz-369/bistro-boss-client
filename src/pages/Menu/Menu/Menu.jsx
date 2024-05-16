import { Helmet } from "react-helmet";
import Cover from "../../Shared/Cover/Cover";
import coverImg from "../../../assets/menu/banner3.jpg";
import desertImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
  const [menu] = useMenu();
  const deserts = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>
      {/* main cover */}
      <Cover img={coverImg} title={"our menu"} />
      <SectionTitle subHeading={"Don't Miss"} heading={"todays offer"} />
      {/* offered menu items */}
      <MenuCategory items={offered} />
      {/* desert menu items */}
      <MenuCategory items={deserts} title={"Dessert"} coverImg={desertImg} />
      <MenuCategory items={pizza} title={"Pizza"} coverImg={pizzaImg} />
      <MenuCategory items={salad} title={"Salad"} coverImg={saladImg} />
      <MenuCategory items={soup} title={"Soup"} coverImg={soupImg} />
    </div>
  );
};

export default Menu;
