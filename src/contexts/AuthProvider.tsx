import axios from "axios";
import { User } from "firebase/auth";
import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import useSWR from "swr";

interface IAuthContext {
    loading: boolean;
    user: User | null;
    error: any;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const AuthContext = createContext<IAuthContext>({
    loading: true,
    user: null,
    error: null,
});

export const AuthProvider: React.FC = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const { data, error: swrError } = useSWR("/api/auth", fetcher);

    useEffect(() => {
        if (data) {
            if (data.ok) {
                setUser(data.data);
            }
        }

        if (swrError) {
            setError(swrError);
        }

        setLoading(false);
    }, [data, swrError]);

    return (
        <AuthContext.Provider value={{ loading, user, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
