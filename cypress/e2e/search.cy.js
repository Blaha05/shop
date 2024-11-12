// searchTest.cy.js
describe('Search Functionality in HeadNav Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/'); // Відкриває головну сторінку вашого додатка
    });

    it('should navigate to search page when search term is entered and search icon is clicked', () => {
        const searchTerm = 'навушники'; // Змінна з тестовим терміном пошуку

        // Знаходить поле введення пошуку та вводить значення
        cy.get('.search-bar input[type="text"]').type(searchTerm);

        // Клікає на іконку пошуку
        cy.get('.search-bar i.material-icons').contains('search').click();

        // Перевіряє URL після навігації (включає закодовану версію терміну пошуку)
        cy.url().should('include', encodeURIComponent(searchTerm)); // використовуємо encodeURIComponent для правильного кодування
    });
});
