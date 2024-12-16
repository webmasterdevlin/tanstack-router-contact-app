import { createFileRoute, notFound } from '@tanstack/react-router';
import EditContactForm from '@/components/EditContactForm';
import { getContactFn } from '@/functions/contact';

export const Route = createFileRoute('/contacts/$contactId/edit')({
  component: EditContactComponent,
  loader: async ({ params: { contactId } }) => {
    const contact = await getContactFn({ data: contactId });
    if (!contact) {
      throw notFound({ _global: false });
    }
    return contact;
  },
});

function EditContactComponent() {
  return <EditContactForm />;
}
