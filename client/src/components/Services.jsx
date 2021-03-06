import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const ServicesCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h1 className="text-white mt-2 text-lg">{title}</h1>
      <p className="text-white text-sm mt-2 md:w-9/12">{subtitle}</p>
    </div>
  </div>
);

const Services = () => {
  return (
    <div className="flex flex-col md:flex-row lg:flex-row w-full justify-center items-center gradient-bg-services">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
            Services that we <br /> continue to improve
          </h1>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-start items-center">
        <ServicesCard
          color="bg-[#2952E3]"
          title="Security Guaranteed"
          subtitle="Security is guaranteed. we alway main privacy & main quality of our products."
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
        />

        <ServicesCard
          color="bg-[#8945F8]"
          title="Best exhcange rate"
          subtitle="Security is guaranteed. we alway main privacy & main quality of our products."
          icon={<BiSearchAlt fontSize={21} className="text-white" />}
        />

        <ServicesCard
          color="bg-[#F84550]"
          title="Fastest transactions."
          subtitle="Security is guaranteed. we alway main privacy & main quality of our products."
          icon={<RiHeart2Fill fontSize={21} className="text-white" />}
        />
      </div>
    </div>
  );
};

export default Services;
