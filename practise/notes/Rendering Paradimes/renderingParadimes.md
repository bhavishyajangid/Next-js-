we have two types of rendering 

1. Client Side Rendering (CSR)
2. Server Side Rendering (SSR)


1. Client Side Rendering 
so client side rendering mean where thing happen on our system or browser nothing happen on ui like react , react use client side rendering so its basically mean when we open a react js project then we only get the html css js file from the server of vite and in the html file we only have body head html tag and a div which id is root and that div is empty because all the html code are get into js formate not in html foramate so we get empty div and when this home route render then browser convert this js code into html and also when we navigate then again js convert the js code in html and because of this the react js not relaod the complete page every time 

pros : 
       only get the empty div and create the page on the browser because of this react js website are fast 

cons : but react js webiste dont have good seo because when the html lood it has only one div which is empty then google bot check the website then it find empty div so csr website dont have good seo 


2. Server Side Rendering : server side rendering mean get the complete page html from the server before we only get the empty div now here server send the complete html of that page and take the all code from the server if navigate the fetch that page html from the server 

pros : 
        good in seo because when the page load it has complete html and when the google both chek the webiste then it find the content 

cons : less fast compare to csr website becuase send the complete html from the server 


*************** Now the Main Question is Next js Use Which Method ************

Note : Next js use both server side rendering and client side rendering

**************** HOW LETS SEE ****************
so when the next js first load then it fetch that page complete html not get the empty div fetch the complete page html and show on the ui so the seo problem is solve now if i am navigate to the another page then server side again fetch the complete html from the server but next js not do this next js fetch the complete page data on first render and also get the other static pages data in the from of json so when the user navigate on the other static page the the js convert this json formate data into html and show on the ui  




        