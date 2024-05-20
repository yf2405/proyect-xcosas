/* @ts-nocheck */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// Define the credentials interface
interface Credentials {
  email: string;
  password: string;
}

// Define the auth options
const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials: Credentials | undefined) {
        if (!credentials) throw new Error('No credentials provided');

        const userFound = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!userFound) throw new Error('No user found');

        const matchPassword = await bcrypt.compare(credentials.password, userFound.password);

        if (!matchPassword) throw new Error('Wrong password');

        return {
          id: userFound.id.toString(),
          name: userFound.username,
          email: userFound.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};

// Export the NextAuth handler as the default export
export default NextAuth(authOptions);