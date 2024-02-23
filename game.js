
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level =0;
var started = false;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});
function nextSequence(){
    userClickedPattern=[];
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
}
function checkAnswer(){
    if(userClickedPattern[userClickedPattern.length-1]===gamePattern[userClickedPattern.length-1]){
        if(userClickedPattern.length === gamePattern.length ){
            nextSequence();
        }
    }
        else{
            playSound("wrong");
            level =0;
            gamePattern=[];
            userClickedPattern=[];
            started = false;
            $("#level-title").text("Press A Key to Start");
        }
    
}
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}
$(".btn").click(function(){
    if(started){
        userChosenColor = this.getAttribute("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer();
        console.log(gamePattern);
        console.log(userClickedPattern);
    }else{
        playSound("wrong");
    }
})