import { startStats, getProgressBarColor } from "./services.js";
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

    nap() {
        this.petEnergy = Math.min(this.petEnergy + 40, 100);
        this.petHappiness = Math.max(this.petHappiness - 10, 0);
        this.petFullness = Math.max(this.petFullness - 10, 0);
        this.updateUI();
    }

    play() {
        this.petHappiness = Math.min(this.petHappiness + 30, 100);
        this.petFullness = Math.max(this.petFullness - 10, 0);
        this.petEnergy = Math.max(this.petEnergy - 10, 0);
        this.updateUI();
    }

    eat() {
        this.petFullness = Math.min(this.petFullness + 30, 100);
        this.petHappiness = Math.min(this.petHappiness + 5, 100);
        this.petEnergy = Math.max(this.petEnergy - 15, 0);
        this.updateUI();
    }

    decreaseStats() {
        this.petEnergy = Math.max(this.petEnergy - 15, 0);
        this.petFullness = Math.max(this.petFullness - 15, 0);
        this.petHappiness = Math.max(this.petHappiness - 15, 0);
        this.updateUI();

        if (this.petEnergy === 0 || this.petFullness === 0 || this.petHappiness === 0) {
            clearInterval(this.statsTimer);
            this.removeFromDOM();
        }
    }

    updateUI() {
        const updateBar = (statName, value) => {
            const bar = document.getElementById(`${this.id}-${statName}`);
            if (bar) {
                bar.style.width = `${value}%`;
                bar.textContent = value;
    
                bar.classList.remove("bg-lime-400", "bg-yellow-400", "bg-rose-400");
    
                bar.classList.add(getProgressBarColor(value));
            }
        };
    
        updateBar("energy", this.petEnergy);
        updateBar("fullhet", this.petFullness);
        updateBar("lycka", this.petHappiness);
    }
}