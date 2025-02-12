document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const container = document.querySelector('.container');
    const homeContent = document.getElementById('home-content');
    const plantsContent = document.getElementById('plants-content');
    const flowerSelection = document.getElementById('flower-selection');
    const aboutSection = document.getElementById('about-section');
    const homeButton = document.getElementById('home-button');
    const plantsButton = document.getElementById('plants-button');
    const newPlantButton = document.getElementById('new-plant-button');
    const aboutButton = document.getElementById('about-button');
    const plantListContainer = document.getElementById('plant-list-container');
    const plantInfoSelect = document.getElementById('plant-info-select');
    const rvButton = document.getElementById('rv-button');
    const rvSection = document.getElementById('rv-section');
    const plantModal = document.getElementById('plant-modal');
    const modalPlantName = document.getElementById('modal-plant-name');
    const closeButton = document.querySelector('.close-button');
    const deletePlantButton = document.getElementById('delete-plant-button');


    let addedPlants = []; // Stockage des plantes ajoutées

    deletePlantButton.addEventListener('click', () => {
        const plantName = modalPlantName.innerText;
        
        // Supprimer la plante du tableau  
        addedPlants = addedPlants.filter(plant => plant !== plantName);
        saveToLocalStorage(); // Sauvegarder les changements dans localStorage
    
        // Mettre à jour l'affichage de la liste des plantes connectées  
        plantListContainer.innerHTML = ''; // Vider la liste  
        addedPlants.forEach(plant => {
            const plantBox = document.createElement('div');
            plantBox.className = 'connected-plant';
            plantBox.innerHTML = `<p>${plant}</p>`;
            plantListContainer.appendChild(plantBox);
            
            // Ajouter un écouteur pour la modal  
            plantBox.addEventListener('click', () => {
                modalPlantName.innerText = plant; // Mettre à jour le contenu de la modal  
                plantModal.style.display = 'block'; // Afficher la modal  
            });
        });
    
        // Fermer la modal  
        plantModal.style.display = 'none';
    
        // Afficher ou masquer la section "Mes Plantes" selon le cas  
        document.getElementById('connected-plant-list').style.display = addedPlants.length > 0 ? 'block' : 'none';
    });

    // Fonction pour sauvegarder les plantes dans LocalStorage  
    const saveToLocalStorage = () => {
        localStorage.setItem('addedPlants', JSON.stringify(addedPlants));
    };

    // Fonction pour charger les plantes depuis LocalStorage  
    const loadFromLocalStorage = () => {
        const savedPlants = localStorage.getItem('addedPlants');
    
        if (savedPlants) {
            addedPlants = JSON.parse(savedPlants);
    
            // Afficher les plantes sauvegardées  
            addedPlants.forEach(plantName => {
                const plantBox = document.createElement('div');
                plantBox.className = 'connected-plant';
                plantBox.innerHTML = `<p>${plantName}</p>`;
                plantListContainer.appendChild(plantBox);
    
                // Ajouter aussi au menu déroulant des conseils  
                const option = document.createElement('option');
                option.value = plantName;
                option.textContent = plantName;
                plantInfoSelect.appendChild(option);
    
                // Ajouter un écouteur d'événement pour ouvrir la modal  
                plantBox.addEventListener('click', () => {
                    modalPlantName.innerText = plantName; // Mettre à jour le contenu de la modal  
                    plantModal.style.display = 'block'; // Afficher la modal  
                });
            });
    
            // Afficher la section "Mes Plantes" si des plantes existent  
            if (addedPlants.length > 0) {
                document.getElementById('connected-plant-list').style.display = 'block';
            }
        }
    };

    // Fonction pour ajouter une nouvelle plante  
    const addNewPlant = (plantName) => {
        if (!addedPlants.includes(plantName)) {
            addedPlants.push(plantName);
            saveToLocalStorage();

            const plantBox = document.createElement('div');
            plantBox.className = 'connected-plant';
            plantBox.innerHTML = `<p>${plantName}</p>`;
            plantListContainer.appendChild(plantBox);

            // Écouteur d'événement pour ouvrir la modal  
            plantBox.addEventListener('click', () => {
                modalPlantName.innerText = plantName; // Mettre à jour le contenu de la modal  
                plantModal.style.display = 'block'; // Afficher la modal  
            });

            const option = document.createElement('option');
            option.value = plantName;
            option.textContent = plantName;
            plantInfoSelect.appendChild(option);

            document.getElementById('connected-plant-list').style.display = 'block';
        }
    };

    // Gestion de la barre latérale  
    menuButton.addEventListener('click', () => {
        sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
        menuButton.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
    });

    homeButton.addEventListener('click', () => {
        homeContent.style.display = 'block';
        plantsContent.style.display = 'none';
        flowerSelection.style.display = 'none';
        aboutSection.style.display = 'none';
        rvSection.style.display = 'none';
        sidebar.style.display = 'none';
        menuButton.style.display = 'block';
    });

    plantsButton.addEventListener('click', () => {
        homeContent.style.display = 'none';
        plantsContent.style.display = 'block';
        flowerSelection.style.display = 'none';
        aboutSection.style.display = 'none';
        rvSection.style.display = 'none';
        sidebar.style.display = 'none';
        menuButton.style.display = 'block';
    });

    aboutButton.addEventListener('click', () => {
        homeContent.style.display = 'none';
        plantsContent.style.display = 'none';
        flowerSelection.style.display = 'none';
        aboutSection.style.display = 'block';
        rvSection.style.display = 'none';
        sidebar.style.display = 'none';
        menuButton.style.display = 'block';
    });

    rvButton.addEventListener('click', () => {
        homeContent.style.display = 'none';
        plantsContent.style.display = 'none';
        flowerSelection.style.display = 'none';
        aboutSection.style.display = 'none';
        rvSection.style.display = 'block'; // Afficher la section RV  
        sidebar.style.display = 'none';
        menuButton.style.display = 'block';
    });

    newPlantButton.addEventListener('click', () => {
        plantsContent.style.display = 'none';
        flowerSelection.style.display = 'block';
    });

    // Ajouter une plante lorsqu'on clique sur une fleur  
    document.querySelectorAll('.flower-button').forEach(button => {
        button.addEventListener('click', () => {
            const flowerName = button.getAttribute('data-name');
            addNewPlant(flowerName);
            plantsContent.style.display = 'block';
            flowerSelection.style.display = 'none';
        });
    });

    // Fermer la barre latérale si on clique en dehors  
    container.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !menuButton.contains(e.target)) {
            sidebar.style.display = 'none';
            menuButton.style.display = 'block';
        }
    });

    // Fermer la barre latérale avec la touche "Échap"
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            sidebar.style.display = 'none';
            menuButton.style.display = 'block';
        }
    });

    // Fermer la modal lorsque l'on clique sur la croix  
    closeButton.addEventListener('click', () => {
        plantModal.style.display = 'none'; // Masquer la modal  
    });

    // Fermer la modal lorsque l'on clique en dehors de celle-ci  
    window.addEventListener('click', (event) => {
        if (event.target === plantModal) {
            plantModal.style.display = 'none'; // Masquer la modal  
        }
    });

    // Charger les plantes sauvegardées au démarrage  
    loadFromLocalStorage();
});