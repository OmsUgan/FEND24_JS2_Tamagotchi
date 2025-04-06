export const generateRandomUUID = () => crypto.randomUUID();

export const createPetCard = (pet) => {
    const petListDiv = document.getElementById("pet-list");

    const petContainerDiv = document.createElement("div");
    petContainerDiv.classList.add("overflow-hidden", "bg-white/10", "px-1.5", "py-1.5");
    
    const petMainBoxDiv = document.createElement("div");
    petMainBoxDiv.classList.add("overflow-hidden", "rounded-xl", "bg-gray-950/50");
    
    const petDetailsDiv = document.createElement("div");
    petDetailsDiv.classList.add("px-4", "py-5", "sm:p-6");
    
    const petNameText =  document.createElement("p");
    petNameText.classList.add("text-2xl", "font-semibold", "text-pink-300", "text-center");
    petNameText.textContent = pet.petName;
    
    const petImageDiv = document.createElement("div");
    petImageDiv.classList.add("flex", "justify-center", "py-4");
    
    const petImage = document.createElement("img");
    petImage.src = pet.petImage;
    petImage.classList.add("h-50");
    petImage.id = "pet-image";
    petImageDiv.append(petImage);
    
    const petStatsDiv = document.createElement("div");
    petStatsDiv.classList.add("flex", "flex-col", "space-y-5");
    petStatsDiv.append(createPetStatProgressBar("Energy", "bg-lime-400", 90));
    petStatsDiv.append(createPetStatProgressBar("Fullhet", "bg-yellow-400", 50));
    petStatsDiv.append(createPetStatProgressBar("Lycka", "bg-rose-400", 12));
    
    const petActionDiv = document.createElement("div");
    petActionDiv.classList.add("flex", "justify-center", "pt-5", "space-x-5");
    petActionDiv.append(createPetActionButton('Lek'));
    petActionDiv.append(createPetActionButton('Ät'));
    petActionDiv.append(createPetActionButton('Vila'));
    
    petDetailsDiv.append(petNameText, petImageDiv, petStatsDiv, petActionDiv);
    petMainBoxDiv.append(petDetailsDiv);
    petContainerDiv.append(petMainBoxDiv);
    petListDiv.append(petContainerDiv);
}

export const createPetStatProgressBar = (statName, statColor, statCounter) => {
    const statDiv = document.createElement("div");
    
    const statNameText = document.createElement("p");
    statNameText.classList.add("text-pink-300", "text-sm/6", "font-semibold");
    statNameText.textContent = statName;
    
    const progressBarDiv = document.createElement("div");
    progressBarDiv.classList.add("overflow-hidden", "rounded-full", "bg-gray-950", "w-full");
    
    const progressBar = document.createElement("div");
    progressBar.classList.add("flex", "justify-center", "items-center", "h-4", "rounded-full", statColor, "font-semibold", "text-sm/6")
    progressBar.style.width = `${statCounter}%`;
    progressBar.textContent = statCounter;
    
    progressBarDiv.append(progressBar);
    statDiv.append(statName, progressBarDiv);
    
    return statDiv;
}

export const createPetActionButton = (action) => {
    const petActionButton = document.createElement('button');
    petActionButton.classList.add('bg-pink-300', 'rounded-md', 'px-5', 'py-2', 'text-sm/6', 'w-full', 'font-semibold', 'hover:bg-pink-400', 'cursor-pointer');
    petActionButton.textContent = action;
 
    return petActionButton;
}

export const petDataList = [
{
    id: 1,
    petName: "Baby Dinosaurie",
    petType: "Reptile",
    petImage: "/assets/img/baby-dinosaur.svg"
},
{
    id: 2,
    petName: "Baby Kanin",
    petType: "Mammal",
    petImage: "/assets/img/baby-rabbit.svg"
},
{
    id: 3,
    petName: "Panda",
    petType: "Mammal",
    petImage: "/assets/img/panda.svg"
},
{
    id: 4,
    petName: "Chill Katt",
    petType: "Mammal",
    petImage: "/assets/img/chill-cat.svg"
},
{
    id: 5,
    petName: "Ko",
    petType: "Mammal",
    petImage: "/assets/img/cow.svg"
},
{
    id: 6,
    petName: "Krokodil",
    petType: "Reptile",
    petImage: "/assets/img/crocodile.svg"
},
{
    id: 7,
    petName: "Dinosaurie",
    petType: "Reptile",
    petImage: "/assets/img/dinosaur.svg"
},
{
    id: 8,
    petName: "Hund",
    petType: "Mammal",
    petImage: "/assets/img/dog.svg"
},
{
    id: 9,
    petName: "Örn",
    petType: "Aves",
    petImage: "/assets/img/eagle.svg"
},
{
    id: 10,
    petName: "Katt",
    petType: "Mammal",
    petImage: "/assets/img/cat.svg"
},
{
    id: 11,
    petName: "Lejon",
    petType: "Mammal",
    petImage: "/assets/img/lion.svg"
},
{
    id: 12,
    petName: "Pingvin",
    petType: "Aves",
    petImage: "/assets/img/penguin.svg"
},
{
    id: 13,
    petName: "Kanin",
    petType: "Mammal",
    petImage: "/assets/img/rabbit.svg"
},
{
    id: 14,
    petName: "Sköldpadda",
    petType: "Reptile",
    petImage: "/assets/img/turtle.svg"
},
{
    id: 15,
    petName: "Slumpmässig",
    petType: "Random",
    petImage: "/assets/img/egg.svg"
}];