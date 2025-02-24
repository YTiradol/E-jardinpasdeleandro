document.addEventListener("DOMContentLoaded", () => {
    const joursSemaine = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    
    let aujourdHui = new Date();
    const calendarHeader = document.getElementById("calendar-header");
    const calendarBody = document.getElementById("calendar-body");

    for (let i = 0; i < 5; i++) {
        let jourSuivant = new Date();
        jourSuivant.setDate(aujourdHui.getDate() + i);

        let jourTexte = joursSemaine[jourSuivant.getDay()];
        let dateTexte = jourSuivant.getDate() + "/" + (jourSuivant.getMonth() + 1);

        let th = document.createElement("th");
        th.textContent = jourTexte + " (" + dateTexte + ")";
        calendarHeader.appendChild(th);

        let td = document.createElement("td");
        td.textContent = "?";
        td.setAttribute("data-jour", jourTexte);
        td.addEventListener("click", () => afficherConseil(jourTexte));
        calendarBody.appendChild(td);
    }

    function afficherConseil(jour) {
        const conseils = {
            "Lun": "Arrosez vos plantes le matin. 🌞",
            "Mar": "Vérifiez l'humidité du sol avant d'arroser. 💧",
            "Mer": "Taillez vos arbustes pour favoriser la croissance. ✂️",
            "Jeu": "Pensez à désherber votre jardin. 🌱",
            "Ven": "Apportez un engrais naturel à vos plantes. 🪴",
            "Sam": "Vérifiez la présence de parasites. 🐛",
            "Dim": "Profitez de votre jardin et relaxez-vous ! ☀️"
        };
        
        document.getElementById("conseil-texte").textContent = conseils[jour] || "Aucun conseil disponible.";
    }

    document.querySelectorAll(".nav-btn").forEach(button => {
        button.addEventListener("click", () => {
            const targetSection = button.getAttribute("data-target");
            document.querySelectorAll(".section").forEach(section => {
                section.classList.remove("active");
            });
            document.getElementById(targetSection).classList.add("active");
        });
    });

    const modal = document.getElementById("modal");
    const addPlantBtn = document.getElementById("add-plant-btn");
    const closeModal = document.querySelector(".close");
    const plantList = document.getElementById("plant-list");
    const plantInfoModal = document.getElementById("plant-info-modal");
    const plantInfoContent = document.getElementById("plant-info-content");
    const closePlantInfo = document.getElementById("close-plant-info");

    addPlantBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
        if (event.target === plantInfoModal) {
            plantInfoModal.style.display = "none";
        }
    });

    document.querySelectorAll(".plant-item").forEach(item => {
        item.addEventListener("click", () => {
            const plantName = item.getAttribute("data-name");
            const plantImgSrc = item.querySelector("img").src;

            const listItem = document.createElement("li");
            listItem.setAttribute("data-name", plantName);
            listItem.setAttribute("data-description", ""); // Description vide pour que tu la remplisses plus tard
            
            const plantImg = document.createElement("img");
            plantImg.src = plantImgSrc;
            plantImg.width = 40;
            plantImg.style.borderRadius = "5px";
            
            listItem.appendChild(plantImg);
            listItem.appendChild(document.createTextNode(plantName));
            listItem.addEventListener("click", () => afficherInfoPlante(listItem));

            plantList.appendChild(listItem);
            modal.style.display = "none";
        });
    });

    function afficherInfoPlante(plantItem) {
        const plantName = plantItem.getAttribute("data-name");
        const plantDescription = plantItem.getAttribute("data-description");
        
        plantInfoContent.innerHTML = `<h2>${plantName}</h2><p>${plantDescription}</p>`;
        plantInfoModal.style.display = "flex";
    }

    closePlantInfo.addEventListener("click", () => {
        plantInfoModal.style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const plantInfoModal = document.getElementById("plant-info-modal");
    const plantInfoName = document.getElementById("plant-info-name");
    const plantInfoImage = document.getElementById("plant-info-image");
    const plantInfoDescription = document.getElementById("plant-info-description");
    const closeInfoModal = document.getElementById("close-info-modal");

    // Ajout d'un event listener pour chaque plante ajoutée
    document.getElementById("plant-list").addEventListener("click", (event) => {
        if (event.target.tagName === "IMG") {
            const listItem = event.target.parentElement;
            const plantName = listItem.textContent.trim();
            const plantImgSrc = event.target.src;

            // Affichage des infos dans la modale
            plantInfoName.textContent = plantName;
            plantInfoImage.src = plantImgSrc;
            plantInfoDescription.textContent = "Info de la plante disponible quand l'equipe de developpement aura le budget d'acheter un broche arduino pour se connecter en bleuthoot"; // Laisse vide pour que tu puisses la remplir

            // Afficher la fenêtre modale
            plantInfoModal.style.display = "flex";
        }
    });

    // Fermer la modale des infos
    closeInfoModal.addEventListener("click", () => {
        plantInfoModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === plantInfoModal) {
            plantInfoModal.style.display = "none";
        }
    });
});
