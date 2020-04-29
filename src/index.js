document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:3000/dogs")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (dogs) {
            let table = document.querySelector('#table-body')
            dogs.forEach(function (dog){
                let dogTr = document.createElement('tr')

                let nameTd = document.createElement('td')
                nameTd.innerText = dog.name

                let sexTd = document.createElement('td')
                sexTd.innerText = dog.sex

                let breedTd = document.createElement('td')
                breedTd.innerText = dog.breed

                let buttonTd = document.createElement('td')
                let editButton = document.createElement('button')
                editButton.innerText = "Edit Dog"
                buttonTd.append(editButton)

                dogTr.append(nameTd, sexTd, breedTd, buttonTd)
                table.append(dogTr)

                editButton.addEventListener("click", function () {
                    document.querySelector('input[name="name"]').value = dog.name
                    document.querySelector('input[name="breed"]').value = dog.breed
                    document.querySelector('input[name="sex"]').value = dog.sex

                    dogForm = document.querySelector('#dog-form')
                    dogForm.addEventListener("submit", function (e) {
                        e.preventDefault();
                        let formName = document.querySelector('input[name="name"]')
                        let formBreed = document.querySelector('input[name="breed"]')
                        let formSex = document.querySelector('input[name="sex"]')
                        
                        fetch(`http://localhost:3000/dogs/${dog.id}`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                name: formName.value,
                                breed: formBreed.value,
                                sex: formSex.value
                            })
                        })
                        .then(function (resp) {
                            return resp.json();
                        })
                        .then(function (updatedDog) {
                            nameTd.innerText = updatedDog.name
                            breedTd.innerText = updatedDog.breed
                            sexTd.innerText = updatedDog.sex
                        })
                    })
                })
            })
        })
})