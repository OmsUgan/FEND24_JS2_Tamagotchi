import { Pet } from "./classes.js";
import { renderPetSelect, myPets, maxPet, generateRandomUUID, createPetCard, petDataList } from "./services.js";

myPets;

renderPetSelect();

console.log(document.getElementById("adopt-pet"))

document.getElementById("adopt-pet").addEventListener("click", () => {
    const petId = Number(document.getElementById("pet-select").value);
    const petName = document.getElementById("pet-name").value;
    console.log(petId);

    const pet = petDataList.find(p => p.id === petId);

    if (petId === 0) {
        alert("Du måste välja ett husdjur!")
        return;
    }

    if (petName === "") {
        alert("Du måste ange ett namn för ditt husdjur!")
        return;
    }

    if (myPets.length >= maxPet) {
        alert("Du har redan 4 husdjur!")
        return;
    }

    console.log(myPets);

    const newPet = new Pet(generateRandomUUID(), petName, pet.petType, pet.petImage);
    myPets.push(newPet);
    createPetCard(newPet);

    document.getElementById("pet-name").value = "";
    document.getElementById("pet-select").text = "";
});