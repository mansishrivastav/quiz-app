// const URL = 'https://opentdb.com/api.php?amount=20&category=18&difficulty=medium&type=multiple';
const currentScore = document.getElementById("current-score");
const totalScore = document.getElementById("total-score");
const category = document.getElementById("category");
const question = document.getElementById("question");
const options = document.getElementById("options");
const nextQuestion = document.getElementById("next-question");
const quizOver = document.getElementById('quiz-over');
const message = document.getElementById('message');


let score = 0;
let selectedOption = null;
let optionSelected = false;
let fetchQuestion =false;
let questionCounter = 0;

const URL = 'https://opentdb.com/api.php?amount=1';

nextQuestion.addEventListener('click', ()=>{
    if(!fetchQuestion){
        if (questionCounter < 10) {
            fetchData();
        }else {
            quizOver.innerHTML = '<p>Quiz Over!</p>';
            nextQuestion.disabled = true;
        }
        if (questionCounter >= 10) {
            nextQuestion.disabled = true;
            nextQuestion.classList.add('disabled'); // Add the disabled class
        }
       
    }
   
})

const fetchData=async ()=>{
fetchQuestion = true;
try{
    const result = await fetch(URL);
    if(result.status===429){
        throw new Error("Too Many Requests")
    }
const data = await result.json()
console.log(data)
loadResult(data.results[0])
}catch(error){
console.log(error);
setTimeout(fetchData,0)
}
}

const loadResult =(data)=>{
question.innerText = '';
category.innerText = '';
options.innerHTML = "";
question.innerText= data.question
category.innerText=data.category
let correctAnswer=data.correct_answer;
let incorrectAnswers=data.incorrect_answers;
let optionList =incorrectAnswers;
optionList.splice(Math.floor(Math.random()*(incorrectAnswers.length+1)),0,correctAnswer)
optionSelected = false;
options.classList.remove('no-hover');
options.innerHTML = "";
optionList.forEach(option => {
  const listItem = document.createElement("li")  ;
  listItem.textContent=option;
  listItem.addEventListener('click', ()=>{
    if (!optionSelected){
        
            if(option===correctAnswer){
                listItem.style.background = '#009431ab';
                listItem.style.color= '#f2f2f2';
                score++;
                currentScore.textContent=score
            }else{
                listItem.style.background = '#eb3006c7';
                listItem.style.color= '#f2f2f2';
                options.querySelectorAll('li').forEach(item=>{
                    if(item.textContent===correctAnswer){
                       item.style.background = '#009431ab';
                        item.style.color= '#f2f2f2';
                    }
                })
            }
      
    }
    optionSelected = true;
    options.classList.add('no-hover');
  })
  options.appendChild(listItem)
  
})
fetchQuestion= false;
questionCounter++
}

fetchData()
