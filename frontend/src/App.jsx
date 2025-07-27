import { useEffect, useState } from 'react'
import './App.css'
import StudentList from './StudentList'
import StudentForm from './StudentForm'
function App() {
  const [students, setStudents] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentStudent, setExistingStudent] = useState({})

  useEffect(() => {
    fetchStudents()
  },[])

  const fetchStudents = async () => {
    const response = await fetch("http://127.0.0.1:5000/students")
    const data = await response.json()
    setStudents(data.students)
    //console.log(data.students)
  }
  const closeModal = () => {
    setIsModalOpen(false)
    setExistingStudent({})
  }

  const openCreateModal = () => {
    if(!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (student) => {
    if(isModalOpen) return
    setExistingStudent(student)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchStudents()
  }

  return(
   <>
    <StudentList students ={students} updateStudent={openEditModal} updateCallback={onUpdate} />
    <button onClick={openCreateModal}> Create New Student </button>
    {isModalOpen && <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <StudentForm existingStudent={currentStudent} updateCallback={onUpdate}/>
        </div>
      </div>
}
    
    
  </>
  )
}

export default App
