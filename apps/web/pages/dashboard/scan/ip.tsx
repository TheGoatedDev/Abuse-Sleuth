import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { isV4Format, isV6Format } from "ip";
import { GetServerSideProps } from "next";
import { useState } from "react";

import { ScanSingleIP } from "@components/forms/ScanSingleIP";
import { getSession } from "@libs/auth/authServerHelpers";

export default function CheckIP() {
    return <ScanSingleIP />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context.req, context.res);

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