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
    return await createContact();
  }
);

export const getContactsFn = createServerFn({ method: 'GET' })
  .validator((query?: string) => query)
  .handler(async () => {
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
  first: z.string().nullable(),
  last: z.string().nullable(),
  favorite: z.boolean().nullable(),
  avatar: z.string().nullable(),
  twitter: z.string().nullable(),
  notes: z.string().nullable(),
});

// TODO: Fix validation bug
export const updateContactFn = createServerFn({ method: 'POST' })
  .validator((contact: unknown) => {
    return UpdateContactType.parse(contact);
  })
  .handler(async ({ data }) => {
    const contact = await updateContact(data.id, data);
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
