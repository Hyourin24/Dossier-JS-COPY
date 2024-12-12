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
            postDiv.classList.add("postDiv");
            userSection1.appendChild(postDiv);
            //Création des titres
            let postTitre = document.createElement("h3")
            postTitre.classList.add("postTitre")
            postTitre.textContent = `Titre: ${post.title}`
            postDiv.appendChild(postTitre)
            //Création des body 

            let user = users.find(user => user.id == post.userId);
            
            let postBody = document.createElement("p")
            postBody.classList.add("postBody")
            postBody.textContent = `Contenu: ${post.body}`
            postDiv.appendChild(postBody)
            
            //Identification des id et des noms. Comparaisons des deux, les noms deviennent les id
            

            //Création des noms
            let postName = document.createElement("p");
            postName.href = `https://jsonplaceholder.typicode.com/users/${user.id}`
            postName.classList.add("postName");
            postName.textContent = `Nom de l'utilisateur: ${user.name}`;
            postDiv.appendChild(postName);

            //Création des liens vers la page 2 et 3
            let link = document.createElement("div")
            link.classList.add("link")
            postDiv.appendChild(link)

            let postNameLink = document.createElement("a")
            postNameLink.href = `../page2/page2.html`
            postNameLink.classList.add("postNameLink")
            postNameLink.textContent = "Informations de l'utilisateur"
            link.appendChild(postNameLink)

            let postBodyLink = document.createElement("a")
            postBodyLink.href = `../page3/page3.html`;
            postBodyLink.classList.add("postBodyLink");
            postBodyLink.textContent = "Informations du post"
            link.appendChild(postBodyLink)

            console.log("Post ID :", post.id, "Titre :", post.title);
            // Ajout d'un bouton/lien pour afficher uniquement ce postDiv

            postBodyLink.addEventListener("click", () => {
                console.log("ID sauvegardé dans localStorage :", post.id);
                localStorage.setItem("selectedPostId", post.id); // L'ID sera stocké comme une chaîne
            });
            postNameLink.addEventListener("click", () => {
                console.log("ID nom local storage:",  post.userId)
                localStorage.setItem("selectedPostName", post.userId)
            })
        });

        
        } catch (error) {
        console.error(error);
    }
}

AfficherPost();