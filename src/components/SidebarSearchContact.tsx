import { FormEvent } from 'react';
import { Route } from '../routes/__root.tsx';
import { useRouter } from '@tanstack/react-router';
import { createContact } from '../services/contacts.ts';

type Props = {
  query: string;
  setQuery: (query: string) => void;
};

export default function SidebarSearchContact({ query, setQuery }: Props) {
  const navigate = Route.useNavigate();
  const router = useRouter();

  const handleOnChangeEvent = async (e: FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
    await navigate({ search: { q: e.currentTarget.value } });
  };

  const action = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contact = await createContact();
    await navigate({
      to: `/contacts/${contact.id}/edit`,
    });
  };

  return (
    <div>
      <form id="search-form" role="search">
        <input
          id="q"
          aria-label="Search contacts"
          placeholder="Search"
          type="search"
          name="q"
          onChange={handleOnChangeEvent}
          value={query}
          className={router.state.isLoading ? 'loading' : ''}
        />
        <div id="search-spinner" hidden={!router.state.isLoading} aria-hidden />
        <div className="sr-only" aria-live="polite"></div>
      </form>
      <form onSubmit={action}>
        <button type="submit">New</button>
      </form>
    </div>
  );
}
