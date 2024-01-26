const PatchQuiz = async (quizData, quizid, navigate, navigateTo) => {
    try {
      const apiUrl = ('http://localhost:4400/quiz/' + quizid)
      const resp = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      })

      if (resp.ok) {navigate(navigateTo)}

    } catch (err) {
      console.log(err);
    }
  }
  
  export { PatchQuiz };
  