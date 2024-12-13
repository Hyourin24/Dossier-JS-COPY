//Création d'une fonction asynchrone
async function AfficherPost() {
    try {
        //Fetch des documents JSON (tous les posts + tous les utilisateurs)
        let responsePosts = await fetch('https://jsonplaceholder.typicode.com/posts');
        let posts = await responsePosts.json();

        let responseUsers = await fetch('https://jsonplaceholder.typicode.com/users');
        let users = await responseUsers.json();


        //Séléction de l'élément du DOM
        let userSection1 = document.querySelector(".userSection1");
        
        //Pour chaque post, reprise des informations de fetch
        posts.forEach(post => {
            //Création des divs
            let postDiv = document.createElement("div");
            postDiv.classList.add("postDiv");
            userSection1.appendChild(postDiv);
            //Création des titres
            let postTitre = document.createElement("h3");
            postTitre.classList.add("postTitre");
            postTitre.textContent = `Titre: ${post.title}`;
            postDiv.appendChild(postTitre);
             
            //Le premier élément de l'id = au premier élément de userId
            let user = users.find(user => user.id == post.userId);
            
            let postBody = document.createElement("p");
            postBody.classList.add("postBody");
            postBody.textContent = `Contenu: ${post.body}`;
            postDiv.appendChild(postBody);
            
            //Création des noms
            let postName = document.createElement("p");
            postName.href = `https://jsonplaceholder.typicode.com/users/${user.id}`;
            postName.classList.add("postName");
            postName.textContent = `Nom de l'utilisateur: ${user.name}`;
            postDiv.appendChild(postName);

            //Création des liens vers la page 2 et 3
            let link = document.createElement("div");
            link.classList.add("link");
            postDiv.appendChild(link);

            let postNameLink = document.createElement("a");
            postNameLink.href = `../page2/page2.html`;
            postNameLink.classList.add("postNameLink");
            postNameLink.textContent = "Informations de l'utilisateur";
            link.appendChild(postNameLink);

            let postBodyLink = document.createElement("a");
            postBodyLink.href = `../page3/page3.html`;
            postBodyLink.classList.add("postBodyLink");
            postBodyLink.textContent = "Informations du post";
            link.appendChild(postBodyLink);

           
            
            //Evenement au click sur les liens, renvoyant les éléments du localStorage vers les page 2 et 3
            postBodyLink.addEventListener("click", () => {
                localStorage.setItem("selectedPostId", post.id); // Stockage de l'id pour la page 3
            });
            postNameLink.addEventListener("click", () => {
                localStorage.setItem("selectedPostName", post.userId); //Stockage de l'userId pour la page 2
            })
        });

        //Vérification des possibles erreurs
        } catch (error) {
        console.error(error);
    }
}

AfficherPost();