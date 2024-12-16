import { matchSorter } from 'match-sorter';
import { prisma } from '@/../db';
import { Contact } from '@/models';
import sortBy from 'sort-by';

// If you want to keep the fake network delay simulation:
let fakeCache: { [key: string]: boolean } = {};
async function fakeNetwork(key?: string): Promise<void> {
  if (!key) {
    fakeCache = {};
  }
  if (key && fakeCache[key]) {
    return;
  }
  if (key) {
    fakeCache[key] = true;
    return new Promise((res) => {
      setTimeout(res, Math.random() * 800);
    });
  }
}

async function getContacts(query?: string): Promise<Contact[]> {
  await fakeNetwork(`getContacts:${query}`);

  // If you want to filter by `first` or `last` fields, you can leverage Prisma's where clause
  const contacts = await prisma.contact.findMany({
    where: query
      ? {
          OR: [{ first: { contains: query } }, { last: { contains: query } }],
        }
      : {},
    orderBy: [{ last: 'asc' }, { createdAt: 'asc' }],
  });

  // If you still need matchSorter (for fuzzy matching), you could do:
  const filtered = query
    ? matchSorter(contacts, query, { keys: ['first', 'last'] })
    : contacts;
  return filtered.sort(sortBy('last', 'createdAt'));

  // return contacts;
}

async function createContact(): Promise<Contact> {
  await fakeNetwork();
  // Prisma will handle ID creation automatically if using @default(cuid()) or similar
  const contact = await prisma.contact.create({
    data: {
      createdAt: new Date(),
    },
  });
  return contact;
}

async function getContact(id: string): Promise<Contact | null> {
  await fakeNetwork(`contact:${id}`);
  const contact = await prisma.contact.findUnique({
    where: { id },
  });
  return contact;
}

async function updateContact(
  id: string,
  updates: Partial<Contact>
): Promise<Contact> {
  await fakeNetwork();
  const contact = await prisma.contact.update({
    where: { id },
    data: updates,
  });
  return contact;
}

async function deleteContact(id: string): Promise<boolean> {
  await fakeNetwork(`deleteContact:${id}`);
  try {
    await prisma.contact.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    // If no contact found, Prisma will throw
    return false;
  }
}

export { getContacts, createContact, getContact, updateContact, deleteContact };
