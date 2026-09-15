// ***************** static side Generation(SSR) *****************


In the staic rendering and dynamic rendering  we will see how the rendering is work and how next js serve the page html for static page and dynamic page so this static side generation is the part of server side rendering 


so when we open any dynamic page then we fetch the page html from the server and and build because the page is dynamic and next js not know how much page we have so but what if we dont need to  fetch the dynamic page from the server rather then i am saved all these dynamic page html and when user come to that page then we show the page directly to the user without api call so we do this using this ssr and this is called static side generation


***************** how to do ****************

in the next js we have a funcation called generateStaticParams() so we only need to create this inbuild funcation and export and always it return an array of dynamic page id and in this array i am add all the dynamic page ids and then when we build are project then at build time this ssr create these page and save and when we open the page next js directly show that page 


Note : - blodId is dynamic page Id name and 1 is id we define dynamic page liek this [blogId] as folder name so use it like this  {dynamicFolderName : "pageid"},

export function generateStaticParams(){
    return [
        {blodId : "1"},
        {blodId : "2"},
        {blodId : "3"},
    ]
}


so now when we open any page and this page id match then it show directly that page without api call and only need to do this nothing more 


******************* for all dynamic page ************

lets suppose we have 2000 thousand page and we need to build these pages on the project build but like this if we give the value in the array then my array goes to big so for this we fetch the blogId and return the array like this 

export async function generateStaticParams(){
    const response = await fetch("fetch all blog id")
    const data = await response 
    return data.map(({id}) => ({blogId : `${id}`}))
}

now this mastract all the id from this array and return in this formate  {blodId : "3"},


***************** Catch here *******************


now what if you data is changes according to that id mean you call an api depend on the id so when what to do so at that time we use Incremental static generation (ISR) so okh 
