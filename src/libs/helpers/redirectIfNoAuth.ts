import { checkSessionCookie } from "@services/firebase/auth/checkSessionCookie";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

export const redirectIfNoAuth = async (
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
    if (context.req.cookies.token !== undefined) {
        const user = await checkSessionCookie(context.req.cookies.token);

        if (user === null) {
            return {
                redirect: {
                    destination: "/login",
                    permanent: false,
                },
                props: {}, // will be passed to the page component as props
            };
        }
    }

    return {
        props: {}, // will be passed to the page component as props
    };
};
