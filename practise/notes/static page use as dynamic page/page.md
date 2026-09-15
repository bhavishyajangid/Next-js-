in the previous notes i am learn how the static page and dynamic page is render static page create on build time me on the build time this static page is created and store when we come to that page so we dont call the api to fetch that page but in the dynamic routing we fetch the page from the server ro now we decide now to convert static page into dynamic page so this page always fetch from the server and create on run time not on build time 



for this we need to export a varible 

export const dynamic = "force-dynamic"

not are page is buildon run time as fetch from the server we have more method to make it dynamicn

2. use the searchParams props in the component 

export const serveices ({serachParams}){
     const params = await searchParams
}

so now our page run dynamically and much more methid is availbble check the documentation 