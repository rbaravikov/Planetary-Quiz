const FetchQuizData = async (setQuizData, quizid) => {
    try {
    const resp = await fetch('http://localhost:4400/quiz/' + quizid)
    const data = await resp.json()
    
    setQuizData(data)
    } catch (err) {
        console.log(err);
    }
}

export default FetchQuizData