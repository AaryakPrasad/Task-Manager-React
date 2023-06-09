import { useState } from "react"

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        if (!text) {
            alert('Please add text')
            return
        }
        onAdd({ text, day, reminder })
        setText('')
        setDay('')
        setReminder(false)
    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label htmlFor="task">Task:</label>
                <input type="text" placeholder="Add task" value={text} onChange={(e) => {
                    setText(e.target.value)
                }} />
            </div>
            <div className="form-control">
                <label htmlFor="date">Date and Time:</label>
                <input type="text" placeholder="Add date and time" value={day} onChange={(e) => {
                    setDay(e.target.value)
                }} />
            </div>
            <div className="form-control form-control-check ">
                <label htmlFor="reminder">Set Reminder:</label>
                <input type="checkbox" value={reminder} checked={reminder} onChange={(e) => {
                    setReminder(e.currentTarget.checked)
                }} />
            </div>
            <input
                className="btn"
                type="submit"
                value="Save task"
            />
        </form>
    )
}

export default AddTask