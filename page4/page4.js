document.getElementById("unique-form").addEventListener("submit", async (event) => {
    event.preventDefault();

     const formData = {
         userId: document.getElementById("user-id").value.trim(),
         userName: document.getElementById("user-name").value.trim(),
         title: document.getElementById("postTitle").value.trim(),
         body: document.getElementById("content").value.trim(),
     };

     const feedback = document.getElementById("feedback");

//     // Utility: Display feedback
     const displayFeedback = (message, className) => {
        feedback.textContent = message;
        feedback.className = className;
     };

    // Validation
     if (!formData.userId || !formData.userName || !formData.title || !formData.body || Number(formData.userId) <= 0) {
        const errorMessage = !formData.userId || !formData.userName || !formData.title || !formData.body
            ? "Please fill all required fields."
             : "Please enter a valid positive user ID.";
         displayFeedback(errorMessage, "error");
         return;
     }

     try {
         displayFeedback("Submitting your post...", "loading");

         // Submit POST request
         const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: Number(formData.userId),
                title: formData.title,
                 body: formData.body,
             }),
        });

         if (!response.ok) {
             throw new Error(`Failed to create post (Status: ${response.status})`);
        }

         const data = await response.json();
         displayFeedback(`Post created successfully! New Post ID: ${data.id}`,);
    
        
            
//         // Log the post details
         logPost(formData);

         // Reset the form and feedback after successful submission
         document.getElementById("unique-form").reset();
         feedback.className = "";
    } catch (error) {
         displayFeedback(`Error: ${error.message}`, "error");
     }
 });

 // Log submitted post
const logPost = (formData) => {
    const logContainer = document.getElementById("post-log");

     // Create post wrapper
     const postDiv = document.createElement("div");
     postDiv.className = "logged-post";

     // This will display post details
     function createParagraph(label, value) {
        const paragraph = document.createElement("p");
        paragraph.textContent = `${label}: ${value}`;
        return paragraph;
    }
    
    // Using the function to create paragraphs
    const userIdParagraph = createParagraph("User ID", formData.userId);
    const userNameParagraph = createParagraph("Name", formData.userName);
    const postTitleParagraph = createParagraph("Title", formData.title);
    const postBodyParagraph = createParagraph("Message", formData.body);
    
     // Create delete button
     const deleteButton = document.createElement("button");
     deleteButton.textContent = "Delete";
     deleteButton.className = "delete-btn";
     deleteButton.addEventListener("click", () => {
        logContainer.removeChild(postDiv);
     });

    // Append all elements to the postDiv
    postDiv.appendChild(userIdParagraph);
    postDiv.appendChild(userNameParagraph);
    postDiv.appendChild(postTitleParagraph);
    postDiv.appendChild(postBodyParagraph);
    postDiv.appendChild(deleteButton);

     // Append the postDiv to the log container
    logContainer.appendChild(postDiv);
};
