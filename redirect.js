
    const form = document.getElementById("my-form");
    const status = document.getElementById("my-form-status");
    const button = document.getElementById("my-form-button");

    async function handleSubmit(event) {
        event.preventDefault(); // Empêche le rechargement de la page

        // Animation de chargement sur le bouton
        button.disabled = true;
        button.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> Envoi en cours...';

        const data = new FormData(event.target);

        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // Succès
                status.innerHTML = "✅ Merci ! Votre message a été envoyé avec succès.";
                status.className = "text-center text-sm font-medium mt-4 text-emerald-400";
                form.reset(); // Vide les champs
            } else {
                // Erreur serveur
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        status.innerHTML = "❌ Oups ! Un problème est survenu lors de l'envoi.";
                    }
                });
                status.className = "text-center text-sm font-medium mt-4 text-red-400";
            }
        }).catch(error => {
            // Erreur réseau
            status.innerHTML = "❌ Erreur de connexion. Vérifiez votre réseau.";
            status.className = "text-center text-sm font-medium mt-4 text-red-400";
        }).finally(() => {
            // Remise à zéro du bouton
            button.disabled = false;
            button.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Envoyer le message';
        });
    }

    form.addEventListener("submit", handleSubmit);
