describe('Проверяем сценарии', function() {
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

  test('[#1] - тест добавления ингредиента в конструктор бургера', function() {
    // В конструкторе не должно быть элементов
    // Добавление ингредиента по клику
  });
});