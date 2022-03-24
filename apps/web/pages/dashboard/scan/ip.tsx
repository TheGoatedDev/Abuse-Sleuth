import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { isV4Format, isV6Format } from "ip";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";

import { ScanSingleIP } from "@components/forms/ScanSingleIP";

export default function CheckIP() {
    return <ScanSingleIP />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
