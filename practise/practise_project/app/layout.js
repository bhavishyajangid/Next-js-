
//  settting meta data like title fevicon and other things 
  export const metadata = {
     title : {
       template : "%s | Next.js App",
       default : "Next.js App"
     }
  }

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
