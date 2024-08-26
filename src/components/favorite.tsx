import { Contact } from '../models.ts';
import React from 'react';
import { updateContact } from '../services/contacts.ts';
import { useRouter } from '@tanstack/react-router';

type FavoriteProps = {
  contact: Contact;
};

const Favorite = ({ contact }: FavoriteProps) => {
  let favorite = contact['favorite'];
  const router = useRouter();

  return (
    <form
      onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateContact(contact.id, {
          ...contact,
          favorite: !contact.favorite,
        });
        await router.invalidate();
      }}
    >
      <button
        name="favorite"
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </form>
  );
};

export default Favorite;
