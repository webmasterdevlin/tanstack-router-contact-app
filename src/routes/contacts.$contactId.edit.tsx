import { createFileRoute, notFound, useNavigate } from '@tanstack/react-router';
import { getContact, updateContact } from '../services/contacts.ts';
import { FormEvent } from 'react';

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
  const contact = Route.useLoaderData();
  const navigate = useNavigate();
  const params = Route.useParams();

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const updates = Object.fromEntries(formData.entries());
    await updateContact(params.contactId as string, updates);
    await navigate({
      to: `/contacts/${params.contactId}`,
    });
  };

  return (
    <form id="contact-form" onSubmit={handleOnSubmit}>
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() =>
            navigate({
              to: `/contacts/${contact.id}`,
            })
          }
        >
          Cancel
        </button>
      </p>
    </form>
  );
}
