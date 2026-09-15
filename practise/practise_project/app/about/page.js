import Link from "next/link";

export default function about(){
    return(
        <>
        <h1>About page</h1>
         <Link href="/">Home</Link>
         <br/>
       <Link href="/services">services</Link>
        
       </>
    )
}