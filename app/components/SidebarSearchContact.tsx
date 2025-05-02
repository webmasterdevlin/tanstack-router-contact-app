import { FormEvent } from 'react';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { createContactFn } from '@/functions/contact';

type Props = {
  query: string;
  setQuery: (query: string) => void;
};

export default function SidebarSearchContact({ query, setQuery }: Props) {
  const navigate = useNavigate({ from: "/" });
  const router = useRouter();

  const handleOnChangeEvent = async (e: FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
    await navigate({ search: { q: e.currentTarget.value } });
  };

  const createContact = useServerFn(createContactFn)

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      <form onSubmit={handleOnSubmit}>
        <button type="submit">New</button>
      </form>
    </div>
  );
}
