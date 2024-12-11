

export let userSection3 = document.querySelector(".userSection3")
async function AfficherPost() {
    try {
        let responsePosts = await fetch('https://jsonplaceholder.typicode.com/posts');
        let posts = await responsePosts.json();

        let responseUsers = await fetch('https://jsonplaceholder.typicode.com/users');
        let users = await responseUsers.json();

        let responseComments = await fetch('https://jsonplaceholder.typicode.com/comments');
        let comments = await responseComments.json();

        posts.forEach(post => {

            let postDiv = document.createElement("div")
            postDiv.classList.add("postInfo")

            // Titre
            let postTitre = document.createElement("h3")
            postTitre.textContent = `Titre: ${post.title}`
            postDiv.appendChild(postTitre);

            // Nom de l'utilisateur
            let user = users.find(user => user.id === post.userId);
            let userInfoDiv = document.createElement("div");
            userInfoDiv.classList.add("userInfo");
            userInfoDiv.textContent = `Nom de l'utilisateur: ${user.name}`;
            postDiv.appendChild(userInfoDiv);

            userSection3.appendChild(postDiv)

            // Ajouter les commentaires du post
            let postComments = comments.filter(comment => comment.postId === post.id);
            postComments.forEach(comment => {
                let commentsDiv = document.createElement("div");
                commentsDiv.classList.add("commentsDiv");
                commentsDiv.textContent = `Commentaire: ${comment.body}`
                postDiv.appendChild(commentsDiv);
            });
            let deleteButton = document.createElement("button");
            deleteButton.classList.add("monBouton");
            postDiv.appendChild(deleteButton);
            deleteButton.textContent = "Supprimer"
            deleteButton.addEventListener("click", () => {
                document.querySelector('#delete-request .status');
                fetch('https://jsonplaceholder.typicode.com/comments',
                    { method: 'DELETE' })
                    .then(() => postDiv.remove(deleteButton));
            });


        });



    } catch (error) {
        console.error(error);
    }
}

AfficherPost();












