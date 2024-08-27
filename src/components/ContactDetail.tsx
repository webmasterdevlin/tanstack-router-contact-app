import { Route } from '../routes/contacts.$contactId.index.tsx';
import { FormEvent } from 'react';
import { deleteContact } from '../services/contacts.ts';
import Favorite from './Favorite.tsx';

export default function ContactDetail() {
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
