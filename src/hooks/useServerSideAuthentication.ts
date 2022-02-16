import { getAPIAuthUser } from "@services/api";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

const useServerSideAuthentication = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // TODO: Make a SWR
    useEffect(() => {
        (async () => {
            const res = await getAPIAuthUser();
            if (res.ok) {
                setUser(res.data);
            }
            setLoading(false);
        })();
    }, []);

    return { user, loading };
};

export default useServerSideAuthentication;
