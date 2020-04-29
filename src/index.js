document.addEventListener('DOMContentLoaded', () => {

    let table = document.querySelector("table")
    
//render a list of dogs
    fetch('http://localhost:3000/dogs')
    .then(function(response){
        return response.json()
    })
    .then(function(dogs){
        //iterates through all the dogs
       dogs.forEach(dog => {
        //create elements for the table   
        let row = document.createElement("tr")
        let nameTd = document.createElement("td")
        let breedTd = document.createElement("td")
        let sexTd = document.createElement("td")
        let editBtn = document.createElement("button")

           //add attributes
           nameTd.append(dog.name) 
           breedTd.append(dog.breed) 
           sexTd.append(dog.sex) 
           editBtn.append("Edit Dog")
           
           //edit dog event listener
           editBtn.addEventListener('click', () => {
               let nameInput = document.querySelector('input[name="name"]')
               let breedInput = document.querySelector('input[name="breed"]')     
               let sexInput = document.querySelector('input[name="sex"]') 
               
               nameInput.placeholder = dog.name
               breedInput.placeholder = dog.breed
               sexInput.placeholder = dog.sex
               
               let submitForm = document.querySelector('#dog-form')
               submitForm.addEventListener('submit', function (e) {
                   e.preventDefault()
                   let nameInput = document.querySelector('input[name="name"]').value
                   let breedInput = document.querySelector('input[name="breed"]').value  
                   let sexInput = document.querySelector('input[name="sex"]').value 
                   
                   //debugger
                   //specific id of the current dog im trying to edit
                   fetch(`http://localhost:3000/dogs/${dog.id}`, {
                       method: 'PATCH',
                       headers: {
                           'Content-Type': 'application/json',
                           'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            "name": nameInput,
                            "breed": breedInput,
                            "sex": sexInput
                        })
                    })
                    .then(function(response){
                        return response.json()
                    })
                    .then(function(dog){
                        nameTd.innerText = dog.name
                        breedTd.innerText = dog.breed
                        sexTd.innerText = dog.sex
                    })
                })
            })//consider moving this
                
                //append tr and td to the table
                row.append(nameTd)
                row.append(breedTd)
                row.append(sexTd)
                row.append(editBtn)
                table.append(row)
            })
    })



// let newName = document.getElementsByName("name")[0].value
// let newBreed = document.getElementsByName("breed")[0].value
// let newSex = document.getElementsByName("sex")[0].value


    


    
})