import LayoutStandard from "@components/layouts/LayoutStandard";
import { Center } from "@mantine/core";
import { supabaseAdmin } from "@services/supabase/supabaseAdmin";
import { supabaseClient } from "@services/supabase/supabaseClient";
import { User } from "@supabase/supabase-js";
import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";

const Profile: NextPage = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const user = supabaseClient.auth.user();
        if (user) {
            setUser(user);
        }
    }, []);

    return (
        <LayoutStandard>
            <Center>{JSON.stringify(user, null, 2)}</Center>
        </LayoutStandard>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { user } = await supabaseAdmin.auth.api.getUserByCookie(context.req);

    if (!user) {
        return {
            props: {},
            redirect: {
                destination: "/login",
            },
        };
    }

    return {
        props: {},
    };
};

export default Profile;
