'use server';

import { db } from '@/db/config/db';
import { admins } from '@/db/models/schema';
import { validateAdmin } from '../validate/validateTypes';
import { eq } from 'drizzle-orm';
import { createHash, randomBytes } from 'node:crypto';

async function InsertUser(name: string, emailId: string, userPassword: string) {
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

    const salt = randomBytes(16).toString('hex');
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

    if (!user) {
      return { success: false, message: 'Failed to create user' };
    }

    return { success: true, message: 'User created successfully' };
  } catch (error) {
    return { success: false, message: 'An error occurred while creating user' };
  }
}
