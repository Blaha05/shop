// FotoBlock.cy.js
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import FotoBlock from '../../src/product/fotoblock';

describe('FotoBlock Component', () => {
    beforeEach(() => {
        // Інтерсепт для заміни реального API-запиту на фіктивні дані
        cy.intercept('GET', 'http://127.0.0.1:8000/getfotos?id=1', {
            statusCode: 200,
            body: [
                'foto.png',
                'foto.png',
                'foto.png'
            ],
        }).as('getFotos');
    });

    it('should fetch and display photos based on the ID in URL', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/fotoblock/1']}>
                <Routes>
                    <Route path="/fotoblock/:id" element={<FotoBlock />} />
                </Routes>
            </MemoryRouter>
        );

        // Очікуємо завершення API-запиту
        cy.wait('@getFotos');

        // Перевірка, чи було відображено зображення
        
    });
});
