from flask import request, jsonify
from config import app, db
from models import Student

@app.route("/students",methods=["GET"])
def get_students():
    students = Student.query.all()
    json_students = list(map(lambda x: x.to_json(),students))
    return jsonify({"students": json_students})

@app.route("/create_student", methods=["POST"])
def create_student():
    name = request.json.get("name")
    enrollment_year = request.json.get("enrollmentYear")
    email = request.json.get("email")
    major = request.json.get("major")

    if not name or not enrollment_year or not email or not major:
        return (
            jsonify({"message": "You should include all of the name, year, email and major of a student"}),
            400,
        )
    
    new_student = Student(name=name, enrollment_year=enrollment_year,email=email,major=major)
    try:
        db.session.add(new_student)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Student created successfully!"}), 201

@app.route("/update_student/<int:user_id>",methods=["PATCH"])
def update_student(user_id):
    student = Student.query.get(user_id)

    if not student:
        return jsonify({"message": "Student not found"}), 404
    
    data = request.json

    student.name = data.get("name", student.name)
    student.enrollment_year = data.get("enrollmentYear", student.year)
    student.email = data.get("email", student.email)
    student.major = data.get("major", student.major)

    db.session.commit()
    return jsonify({"message": "Student updated successfully"}), 200

@app.route("/delete_student/<int:user_id>", methods=["DELETE"])
def delete_student(user_id):
    student = Student.query.get(user_id)
    if not student:
        return jsonify({"message": "Student not found"}),404
    
    db.session.delete(student)
    db.session.commit()

    return jsonify({"message": "Student deleted successfully!"}),200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)