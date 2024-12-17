import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <p id="zero-state">
      This is a demo for TanStack Start.
      <br />
      Check out{' '}
      <a href="https://tanstack.com/start">the docs at tanstack.com/start</a>.
    </p>
  );
}
