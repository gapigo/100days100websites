import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      //   credentials: {
      //     email: { label: 'Email', type: 'email', placeholder: 'me' },
      //     password: { label: 'Password', type: 'password' },
      //   },
      credentials: {},
      authorize(credentials, req) {
        // return {};
        // throw new Error();
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (email !== 'john@gmail.com' && password !== '1234') {
          //   return null;
          throw new Error('invalid credentials');
        }

        return { id: '1234', name: 'John Doe', email: 'john@gmail.com' };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    // error: '/auth/error',
    // signOut: '/auth/signout',
  },
};

export default NextAuth(authOptions);
