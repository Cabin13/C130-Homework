var song1= ""
var song2= ""
var leftWristX= 0
var leftWristY= 0
var rightWristX= 0
var rightWristY= 0
var leftWristScore= 0
var rightWristScore= 0
var songPlaying= ""

function preload() {
    song1= loadSound("Can't Catch Me Now.mp3")
    song2= loadSound("My Heart Will Go On.mp3")
}

function setup() {
    canvas= createCanvas(550,400)
    canvas.center()
    webcam= createCapture(VIDEO)
    webcam.hide()
    poseNet= ml5.poseNet(webcam, modelLoaded)
    poseNet.on("pose", gotPoses)
}

function gotPoses(results) {
    if (results.length>0) {
        console.log(results)
        rightWristX= results[0].pose.rightWrist.x
        rightWristY= results[0].pose.rightWrist.y
        leftWristX= results[0].pose.leftWrist.x
        leftWristY= results[0].pose.leftWrist.y
        console.log("Right and left wrist x and y are " + rightWristX + ", " + rightWristY + ", " + leftWristX + ", " + leftWristY)
        leftWristScore= results[0].pose.keypoints[9].score
        rightWristScore= results[0].pose.keypoints[18].score
    }
}

function modelLoaded() {
    console.log("model loaded")
}

function draw() {
    image(webcam, 0, 0, 550, 400)
    stroke("beige")
    fill("beige")
    songPlaying= song1.isPlaying()

    if (leftWristScore>0.2) {
        circle(leftWristX, leftWristY, 40)
        song2.stop()
    }

    if (songPlaying==false) {
        song1.play()
        document.getElementById("songName").innerHTML= "Can't Catch Me Now by Olivia Rodrigo"
    }

    if (rightWristScore>0.2) {
        circle(rightWristX, rightWristY, 40)
        song1.stop()
    }

    if (songPlaying==false) {
        song2.play()
        document.getElementById("songName").innerHTML= "My Heart Will Go On by Celine Dion"
    }
}
