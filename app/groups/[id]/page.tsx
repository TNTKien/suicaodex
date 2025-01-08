interface pageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: pageProps) {
  return (
    <div>
      <h1>{params.id}</h1>
    </div>
  );
}
