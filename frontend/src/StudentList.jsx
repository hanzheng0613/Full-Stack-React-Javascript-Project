import React from "react"

const StudentList = ({students, updateStudent, updateCallback}) => {
    const onDelete = async (id) => {
        try{
            const options = {
                method : "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_student/${id}`,options)
            if(response.status === 200){
                updateCallback()
            } else {
                console.error("Failed to delete the selected student")
            }
            } catch (error){
                alert(error)
            }
        }
    
    return <div>
        <h2>Students</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Enrollment Year</th>
                    <th>Email</th>
                    <th>Major</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student) => (
                    <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.enrollmentYear}</td>
                        <td>{student.email}</td>
                        <td>{student.major}</td>
                        <td>
                            <button onClick={() => updateStudent(student)}>Update</button>
                            <button onClick={() => onDelete(student.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default StudentList