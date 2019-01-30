let socket;

const events = {
    hello(data){
        ui.onGameConnected(data);
    },
    noteCut(data, fullStatus){
            ui.noteCut(data, fullStatus);

    }
    ,
    songStart(data) {

    },
};

function connect(){
    socket =  new WebSocket("ws://localhost:6557/socket");
    socket.onmessage = (message) => {
        const json = JSON.parse(message.data);


            events[json.event](json.status, json);

    };

    socket.onclose = () => {
        setTimeout(connect, 5000);
    }
}

connect();