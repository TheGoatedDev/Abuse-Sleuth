import auth0 from "@abuse-sleuth/authentication/nextjs";
import { prisma } from "@abuse-sleuth/prisma";



export default auth0.handleAuth({
    async login(req, res) {
        try {
            await auth0.handleLogin(req, res);
          } catch (error: any) {
            res.status(error.status || 400).end(error.message);
          }
    },
    async callback(req, res, options) {
        try {
            
            await auth0.handleCallback(req, res, {
                afterCallback: async (req, res, session, state) => {
                    const user = await prisma.user.findUnique({
                        where: {
                            sub: session.user.sub
                        }
                    })
                    if (!user) {
                        console.log("User not found, creating new user")
                        await prisma.user.create({
                            data: {
                                sub: session.user.sub,
                            }
                        })
                    }
                    return session;
                }
            });
          } catch (error: any) {
            res.status(error.status || 400).end(error.message);
          }
    }
})