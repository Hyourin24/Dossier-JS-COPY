let userSection3 = document.querySelector(".userSection3")
let postSection = document.querySelector(".postSection");

async function AfficherPostsUtilisateur() {
    try {
        // Récupérer l'ID du post sélectionné
        const selectedPostId = parseInt(localStorage.getItem("selectedPostId"), 10);
        console.log("ID récupéré :", selectedPostId); 

        // Fetch des données API
        let responsePosts = await fetch('https://jsonplaceholder.typicode.com/posts');
        let posts = await responsePosts.json();

        let responseUsers = await fetch('https://jsonplaceholder.typicode.com/users');
        let users = await responseUsers.json();

        let responseComments = await fetch('https://jsonplaceholder.typicode.com/comments');
        let comments = await responseComments.json();

        // Trouver le post correspondant à l'ID
        const post = posts.find(post => post.id === selectedPostId);

        // Création de l'interface pour le post
        let postDiv = document.createElement("div");
        postDiv.classList.add("postInfo");

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

        // Ajout du post au DOM
        postSection.appendChild(postDiv);

    } catch (error) {
        console.error(error);
    }
}

AfficherPostsUtilisateur();