song="";
leftWristX=0;
leftWristY=0;  
rightWristX=0;
writeWristY=0;  
scoreLeftWrist=0;
scoreRightWrist=0;

function preload()
{
    song = loadSound("unity.mp3");
}

function setup()
{
canvas=createCanvas(600,500);
canvas.position(650,300);

video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video, modelLoaded); 
poseNet.on('pose', gotPoses);
}



function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
   
}

function modelLoaded()
{
    console.log('posenet is activated.');
}

function gotPoses(results)
{
if(results.length>0)
{
    console.log(results);

scoreLeftWrist=results[0].pose.keypoints[9].score;
scoreRightWrist=results[0].pose.keypoints[10].score;
console.log("scoreRightWrist= "+scoreRightWrist);
console.log("scoreLeftWrist= " +scoreLeftWrist);

    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftwristX="+leftWristX+"leftwristY="+leftWristY);

    console.log(results);
    rightWristY=results[0].pose.rightWrist.y;
    rightWristX=results[0].pose.rightWrist.x;
    console.log("rightwristX="+leftWristX+"rightwristY="+leftWristY);



}
}

function draw()
{
image(video, 0,0,600,500);

fill("#0524f2");
stroke("#05f28b");
if(scoreRightWrist>0.2)
{


circle(rightWristX,rightWristY,20);

if(rightWristY>0&&rightWristY<=100)
{
document.getElementById("speed").innerHTML="speed-  0.5X";
song.rate(0.5);
}

else if(rightWristY>100&&rightWristY<=200)
{
    document.getElementById("speed").innerHTML="speed- 1x";
    song.rate(1);
}

else if(rightWristY>200&&rightWristY<=300)
{
    document.getElementById("speed").innerHTML="speed-1.5X";
    song.rate(1.5);
}
else if(rightWristY>300&&rightWristY<=400)
{
    document.getElementById("speed").innerHTML="speed-2X";
    song.rate(2);
}
else if(rightWristY>400&&rightWristY<=500)
{
    document.getElementById("speed").innerHTML="speed-2.5X";
    song.rate(2.5);
}
}

if(scoreLeftWrist>0.2)
{
circle(leftWristX,leftWristY,20);
InNumberleftWristY=Number(leftWristY);
remove_decimals=floor(InNumberleftWristY);
volume=remove_decimals/500; 
document.getElementById("Volume").innerHTML="Volume="+volume;
song.setVolume(volume);
}
}