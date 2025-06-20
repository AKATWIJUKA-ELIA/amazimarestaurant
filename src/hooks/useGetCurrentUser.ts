"use client"

const useGetCurrentUser = () => {
    const CurrentUser = async () => {
      try {
              const response = await fetch('/api/currentuser', {
                method: 'GET',
                credentials: "include",
              });
              const res = await response?.json();
        if(!res.success){
        return { success: false, message:res.message, user: null };
        }
        return { success: true, message: res.message ,status: res.status, user: res.user };
                } catch (error) {
                        return { success: false, status: 500, message: `Internal Server Error ${error}` };
                }
    };

  return {CurrentUser };
};

export default useGetCurrentUser;