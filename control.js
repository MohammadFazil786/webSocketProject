var body = document.getElementsByTagName("body");

var box = document.getElementsByClassName("box");
var pos = 0;
let myFirstPromise = new Promise((resolve,reject) =>{
     setTimeout(() =>{
        console.log('executed');
        resolve();
     },4000)
});
myFirstPromise.then((val)=>{
    console.log('entered');
    for(let i=0;i<3;i++){
        var newEle = document.createElement("p");
        newEle.innerHTML = "Hi its me";
        body[0].appendChild(newEle);
    }
});
setInterval(()=>{
    if(pos >= 150) {
        clearInterval();
    }
    else {
        pos += 1;
        box[0].style.left = pos+'px';
        console.log(new Date().getFullYear().toString()+'\n');
    }
},100);
console.log('45');

// fetch('http://localhost:3000/')
//       .then((res) =>{
//         return res.json();
//       })
//       .then((data) =>{
//         console.log(data.data);
//       })
//       .catch(err => console.log(err));

const output = document.getElementById('output');
        const ws = new WebSocket('ws://localhost:3000');

        ws.onmessage = (event) => {
            const newLines = document.createTextNode(event.data + '\n');
            output.appendChild(newLines);
            output.scrollTop = output.scrollHeight; // Scroll to the bottom
        };

        ws.onopen = () => {
            console.log('WebSocket connection opened');
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };