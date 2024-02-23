
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
            setTimeout(function(){
                nextSequence();
            },1000);
            
        }
    }
        else{
           gameOver();
        }
    
}
function gameOver(){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    startOver();
    $("#level-title").text("Game Over.Press A Key from KeyBoard to Start");
}
function startOver(){
    level =0;
    gamePattern=[];
    userClickedPattern=[];
    started = false;
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
        gameOver();
    }
})