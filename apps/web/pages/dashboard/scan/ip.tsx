import { ScanSingleIP } from "@components/forms/ScanSingleIP";
import { useAuth } from "@hooks/AuthHook";

export default function CheckIP() {
    const auth = useAuth(true);
    return <ScanSingleIP />;
}
