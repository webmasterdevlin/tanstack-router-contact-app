import { createFileRoute, notFound } from '@tanstack/react-router';
import { getContact } from '../services/contacts.ts';
import EditContactForm from '../components/editContactForm.tsx';

export const Route = createFileRoute('/contacts/$contactId/edit')({
  component: EditContactComponent,
  loader: async ({ params: { contactId } }) => {
    const contact = await getContact(contactId);
    if (!contact) {
      throw notFound({ _global: false });
    }
    return contact;
  },
});

function EditContactComponent() {
  return (
    <>
      <h2>Editing</h2>
      <EditContactForm />
    </>
  );
}
