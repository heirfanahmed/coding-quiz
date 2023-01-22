// div tag.
var timer = document.querySelector("#time");

// div and child button tags.
var startScreen = document.querySelector("#start-screen");
var start = document.querySelector("#start");

// div and child h2 and div tags.
var questionScreen = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var choicesArea = document.querySelector("#choices");

// div, child p tag and another child p tags child button tag.
var endScreen = document.querySelector("#end-screen");
var finalScore = document.querySelector("#final-score");
var submitButton = document.querySelector("#submit");

// create elemetns for answers.
var awnserlist = document.createElement("ol");
var awnser1 = document.createElement("button");
var awnser2 = document.createElement("button");
var awnser3 = document.createElement("button");
var awnser4 = document.createElement("button");

// append text for answers.
awnserlist.appendChild(awnser1);
awnserlist.appendChild(awnser2);
awnserlist.appendChild(awnser3);
awnserlist.appendChild(awnser4);
choicesArea.appendChild(awnserlist);

// audio tags.
var correctAudio = document.getElementById("correctSound");
var IncorrectAudio = document.getElementById("incorrectSound");

// variables for starting the quiz.
var playerscore = 0;
var time;
var timerInterval;
var scoreTextOut = "";

//Timer function
function Timer()
{
    timerInterval = setInterval(function()
    {
        time--;
        timer.textContent = time;
        if(time == 0)
        {
            clearInterval(timerInterval);
            TriggerEndScreen()
        }
    },1000
    );
}

//Start screen button listener
start.addEventListener("click", function()
{
    startScreen.textContent = "";
    StartQuestions()
    time = 75;
})

currentlyStored = localStorage.getItem("CurrentlyStored","")

//End screen submit button listener
submitButton.addEventListener("click", function()
{
    scoreTextOut = document.getElementById('initials').value+ " "+ playerscore
    if(currentlyStored == null)
    {
        console.log("1");
        localStorage.setItem("CurrentlyStored",1)
        localStorage.setItem("storedScores1",scoreTextOut)
    }
    if(currentlyStored == 1)
    {
        console.log("2");
        localStorage.setItem("CurrentlyStored",2)
        localStorage.setItem("storedScores2",scoreTextOut)
    }
    if(currentlyStored == 2)
    {
        console.log("3");
        localStorage.setItem("CurrentlyStored",3)
        localStorage.setItem("storedScores3",scoreTextOut)
    }
    if(currentlyStored == 3)
    {
        console.log("4");
        localStorage.setItem("CurrentlyStored",4)
        localStorage.setItem("storedScores4",scoreTextOut)
    }
    if(currentlyStored == 4)
    {
        console.log("5");
        localStorage.setItem("CurrentlyStored",5)
        localStorage.setItem("storedScores5",scoreTextOut)
    }
    if(currentlyStored == 5)
    {
        alert("HighScore storage full, max 5")
    }
})

var counter;

//Start question function
function StartQuestions()
{
    counter = 0;
    Timer() ;
    questionScreen.setAttribute("class","");
    PropegateAnswers(0);
}

awnserlist.addEventListener("click", function(event)
{
    var givenAwnser = event.target.textContent;
    var correctAwnser = questions[counter].correctAwnser;
    if (counter == questions.length-1)
    {
        if(givenAwnser == correctAwnser)
        {
            time += 15;
            counter++;
            correctAudio.play();
            TriggerEndScreen();
            clearInterval(timerInterval);
        }
        if(givenAwnser != correctAwnser)
        {
            time -= 15;
            counter++;
            IncorrectAudio.play();
            TriggerEndScreen();
            clearInterval(timerInterval);
        }
    }
    else
    {
        if(givenAwnser == correctAwnser)
            {
                time += 15;
                counter++;
                correctAudio.play();
                PropegateAnswers(counter);
            }
        if(givenAwnser != correctAwnser)
            {
                time -= 15;
                counter++;
                IncorrectAudio.play();
                PropegateAnswers(counter);
            }
        }
})

//Add answers to screen function
function PropegateAnswers(i)
{
    questionTitle.textContent = questions[i].questionText;
    awnser1.textContent = questions[i].answers[0];
    awnser2.textContent = questions[i].answers[1];
    awnser3.textContent = questions[i].answers[2];
    awnser4.textContent = questions[i].answers[3];
}

// Function to trigger end screen
function TriggerEndScreen()
{
    questionScreen.setAttribute("class","hide");
    endScreen.setAttribute("class","");
    finalScore.textContent = "Your final score is " + time;
    playerscore = time;
}