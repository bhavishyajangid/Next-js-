<!-- ************************ routing ********************* -->


in the next js when we create any folder in the app folder then it count as a route like we are creating a blog fodler in the app fodler then we do to /blog the it open that route no need to define the route manually like in the react jd 

ex :   app/ blog 


<!-- ************************* NESTED ROUTING ***************** -->

when we need to create the nested route like /services/seo or /services/web dev then we use this nested route mean when we crate a folder in the another folder then it count as nested route example present in the practise project check this 

ex : /services/seo or /service/web-dev


<!-- *************************DYNAMIC ROUTING ********************* -->

when we dont know which type of slug is comming in this path the we use this dynamic path like /blog/blogId or /blog/25 mean and suppose we have 1000 of bloges and then we need to show these on website noe creating nested route for every blogid is take 1000 nested files or folder and here the dynamich routing is comming 

SYNTAX : - [blogId] 

import React from 'react'

export default async function Blog({ params }) {
  const { blogId } = await params;
  return <div>Blog {blogId}</div>;
}

when we create the folder then we create the folder name like this in [] these bracket mean now this dynamic route now the folder structure is services /blog /[blogId] this is not  the url i am show the fodler structure these bracted is not show in the url and when we go to /service/blog/25 then it open that page and on that page we get a params by default by next js these params has a promis so we need to awiat it when we log these params then we get the id which is after the blog so now we dont need to create the multiple nexted norute we cerate this dynamic routing and then use it 



<!-- ******************* NESTED DYNAMIC ROUTING ****************** -->

when we need nested dynamic routing then we create as it is only create this the nested folder name in [bracket]


NOTE : -  BUT THERE IS A CATCH IN THE DYNAMIC ROUTING IT ONLY SUPPORT SINGLE SLUG LIKE WHEN WE OPEN /SERVICES/BLOG/25 THEN THIS OPEN THE  DYNAMIC ROUTE BUT WHEN WE OPEN THIS /SERVICES/BLOG/25/X/Y THEN THIS IS NOY WORKING BECAUSE I AM ONLY CRATE THE DYNAMICH ROUTING FOR THE BLOG ID NOT COMING IT NEXT SLUGS SO FOR THIS WE NEED TO USE THE CATCH ALL ROUTE 



<!-- ************************* CATCH ALL ROUTE ******************** -->

when we need to create a dynamich route which has unlimted slug like /service/blog/blogid/x/y/d/d/g/t/e/t infinte then we use this catch all route and the syntax is [...foldername] use the three dots in the folder name create the catch all route 

EX ; NOW SUPPOSE YOU CRATED TWO FODLER IN THE SERVERIC FOLDER FIRST NAME IS [serviceId] AND THE SECOND FODLER NAME IS [...serviceId] now what the diffrent in both first folder is dynamic routing and the second is catch all route now when we go to /service/25 then this [sericeId] FOLDER WORK NOW THIS OPEN THE PAGE BUT NOW YOU GOING ON THIS /SERVICES/25/X THEN THIS [serviceId] FODLER IS NOW WORK BECAUSE IT ONLY SUPPORT THE ONE NETING ONLY SO FOR THIS THIS [...serviceId] FOLDER OPEN AND NOW WE AER ABLE TO CREATE UNLIMITED NESTING LIKE NOW WHEN WE OPEN /SERVICE/SERVICEiD/D/D/D/D/D/ THEN THIS PAGE OPEN UNDESTAND MY POINT 