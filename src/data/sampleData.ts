export const sampleUsers = {
  'admin@ug.edu.gh': {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@ug.edu.gh',
    userType: 'admin',
    password: 'admin123'
  },
  'student123': {
    id: 'u1',
    name: 'John Doe',
    email: 'john@ug.edu.gh',
    dateOfBirth: '1999-05-15',
    gender: 'male',
    address: 'Commonwealth Hall',
    contactNumber: '0241234567',
    userType: 'student',
    universityId: 'student123',
    hallOfResidence: 'Commonwealth Hall',
    password: 'password123',
    subscription: {
      id: 's1',
      userId: 'u1',
      duration: 'quarterly',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      status: 'approved',
      price: 80
    }
  },
  'staff456': {
    id: 'u2',
    name: 'Jane Smith',
    email: 'jane@ug.edu.gh',
    dateOfBirth: '1985-08-22',
    gender: 'female',
    address: 'Faculty Housing',
    contactNumber: '0257894561',
    userType: 'staff',
    universityId: 'staff456',
    department: 'Computer Science',
    password: 'password123',
    subscription: {
      id: 's2',
      userId: 'u2',
      duration: 'monthly',
      startDate: '2024-02-01',
      endDate: '2024-02-29',
      status: 'pending',
      price: 30
    }
  },
  'john.public@gmail.com': {
    id: 'u3',
    name: 'Mike Johnson',
    email: 'john.public@gmail.com',
    dateOfBirth: '1990-03-10',
    gender: 'male',
    address: 'East Legon',
    contactNumber: '0201234567',
    userType: 'public',
    password: 'password123'
  },
  'student789': {
    id: 'u4',
    name: 'Sarah Williams',
    email: 'sarah@ug.edu.gh',
    dateOfBirth: '2000-08-15',
    gender: 'female',
    address: 'Volta Hall',
    contactNumber: '0231234567',
    userType: 'student',
    universityId: 'student789',
    hallOfResidence: 'Volta Hall',
    password: 'password123',
    medicalCondition: 'Asthma',
    subscription: {
      id: 's3',
      userId: 'u4',
      duration: 'annually',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'pending',
      price: 300
    }
  }
};