import { Pet } from "./Pet.js";

export const maxPet = 4;
export const startStats = 50;
export const maxStats = 100;
export const statsTimer = 10000; // 10 sek
export let myPets = []; 

export const noPetsCard = document.getElementById("no-pets");
export const activityLogCard = document.getElementById("activity-log");

export const generateRandomUUID = () => crypto.randomUUID();

export const createPetCard = (pet) => {
    const petListDiv = document.getElementById("pet-list");

    const petContainerDiv = document.createElement("div");
    petContainerDiv.classList.add("overflow-hidden", "bg-white/10", "px-1.5", "py-1.5");
    petContainerDiv.id = pet.id;
    
    const petMainBoxDiv = document.createElement("div");
    petMainBoxDiv.classList.add("overflow-hidden", "rounded-xl", "bg-gray-950/50");
    
    const petDetailsDiv = document.createElement("div");
    petDetailsDiv.classList.add("px-4", "py-5", "sm:p-6");
    
    const petNameText =  document.createElement("p");
    petNameText.classList.add("text-2xl", "font-semibold", "text-pink-300", "text-center");
    petNameText.textContent = pet.petName;

    const petTypeText =  document.createElement("p");
    petTypeText.classList.add("text-sm", "font-semibold", "text-pink-300", "text-center");
    petTypeText.textContent = pet.petType;;
    
    const petImageDiv = document.createElement("div");
    petImageDiv.classList.add("flex", "justify-center", "py-4");
    
    const petImage = document.createElement("img");
    petImage.src = pet.petImage;
    petImage.classList.add("h-50");
    petImage.id = "pet-image";
    petImageDiv.append(petImage);
    
    const petStatsDiv = document.createElement("div");
    petStatsDiv.classList.add("flex", "flex-col", "space-y-5");

    petStatsDiv.append(createPetStatProgressBar("Energy", getProgressBarColor(pet.petEnergy), pet.petEnergy, pet.id));
    petStatsDiv.append(createPetStatProgressBar("Fullhet", getProgressBarColor(pet.petFullness), pet.petFullness, pet.id));
    petStatsDiv.append(createPetStatProgressBar("Lycka", getProgressBarColor(pet.petHappiness), pet.petHappiness, pet.id));
    
    const petActionDiv = document.createElement("div");
    petActionDiv.classList.add("flex", "justify-center", "pt-5", "space-x-5");

    const playButton = createPetActionButton('Lek');
    const eatButton = createPetActionButton('Ät');
    const napButton = createPetActionButton('Vila');

    playButton.addEventListener("click", () => pet.play());
    eatButton.addEventListener("click", () => pet.eat());
    napButton.addEventListener("click", () => pet.nap());
    petActionDiv.append(playButton, eatButton, napButton);
    
    petDetailsDiv.append(petNameText, petTypeText, petImageDiv, petStatsDiv, petActionDiv);
    petMainBoxDiv.append(petDetailsDiv);
    petContainerDiv.append(petMainBoxDiv);
    petListDiv.append(petContainerDiv);
}

export const getProgressBarColor = (statValue) => {
    if (statValue >= 71) {
        return "bg-lime-400"; // Grön när värdet är mellan 100 och 70 (71)
    } else if (statValue >= 36) {
        return "bg-yellow-400"; // Gul när värdet är mellan 70 och 35 (36)
    } else {
        return "bg-rose-400"; // Röd när värdet är mellan 30 och 0
    }
}

export const createPetStatProgressBar = (statName, statColor, statValue, petId) => {
    const statDiv = document.createElement("div");
    
    const statNameText = document.createElement("p");
    statNameText.classList.add("text-pink-300", "text-sm/6", "font-semibold");
    statNameText.textContent = statName;
    
    const progressBarDiv = document.createElement("div");
    progressBarDiv.classList.add("overflow-hidden", "rounded-full", "bg-gray-950", "w-full");
    
    const progressBar = document.createElement("div");
    progressBar.classList.add("flex", "justify-center", "items-center", "h-4", "rounded-full", statColor, "font-semibold", "text-sm/6");
    progressBar.id = `${petId}-${statName.toLowerCase()}`;
    progressBar.style.width = `${statValue}%`;
    progressBar.textContent = statValue;
    
    progressBarDiv.append(progressBar);
    statDiv.append(statNameText, progressBarDiv);
    
    return statDiv;
}

export const createPetActionButton = (action) => {
    const petActionButton = document.createElement('button');
    petActionButton.classList.add('bg-pink-300', 'rounded-md', 'px-5', 'py-2', 'text-sm/6', 'w-full', 'font-semibold', 'hover:bg-pink-400', 'cursor-pointer');
    petActionButton.textContent = action;
 
    return petActionButton;
}

export const renderPetSelect = () => {
    const petSelect = document.getElementById("pet-select");
    const petImg = document.getElementById("pet-img");
    
    petDataList.forEach(pet => {
        const option = document.createElement("option");
        option.text = pet.petName;
        option.value = pet.id;
        petSelect.append(option);
    });

    const adoptButton = document.getElementById("adopt-pet");

    petSelect.addEventListener("change", event => {
        const petId = Number(event.target.value);
        const pet = petDataList.find(p => p.id === petId);

        petImg.src = pet.petImage;

        adoptButton.textContent = `Adoptera ${pet.petName}`;
        adoptButton.value = pet.id;
        adoptButton.style.display = "";
        document.getElementById("pet-name").style.display = "";

        if(pet.id !== 15) {
            petImg.classList.remove("animate__animated", "animate__bounce", "animate__repeat-2");
        } else {
            petImg.classList.add("h-50", "animate__animated", "animate__bounce", "animate__repeat-2");
        }
    });
}

export const adoptPet = () => {
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
        newPet.logActivity(`Du adopterade ${newPet.petName}!`);
    
        if (myPets.length > 0) {
            noPetsCard.style.display = "none";
            activityLogCard.style.display = "";
        } else {
            noPetsCard.style.display = "";
            activityLogCard.style.display = "none";
        }
    
        createPetCard(newPet);
    
        document.getElementById("pet-name").value = "";
        document.getElementById("pet-select").selectedIndex = 0;
        const petImg = document.getElementById("pet-img");
        petImg.classList.add("h-50", "animate__animated", "animate__bounce", "animate__repeat-2");
        petImg.src = "/assets/img/egg.svg"
    
        const adoptButton = document.getElementById("adopt-pet");
        adoptButton.style.display = "none";
        adoptButton.textContent = "";
        document.getElementById("pet-name").style.display = "none";
    });
}

export const petDataList = [
{
    id: 1,
    petName: "Baby Dinosaurie",
    petType: "Dinosaurie",
    petImage: "/assets/img/baby-dinosaur.svg"
},
{
    id: 2,
    petName: "Baby Kanin",
    petType: "Kanin",
    petImage: "/assets/img/baby-rabbit.svg"
},
{
    id: 3,
    petName: "Panda",
    petType: "Panda",
    petImage: "/assets/img/panda.svg"
},
{
    id: 4,
    petName: "Chill Katt",
    petType: "Katt",
    petImage: "/assets/img/chill-cat.svg"
},
{
    id: 5,
    petName: "Ko",
    petType: "Ko",
    petImage: "/assets/img/cow.svg"
},
{
    id: 6,
    petName: "Krokodil",
    petType: "Krokodil",
    petImage: "/assets/img/crocodile.svg"
},
{
    id: 7,
    petName: "Dinosaurie",
    petType: "Dinosaurie",
    petImage: "/assets/img/dinosaur.svg"
},
{
    id: 8,
    petName: "Hund",
    petType: "Hund",
    petImage: "/assets/img/dog.svg"
},
{
    id: 9,
    petName: "Örn",
    petType: "Örn",
    petImage: "/assets/img/eagle.svg"
},
{
    id: 10,
    petName: "Katt",
    petType: "Katt",
    petImage: "/assets/img/cat.svg"
},
{
    id: 11,
    petName: "Lejon",
    petType: "Lejon",
    petImage: "/assets/img/lion.svg"
},
{
    id: 12,
    petName: "Pingvin",
    petType: "Pingvin",
    petImage: "/assets/img/penguin.svg"
},
{
    id: 13,
    petName: "Kanin",
    petType: "Kanin",
    petImage: "/assets/img/rabbit.svg"
},
{
    id: 14,
    petName: "Sköldpadda",
    petType: "Sköldpadda",
    petImage: "/assets/img/turtle.svg"
},
{
    id: 15,
    petName: "Slumpmässig",
    petType: "Random",
    petImage: "/assets/img/egg.svg"
}];