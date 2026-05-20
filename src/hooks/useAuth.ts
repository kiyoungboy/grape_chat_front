import { useAuthStore } from "@/store/auth.store";
import { useEffect, useState } from "react";
import { getMe } from "@/services/auth/auth.service";

export const useAuth = () => {
    const [loading, setLoading] = useState(true);

    const setAuth = useAuthStore((state) => state.setAuth);

    useEffect(() => {
        const initialize = async () => {
            try{
                const me = await getMe();

                setAuth(me);
            } catch(error) {
                console.error(error);
            }finally {
                setLoading(false);
            }
        };

        initialize();
    }, [setAuth]);

    return {loading, };
};