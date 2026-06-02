'use server';

import { db } from '@/db/config/db';
import { validateContact } from '@/../validate/validateTypes';
import { contacts } from '@/db/models/schema';

export async function InsertContact(
  name: string,
  emailId: string,
  phone: string,
  userMessage: string
) {
  try {
    const { fullName, email, phoneNo, message } =
      await validateContact.parseAsync({
        fullName: name,
        email: emailId,
        phoneNo: phone,
        message: userMessage,
      });

    const contact = await db
      .insert(contacts)
      .values({
        fullName,
        email,
        phoneNo,
        message,
      })
      .returning();

    if (!contact) {
      return { success: false, message: 'Failed to save contact information' };
    }

    return { success: true, message: 'Contact information saved successfully' };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while saving contact information',
    };
  }
}

// GET contacts details
export async function GetContacts() {
  try {
    const contactList = await db.select().from(contacts);

    if (!contactList || contactList.length === 0) {
      return {
        success: false,
        message: 'No contact information found',
        data: null,
      };
    }

    // const { fullName, email, phoneNo, message } = contactList;
    return {
      success: true,
      message: 'Contact information fetched successfully',
      data: contactList,
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while fetching contact information',
      data: null,
    };
  }
}
