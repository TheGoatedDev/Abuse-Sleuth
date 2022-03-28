import { Email, Name } from "stytch/types/lib/shared";

type StytchUser = {
    id: string;
    emails: Email[];
    name: Name;
};
