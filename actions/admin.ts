'use server';

import { db } from '@/db/config/db';
import 'dotenv/config';
import { cookies } from 'next/headers';
import { admins } from '@/db/models/schema';
import { validateAdmin } from '@/../validate/validateTypes';
import { eq } from 'drizzle-orm';
import { createHash, randomBytes } from 'node:crypto';
import jwt from 'jsonwebtoken';

// const jwtToken = (id: string) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET!, {
//     expiresIn: '1d',
//   });
// };

// export const verifyJwtToken = async () => {
//   try {
//     const cookieStore = await cookies();
//     const tokenCookie = cookieStore.get('accessToken');
//     const token = tokenCookie?.value;

//     if (!token) return null;

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);

//     if (!decoded) return { success: false };
//     return { success: true };
//   } catch (error) {
//     return null;
//   }
// // };

// const setCookies = async (token: string) => {
//   const cookieStore = await cookies();

//   cookieStore.set({
//     name: 'accessToken',
//     value: token,
//     httpOnly: true,
//     path: '/',
//     maxAge: 60 * 60 * 24,
//     secure: process.env.NODE_ENV === 'production',
//   });

//   return 'created';
// };

export async function verifyUser(emailId: string, password: string) {
  try {
    // First verify JWT token
    // const tokenVerify = await verifyJwtToken();
    // if (!tokenVerify?.success) {
    //   return { success: false, message: 'Unauthorized - Invalid token' };
    // }

    // Check if user exists in database
    const user = await db
      .select()
      .from(admins)
      .where(eq(admins.email, emailId));

    if (user.length === 0) {
      return { success: false, message: 'User not found' };
    }

    // Verify password
    const { password: hashedPassword, salt, fullName, email } = user[0];
    const inputHashedPassword = createHash('sha256')
      .update(password + salt)
      .digest('hex');

    if (inputHashedPassword !== hashedPassword) {
      return { success: false, message: 'Invalid password' };
    }

    // const token = jwtToken(user[0].id);
    // await setCookies(token);

    return {
      success: true,
      message: 'User verified successfully',
      data: { email, fullName },
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while verifying user',
    };
  }
}

export async function insertUser(
  name: string,
  emailId: string,
  userPassword: string
) {
  try {
    const { email, fullName, password } = await validateAdmin.parseAsync({
      fullName: name,
      email: emailId,
      password: userPassword,
    });

    const existingUser = await db
      .select()
      .from(admins)
      .where(eq(admins.email, email));
    if (existingUser.length > 0) {
      return { success: false, message: 'Email already exists' };
    }

    const salt = randomBytes(8).toString('hex');
    const hashedPassword = createHash('sha256')
      .update(password + salt)
      .digest('hex');

    const user = await db
      .insert(admins)
      .values({
        fullName,
        email,
        salt,
        password: hashedPassword,
      })
      .returning();

    if (!user || user.length === 0) {
      return { success: false, message: 'Failed to create user' };
    }

    // const token = jwtToken(user[0].id);
    // const cookie = await setCookies(token);

    // if (!cookie) return { success: false, message: 'Failed to create user' };

    return { success: true, message: 'User created successfully' };
  } catch (error) {
    return { success: false, message: 'An error occurred while creating user' };
  }
}
