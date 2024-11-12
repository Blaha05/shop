// HeadNav.cy.js
import React from 'react';
import HeadNav from '../../src/main/head/head';

describe('HeadNav Component', () => {
    beforeEach(() => {
        // Очищаємо localStorage перед кожним тестом
        localStorage.clear();
    });

    it('should render the HeadNav component', () => {
        cy.mount(<HeadNav />);
        cy.get('.topbar').should('be.visible'); // перевірка наявності головного елемента
    });

    it('should display items in the cart', () => {
        // Задаємо значення кошика в localStorage
        const mockCartItems = [
            { id: 1, title: 'Product 1', price: 10 },
            { id: 2, title: 'Product 2', price: 15 }
        ];
        localStorage.setItem('cart', JSON.stringify(mockCartItems));

        cy.mount(<HeadNav />);

        // Відкриваємо кошик
        cy.get('.material-icons').contains('ballot').click({ force: true });

        // Перевірка, чи елементи з кошика відображаються
        cy.contains('Product 1').should('be.visible');
        cy.contains('Product 2').should('be.visible');
        cy.contains('10$').should('be.visible');
        cy.contains('15$').should('be.visible');
    });
});
