from config import db

class Student(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100),unique=False,nullable=False)
    enrollment_year = db.Column(db.String(80),unique=False,nullable=False)
    email = db.Column(db.String(120),unique=True,nullable=False)
    major = db.Column(db.String(100),unique=False,nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "enrollmentYear": self.enrollment_year,
            "email": self.email,
            "major": self.major,
        }
