prediction_1 ="";
prediction_2 ="";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
Webcam.attach("#camera");

function TakeSnapshot(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'>";
    });
}
console.log('version ml5',ml5.version);
var classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/uSdEud5h-/model.json',modelLoaded);

function modelLoaded(){
    console.log("model loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The first prediction is "+prediction_1;
    speak_data_2="And the second prediction is "+prediction_2;
var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
synth.speak(utterThis);
}

function check(){
    img=document.getElementById('captured_image');
classifier.classify(img, gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById('result_emotion_name').innerHTML=results[0].label;
        document.getElementById('result_emotion_name_2').innerHTML=results[1].label;
        prediction_1=results[0].label
        prediction_2=results[1].label
        speak();

        if(results[0].label=="sad"){
            document.getElementsById('update_emoji').innerHTML="&#128532";
        }

        if(results[0].label=="angry"){
            document.getElementsById('update_emoji').innerHTML="&#128548";
        }

        if(results[0].label=="happy"){
            document.getElementsById('update_emoji').innerHTML="&#128512;";
        }

        if(results[0].label=="confused"){
            document.getElementsById('update_emoji').innerHTML="&#128533;";
        }

        if(results[1].label=="sad"){
            document.getElementsById('update_emoji_2').innerHTML="&#128532";
        }

        if(results[1].label=="angry"){
            document.getElementsById('update_emoji_2').innerHTML="&#128548";
        }

        if(results[1].label=="happy"){
            document.getElementsById('update_emoji_2').innerHTML="&#128512;";
        }

        if(results[1].label=="confused"){
            document.getElementsById('update_emoji_2').innerHTML="&#128533;";
        }
    }
}