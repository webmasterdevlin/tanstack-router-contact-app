import { Link, useLoaderData } from '@tanstack/react-router';

export default function SidebarContactList() {
  const { contacts } = useLoaderData({ from: '__root__' })

  return (
    <nav>
      {contacts.length ? (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <Link to={`/contacts/$contactId`}
                params={{ contactId: contact.id }}
              >
                {contact.first || contact.last ? (
                  <>
                    {contact.first} {contact.last}
                  </>
                ) : (
                  <i>No Name</i>
                )}{' '}
                {contact.favorite && <span>★</span>}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          <i>No contacts</i>
        </p>
      )}
    </nav>
  );
}
