let inputDir={x:0,y:0};
const foodSound= new Audio("./music/food.mp3");
const moveSound= new Audio("./music/move.mp3");
const gameOverSound= new Audio("./music/gameover.mp3");
const musicSound= new Audio("./music/music.mp3");
const scoreboad=document.getElementById("score");
const highScoreBox=document.getElementById("highScoreBox");
const music=document.getElementById("button");
let speed=3; 
let score=0;
let highScoreVal=0;
let lastPaintTime=0;
let check=true;
let snakeArr=[
    {x:13,y:15}
];
food={x:6 , y:7 };
let board=document.getElementById("board");

 function playAudio(){
    if(check){
        check=false;
        music.innerText="On Game Music";
    }
    else{
        check=true;
        music.innerText="Off Game Music";
    }
 }
function main(ctime){
    //music.play();
    window.requestAnimationFrame(main);// due to this main fucntuon if running infinilte times 
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 <1/speed){ // this is reducint the speed of reload
        return;
    }
    
    lastPaintTime=ctime;
    
    // window.requestAnimationFrame(main);
    gameEngine();
}


function isCollide(snakeArr){
    //return false;

    
    for(let index=1;index<snakeArr.length;index++){//if sake bites it self
        if(snakeArr[index].x===snakeArr[0].x && snakeArr[index].y===snakeArr[0].y ){
            return true;
        }
    }
    //snake cross the box
    if((snakeArr[0].x>18 || snakeArr[0].x<0) || (snakeArr[0].y>18 || snakeArr[0].y<0)){
        return true;
    }
    //else case
    return false;
}



// setting the local storage for string higsht score
highScoreBox.innerHTML=localStorage.getItem("highScore");
highScoreBox.innerHTML="Highest Score:" + localStorage.highScore;// this value is comming from the local storage
//localStorage.setItem("highScore",highScoreVal);
//highScoreBox.innerHTML="Highest Score:" + highScoreVal;


function gameEngine(){
    if(check){musicSound.play();}
    else{musicSound.pause();}
    //musicSound.play();
    
    //updating the snake arry adn food
    if(isCollide(snakeArr)){// if sanke gets hit with the wall 
        if(check){musicSound.pause();}
        //musicSound.pause();
        gameOverSound.play();
        inputDir={x:0, y:0};
        alert("game over");
        snakeArr = [{x:13, y:15}];
        if(check){musicSound.play();}
        //musicSound.play();
        score=0;
    }

    // if food is eaten
    if(snakeArr[0].x === food.x && snakeArr[0].y=== food.y){
        foodSound.play();
        score++;
        if(score%5==0){// incresing the speed of snake
            speed++;
            //console.log(speed);
        }
        scoreboad.innerHTML="Score: " + score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y })//add the element  in the start of arr
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-1)*Math.random()),y:Math.round(a+(b-1)*Math.random())};
        if(score>=localStorage.highScore){ //updating high score
            highScoreVal=score;
            // console.log("score is big");            
            localStorage.setItem("highScore",highScoreVal);// setting the local storage value
            highScoreBox.innerHTML="Highest Score:" + highScoreVal;// updating the score  
        }
    }
    
    
    // snake move
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};//destructuring  new object
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

    //display the snake and food
    //display the snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElemnt=document.createElement('div');
        snakeElemnt.style.gridRowStart =e.y;
        snakeElemnt.style.gridColumnStart=e.x;
        
        if(index===0){
            snakeElemnt.classList.add('head');// head is red in color
        }
        else{snakeElemnt.classList.add('snake');} // snake body  is purple in color
        board.appendChild(snakeElemnt); 
    }); 

    //Display food 
        foodElemnt=document.createElement('div');
        foodElemnt.style.gridRowStart =food.y;
        foodElemnt.style.gridColumnStart=food.x;
        foodElemnt.classList.add('food'); //food is yellow in color
        board.appendChild(foodElemnt); 
}




//main logic start here
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    // function startmusic(){
    //     return true;
    // }
    inputDir={x:0,y:1} //start of the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            // console.log("up");
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            // console.log("down ");
            inputDir.x=0;
            inputDir.y=1;
            break;

        case "ArrowLeft":
            // console.log("left");
            inputDir.x=-1;
            inputDir.y=0;
            break;

        case "ArrowRight":
            // console.log("right");
            inputDir.x=1;
            inputDir.y=0;
            break;
             
        default:
            break;

    }
});

