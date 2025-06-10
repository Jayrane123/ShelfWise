const ADMIN_CODE = 'ADMIN123'; // In a real app, this would be stored securely

class AuthService {
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password) {
    if (password.length < 8) {
      return { isValid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/[0-9]/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one number' };
    }
    return { isValid: true, message: '' };
  }

  validateStudentId(studentId) {
    return /^[A-Z0-9]{8,}$/.test(studentId);
  }

  getStoredUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }

  saveUser(user) {
    const users = this.getStoredUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  async register(data) {
    // Email validation
    if (!this.validateEmail(data.email)) {
      return { success: false, message: 'Invalid email format' };
    }

    // Password validation
    const passwordValidation = this.validatePassword(data.password);
    if (!passwordValidation.isValid) {
      return { success: false, message: passwordValidation.message };
    }

    // Check if user already exists
    const users = this.getStoredUsers();
    if (users.some(user => user.email === data.email)) {
      return { success: false, message: 'User with this email already exists' };
    }

    // Role-specific validation
    if (data.role === 'admin') {
      if (!data.adminCode || data.adminCode !== ADMIN_CODE) {
        return { success: false, message: 'Invalid admin code' };
      }
    } else {
      // Student validation
      if (!data.studentId || !this.validateStudentId(data.studentId)) {
        return { success: false, message: 'Invalid student ID format' };
      }
      if (!data.department) {
        return { success: false, message: 'Department is required' };
      }
    }

    // Create new user
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      email: data.email,
      role: data.role,
      department: data.department,
      studentId: data.studentId
    };

    // Save user data
    this.saveUser(newUser);
    
    // Save password separately (in real app, this would be hashed)
    localStorage.setItem(`password_${newUser.id}`, data.password);

    return { success: true, message: 'Registration successful' };
  }

  async login(credentials) {
    const users = this.getStoredUsers();
    const user = users.find(u => u.email === credentials.email);

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const storedPassword = localStorage.getItem(`password_${user.id}`);
    
    // For debugging
    console.log('Login attempt:', {
      email: credentials.email,
      providedPassword: credentials.password,
      storedPassword,
      user
    });

    if (storedPassword !== credentials.password) {
      return { success: false, message: 'Invalid password' };
    }

    // Store current user
    localStorage.setItem('currentUser', JSON.stringify(user));

    return { success: true, message: 'Login successful', user };
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}

export const authService = new AuthService(); 