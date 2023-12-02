const apiUrl = 'http://127.0.0.1:5000/'; // Replace with the actual API endpoint


// performs http post request to server which uses openai library 
const askGpt = (question) => {
    console.log("test")
    fetch(apiUrl+"askgpt", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"question": question})
    })
    .then(response => {
        if (response.ok) {
        return response.json();
        console.log(response)
        console.log("response:"+response['response'])
        // document.getElementById('answer').innerHTML = response['response'];
        }
        throw new Error('Network response was not ok.');
    })
    .then(responseData => {
        console.log('Response from server:', responseData);
        console.log("response:"+responseData['response'])
        const chat = document.getElementById('chat');

        // update chat log
        addChatElement(responseData["response"]);
    })
    .catch(error => {
        console.error('There was a problem with the POST request:', error);
    });

    function displayAnswer(answer) {
        document.getElementById('answer').innerHTML = answer;
    }

}

var input;

// here is where the prompt is acquired
function submitPrompt(){
    input = document.getElementById("prompt").value;
    displayUserPrompt(input); // new way to display what the user has written

    displayAIAnswer("This is AI answering") // EXAMPLE of displaying AI answer, remove it when not needed
    // const answ = askGpt(input);
}

// here a link will be used to upload a text file of the book
function submitLink(){
    link = document.getElementById("link").value;
}



// !!!!!!!!!!!!!!!!!
// OBSOLETE FUNCTION, USE displayUserPrompt() and displayAIAnswer()
function addChatElement(outputString){
    
    // creates p element and adds it to chat div with prompt value
    var paragraph = document.createElement("p");
    console.log("outputString: "+outputString)
    paragraph.textContent = outputString;
    var chatDiv = document.getElementById("chat");
    chatDiv.appendChild(paragraph);
    
}



function submitSettings(){

    lockSettings();     // locking settings input boxes for the duration of upload
    uploadSettings();   // this method MUST be between lockSettings() and showChat()
    showChat();         // after settings are uploaded the UI will switch from settings panel to chat panel
}


// here the settings get sent to chatgpt
function uploadSettings(){

    let world = document.getElementById("world-input").value
    let protagonist = document.getElementById("protagonist-input").value
    let antagonist = document.getElementById("antagonist-input").value

    
    // compile the settings and send it to Chat-GPT 
    // place here all functionality related to the first prompt which applies settings of the ChatGPT
}

// calling this function displays what the user prompts in the chat 
function displayUserPrompt(text){
    let box = document.createElement("div");
    box.classList.add("chat-prompt-display");
    spawnChatBox(text, box)
}

// calling this function display what the AI answeres in the chat
function displayAIAnswer(text){
    let box = document.createElement("div");
    box.classList.add("chat-answer-display");
    spawnChatBox(text, box)
}



// this just constructs html structure
// its for UI only, ignore it
function spawnChatBox(text, box){
    let paragraph = document.createElement("p");
    paragraph.textContent = text;

    box.appendChild(paragraph)
    let chatDiv = document.getElementById("chat");

    chatDiv.appendChild(box);
}

// this function is a safety mechanism that disables all input boxes during the wait time between clicking the button and getting an answer from chatgpt
// its for UI only, ignore it
function lockSettings(){
    // all setting boxes will be turned off so no input can be changed
    let list = document.getElementsByClassName("setting");
    for (let i = 0; i < list.length; i++){
        list[i].disabled = true
    }
}

// show chat and hide settings
// its for UI only, ignore it
function showChat(){
    document.getElementById("settings-window").style.display = "none"
    document.getElementById("chat-window").style.display = "block"
}

// show settings and hide chat
// its for UI only, ignore it
function showSettings(){
    document.getElementById("chat-window").style.display = "none"
    document.getElementById("settings-window").style.display = "block"
}