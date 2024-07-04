import fs from 'fs'

export const chooseRandom = (array = [], numItems) => {
  if (array.length <= 1) return array;
  numItems = numItems >= 1 && numItems <= array.length ? numItems : Math.floor(Math.random() * array.length) + 1;
  return Array.from({ length: numItems }, () => array[Math.floor(Math.random() * array.length)]);
}

export const createPrompt = ({ numQuestions = 1, numChoices = 2 } = {}) => {
  const prompts = [];

  for (let i = 1; i <= numQuestions; i++) {
    prompts.push({
      type: 'input',
      name: `question-${i}`,
      message: `Enter question ${i}`
    });
    for (let j = 1; j <= numChoices; j++) {
      prompts.push({
        type: 'input',
        name: `question-${i}-choice-${j}`,
        message: `Enter answer choice ${j} for question ${i}`
      });
    }
  }

  return prompts;
};

export const createQuestions = (questions = {}) => {
  const questionObjects = [];
  let questionNumber = 1;

  while (`question-${questionNumber}` in questions) {
    const question = questions[`question-${questionNumber}`];
    const choices = [];
    let choiceNumber = 1;

    while (`question-${questionNumber}-choice-${choiceNumber}` in questions) {
      choices.push(questions[`question-${questionNumber}-choice-${choiceNumber}`]);
      choiceNumber++;
    }

    questionObjects.push({
      type: 'list',
      name: `question-${questionNumber}`,
      message: question,
      choices
    });

    questionNumber++;
  }

  return questionObjects;
};

export const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
  })

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err =>
      err ? reject(err) : resolve('File saved successfully')
    )
  })
