import { createFileRoute, notFound } from '@tanstack/react-router';
import { z } from 'zod';

import { getContact } from '../services/contacts.ts';
import ContactDetail from '../components/ContactDetail.tsx';
import NotFoundPage from '../components/NotFoundPage.tsx';
import ErrorPage from '../components/ErrorPage.tsx';

export const Route = createFileRoute('/contacts/$contactId/')({
  component: ContactIdIndexComponent,
  notFoundComponent: () => <NotFoundPage message={"Can't find contact"} />,
  errorComponent: () => <ErrorPage message={'Network error'} />,
  params: {
    parse: (params) => {
      return {
        contactId: z.string().parse(params.contactId),
      };
    },
    stringify: ({ contactId }) => {
      return { contactId: `${contactId}` };
    },
  },
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  loader: async ({ params: { contactId } }) => {
    const contact = await getContact(contactId as string);
    if (!contact) {
      throw notFound({ _global: false });
    }

    return contact;
  },
});

function ContactIdIndexComponent() {
  return (
    <>
      <h2>Contact</h2>
      <ContactDetail />
    </>
  );
}
