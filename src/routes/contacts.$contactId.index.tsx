import { createFileRoute, notFound } from '@tanstack/react-router';
import { deleteContact, getContact } from '../services/contacts.ts';
import { z } from 'zod';
import Favorite from '../components/favorite.tsx';
import { FormEvent } from 'react';

export const Route = createFileRoute('/contacts/$contactId/')({
  component: ContactIdIndexComponent,
  notFoundComponent: () => (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>Can't find contact</i>
      </p>
    </div>
  ),
  errorComponent: () => (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>Network error</i>
      </p>
    </div>
  ),
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
  const contact = Route.useLoaderData();
  const params = Route.useParams();
  const navigate = Route.useNavigate();

  const handleEditEvent = async (event: FormEvent) => {
    event.preventDefault();
    await navigate({
      to: `/contacts/${params.contactId}/edit`,
    });
  };

  const handleDeleteEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (globalThis.confirm('Please confirm you want to delete this record.')) {
      await deleteContact(params.contactId);
      await navigate({
        to: '/',
      });
    }
  };

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || 'https://ui-avatars.com/api/?name=no+name'}
          alt="avatar"
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
              rel="noopener noreferrer"
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <form onSubmit={handleEditEvent}>
            <button type="submit">Edit</button>
          </form>
          <form onSubmit={handleDeleteEvent}>
            <button type="submit">Delete</button>
          </form>
        </div>
      </div>
    </div>
  );
}
