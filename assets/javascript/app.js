//1.- I started creating the variable triviaContent to store the DOM Element (to append my functions).
var triviaContent = $('#trivia-content');

// 2. I continued creating global variables to hold future contents
var correct = 0;
var answer = 0;
var incorrect = 0;
var notAnswered = 0;
var questionIndex = 0;

// 3. Next, I created the variable questions that holds an object with all questions and their respective elements.
var questions = [
  {
    q:
      'When asked how old she was, Beth replied "In two years I will be twice as old as I was five years ago". How old is she?',
    answer: '12',
    answersSandBox: [10, 12, 15, 20]
  },
  {
    q: 'Divide 40 by half and add ten. What is the answer?',
    answer: '90',
    answersSandBox: [40, 30, 120, 90]
  },
  {
    q: 'A farmer has 15 cows, all but 8 die. How many does he have left?',
    answer: '8',
    answersSandBox: [10, 2, 8, 'All the cows died by sadness']
  },
  {
    q:
      'The ages of a mother and her graduate son add up to 66. The mother’s age is the son’s age reversed. How old are they?',
    answer: '42 and 24',
    answersSandBox: ['99 and 36', '42 and 24', '33 and 66', 'none of the above']
  },
  {
    q:
      'There are 60 sweets in a jar. The first person took one sweet, and each consecutive person took more sweets than the person before, until the jar was empty. What is the largest number of people that could have eaten sweets from the jar?',
    answer: '10 people',
    answersSandBox: [
      '5 people',
      '60 people',
      '10 people',
      "There weren't enough sweets"
    ]
  }
];

// 4. This is the first function (attached to a on.click event) that will trigger all the other functions
var startTrigger = function() {
  triviaContent.empty();
  var startButton = $('<button>');
  startButton.text('Start');
  startButton.addClass('btn btn-primary btn-block btn-start');
  triviaContent.append(startButton);
};

// 5. This function will create each question and its answers
var renderQuestion = function() {
  triviaContent.empty();
  // If there are still more questions, render the next one.
  if (questionIndex <= questions.length - 1) {
    // I started creading a h4 element and storing it in a variable
    var question = $('<h4>');
    // The next step is to create text inside of my h4 - this text will be my first question
    question.text(questions[questionIndex].q);
    // I append this h4 to the trivia-content element that already exists in my html
    $('#trivia-content').append(question);
    // Trought the next for loop I created the buttons to hold the answers and follow the same steps to append the elements inside of the same html element.
    for (var i = 0; i < 4; i++) {
      var button = $('<button>');
      button.text(questions[questionIndex].answersSandBox[i]);
      button.addClass('option btn btn-block btn-outline-primary');
      button.attr('data-value', questions[questionIndex].answersSandBox[i]);
      $('#trivia-content').append(button);
    }
  }
  // If there aren't, render the end game screen.
  else {
    gameOver();
  }
};

//This function grabs our last created .class and apply an on.click event.
var selectAnswer = function() {
  if (questionIndex === questions.length) {
    return;
  }
  var answer = questions[questionIndex].answer;
  var optionValue = $(this).attr('data-value');
  console.log(optionValue);
  //Setting Conditional for winning
  if (optionValue === answer) {
    alert('Correct!');
    correct++;
  } else {
    alert('Wrong!');
    incorrect++;
  }
  questionIndex++;
  renderQuestion();
};

//This function will be called in case that all of our answers or time will no longer be postives
var gameOver = function() {
  var message = $('<h1>');
  message.text('Game Over');
  var scoreCorrects = $('<h3>');
  var scoreIncorrects = $('<h3>');
  var br = $('<br>');
  var btnRestart = $('<button>');
  btnRestart.text('Restart');
  btnRestart.addClass('btn btn-primary btn-block btn-restart');
  scoreCorrects.text('Correct: ' + correct);

  scoreIncorrects.text('Incorrect: ' + incorrect);

  triviaContent.append(
    br,
    message,
    br,
    scoreCorrects,
    br,
    scoreIncorrects,
    br,
    btnRestart
  );
};

//This function will be call everytime the user wants to restart the game - it's attached to a click event.
function resetClick() {
  questionIndex = 0;
  incorrect = 0;
  correct = 0;
  renderQuestion();
}

//This DOM events are related with all the opctions to select inside of the game.
$(document).on('click', '.btn-start', renderQuestion);
$(document).on('click', '.option', selectAnswer);
$(document).on('click', '.btn-restart', resetClick);

// This is the calling of our main function.
startTrigger();
