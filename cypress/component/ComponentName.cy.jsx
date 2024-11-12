// cypress/integration/boxProduct.spec.js
import React from 'react';
import { mount } from '@cypress/react';
import BoxProduct from '../../src/main/box_product/boxProduct';

describe('BoxProduct Component', () => {
  it('відображає продукти після завантаження', () => {
    // Мокаємо API відповіді, щоб не робити запити до сервера
    cy.intercept('GET', 'http://127.0.0.1:8000/getptoduct', {
      statusCode: 200,
      body: [
        {
          id: 1,
          title: 'Product 1',
          description: 'This is product 1',
          time: '1 hour ago',
        },
        {
          id: 2,
          title: 'Product 2',
          description: 'This is product 2',
          time: '2 hours ago',
        },
      ],
    }).as('getProducts');

    // Мокаємо ще один API запит для отримання фото
    cy.intercept('GET', 'http://127.0.0.1:8000/getfotos?id=1', {
      statusCode: 200,
      body: ['image1.jpg'],
    }).as('getPhotos1');

    cy.intercept('GET', 'http://127.0.0.1:8000/getfotos?id=2', {
      statusCode: 200,
      body: ['image2.jpg'],
    }).as('getPhotos2');

    mount(<BoxProduct />); // Монтую компонент BoxProduct

    // Чекаємо, поки запити завершаться
    cy.wait('@getProducts');
    cy.wait('@getPhotos1');
    cy.wait('@getPhotos2');

    // Перевіряємо, що продукти відображаються на сторінці
    cy.contains('Product 1').should('exist');
    cy.contains('Product 2').should('exist');
    cy.contains('This is product 1').should('exist');
    cy.contains('This is product 2').should('exist');
    cy.contains('1 hour ago').should('exist');
    cy.contains('2 hours ago').should('exist');
  });
});
