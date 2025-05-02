import { FormEvent } from 'react';
import { Route } from '@/routes/contacts.$contactId.edit';
import { updateContactFn } from '@/functions/contact';
import { useServerFn } from '@tanstack/react-start';

export default function EditContactForm() {
  const contact = Route.useLoaderData();
  const params = Route.useParams();
  const navigate = Route.useNavigate();

  const updateContact = useServerFn(updateContactFn);

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const updates = Object.fromEntries(formData.entries());
    const updatedContact = { ...contact, ...updates };
    await updateContact({ data: updatedContact });
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
          defaultValue={contact.first!}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last!}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter!}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar!}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes!} rows={6} />
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
