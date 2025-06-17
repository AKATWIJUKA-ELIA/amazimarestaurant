import { useRouter } from "next/navigation";

const useLogout = () => {
        const router = useRouter();
   const LogOut = async ()=>{
                try {
                        const response = await fetch('/api/logout', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                        });
                        if (!response.ok) {
                                 
                                throw new Error('Failed to delete session');
                        }
                        router.push("/")
                } catch (error) {
                        console.error('Error during session creation:', error);
                }
        }
        
  return () => {
    LogOut()
  };
};

export default useLogout;