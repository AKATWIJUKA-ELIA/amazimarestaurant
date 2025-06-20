"use client"

const useAuthenticate = () => {
    const Authenticate = async (email: string | "",password:string) => {
      try {
              const response = await fetch('/api/authenticate', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              const res = await response?.json();
        if(!res.success){
        return { success: false, message:res.message };
        }
        return { success: true, status: res.status, message: res.message };
                } catch (error) {
                        return { success: false, status: 500, message: `Internal Server Error ${error}` };
                }
    };

  return {Authenticate };
};

export default useAuthenticate;