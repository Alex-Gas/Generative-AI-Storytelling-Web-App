var input;

function submitPrompt(){
    console.log("hello world")

    input = document.getElementById("prompt").value
   
    if (input != null){
        addChatElement()
    }
}

// example functionality
function addChatElement(){
    // creates p element and adds it to chat div with prompt value
    var paragraph = document.createElement("p");
    paragraph.textContent = input;
    var chatDiv = document.getElementById("chat");

    chatDiv.appendChild(paragraph);
}