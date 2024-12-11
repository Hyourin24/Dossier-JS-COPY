let main = document.querySelector(".main");
let userSection1 = document.querySelector(".userSection1")
async function AfficherPost() {
    try {
        let responsePosts = await fetch('https://jsonplaceholder.typicode.com/posts');
        let posts = await responsePosts.json();

        let responseUsers = await fetch('https://jsonplaceholder.typicode.com/users');
        let users = await responseUsers.json();
        
        //Pour chaque post, reprise des informations de fetch
        posts.forEach(post => {
            //Création des divs
            let postDiv = document.createElement("div");
            postDiv.classList.add("postInfo");
            userSection1.appendChild(postDiv);
            //Création des titres
            let postTitre = document.createElement("p")
            postTitre.classList.add("postTitre")
            postTitre.textContent = `Titre: ${post.title}`
            postDiv.appendChild(postTitre)
            //Création des body 

            let user = users.find(user => user.id === post.userId);

            let postBody = document.createElement("a")
            postBody.href = "./page3.html"
            postBody.classList.add("postBody")
            postBody.textContent = `Contenu: ${post.body}`
            postDiv.appendChild(postBody)
            
            //Identification des id et des noms. Comparaisons des deux, les noms deviennent les id
            

            //Création des noms
            let postName = document.createElement("a");
            postName.href = `https://jsonplaceholder.typicode.com/users/${user.id}`
            postName.classList.add("postName");
            postName.textContent = `Nom de l'utilisateur: ${user.name}`;
            postDiv.appendChild(postName);
            

            postBody.addEventListener("click", () => {
                localStorage.setItem("selectedPostId", post.Id);
            });
            // Ajout d'un bouton/lien pour afficher uniquement ce postDiv
        });

         
    } catch (error) {
        console.error(error);
    }
}

AfficherPost();