async function AfficherPostsUtilisateur() {
    try {
        // Récupérer l'ID du post sélectionné
        const selectedPostId = localStorage.getItem("selectedPostId");
        console.log(selectedPostId);

        // Fetch des données API
        let responsePosts = await fetch('https://jsonplaceholder.typicode.com/posts');
        let posts = await responsePosts.json();

        let responseUsers = await fetch('https://jsonplaceholder.typicode.com/users');
        let users = await responseUsers.json();

        let responseComments = await fetch('https://jsonplaceholder.typicode.com/comments');
        let comments = await responseComments.json();
        
        //Sélection de l'élément du DOM
        let userSection3 = document.querySelector(".userSection3");
        

        // Trouver le post correspondant à l'ID
        const post = posts.find(post => post.id == selectedPostId);

        // Création de l'interface pour le post
        let postDiv = document.createElement("div");
        postDiv.classList.add("postDiv");

        //Création d'un bouton retour
        let backLink = document.createElement("a");
        backLink.href = "../page1/index.html";
        backLink.classList.add("backLink");
        postDiv.appendChild(backLink);
        
        let backArrow = document.createElement("i");
        backArrow.classList.add('fa-solid', 'fa-arrow-left');
        backLink.appendChild(backArrow);

        // Titre
        let postTitre = document.createElement("h3");
        postTitre.textContent = `Titre: ${post.title}`;
        postDiv.appendChild(postTitre);

        // Nom de l'utilisateur
        let user = users.find(user => user.id === post.userId);
        let postName = document.createElement("p");
        postName.classList.add("postName");
        postName.textContent = `Nom de l'utilisateur: ${user.name}`;
        postDiv.appendChild(postName);



        // Ajout des commentaires liés au post
        let postComments = comments.filter(comment => comment.postId === post.id);
        postComments.forEach(comment => {
            let commentsDiv = document.createElement("div");
            commentsDiv.classList.add("commentsDiv");
            commentsDiv.textContent = `Commentaire: ${comment.body}`;
            postDiv.appendChild(commentsDiv);
        });
        
        //Création d'un bouton delete bouton renvoyant à l'API avec la method DELETE
        let deleteButton = document.createElement("button");
            deleteButton.classList.add("monBouton");
            postDiv.appendChild(deleteButton);
            deleteButton.textContent = "Supprimer";
            deleteButton.addEventListener("click", () => {
                document.querySelector('#delete-request .status');
                fetch('https://jsonplaceholder.typicode.com/comments',
                    { method: 'DELETE' })
                    .then(() => postDiv.remove(deleteButton));
            });

        // Ajout du post au DOM
        userSection3.appendChild(postDiv);

    } catch (error) {
        console.error(error);
    }
}

AfficherPostsUtilisateur();