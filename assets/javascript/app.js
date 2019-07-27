$(document).ready(function(){
  
    // jQuery event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  let trivia = {
    // trivia properties
    correct: 0,
    wrong: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    // trivia questions options and answers data
    questions: {
      q1: 'In which year were the Academy Awards, or "Oscars", first presented?',
      q2: 'Which 90’s movie soundtrack is the best-selling soundtrack of all time?',
      q3: 'Who was the first African American actor to win the Academy Award for Best Actor?',
      q4: 'The Lord of the Rings movies are based on a novel by which author?',
      q5: 'Which Orson Welles movie mentioned the mysterious "rosebud" as the last word of the movie?',
      q6: 'What is the name of the ferocious tiger in "The Jungle Book" movie?',
      q7:  'Which movie has this famous quote, "It\'s not personal, it\'s strictly business"?',
      q8: 'What is the #1 Box Office hit movie of all time?',
      q9: '"After all, tomorrow is another day!" is the last line from which movie that won the Academy Award for Best Picture in 1939?',
      q10: 'Who is the director of the movie "the Gladiator" in 2000?',
    },
    options: {
      q1: ['1932','1929','1930','1920'],
      q2: ['Rush Hour', 'Home Alone', 'The Bodyguard', 'Forest Gump' ],
      q3: ['Richard Pryor','Sidney Poitier', 'Harry Belafonte', 'Danny Glover'],
      q4: ['J.K. Rowling', 'J.R.R. Tolkien','C.S.Lewis', 'George R.R. Martin'],
      q5: ['Touch of Evil', 'The Stranger', 'Citizen Kane', 'Black Magic' ],
      q6: ['Diego', 'Sher Khan', 'Ballu', 'Mowgli'],
      q7: ['The Godfather', 'Shawshank Redemption', 'Gone With the Wind', 'Gangs of New York'],
      q8: ['Avatar', 'Titanic', 'Avengers: Infinity War', 'Jurassic World'],
      q9: ['The Wizard of Oz', 'Mr. Smith Goes to Washington', 'Wuthering Heights', 'Gone With the Wind'],
      q10: ['Martin Scorsese', 'Quentin Tarantino', 'Ridley Scott', 'George Lucas'],
    },
    answers: {
      q1: '1929',
      q2: 'The Bodyguard',
      q3: 'Sidney Poitier',
      q4: 'J.R.R. Tolkien',
      q5: 'Citizen Kane',
      q6: 'Sher Khan',
      q7: 'The Godfather',
      q8: 'Avatar',
      q9: 'Gone With the Wind',
      q10: 'Ridley Scott',
    },
    
    // method to initialize game
    startGame: function(){
      // restarting game results
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.wrong = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      
      $('#quiz').show();
      
      
      $('#results').html('');
      
      
      $('#timer').text(trivia.timer);
      
      
      $('#start').hide();
  
      $('#remaining-time').show();
      
      // ask first question
      trivia.nextQuestion();
      
    },
    // method to loop through and display questions and options 
    nextQuestion : function(){
      
      
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
       $('#timer').text(trivia.timer);
      
      
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      
      let questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      
      let questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      // creates all the trivia guess options in the html
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    
    timerRunning : function(){
      
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        // adds results of game (correct, wrong, unanswered) to the page
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.wrong +'</p>'+
          '<p>Unanswered: '+ trivia.unanswered +'</p>'+
          '<p>Please try again!</p>');
        
        $('#quiz').hide();
    
        $('#start').show();
      }
      
    },
    // method to evaluate the option clicked
    guessChecker : function() {
      
      
      let resultId;
      
      let currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
       
      if($(this).text() === currentAnswer){
        
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      
      else{
        
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.wrong++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Try again later! '+ currentAnswer +'</h3>');
      }
      
    },
    
    guessResult : function(){
        
      trivia.currentSet++;     
      $('.option').remove();
      $('#results h3').remove();
      
      trivia.nextQuestion();   
    }
  
  }