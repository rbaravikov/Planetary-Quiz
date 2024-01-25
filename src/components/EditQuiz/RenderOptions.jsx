const RenderOptions = ({ totalQuestions, option, handleOptionChange }) => {
    const options = []
    
    for (let i = 0; i < totalQuestions; i++) {
        options.push(
        <label key={i}>
            Incorrect answer {i + 1}:<br />
            <input type="text" value={option[i]} placeholder={`Ex. Orange cat`} onChange={(e) => handleOptionChange(i, e.target.value)}
            />
        </label>
        )
    }
    return <>{options}</>
}

export default RenderOptions