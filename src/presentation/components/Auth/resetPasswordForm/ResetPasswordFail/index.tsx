import clsx from 'clsx';

type RootErrorPageProps = {
  message?: string;
};

export function RootErrorPage({ message }: RootErrorPageProps) {
  const messageIsNull =
    message === null || message === undefined || message.trim() === '';

  const h2Classes = clsx('');

  const defaultMessage = <h2 className={h2Classes}>Ocorreu um erro ao</h2>;

  return (
    <div>
      <section>
        {messageIsNull ? (
          defaultMessage
        ) : (
          <h2 className={h2Classes}>{message}</h2>
        )}
      </section>
    </div>
  );
}
