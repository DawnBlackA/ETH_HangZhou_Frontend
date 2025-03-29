import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';

const handler = NextAuth({
    session: { strategy: 'jwt' },
    providers: [
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID as string,
            clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
            httpOptions: {
                timeout: 60000,
              },
            version: '2.0', // 重要
            authorization: {
                params: {
                    scope: 'tweet.read users.read follows.read offline.access', // 访问权限
                },
            },
            profile(profile) { // 这一步是为了拿到twitter更详细的用户信息，否则下面的session只能取到name，而取不到username
                return {
                    id: profile.data.id,
                    name: profile.data.name,
                    screen_name: profile.data.username,
                    image: profile.data.profile_image_url,
                };
            },
        }),
    ],
    cookies: {
      sessionToken: {
        name: `next-auth.session-token`,
        options: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: process.env.NODE_ENV === 'production'
        }
      },
    },
    secret: process.env.AUTH_SECRET, // 重要：根据环境区分，需要和twitter后台中的callback url保持一致
    debug: process.env.NODE_ENV !== 'production',
    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token;
                token.sub = account.providerAccountId;
            }
            if (user) {
                token.user = { ...user };
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.sub) {
                session.user.id = token.sub;
            }
            session.user = { ...token.user };
            return session;
        },
    },
});

export { handler as GET, handler as POST };

