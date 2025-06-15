import MainHero from "@/components/Hero/page";
import CircularMotionCarousel from "@/components/CircularMotion/page";

export default function Home() {
  return (
    <div className="h-[742px] flex   "
     style={{ backgroundImage: `url("images/firstHero/hero.jpg")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center' }}
                        >
        <div className="  -mt-[7%] h-auto w-full bg-white/90 opacity-95" 
        style={{ backdropFilter: 'blur(80px)' }}>
                <CircularMotionCarousel />
                <MainHero />
        </div>
    </div>
  );
}
