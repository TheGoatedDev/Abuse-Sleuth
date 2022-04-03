import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { isV4Format, isV6Format } from "ip";
import { GetServerSideProps } from "next";
import { useState } from "react";

import { ScanSingleIP } from "@components/forms/ScanSingleIP";
import { useAuth } from "@hooks/AuthHook";
import { getSession } from "@libs/auth/authServerHelpers";

export default function CheckIP() {
    const auth = useAuth(true);
    return <ScanSingleIP />;
}
