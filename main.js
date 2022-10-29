var Voz = window.webkitSpeechRecognition;

var pessoa = new Voz();

var text = elemento("textbox");

function iniciar() {
    text.innerHTML = " "
    pessoa.start();

}
async function falar() {
    var API = window.speechSynthesis;
    var falaText = "";
    

    var i = 1;
    var seconds;

    while (i <= 3) {

        seconds = 5 * i;

        falaText = "tirando sua selfia em " + seconds + " segundos";        
        API.speak(new SpeechSynthesisUtterance(falaText));
        
        await sleep(seconds);
        
        photo();
        //save();
        i++;
        window.scrollTo(0, document.body.scrollHeight);
    };
}
async function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}



pessoa.onresult = function (event) {
    console.log(event)

    var context = event.results[0][0].transcript;
    console.log(context)
    text.innerHTML = context;


    if (text.value == "tire minha selfie") {
        falar()

        Webcam.attach(camera);
    }

}
camera = elemento("camera");
Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90
});

//Webcam.attach('#my_camera');

function photo() {
    Webcam.snap(function (data_uri) {
        elemento("result").innerHTML += "<img id = 'MySelfie' src = '" + data_uri + "'> "
    });

}
function save() {
    link = elemento("link");
    imagem = elemento("MySelfie").scr;
    link.href = imagem;
    link.click()
}

function elemento(nome) {
    return document.getElementById(nome);
}