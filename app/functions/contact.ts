import {
  createContact,
  deleteContact,
  getContact,
  getContacts,
  updateContact,
} from '@/services/contacts';
import { createServerFn } from '@tanstack/start';
import { z } from 'zod';

export const createContactFn = createServerFn({ method: 'POST' }).handler(
  async () => {
    console.log('createContactFn');
    return await createContact();
  }
);

export const getContactsFn = createServerFn().handler(async () => {
  const contacts = await getContacts();
  return contacts;
});

export const getContactFn = createServerFn({ method: 'GET' })
  .validator((data: string) => data)
  .handler(async ({ data }) => {
    const contact = await getContact(data);
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  });

const UpdateContactType = z.object({
  id: z.string(),
  contact: z.object({
    first: z.string().optional(),
    last: z.string().optional(),
    favorite: z.boolean().optional(),
    avatar: z.string().optional(),
    twitter: z.string().optional(),
    notes: z.string().optional(),
  }),
});

export const updateContactFn = createServerFn({ method: 'POST' })
  .validator((contact: unknown) => {
    return UpdateContactType.parse(contact);
  })
  .handler(async ({ data }) => {
    const contact = await updateContact(data.id, data.contact);
    return contact;
  });

export const deleteContactFn = createServerFn({ method: 'POST' })
  .validator((data: string) => data)
  .handler(async ({ data }) => {
    const success = await deleteContact(data);
    if (!success) {
      throw new Error('Contact not found');
    }
    return success;
  });

export default {
  createContactFn,
  getContactsFn,
  getContactFn,
  updateContactFn,
  deleteContactFn,
};
