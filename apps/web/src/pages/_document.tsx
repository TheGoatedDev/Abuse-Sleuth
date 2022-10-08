import Document, { DocumentContext } from "next/document";

import { createStylesServer, ServerStyles } from "@abuse-sleuth/ui/shared";

const stylesServer = createStylesServer();

export default class _Document extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            styles: (
                <>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..700&display=optional"
                        rel="stylesheet"
                    />
                    {initialProps.styles}
                    <ServerStyles
                        html={initialProps.html}
                        server={stylesServer}
                        key="styles"
                    />
                </>
            ),
        };
    }
}
