
$(function () {
    var viewPortWidth = $(document.defaultView).width();
    console.log(viewPortWidth);
    if (viewPortWidth > 1000) {console.log("foxomg wodth"); $('body').addClass('wide'); } else if (viewPortWidth > 700) { $('body').addClass('standard'); } else if (viewPortWidth > 500) { $('body').addClass('narrow'); } else { $('body').addClass('extraNarrow'); }
});

let nickname = prompt("Please choose a nickname")
document.getElementById('nickname').innerHTML = nickname
//document.getElementById('formNickname').value = nickname
let urlParts = document.URL.split("/");
let roomId = urlParts[urlParts.length - 1].split("#")[0];
let messages = [];

const messageSection = document.getElementById("messageSection");


const updateMessages = messages => {

    for (let c of messageSection.children) {
        messageSection.removeChild(c);
    }

    const messageContainer = document.createElement("div");
    messageContainer.id = "messages";
    messageSection.appendChild(messageContainer);

    // messageContainer = document.getElementById('messages');
    messages.forEach(messageObject => {
        // create a container for individual message
        const message = document.createElement("div");
        message.classList.add("message");
        // e.g. create a div holding message content
        const messageContent = document.createElement("div");
        messageContent.classList.add("message-content")
        // create a text node "safely" with HTML characters escaped
        // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode}
        const messageText = document.createTextNode(messageObject.text);


        const messageHeaderHeader = document.createElement("h3");
        messageHeaderHeader.classList.add("header");
        messageHeaderHeader.innerHTML += "message Header";

        const messageHeaderContent = document.createElement("div");
        messageHeaderContent.classList.add("message-header");

        const messageHeaderName = document.createElement("div");
        messageHeaderName.classList.add("profile-name");
        messageHeaderName.innerText = messageObject.nickname;
        const messageHeaderDatetime = document.createElement("div");
        messageHeaderDatetime.classList.add("date");
        messageHeaderDatetime.innerText = moment(messageObject.created_at).format('LLL')

        messageHeaderContent.appendChild(messageHeaderName);
        messageHeaderContent.appendChild(messageHeaderDatetime);



        messageContent.appendChild(messageHeaderHeader);
        messageContent.appendChild(messageHeaderContent);
        // append the text node to the div

        const messageTextHeader = document.createElement("h3");
        messageTextHeader.classList.add("header");
        messageTextHeader.innerText = "message Text";
        messageContent.appendChild(messageTextHeader);
        messageContent.appendChild(messageText);

        // you may want to put more stuff here like time, username...
        message.appendChild(messageContent);


        const messageDiv = document.createElement("div");
        messageDiv.classList.add("messageWrapper");

        const messageHeader = document.createElement("h2");
        messageHeader.classList.add("header");
        messageHeader.innerHTML += "message";

        messageDiv.appendChild(messageHeader)

        message.tabIndex = 0;
        message.setAttribute("role", "main");

        // finally append your message into the message list
        messageContainer.appendChild(message);
    });
}

fetch('http://localhost:8080/' + roomId + '/info',
    {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        let roomName = data['name']
        document.getElementById('roomName').innerHTML = roomName
        roomId = data['id']
        messages = data['messages']
        updateMessages(messages);
    });
document.getElementById('messageSubmit').addEventListener('click', (event) => {
    event.preventDefault();
    let text = document.getElementById('text').value;
    document.getElementById('text').value = "";
    url = 'http://localhost:8080/' + roomId + '/message';
    payload = {
        "text": text,
        "nickname": nickname
    }
    axios.post(url, payload).then(response => {
        messages = response.data.messages
        updateMessages(messages);
    })
})

const updatePage = () => {

    fetch('http://localhost:8080/' + roomId + '/info',
    {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        messages = data['messages']
        updateMessages(messages);
    });

}

window.setInterval(updatePage, 3000);
