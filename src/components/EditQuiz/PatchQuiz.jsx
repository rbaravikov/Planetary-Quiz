const PatchQuiz = async (quizData, quizid) => {
    try {
      const apiUrl = ('http://localhost:4400/quiz/' + quizid)
  
      const resp = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      })
      
      console.log('Success')
    } catch (err) {
      console.log(err);
    }
  }
  
  export { PatchQuiz };
  