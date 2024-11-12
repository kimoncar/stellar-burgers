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

  it('[#1] - тест добавления ингредиента в конструктор бургера', function() {

    // В конструкторе не должно быть добавляемого элемента
    cy.get('[data-testid="burger-constructor"]')
      .should('not.contain.text', 'Филе Люминесцентного тетраодонтимформа');

    // Добавление ингредиента по клику
    cy.get('[data-testid="link-ingredient"]')
      .contains('Филе Люминесцентного тетраодонтимформа')
      .parents('li')
      .find('button')
      .click();

    // Проверка добавленного ингредиента  
    cy.get('[data-testid="burger-constructor"]')
      .should('contain.text', 'Филе Люминесцентного тетраодонтимформа');
  });
});