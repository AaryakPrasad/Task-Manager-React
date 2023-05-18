import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react';
function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('https://my-json-server.typicode.com/armadamYT/FakeDB/tasks')
    const data = await res.json()
    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`https://my-json-server.typicode.com/armadamYT/FakeDB/tasks/${id}`)
    const data = await res.json()
    return data
  }

  const deleteTask = async (id) => {
    await fetch(`https://my-json-server.typicode.com/armadamYT/FakeDB/tasks/${id}`, { method: 'delete' })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const res = await fetch(`https://my-json-server.typicode.com/armadamYT/FakeDB/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json', },
      body: JSON.stringify(updTask)
    })
    const data = await res.json()
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  }
  const addTask = async (task) => {
    const res = await fetch(`https://my-json-server.typicode.com/armadamYT/FakeDB/tasks`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json', },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])


  }
  return (
    <Router>
      <div className="container">
        <Header title='Task Manager' onAdd={() => setShowAdd(!showAdd)} show={showAdd} />
        <Routes>
          <Route path='/Task-Manager-React' exact element={(
            <>
              {showAdd ? <AddTask onAdd={addTask} /> : ''}
              {tasks.length > 0 ? (
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
              ) : ('No tasks to show')
              }
            </>
          )} />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer className='footer' />
      </div>
    </Router>
  )
}

export default App;