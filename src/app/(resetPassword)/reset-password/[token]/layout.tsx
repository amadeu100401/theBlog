import { Geist } from 'next/font/google';
import '../../../globals.css'; // Certifique-se de que o caminho está correto

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

type ResetPasswordLayoutProps = {
  children: React.ReactNode;
};

export default function ResetPasswordLayout({
  children,
}: Readonly<ResetPasswordLayoutProps>) {
  return (
    <html lang='pt-BR' suppressHydrationWarning className={geistSans.variable}>
      <body className='antialiased bg-gray-100' suppressHydrationWarning>
        <main>{children}</main>
      </body>
    </html>
  );
}
