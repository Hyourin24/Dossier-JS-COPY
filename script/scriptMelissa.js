let userSection3 = document.querySelector(".userSection3")
let postSection = document.querySelector(".postSection");

async function AfficherPostsUtilisateur() {
    try {
        // Récupérer l'ID utilisateur depuis le Local Storage
        const userId = localStorage.getItem("selectedUserId");
        let responseUsers = await fetch(`https://jsonplaceholder.typicode.com/users?userId=${userId}`);
        let users = await responseUsers.json();

        let responseComments = await fetch(`https://jsonplaceholder.typicode.com/comments?userId=${userId}`);
        let comments = await responseComments.json();
        // Fetch des posts pour cet utilisateur
        let responsePosts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        let posts = await responsePosts.json();

            posts.forEach(post => {
                let postDiv = document.createElement("div");
                postDiv.classList.add("postInfo");

                // Titre
                let postTitre = document.createElement("h3");
                postTitre.textContent = `Titre: ${post.title}`;
                postDiv.appendChild(postTitre);

                // Création du nom de l'utilisateur
               let user = users.find(user => user.id === post.userId);
               let postName = document.createElement("p");
               postName.classList.add("postName");
               postName.textContent = `Nom de l'utilisateur: ${user.name}`;
               postDiv.appendChild(postName);

                // Contenu
                
                postSection.appendChild(postDiv);

                
                
                let postComments = comments.filter(comment => comment.postId === post.id);

                postComments.forEach(comment => {
                   let commentsDiv = document.createElement("div");
                   commentsDiv.classList.add("commentsDiv");
                   commentsDiv.textContent = `Commentaire: ${comment.body}`;
                   postDiv.appendChild(commentsDiv);
                });

                let deleteButton = document.createElement("button");
                deleteButton.classList.add("monBouton");
                deleteButton.textContent = "Supprimer";
                postDiv.appendChild(deleteButton);
                deleteButton.addEventListener("click", () => {
                postDiv.remove();
                });
            });
        
    } catch (error) {
        console.error(error);
    }
}

AfficherPostsUtilisateur();