let page = 1
let url = "http://localhost:5500/api/jobs"

async function getJobs() {
  try {
  console.log(page)
  console.log(url)
  
  const response = await fetch(url);
  const json = await response.json();
  console.log(json);
  const jobs = json;
  document.getElementById('page').innerHTML = `${page}`
  

  const jobsHTML = jobs.map(renderJobs);
  document.getElementById("jobList").innerHTML = jobsHTML.join("");}
  
catch (error) {
  console.log(error);
  jobs = JSON.parse(localStorage.getItem("Oops, my bad!"));
  
}
}

getJobs();



function renderJobs(job) {

  return `
 
   <div class="col">
  <div class="card h-100">
    <img src="https://itviec.com/itviec-black-square-facebook.png" class="card-img-top" alt="..."/>
    <div class="card-body">
      <h5 class="card-title">${job.title}</h5>
      <b>Up to $${job.salaryHigh}</b>
      <h6>Company: ${job.companyName}</h6>
      <h6>City: ${job.city}</h6>
      
    </div>
    <div class="button" style="margin-left:auto; margin-right:auto">
      <button type="button" style="border-radius:5px; background-color:#323EDD; color:white; border: 2px solid #323EDD"> Apply Now </button>
      <a href="job.html?id=${job.id}"><button type="button" onclick="getIDJob('${job.id}')"> See more </button></a>
    </div>
    <div class="card-footer">
      <small class="text-muted">Last updated ${moment(job.postedDate).fromNow()}</small>
    </div>
  </div>
</div>

`;
}




function getIDJob(id){
  localStorage.setItem('id', id)
  console.log(localStorage)
}



const form = document.getElementById('jobCreate')


form.addEventListener('submit',(e) => {
  console.log({e});
  e.preventDefault()

  const title = document.getElementById("titleCreate").value;
  const city = document.getElementById("cityCreate").value;
  
  console.log({title,city});
  if (localStorage.getItem('admin') == "true"){
    createJob({title,city});
    alert('Successful! Please reload to see your result. Thanks.')
    }
    else {
        alert("This function is only valid for ITViec's admin")
    }
})


async function createJob(j){
  const resp = await fetch("http://localhost:5500/api/jobs", {
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
    body: JSON.stringify(j) // body data type must match "Content-Type" header
  });
  // return resp.json(); // parses JSON response into native JavaScript objects
  
  const json = await resp.json()
  console.log({json})
}


   
  document.getElementById('next').onclick = function() {
    console.log('next');
    page += 1;
    if(page<2) {url = url}
    else {
    url = url.split('?')[0] + `?page=${page}`
    getJobs()
   }
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
    getJobs()
    }
  };
    
