document.addEventListener('DOMContentLoaded', () => {
    getDogs()
    editForm()
})
function getDogs(){
    fetch('http://localhost:3000/dogs')
        .then(function(resp){
            return resp.json()
        })
        .then(function(collection){
            collection.forEach(function(dog){
                createDogs(dog)
            })
        })
}

function createDogs(dog){
    let tableHead = document.querySelector('thead')
    let tableRow = document.createElement('tr')
    //create dog name
    let name = document.createElement('td')
    name.append(dog.name)
    tableRow.appendChild(name)
    //create dog breed
    let breed = document.createElement('td')
    breed.append(dog.breed)
    tableRow.appendChild(breed)
    //create dog sex
    let sex = document.createElement('td')
    sex.append(dog.sex)
    tableRow.appendChild(sex)
    //create edit button
    let edit = document.createElement('td')
    let editBtn = document.createElement('button')
    editBtn.innerText = 'Edit'
    //fill edit form with selected dogs info
    editBtn.addEventListener('click', function(){
        let currentDog = dog.id
        editForm(currentDog)
        let inputs = document.querySelectorAll('input')
        inputs[0].placeholder = dog.name
        inputs[1].placeholder = dog.breed
        inputs[2].placeholder = dog.sex
    })
    edit.append(editBtn)
    tableRow.appendChild(edit)
    //append table row to table head
    tableHead.append(tableRow)
}   

function editForm(currentDog){
    const editForm = document.getElementById('dog-form')
    editForm.addEventListener('submit', function(e){
        
        if(e.srcElement[0].value == ''){
            window.alert('Name must be filled')
            e.preventDefault()
        }
        else if(e.srcElement[1].value == ''){
            window.alert('Breed must be filled')
            e.preventDefault()
        }
        else if(e.srcElement[2].value == ''){
            window.alert('Sex must be filled')
            e.preventDefault()
        }
        else{
            let newName = e.srcElement[0].value
            let newBreed = e.srcElement[1].value
            let newSex = e.srcElement[2].value
        fetch(`http://localhost:3000/dogs/${currentDog}`, {
            method: "PATCH",
            headers: 
            {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              "name": newName,
              "breed": newBreed,
              "sex": newSex
            })
        })
        .then(function(resp){
            return resp.json()
        })
        .then(function(dog){
            createDogs(dog)
            e.target.reset()
        })
        }     
    })

}