describe('Проверяем конструктор бургера', function() {
  beforeEach(() => {
    // До проверок
    // Установить тестовые токены
    cy.setCookie('accessToken', 'accessTokenValue');
    localStorage.setItem('refreshToken', 'refreshTokenValue');

    // Перехватить запросы на сервер
    cy.intercept('GET', `api/auth/user`, { fixture: 'dataUser.json' }).as('getUser');
    cy.intercept('GET', `api/ingredients`, { fixture: 'dataIngredients.json' }).as('getIngredients');
    cy.intercept('POST', `api/orders`, { fixture: 'dataOrder.json' }).as('postOrders');

    // Открыть страницу и дождаться данные
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(() => {
    // После проверок
    // Удалить тестовые токены
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  test('сервис должен быть доступен по адресу localhost:4000', function() {
    cy.visit('http://localhost:4000');
  });
});