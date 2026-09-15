import Link from "next/link";

export default function Home() {
  return (
     <div>
       <h1>Welcome to home page </h1>
       <Link href="/about">About</Link>
       <br/>
       <Link href="/services">services</Link>
     </div>
  );
}
