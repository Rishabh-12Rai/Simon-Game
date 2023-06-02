var buttons=["red","blue","green","yellow"];
var gamePattern=[];
var player=[];

var started=false;
var level=0;
function nextseq(){
    player=[];
    level++;
    $("#level-title").text("Level "+level);
    var rand=Math.floor(Math.random()*4);
    var randomColor=buttons[rand];
    gamePattern.push(randomColor);
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextseq();
        started=true;
    }
});
$(".btn").click(function() {
    var userClick=$(this).attr("id");
    player.push(userClick);
    playSound(userClick);
    animateClick(userClick);
    checkPattern(player.length-1);
});

function playSound(name){
    var sound=new Audio("sounds/"+name+".mp3");
    sound.play();
}

function animateClick(current){
    $("#"+current).addClass("pressed");
    setTimeout(function(){
        $("#"+current).removeClass("pressed");
    },100);
}
function checkPattern(currentLevel){
    if(gamePattern[currentLevel]==player[currentLevel]){
        if(gamePattern.length==player.length){
        setTimeout(function(){
            nextseq();
        },1000);
    }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver(); 
    }
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}  