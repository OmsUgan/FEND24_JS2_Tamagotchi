export class Pet {
    constructor(id, name, animalType, imageUrl) {
        this.id = id;
        this.petName = name;
        this.petType = petType;
        this.petImage = imageUrl;
        this.petEnergy = 50;
        this.petFullness = 50;
        this.petHappiness = 50;
        this.statsTimer = setInterval(() => this.decreaseStats(), 10000); // 10 sek
    }
}