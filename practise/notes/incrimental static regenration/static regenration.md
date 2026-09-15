<!-- ************************* Incrimental Static Regeneration ********** -->

so in the static generation we have see the page is build on the run time and when we open a dynamic page then browser directly show the page without fetcth from the server but in have one problem if the page content is static then this is perferct but if the page content is change after some time then this is not good because this create the page on build time and in the buidl time the content is present in that page is show this content dont change the content when we reload the page because if dont fetch that page from the server so for this we use ISR incrimental static regeneration


so fo this we only need to export an varible name revalidate = time after then revalidate liek this ex

export default revalidate = 5;

now this mean is after 5 sec fetch taht page again mean lets think i am come to page and then browser directly show the stored page dont fetcth from the server but wheni am come back after 5 sec then if fetch again from the server and so this is know as ISR revalidate after some time 


NOTE : BUT MAIN THIS IS IT DOESNOT FETCH THE PAGE AUTOMATICALLY AFTER 5 SEC WHEN WE COME BACK TO THAT PAGE AFTER 5 SEC THEN ONLY IT FETCH IS NOT THEN IT NOT FETCH THE PAGE

 we can use this in the fetch also 

 const data = fetch("https://example.com, {
    data : {revalidate : 5}
 })

 so this wrok after 5 sec it when user come to that page then again call the api