import Link from "next/link";
export default function services(){
    return (
        <>
        <h1>All Services</h1>
         <Link href="/services/web-dev">Web Development</Link>
         <br/>
       <Link href="/services/seo">SEO</Link> 
       </>
    )
}