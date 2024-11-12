/// <reference types="cypress" />

describe('проверяем доступность приложения', function() {
  test('сервис должен быть доступен по адресу localhost:4000', function() {
    cy.visit('http://localhost:4000');
  });
});