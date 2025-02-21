document.addEventListener("DOMContentLoaded", () => {
    const conseils = {
        "Lun": "Arrosez vos plantes le matin. 🌞",
        "Mar": "Vérifiez l'humidité du sol avant d'arroser. 💧",
        "Mer": "Taillez vos arbustes pour favoriser la croissance. ✂️",
        "Jeu": "Pensez à désherber votre jardin. 🌱",
        "Ven": "Apportez un engrais naturel à vos plantes. 🪴",
        "Sam": "Vérifiez la présence de parasites. 🐛",
        "Dim": "Profitez de votre jardin et relaxez-vous ! ☀️"
    };

    // Gestion du calendrier
    document.querySelectorAll("td").forEach(cell => {
        cell.addEventListener("click", () => {
            const jourTexte = cell.getAttribute("data-jour");
            document.getElementById("conseil-texte").textContent = conseils[jourTexte];
        });
    });

    // Gestion de la navigation
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
