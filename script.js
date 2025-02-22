document.addEventListener("DOMContentLoaded", () => {
    const joursSemaine = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    
    // Récupérer la date d'aujourd'hui
    let aujourdHui = new Date();
    
    // Sélection des éléments HTML
    const calendarHeader = document.getElementById("calendar-header");
    const calendarBody = document.getElementById("calendar-body");

    // Générer les 5 prochains jours
    for (let i = 0; i < 5; i++) {
        let jourSuivant = new Date();
        jourSuivant.setDate(aujourdHui.getDate() + i);

        let jourTexte = joursSemaine[jourSuivant.getDay()];
        let dateTexte = jourSuivant.getDate() + "/" + (jourSuivant.getMonth() + 1);

        // Créer les colonnes du tableau
        let th = document.createElement("th");
        th.textContent = jourTexte + " (" + dateTexte + ")";
        calendarHeader.appendChild(th);

        let td = document.createElement("td");
        td.textContent = "Cliquez ici";
        td.setAttribute("data-jour", jourTexte);
        td.addEventListener("click", () => afficherConseil(jourTexte));
        calendarBody.appendChild(td);
    }

    // Fonction pour afficher un conseil en fonction du jour sélectionné
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
    }// Gestion de la navigation
    document.querySelectorAll(".nav-btn").forEach(button => {
        button.addEventListener("click", () => {
            const targetSection = button.getAttribute("data-target");

            // Masquer toutes les sections
            document.querySelectorAll(".section").forEach(section => {
                section.classList.remove("active");
            });

            // Afficher la section correspondante
            document.getElementById(targetSection).classList.add("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Gestion de la fenêtre modale
    const modal = document.getElementById("modal");
    const addPlantBtn = document.getElementById("add-plant-btn");
    const closeModal = document.querySelector(".close");
    const plantList = document.getElementById("plant-list");

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
    });

    // Gestion de l'ajout des plantes à la liste
    document.querySelectorAll(".plant-item").forEach(item => {
        item.addEventListener("click", () => {
            const plantName = item.getAttribute("data-name");
            const plantImgSrc = item.querySelector("img").src;

            // Créer un élément pour la liste
            const listItem = document.createElement("li");
            const plantImg = document.createElement("img");
            plantImg.src = plantImgSrc;
            plantImg.width = 40;
            plantImg.style.borderRadius = "5px";
            
            listItem.appendChild(plantImg);
            listItem.appendChild(document.createTextNode(plantName));

            // Ajouter à la liste
            plantList.appendChild(listItem);

            // Fermer la fenêtre modale
            modal.style.display = "none";
        });
    });
});
