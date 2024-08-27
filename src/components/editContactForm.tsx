import { FormEvent } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { updateContact } from '../services/contacts.ts';
import { Route } from '../routes/contacts.$contactId.edit.tsx';

export default function EditContactForm() {
  const contact = Route.useLoaderData();
  const params = Route.useParams();
  const navigate = useNavigate();

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
