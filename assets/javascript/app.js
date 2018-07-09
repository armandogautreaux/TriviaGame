//1.- DOM Elements
var triviaContent = $('#trivia-content');
var timerContent = $('#stopwatch');

// 2. Global Variables
var correct = 0;
var answer = 0;
var incorrect = 0;
var notAnswered = 0;
var questionIndex = 0;
var time = 31;
var timerInterval = '';

// 3. Questions Objects (Question, Answers, AnswersSandBox)
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
    answersSandBox: [10, 2, 8, 'All cows died by sadness']
  },
  {
    q:
      'The ages of a mother and her graduate son add up to 66. The mother’s age is the son’s age reversed. How old are they?',
    answer: '42 and 24',
    answersSandBox: ['99 and 36', '42 and 24', '33 and 66', 'None of the above']
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

// 4. This function (attached to an on.click event) will trigger all the other functions.
var startTrigger = function() {
  triviaContent.empty();
  var startButton = $('<button>');
  startButton.text('Start');
  startButton.addClass('btn  btn-font p-4 btn-block btn-start');
  triviaContent.append(startButton);
};

// 5. This function will create each question and its answer.
var renderQuestion = function() {
  triviaContent.empty();
  time = 31;
  run();

  // 5.1 If there are still more questions, render the next one.
  if (questionIndex <= questions.length - 1) {
    // Var question will add its properties.
    var question = $('<h3>');
    question.addClass('mb-5');
    question.text(questions[questionIndex].q);
    triviaContent.append(question);

    // 5.2 The next for loop will create buttons to hold the answers.
    for (var i = 0; i < 4; i++) {
      var button = $('<button>');
      button.text(questions[questionIndex].answersSandBox[i]);
      button.addClass(
        'option btn btn-dark btn-font-inside btn-block warning p-3'
      );
      button.attr('data-value', questions[questionIndex].answersSandBox[i]);
      triviaContent.append(button);
    }
  }

  // 5.3 If there aren't more questions, render the end game screen.
  else {
    gameOver();
  }
};

// 6. This function grabs our last created .option class through a DOM Event (see 10.1) to select the answer.
var selectAnswer = function() {
  stop();
  if (questionIndex === questions.length) {
    return;
  }
  var answer = questions[questionIndex].answer;
  var optionValue = $(this).attr('data-value');
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

// 7. This gameOver function will be called in case that all of our answers are incorrect or time === 0
var gameOver = function() {
  stop();
  var message = $('<h1>');
  message.addClass('game-over mb-3');
  var scoreCorrects = $('<h3>');
  var scoreIncorrects = $('<h3>');
  var br = $('<br>');
  var btnRestart = $('<button>');
  message.text('Game Over');
  btnRestart.text('Restart');
  btnRestart.addClass('btn btn-font btn-block btn-restart mt-3');
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

// 8. This function will be call it everytime the user wants to restart the game.
function resetClick() {
  questionIndex = 0;
  incorrect = 0;
  correct = 0;
  renderQuestion();
}

// 9. STOPWATCH

// 9.1 This function makes the timer go backwards.
function run() {
  timerInterval = setInterval(decrement, 1000);
}

// 9.2 This function display the timer and set contidionals in case that time === 0
function decrement() {
  time--;
  timerContent.html('Time Remaining: ' + time + ' Seconds');
  if (time === 0) {
    stop();
    if (questionIndex === questions.length) {
      return;
    }
    alert('Out of time');
    incorrect++;
    questionIndex++;
    renderQuestion();
  }
}

// 9.3 This function stop the timer
function stop() {
  clearInterval(timerInterval);
}

// 10 DOM Events

// 10.1 This event render the question and answers when .btn-start is clicked.
$(document).on('click', '.btn-start', renderQuestion);

// 10.1 This event set the conditional of selectAnswer function when .option is clicked.
$(document).on('click', '.option', selectAnswer);

// 10.1 This event resets the game when .btn-restart is clicked.
$(document).on('click', '.btn-restart', resetClick);

// This is the calling of our main function.
startTrigger();
