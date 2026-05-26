type postSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostSlugPage({ params }: postSlugPageProps) {
  const { slug } = await params;

  return (
    <h1 className='text-7xl font-extrabold py-16'>
      Rota dinâmica. Parametro: {slug}
    </h1>
  );
}
