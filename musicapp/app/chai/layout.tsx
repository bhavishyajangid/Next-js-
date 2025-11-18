export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <h1>folder</h1>
        {children}
    </>
    
  );
}
