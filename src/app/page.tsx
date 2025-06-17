import MainHero from "@/components/Hero/page";
import CircularMotionCarousel from "@/components/CircularMotion/page";

export default function Home() {
  return (
    <div className="flex  h-full  md:h-[742px] w-[742px] md:w-full  bg-white   "
     style={{ backgroundImage: `url("images/wallp.jpg")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center' }}
                        >
        <div className="  -mt-[7%] h-auto w-full bg-white/30  opacity-95" 
        style={{ backdropFilter: 'blur(3px)' }}
        >
                <CircularMotionCarousel />
                <MainHero />
        </div>
    </div>
  );
}
