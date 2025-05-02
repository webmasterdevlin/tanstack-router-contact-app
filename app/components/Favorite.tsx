import React from 'react';
import { Contact } from '@/models';
import { useRouter } from '@tanstack/react-router';
import { updateContactFn } from '@/functions/contact';
import { useServerFn } from '@tanstack/react-start';

type FavoriteProps = {
  contact: Contact;
};

const Favorite = ({ contact }: FavoriteProps) => {
  let favorite = contact.favorite;
  const router = useRouter();

  const updateContact = useServerFn(updateContactFn);

  return (
    <form
      onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateContact({ data: { ...contact, favorite: !contact.favorite } });
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
