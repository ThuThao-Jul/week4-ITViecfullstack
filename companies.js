let page=1
let url = "http://localhost:5500/api/jobs/allcompanies"

async function getCompanies() {
    try {
    
    
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    const companies = json
    console.log(url)
  
    const companiesHTML = companies.map(renderCompanies);
    document.getElementById('page').innerHTML = `${page}`
    document.getElementById("companyList").innerHTML = companiesHTML.join("");}
    
  catch (error) {
    console.log(error);
    jobs = JSON.parse(localStorage.getItem("Oops, my bad!"));
    
  }
  }
  
  getCompanies();
  
  
  
  function renderCompanies(c) {
  
    return `
   
    <div class="col-md-6">
    <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
      <div class="col p-4 d-flex flex-column position-static">
        <strong class="d-inline-block mb-2 text-primary">HOT</strong>
        <h3 class="mb-0">${c.companyName}</h3>
        <div class="mb-1 text-muted">Last updated on Nov 12</div>
        <p class="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
        </br>
        <div class="mb-1 text-muted">${c.jobs.length} available jobs</div>
        <a href="#" class="stretched-link">See details</a>
      </div>
      <div class="col-auto d-none d-lg-block">
        <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

      </div>
    </div>
  </div>
  
  `;
  }



  document.getElementById('next').onclick = function() {
    console.log('next');
    page += 1;
    
    if(page<2) {url = url}
    if (page>= 2 && page<=6) {
    url = url.split('?')[0] + `?page=${page}`
    getCompanies()
   }
    
   if(page>6){
       page=6
   }
   console.log(page)
  } ;
    
  
  document.getElementById('previous').onclick = function() {
    page -= 1;
    console.log('previous');
    if(page<1) {
      url = url;
      page=1;
    }
    else {
      url = url.split('?')[0] + `?page=${page}`;
    getCompanies()
    }
    console.log(page)
  };



//Create a company
const form = document.getElementById('companyCreate')


form.addEventListener('submit',(e) => {
  console.log({e});
  e.preventDefault()

  const companyName = document.getElementById("nameCreate").value;
  const jobs = document.getElementById("jobsCreate").value;
  
  console.log({companyName, jobs});
  if (localStorage.getItem('admin') == "true") {
  createCompany({companyName, jobs});
  }
  else {
    alert("This function is only valid for ITViec's admin")
  }
})


async function createCompany(c) {
  const resp = await fetch("http://localhost:5500/api/jobs/allcompanies", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(c) // body data type must match "Content-Type" header
  });
  // return resp.json(); // parses JSON response into native JavaScript objects
  
  const json = await resp.json()
  console.log({json})
}