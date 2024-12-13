import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <p id="zero-state">
      This is a demo for TanStack Router.
      <br />
      Check out{' '}
      <a href="https://tanstack.com/router">the docs at tanstack.com/router</a>.
    </p>
  );
}
