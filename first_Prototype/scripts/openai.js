// Browser-Side JavaScript Example
const apiUrl = 'http://127.0.0.1:5000/'; // Replace with the actual API endpoint

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
        document.getElementById('answer').innerHTML = response['response'];
        }
        throw new Error('Network response was not ok.');
    })
    .then(responseData => {
        console.log('Response from server:', responseData);
        console.log("response:"+responseData['response'])
        const chat = document.getElementById('chat');
        
        document.getElementById('answer').innerHTML = responseData['response'];
        // Handle the response data here
    })
    .catch(error => {
        console.error('There was a problem with the POST request:', error);
    });
    
    console.log("response:"+response['response'])
        document.getElementById('answer').innerHTML = response['response'];

    function displayAnswer(answer) {
        document.getElementById('answer').innerHTML = answer;
    }

} 

function submitForm(event) {
        event.preventDefault();
        const question = document.querySelector('input[name="question"]').value;
        askGpt(question);
}
