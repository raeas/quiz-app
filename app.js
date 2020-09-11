/**
 * Example store structure
 */
const store = {
    title: 'Library Fan Quiz',
  // 5 or more questions are required
    questions: [
    {
      question: 'Who was the Dewey Decimal Classification system named after?',
      answers: [
        'Melvil Dewey',
        'John Dewey',
        'Thomas Dewey',
        'George Dewey'
      ],
      correctAnswer: 'Melvil Dewey'
    },
    {
      question: 'The Bible is found in what call number range of the Dewey Decimal Classification system?',
      answers: [
        '220s',
        '540s',
        '830s',
        '945s'
      ],
      correctAnswer: '220s'
    },
    {
      question: 'What is the Library of Congress Subject Heading for books about yarn that is used for street art and/or graffiti?',
      answers: [
        'Guerrilla Knitting',
        'Crochet Graffiti',
        'Yarn Bombing',
        'Urban Yarning'
      ],
      correctAnswer: 'Yarn Bombing'
    },
    {
      question: 'What year was the last card for a card catalog printed by OCLC?',
      answers: [
        '1999',
        '2003',
        '2009',
        '2015'
      ],
      correctAnswer: '2015'
    },
    {
      question: 'What was the name of the 1984 film that featured the character “Alice, the Librarian”?',
      answers: [
        'Sixteen Candles',
        'Ghostbusters',
        'The Karate Kid',
        'Footloose'
      ],
      correctAnswer: 'Ghostbusters'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};


/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */


$('#quiz-title').html(store.title)

/********** TEMPLATE GENERATION FUNCTIONS **********/
// These functions return HTML templates

//Start quiz template
function startQuizContainer(){
  $('main').html(`
    <div class='start-quiz-contanier'>
      <h3>Are you a library super-fan?</h3>
      <h4>Take this quiz to find out!</h4>
      <button id='start-btn' class="focus" type='submit'>Start Quiz</button>
      </div>
  `)
  startButton();
};

//show question container when user clicks "start quiz"
function questionContainer(){
  const currentQuestion = store.questions[store.questionNumber]
  let choices = "";
  for (let i = 0; i < currentQuestion.answers.length; i++){
    choices += `<input id="option-${i}" class="focus" name="option" type="radio" value="${currentQuestion.answers[i]}" required />
    <label for="option-${i}">${currentQuestion.answers[i]}</label><br>`
  };  
  $('main').html(`
  <div class='question-container'>
    <div class='quiz-progress'>
      <p>Question ${store.questionNumber + 1} of ${store.questions.length}</p>
    </div>
    <div class='question-form-container'>
      <form class='question-form'>
        <h3>${store.questions[store.questionNumber].question}</h3>
        ${choices}
        <button id='submit-btn' class="focus" type='button'>Submit Answer</button>
      </form>
    </div>
    <div class='quiz-score'>
      <p>Correct Answers: ${store.score}</p>
    </div>
  </div>
  `)
  submitButton();
};

//correct feedback container
function correctFeedbackContainer(){
  let correctChoice = store.questions[store.questionNumber].correctAnswer;
  sumCorrectAnswers();
  if (store.questions.length === store.questionNumber +1){
	    $('main').html(`
			<div class="correct-feedback-container">
				<div class='quiz-progress'>
					<p>Question ${store.questionNumber + 1} of ${store.questions.length}</p>
				</div>
				<div class="question-feeback">
					<h3>Way to go!</h3>
					<h3>${correctChoice} is correct.</h3>
					<button id="results-btn" class="focus" type="button">See Results</button>
				</div>
				<div class="quiz-score">
					<p>Correct Answers:  ${store.score}</p>
				</div>
			</div>
		`)
		seeResultsButton();
	} else {
	    $('main').html(`
			<div class="correct-feedback-container">
				<div class='quiz-progress'>
					<p>Question ${store.questionNumber + 1} of ${store.questions.length}</p>
				</div>			
				<div class="question-feeback">
					<h3>Way to go!</h3>
					<h3>${correctChoice} is correct.</h3>
					<button id="next-btn" class="focus" type="button">Next Question</button>
				</div>
				<div class="quiz-score">
					<p>Correct Answers:  ${store.score}</p>
				</div>
			</div>
		`)
		nextQuestionButton();  
  }
}; 

//incorrect feedback container
function incorrectFeedbackContainer(){
  let incorrectChoice = $("input[name='option']:checked").val();
  let correctChoice = store.questions[store.questionNumber].correctAnswer;
  if (store.questions.length === store.questionNumber + 1) {
	  $('main').html(`
		<div class="incorrect-feedback-container">
				<div class='quiz-progress'>
					<p>Question ${store.questionNumber + 1} of ${store.questions.length}</p>
				</div>
			<div class="question-feeback">
				<h3>${incorrectChoice} is not correct.</h3>
				<h3>The correct answer is ${correctChoice}.</h3>
				<button id="results-btn" class="focus" type="button">See Results</button>
			</div>
			<div class="quiz-score">
				<p>Correct Answers: ${store.score}</p>
			</div>
		</div>
		`)
		seeResultsButton();
  } else {
		$('main').html(`
			<div class="incorrect-feedback-container">
				<div class='quiz-progress'>
					<p>Question ${store.questionNumber + 1} of ${store.questions.length}</p>
				</div>
				<div class="question-feeback">
					<h3>${incorrectChoice} is not correct.</h3>
					<h3>The correct answer is ${correctChoice}.</h3>
					<button id="next-btn" class="focus" type="button">Next Question</button>
				</div>
				<div class="quiz-score">
				<p>Correct Answers: ${store.score}</p>
			</div>
		</div>
		`)
  nextQuestionButton();
  }
};

//end page
function endOfQuizContainer() {
  $('main').html(`
	<div class="end-quiz-container">
    <h2>This is the end of the quiz.</h2>
	<h3>You anwered ${store.score} out of ${store.questions.length} questions correctly.</h3>
	<button id="restart-btn" class="focus" type="button">Re-Start Quiz</button>
	</div>
	`)
	restartQuizButton();
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
// Not sure what this means??



/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

//iterate through questions
function iterateQuestions(){
  store.questionNumber = store.questionNumber + 1;
}


//if answer is correct, add +1 to score
function sumCorrectAnswers(){
  store.score = store.score + 1;
}

//start button function
function startButton(){
  $('main').on('click', '#start-btn', (event) => {
    questionContainer();
  });
};

//submit button function
function submitButton(){
  $('main').off('click', '#submit-btn').on('click', '#submit-btn', (event) => {
  let selectedChoice = $("input[name='option']:checked").val();
  let correctChoice = store.questions[store.questionNumber].correctAnswer
  if (selectedChoice === correctChoice) {
    correctFeedbackContainer();
     } else {
      incorrectFeedbackContainer();  
    }  
  });
};

//next button function
function nextQuestionButton(){
  $('main').off('click', '#next-btn').on('click', '#next-btn', (event) => {
    iterateQuestions();
    if (store.questions.length > store.questionNumber) {
      questionContainer();
    };
  });
};

//see results button
function seeResultsButton(){
	$('main').off('click', '#results-btn').on('click', '#results-btn', (event) => {
		endOfQuizContainer();
	});
};

//restart quiz button
function restartQuizButton() {
	$('main').off('click', '#restart-btn').on('click', '#restart-btn', (event) => {
		startQuizContainer();
		location.reload(true);
	});
};


//other functions

//function to load start of quiz
function handleQuiz(){
  startQuizContainer();
}

//when page loads call `handleQuiz`
handleQuiz();