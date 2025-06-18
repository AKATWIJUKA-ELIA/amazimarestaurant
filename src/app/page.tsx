import MainHero from "@/components/Hero/page";
import CircularMotionCarousel from "@/components/CircularMotion/page";

export default function Home() {
  return (
    <div className="flex  h-screen  w-full  bg-white/70   "
//      style={{ backgroundImage: `url("images/wallp.jpg")`,
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center' }}
                        >
        <div className="  w-full bg-white/30  " 
        style={{ backdropFilter: 'blur(50px)' }}
        >
                <CircularMotionCarousel />
                <MainHero />
        </div>
    </div>
  );
}
