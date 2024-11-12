// NavBar.cy.js
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../../src/main/navbar/navbar';

describe('NavBar Component', () => {
    it('should render the NavBar component with expected elements', () => {
        // Рендеримо NavBar всередині MemoryRouter для маршрутизації
        cy.mount(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );

        // Перевірка, чи є головний елемент .sidebar
        cy.get('.sidebar').should('exist');

        // Перевірка, чи є елементи навігації
        cy.get('.nav-item').should('have.length', 7); // очікуємо 7 елементів з класом .nav-item

        // Перевірка наявності логотипу
        cy.get('.logo').should('contain.text', 'ByteMarket');

        // Перевірка кнопки входу (Sign In) і чи має правильне посилання
        cy.get('.nav-item').contains('Sign In').should('have.attr', 'href', 'login');

        // Перевірка кнопки реєстрації (Sign Up) і чи має правильне посилання
        cy.get('.nav-item').contains('Sign Up').should('have.attr', 'href', '/register');
    });
});
