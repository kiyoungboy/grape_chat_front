import AppRouter from "@/routes/AppRouter";
import { useEffect } from "react";
import { getMe } from "./services/auth/auth.service";


function App() {

    useEffect(() => {

        const initialize = async () => {

            try {

                const me = await getMe();

                console.log(me);

            } catch {

                /*
                 * 로그인 안 되어 있으면
                 * 로그인 프로젝트로 이동
                 */
                window.location.href =
                    import.meta.env.VITE_AUTH_LOGIN_URL;
            }
        };

        initialize();

    }, []);

  return <AppRouter />;
}

export default App;