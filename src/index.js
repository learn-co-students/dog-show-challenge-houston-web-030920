document.addEventListener('DOMContentLoaded', () => {

  let createDogTags = (dogData)=>{
    let tBody = document.querySelector('#table-body')
    let trTag = document.createElement('TR')
    let td1Tag = document.createElement('TD')
    let td2Tag = document.createElement('TD')
    let td3Tag = document.createElement('TD')
    let td4Tag = document.createElement('TD')
    let button = document.createElement('button')
    button.append("Edit")
    td1Tag.append(dogData.name)
    td2Tag.append(dogData.breed)
    td3Tag.append(dogData.sex)
    td4Tag.append(button)
    trTag.append(td1Tag)
    trTag.append(td2Tag)
    trTag.append(td3Tag)
    trTag.append(td4Tag)
    tBody.append(trTag)

    button.addEventListener('click', (e)=>{
      // on click, populate form inputs with current dog info
      let form = document.querySelector('#dog-form')
      form[0].value = dogData.name
      form[1].value = dogData.breed
      form[2].value = dogData.sex

      // event listener on submit
      document.addEventListener('submit', (e)=>{
        e.preventDefault()

        //update current dog info with new values
        dogData.name = e.target[0].value
        dogData.breed = e.target[1].value
        dogData.sex = e.target[2].value

        // update dog info on table
        td1Tag.innerHTML = dogData.name
        td2Tag.innerHTML = dogData.breed
        td3Tag.innerHTML = dogData.sex

        // update server with new dog info
        fetch(`http://localhost:3000/dogs/${dogData.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: dogData.name,
            breed: dogData.breed,
            sex: dogData.sex
          })
        })
      })

    })

  }

  //render all dogs
  fetch('http://localhost:3000/dogs')
  .then(resp=>resp.json())
  .then(obj => {
    obj.forEach(dog =>{
      createDogTags(dog)
    })
  })
  
})
