import { startStats, getProgressBarColor, myPets } from "./services.js";
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

        if (this.petEnergy === 100) {
            this.logActivity(`${this.petName} var inte trött och ville inte vila!`);
        } else {
            this.logActivity(`Du vilade med ${this.petName}!`);
        }

        this.updateUI();
    }

    play() {
        this.petHappiness = Math.min(this.petHappiness + 30, 100);
        this.petFullness = Math.max(this.petFullness - 10, 0);
        this.petEnergy = Math.max(this.petEnergy - 10, 0);

        if (this.petHappiness === 100) {
            this.logActivity(`${this.petName} känner inte för att leka!`);
        } else {
            this.logActivity(`Du lekte med ${this.petName}!`);
        }

        this.updateUI();
    }

    eat() {
        this.petFullness = Math.min(this.petFullness + 30, 100);
        this.petHappiness = Math.min(this.petHappiness + 5, 100);
        this.petEnergy = Math.max(this.petEnergy - 15, 0);

        if (this.petFullness === 100) {
            this.logActivity(`${this.petName} är i matkoma!`);
        } else {
            this.logActivity(`Du matade ${this.petName}!`);
        }

        this.updateUI();
    }

    decreaseStats() {
        this.petEnergy = Math.max(this.petEnergy - 15, 0);
        this.petFullness = Math.max(this.petFullness - 15, 0);
        this.petHappiness = Math.max(this.petHappiness - 15, 0);

        if (this.petEnergy < 30) {
            this.logActivity(`${this.petName} är sömning!`);
        }
        
        if (this.petHappiness < 30) {
            this.logActivity(`${this.petName} har tråkigt!`);
        }
        
        if (this.petFullness < 30) {
            this.logActivity(`${this.petName} är hungrig!`);
        }

        this.updateUI();

        if (this.petEnergy === 0 || this.petFullness === 0 || this.petHappiness === 0) {
            clearInterval(this.statsTimer);
            this.logActivity(`${this.petName} sprang iväg!`);
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

    logActivity(message) {
        const list = document.querySelector("#activity-log ul");

        const li = document.createElement("li");
        li.className = "py-1";

        const p = document.createElement("p");
        p.className = "text-sm/6 font-semibold text-pink-300";
        p.textContent = `${new Date().toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" })} - ${message}`;

        li.append(p);
        list.prepend(li);
    }

    removeFromDOM() {
        let petCard = document.getElementById(this.id);

        if (petCard) {
            petCard.remove();
        }
        
        const petIndex = myPets.findIndex(p => p.id === this.id);
        if (petIndex !== -1) {
            myPets.splice(petIndex, 1);
        }

        if (myPets.length === 0) {
            document.getElementById("no-pets").style.display = "";
            document.getElementById("activity-log").style.display = "none";
            document.getElementById("pet-name").style.display= "none";
        } else {
            document.getElementById("no-pets").style.display = "none";
            document.getElementById("activity-log").style.display = "";
        }
    }
}