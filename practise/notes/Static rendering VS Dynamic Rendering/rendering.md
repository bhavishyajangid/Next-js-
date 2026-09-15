we have two types of page 

1. Static Page
2. Dynamic Page 


*************** Static Page ******************
1. A static page is pre-generated HTML that can be served directly to all users without generating it again for every request. 


2. A dynamic page is a page whose content is generated at request time based on changing data or user-specific information.

 A dynamic page is a page whose content can change based on:

user
database
API
request
cookies
time
search params

HTML is generated again when needed.


************** Static Rendering ******************
1. Static Rendering Mean Render That Page on Build And After every time reuse it 

npm run build
      ↓
Next.js creates HTML files
      ↓
Server stores them
      ↓
Users receive ready-made HTML

2. Dynamic Rendering : 
                       Next js Create the Pages Dynamically like we have 100 of blog and we need to make a page for every blog then can we make 100 routes so we make dynamic route and create a dynamic page and use the dynamic rendering 



 NOTE : BUT THE MAIN THIS IS HOW THE NEXT JS FETCH THE DYNAMIC PAGE AND STATIC PAGE 

 1. Next js fetch the static page data only once then reuse it  every time but for dynamic page next js fetch the page from the server  mean not fetch the data on first render and store its json and js conver this data into html not like this if always fetch the dynamich page and in the responce we get the complete page html not the page json formate data okh