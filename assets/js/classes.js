import { startStats } from "./services.js";
export class Pet {
    constructor(id, name, petType, imageUrl) {
        this.id = id;
        this.petName = name;
        this.petType = petType;
        this.petImage = imageUrl;
        this.petEnergy = startStats;
        this.petFullness = startStats;
        this.petHappiness = startStats;
        this.statsTimer = setInterval(() => this.decreaseStats(), 10000); // 10 sek
    }
}