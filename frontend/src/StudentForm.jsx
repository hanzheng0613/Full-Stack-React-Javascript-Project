import {useState} from "react"

const StudentForm = ({ existingStudent = {}, updateCallback }) => {
    const [name, setName] = useState(existingStudent.name || "")
    const [enrollmentYear, setEnrollmentYear] = useState(existingStudent.enrollmentYear || "")
    const [email,setEmail] = useState(existingStudent.email || "")
    const [major,setMajor] = useState(existingStudent.major || "")
    
    const updating = Object.entries(existingStudent).length !== 0
    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            name,
            enrollmentYear,
            email,
            major
        }
        const url = "http://127.0.0.1:5000/" + (updating ? `update_student/${existingStudent.id}`:"create_student")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url,options)
        if(response.status !== 200 && response.status !==201){
            const data = await response.json()
            alert(data.message)
        } else{
            updateCallback()
        }
    }
    return (
    <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="name">Name:</label>
            <input 
                type="text" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="enrollmentYear">Enrollment Year:</label>
            <input 
                type="text" 
                id="enrollmentYear" 
                value={enrollmentYear}
                onChange={(e) => setEnrollmentYear(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="major">Major:</label>
            <input
                type="text"
                id="major"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
            />
        </div>
        <button type="submit">{updating ? "Update" : "Create"} Student</button>
    </form>
    )
}
export default StudentForm