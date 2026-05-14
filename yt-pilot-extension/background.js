const serverUrl = 'ws://192.168.0.132:8080';
let socket;

function connect() {
    socket = new WebSocket(serverUrl);

    socket.onopen = () => console.log("Extension connected with a server");

    socket.onmessage = (event) => {
        const command = event.data;
        browser.tabs.query({ url: "*://*.youtube.com/watch*" }).then((tabs) => {
            for (let tab of tabs) {
                browser.tabs.sendMessage(tab.id, { action: command });
            }
        });
    };

    socket.onclose = () => {
        console.log("Disconnected, try again in 3s...");
        setTimeout(connect, 3000);
    };
}

connect();