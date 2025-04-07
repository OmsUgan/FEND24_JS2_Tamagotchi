import { Pet } from "./classes.js";
import { renderPetSelect, myPets, maxPet, generateRandomUUID, createPetCard, petDataList } from "./services.js";

renderPetSelect();

console.log(document.getElementById("adopt-pet"));

document.getElementById("adopt-pet").addEventListener("click", () => {
    let petId = Number(document.getElementById("pet-select").value);
    const petName = document.getElementById("pet-name").value;
    console.log(petId);

    if (petId === 15) {
        const randomPet = petDataList[Math.floor(Math.random() * 14)];
        petId = randomPet.id;
    }

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
        alert("Du har redan 4 husdjur!");
        return;
    }

    console.log(myPets);

    const newPet = new Pet(generateRandomUUID(), petName, pet.petType, pet.petImage);
    myPets.push(newPet);

    if (myPets.length > 0) {
        document.getElementById("no-pets").style.display = "none";
    } else {
        document.getElementById("no-pets").style.display = "";
    }

    createPetCard(newPet);

    document.getElementById("pet-name").value = "";
    document.getElementById("pet-select").selectedIndex = 0;
});