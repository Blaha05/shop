describe('LoginBox Component', () => {
  it('should render login form correctly', () => {
    cy.visit('http://localhost:3000/login'); // Припускаємо, що компонент рендериться на сторінці /login
    cy.get('input[name="username"]').should('be.visible'); // Перевіряємо, що поле для username видно
    cy.get('input[name="password"]').should('be.visible'); // Перевіряємо, що поле для password видно
    cy.get('button[type="submit"]').should('be.visible'); // Перевіряємо, що кнопка для сабміту є
  });

  it('should allow user to type in username and password fields', () => {
    cy.visit('http://localhost:3000/login');
    
    // Вводимо ім'я користувача та пароль
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('password123');
    
    // Перевіряємо, що значення введені в поля
    cy.get('input[name="username"]').should('have.value', 'testuser');
    cy.get('input[name="password"]').should('have.value', 'password123');
  });

  it('should send a POST request with correct data when form is submitted', () => {
    // Мокінг API запиту
    cy.intercept('POST', 'http://127.0.0.1:8000/auth', {
      statusCode: 200,
      body: { accessToken: 'fakeToken' },
    }).as('loginRequest');

    cy.visit('http://localhost:3000/login');
    
    // Вводимо дані в форму
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('password123');
    
    // Надсилаємо форму
    cy.get('button[type="submit"]').click();
    
    // Перевіряємо, що запит на логін відправлений
    cy.wait('@loginRequest').its('request.body').should('include', {
      email: 'testuser',
      password: 'password123',
    });

    // Перевіряємо, що дані зберігаються в localStorage
    cy.window()
          .its('localStorage')
          .invoke('getItem', 'accessToken')
  
  });

  
});
