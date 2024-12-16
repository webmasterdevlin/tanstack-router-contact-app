import { createFileRoute, notFound } from '@tanstack/react-router';
import { z } from 'zod';

import ContactDetail from '@/components/ContactDetail';
import NotFoundPage from '@/components/NotFoundPage';
import ErrorPage from '@/components/ErrorPage';
import { getContactFn } from '@/functions/contact';

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
    const contact = await getContactFn({ data: contactId });
    if (!contact) {
      throw notFound({ _global: false });
    }

    return contact;
  },
});

function ContactIdIndexComponent() {
  return <ContactDetail />;
}
