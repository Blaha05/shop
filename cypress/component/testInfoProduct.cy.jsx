// ProductInfo.cy.js
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductInfo from '../../src/product/productblock';

describe('ProductInfo Component', () => {
    beforeEach(() => {
        // Перехоплюємо запит до API та повертаємо фіктивні дані
        cy.intercept('GET', 'http://127.0.0.1:8000/getoneptoduct/1', {
            statusCode: 200,
            body: {
                title: 'Test Product',
                description: 'This is a test product description',
                price: 25,
            },
        }).as('getProduct');
        
        // Очищаємо localStorage перед кожним тестом
        localStorage.clear();
    });

    it('should add product to cart when "Add to Cart" button is clicked', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/product/1']}>
                <Routes>
                    <Route path="/product/:id" element={<ProductInfo />} />
                </Routes>
            </MemoryRouter>
        );

        // Очікуємо завершення API-запиту
        cy.wait('@getProduct');

        // Натискаємо кнопку "Add to Cart"
        cy.get('.card').contains('Add to Cart').click();

        // Додаємо очікування, щоб перевірити, чи продукт додається до localStorage
        cy.wait(500).then(() => {
            const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
            expect(cartItems).to.have.length(1);
            expect(cartItems[0]).to.deep.equal({
                title: 'Test Product',
                description: 'This is a test product description',
                price: 25,
            });
        });
    });
});
