var input;

// here is where the prompt is acquired
function submitPrompt(){
    input = document.getElementById("prompt").value
   
    if (input != null){
        addChatElement()
    }
}

// here a link will be used to upload a text file of the book
function submitLink(){
    link = document.getElementById("link").value
}

// example functionality
function addChatElement(){
    // creates p element and adds it to chat div with prompt value
    var paragraph = document.createElement("p");
    paragraph.textContent = input;
    var chatDiv = document.getElementById("chat");

    chatDiv.appendChild(paragraph);
}