import { petDataList } from "./services.js";

const petSelect = document.getElementById("pet-select");
const petImg = document.getElementById("pet-img");

const renderPetSelect = () => {
    petDataList.forEach(pet => {
        const option = document.createElement("option");
        option.text = pet.petName;
        option.value = pet.id;
        petSelect.append(option);
    });
}

renderPetSelect();

const renderPetPreview = () => {
    const chooseButtonDiv = document.getElementById("choose-button");

    const chooseButton = document.createElement("button");
    chooseButton.classList.add("bg-pink-300", "rounded-md", "px-3", "py-2", "text-sm/6", "w-full", "font-semibold", "hover:bg-pink-400", "cursor-pointer");

    petSelect.addEventListener("change", event => {
        const petId = Number(event.target.value);
        const pet = petDataList.find(p => p.id === petId);

        petImg.src = pet.petImage;

        chooseButton.textContent = `Adoptera ${pet.petName}`;
        chooseButton.value = pet.id;
        chooseButtonDiv.append(chooseButton);

        if(pet.id !== 15) {
            petImg.classList.remove("animate__animated", "animate__bounce", "animate__repeat-2");
        } else {
            petImg.classList.add("h-50", "animate__animated", "animate__bounce", "animate__repeat-2");
        }
    })
}

renderPetPreview();