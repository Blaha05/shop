describe('RegisterBox Component', () => {
    beforeEach(() => {
      // Запускаємо сервер, якщо потрібно
      cy.visit('http://localhost:3000/register'); // Замість цього вказуйте правильний шлях до вашої сторінки реєстрації
    });
  
    it('should allow the user to register and redirect to login page', () => {
      // Мокання API для реєстрації
      cy.intercept('POST', 'http://127.0.0.1:8000/register', {
        statusCode: 200,
        body: {
          message: 'Registration successful',
        },
      }).as('registerRequest');
  
      // Заповнення форми реєстрації
      cy.get('input[name="username"]').type('testuser');
      cy.get('input[name="email"]').type('testuser@example.com');
      cy.get('input[name="password"]').type('password123');
  
      // Натискання на кнопку "SEND"
      cy.get('button[type="submit"]').click();
  
      // Очікуємо, що буде виконано запит до API
      cy.wait('@registerRequest');
  
      // Перевірка, чи відбулося перенаправлення на сторінку входу
      cy.url().should('include', '/login');
    });
  
  });
  