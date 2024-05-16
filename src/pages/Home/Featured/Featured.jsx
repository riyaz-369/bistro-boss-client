import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featured from "../../../assets/home/featured.jpg";
import "./Fetured.css";

const Featured = () => {
  return (
    <section className="featured-item bg-fixed">
      <div className="hero-overlay bg-opacity-60 p-6 text-white">
        <SectionTitle
          subHeading={"---Check it out---"}
          heading={"Featured Item"}
        />
        <div className="md:flex justify-center items-center gap-8 py-8 max-w-7xl mx-auto">
          <div>
            <img className="w-[648px]" src={featured} alt="" />
          </div>
          <div className="space-y-2">
            <p className="">Aug 20, 2024</p>
            <p className="uppercase">Where can i get some</p>
            <p className="text-sm">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Necessitatibus esse eum, voluptatibus eius molestias velit
              repellendus est. Blanditiis magnam, non tempora tenetur officia
              earum, sint sed, adipisci culpa quia porro!
            </p>
            <button className="btn btn-outline text-white border-0 border-b-4">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
