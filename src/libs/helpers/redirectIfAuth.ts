import { checkSessionCookie } from "@services/firebase/auth/checkSessionCookie";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

export const redirectIfAuth = async (
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
    if (context.req.cookies.token !== undefined) {
        const user = await checkSessionCookie(context.req.cookies.token);

        if (user === null) {
            return {
                props: {}, // will be passed to the page component as props
            };
        }
    }

    return {
        redirect: {
            destination: "/",
            permanent: false,
        },
        props: {}, // will be passed to the page component as props
    };
};
