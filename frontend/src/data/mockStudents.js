const starterStudents = [
  ['Aarav Sharma', 'CSE', '2nd Year', 8.7],
  ['Vivaan Patel', 'ECE', '1st Year', 9.1],
  ['Ananya Singh', 'ECE', '2nd Year', 7.8],
  ['Aditi Sharma', 'CSE', '3rd Year', 8.4],
  ['Ishaan Gupta', 'EEE', '4th Year', 9.3],
  ['Riya Sharma', 'Mechanical', '2nd Year', 8.9],
  ['Kabir Khan', 'Civil', '1st Year', 7.5],
  ['Meera Nair', 'CSE', '4th Year', 8.2],
  ['Arjun Reddy', 'IT', '3rd Year', 8.6],
  ['Priya Iyer', 'AI & DS', '2nd Year', 9.2],
  ['Advik Joshi', 'Mechanical', '1st Year', 7.9],
  ['Sara Thomas', 'Biotechnology', '3rd Year', 8.8],
  ['Reyansh Verma', 'CSE', '1st Year', 8.1],
  ['Diya Kulkarni', 'EEE', '4th Year', 9.0],
  ['Atharv Desai', 'Civil', '3rd Year', 7.6],
  ['Ira Menon', 'ECE', '2nd Year', 8.5],
  ['Vihaan Rao', 'IT', '4th Year', 8.3],
  ['Saanvi Kapoor', 'AI & DS', '1st Year', 9.4],
  ['Krish Malhotra', 'CSE', '3rd Year', 7.7],
  ['Anika Chatterjee', 'Biotechnology', '2nd Year', 8.9],
  ['Dhruv Bhat', 'Mechanical', '4th Year', 8.0],
  ['Myra Fernandes', 'ECE', '1st Year', 9.2],
  ['Rohan Sethi', 'IT', '2nd Year', 7.4],
  ['Tara Banerjee', 'AI & DS', '3rd Year', 8.7],
]

export const mockStudents = starterStudents.map(([name, department, year, cgpa], index) => {
  const [firstName, lastName] = name.toLowerCase().split(' ')
  return {
    id: `STU${String(index + 1).padStart(3, '0')}`,
    name,
    email: `${firstName}.${lastName}@studenthub.edu.in`,
    phone: `+91 ${String(9876500000 + (index * 13791)).replace(/(\d{5})(\d{5})/, '$1 $2')}`,
    department,
    year,
    cgpa,
    active: index !== 6 && index !== 14,
    photo: '',
  }
})

export const departments = ['CSE', 'ECE', 'EEE', 'IT', 'Mechanical', 'Civil', 'AI & DS', 'Biotechnology']
export const academicYears = ['1st Year', '2nd Year', '3rd Year', '4th Year']