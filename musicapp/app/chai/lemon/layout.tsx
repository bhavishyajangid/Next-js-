export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <h1>lemon layout</h1>
        {children}
    </>
    
  );
}
