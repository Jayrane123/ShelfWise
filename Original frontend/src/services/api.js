// Mock data
const mockBooks = [
  {
    id: "1",
    title: "Effective Java",
    author: "Joshua Bloch",
    isbn: "978-0134685991",
    coverImage: "https://m.media-amazon.com/images/I/41zLQYAHZjL._SX376_BO1,204,203,200_.jpg",
    description: "The definitive guide to best practices in Java programming, covering language features and essential design patterns.",
    available: true
  },
  {
    id: "2",
    title: "Head First Java",
    author: "Kathy Sierra, Bert Bates",
    isbn: "978-0596009205",
    coverImage: "https://m.media-amazon.com/images/I/61fV6RcXGhL._SX430_BO1,204,203,200_.jpg",
    description: "A complete learning experience in Java programming, using a visually rich format to engage your mind.",
    available: true
  },
  {
    id: "3",
    title: "Java Concurrency in Practice",
    author: "Brian Goetz",
    isbn: "978-0321349606",
    coverImage: "https://m.media-amazon.com/images/I/51p9KDvDqFL._SX379_BO1,204,203,200_.jpg",
    description: "Comprehensive coverage of Java concurrency, helping developers write safe and high-performance concurrent applications.",
    available: false
  },
  {
    id: "4",
    title: "Spring Boot in Action",
    author: "Craig Walls",
    isbn: "978-1617294945",
    coverImage: "https://m.media-amazon.com/images/I/41JnORb9TiL._SX397_BO1,204,203,200_.jpg",
    description: "A practical guide to Spring Boot, showing how to develop cloud-ready Java applications.",
    available: true
  },
  {
    id: "5",
    title: "Clean Code in Java",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    coverImage: "https://m.media-amazon.com/images/I/41xShlnTZTL._SX376_BO1,204,203,200_.jpg",
    description: "A handbook of agile software craftsmanship, focusing on writing clean and maintainable Java code.",
    available: true
  },
  {
    id: "6",
    title: "Java Design Patterns",
    author: "Erich Gamma, Richard Helm",
    isbn: "978-0201633610",
    coverImage: "https://m.media-amazon.com/images/I/51szD9HC9pL._SX395_BO1,204,203,200_.jpg",
    description: "A comprehensive guide to design patterns in Java, with practical examples and use cases.",
    available: true
  }
];

// Mock users
const mockUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    role: "admin"
  },
  {
    id: 2,
    name: "Regular User",
    email: "user@example.com",
    role: "user"
  }
];

// API Class
class API {
  getStoredBooks() {
    const books = localStorage.getItem('books');
    return books ? JSON.parse(books) : [];
  }

  saveBooks(books) {
    localStorage.setItem('books', JSON.stringify(books));
  }

  async getBooks() {
    return this.getStoredBooks();
  }

  async addBook(book) {
    const books = this.getStoredBooks();
    books.push(book);
    this.saveBooks(books);
  }

  async deleteBook(bookId) {
    const books = this.getStoredBooks();
    const updatedBooks = books.filter(book => book.id !== bookId);
    this.saveBooks(updatedBooks);
  }

  async updateBook(bookId, updates) {
    const books = this.getStoredBooks();
    const bookIndex = books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
      books[bookIndex] = { ...books[bookIndex], ...updates };
      this.saveBooks(books);
    }
  }

  async searchBooks(query) {
    return new Promise((resolve) => {
      const results = this.getStoredBooks().filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.isbn.toLowerCase().includes(query.toLowerCase())
      );
      setTimeout(() => resolve(results), 500);
    });
  }

  async getBooksByCategory(category) {
    return new Promise((resolve) => {
      const results = this.getStoredBooks().filter(book => 
        book.title.toLowerCase().includes(category.toLowerCase()) ||
        book.author.toLowerCase().includes(category.toLowerCase()) ||
        book.isbn.toLowerCase().includes(category.toLowerCase())
      );
      setTimeout(() => resolve(results), 500);
    });
  }

  // Authentication
  async login(credentials) {
    return new Promise((resolve, reject) => {
      const user = mockUsers.find(u => u.email === credentials.email);
      if (user) {
        setTimeout(() => resolve(user), 500);
      } else {
        setTimeout(() => reject(new Error('Invalid credentials')), 500);
      }
    });
  }

  async signup(data) {
    return new Promise((resolve, reject) => {
      if (data.password !== data.confirmPassword) {
        reject(new Error('Passwords do not match'));
        return;
      }

      const existingUser = mockUsers.find(u => u.email === data.email);
      if (existingUser) {
        reject(new Error('User already exists'));
        return;
      }

      const newUser = {
        id: mockUsers.length + 1,
        name: data.name,
        email: data.email,
        role: 'user'
      };

      mockUsers.push(newUser);
      setTimeout(() => resolve(newUser), 500);
    });
  }
}

export const api = new API(); 