export default function NotFoundPage({ message }: { message?: string }) {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>
        Fancy meeting you here. It seems you've stumbled upon a page that
        doesn't exist.
      </p>
      {message && (
        <p>
          <i>{message}</i>
        </p>
      )}
    </div>
  );
}
