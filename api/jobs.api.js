const express = require('express');
const router = express.Router();

let data = require('../data.json')

router.post('/', function (req,res,next){
  const j = req.body;
  data.jobs.unshift(j);
   res.json({j})
})

router.get("/alljobs", (req,res) => {
    res.send(data.jobs)
    console.log(data.jobs.length)
})

router.get("/", (req,res) => {
  const page = req.query.page
  const name = req.query.name
  const title = req.query.title
  const city = req.query.city
  const citiesParams = req.query.cities
  const sortBy =req.query.sortBy


  if (!page && !name && !title && !city && !citiesParams && !sortBy){
      let firstPage = data.jobs.slice(0,20);
      console.log(firstPage.length);
      res.send(firstPage);
  }

  if (page){
      let companyName = data.jobs.slice(page*20-20,page*20)
      console.log(page)
      console.log(companyName.length)
      res.send(companyName)
  }   
  

  if (name){
      let nameCompanies = [data.companies.filter((c) => c.name==name)]
      console.log(name)
      console.log(nameCompanies.length)
      res.send(nameCompanies)
  }

  if (title){
      let titleCompanies = data.jobs.filter((c) => c.title.includes(title))
      console.log(titleCompanies.length)

      res.send(titleCompanies)
  }

  if (city){
      let cityCompanies = data.jobs.filter((c) => c.city==city)
      console.log(cityCompanies.length)

      res.send(cityCompanies)
  }

  if(citiesParams){
      let cities = citiesParams.split(',')
      let filteredCompanies=[]
      for (companies='',i=0; i< cities.length; i++){
      companies = data.jobs.filter((c) => c.city == cities[i])
      filteredCompanies.push(companies)
  
      }
      console.log(filteredCompanies.length)

      res.send(filteredCompanies)
      
  }

  if (sortBy){

      let id = data.ratings.map ((i) => i.id)
      let avg = data.ratings.map ((r) => (r.workLifeBalanceRatings + r.payAndBenefits + r.jobsSecurityAndAdvancement + r.management + r.culture)/5)
      let rating = []
      
      for (i=0; i< id.length; i++){
          rating.push({'id': id[i], 'rating': avg[i]})
      }
      
      let ascRating = rating.sort((a,b) => a.rating - b.rating)
      let ratingCompanies = []
      
      for (i=0; i<ascRating.length; i++){
          let ratingCompany = data.ratings.filter((c) => c.id == ascRating[i].id)
          ratingCompanies.push(ratingCompany)
      }
        resultCompanies = ratingCompanies.slice(0,20)
        console.log(resultCompanies.length)
        res.send(resultCompanies)
      }

 
})


router.get('/allcompanies', (req,res) => {
    const page = req.query.page
    

    if (!page) {
    let company = data.companies.slice(0,6)
    res.send(company)}

    if (page) {
        let company = data.companies.slice(page*6 - 6, page*6)
        res.send(company)
    }
})

router.post('/allcompanies', function (req,res,next){
    const c = req.body;
    data.companies.unshift(c);
     res.json({c})
  })

//PATCH
router.patch("/allcompanies/:id", (req, res) => {
    
  let companies = data.companies.map((c) => {
      if (c.id == req.params.id) {
          c.enterprise = true;
      }
      return c
  })

  res.send(companies);
})




//DELETE
router.delete("/allcompanies/:id", (req,res)=>{
  company = data.companies.filter(c => c.id!= req.params.id)
  res.send(company)
})


router.delete("/:id", (req,res)=>{
    job = data.jobs.filter(j => j.id != req.params.id)
    res.send(job)
  })
module.exports = router;

