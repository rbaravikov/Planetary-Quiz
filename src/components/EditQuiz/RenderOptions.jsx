import { IoMdCloseCircle } from "react-icons/io";
const RenderOptions = ({ totalQuestions, optionsArr, setOptionsArr, setTotalQuestions }) => {
    
    
    const handleOptionChange = (i, value) => {
        setOptionsArr((prevValue) => {
            const newOption = [...prevValue]
            newOption[i] = value
            return newOption
        })
      }

      const handleRemoveOption = (i) => {
        setOptionsArr((prevValue) => {
            const newOption = [...prevValue];
            newOption.splice(i, 1);
            setTotalQuestions(newOption.length)
            return newOption;
        });
    };

    const options = []

    for (let i = 0; i < totalQuestions; i++) {
        options.push(
        <label key={i}>
            Incorrect answer {i + 1}:<br />
            <input type="text" value={optionsArr[i] || ''} placeholder={`Ex. Orange cat`} onChange={(e) => handleOptionChange(i, e.target.value)}
            />
            <IoMdCloseCircle size={20} onClick={() => handleRemoveOption(i)} />
        </label>
        )
    }
    return <>{options}</>
}

export default RenderOptions