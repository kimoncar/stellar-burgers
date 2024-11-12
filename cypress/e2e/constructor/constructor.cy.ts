describe('Проверяем сценарии', function() {
  beforeEach(() => {
    // До проверок
    // Установить тестовые токены
    cy.setCookie('accessToken', 'accessTokenValue');
    localStorage.setItem('refreshToken', 'refreshTokenValue');

    // Перехватить запросы на сервер
    cy.intercept('GET', `api/auth/user`, { fixture: 'dataUser.json' }).as('getUser');
    cy.intercept('GET', `api/ingredients`, { fixture: 'dataIngredients.json' }).as('getIngredients');
    cy.intercept('POST', `api/orders`, { fixture: 'dataOrder.json' }).as('postOrder');

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

  describe('Проверка конструктора бургера', function() {
    it('[#1] - тест добавления ингредиента в конструктор бургера', function() {
      // В конструкторе не должно быть добавляемого ингредиента
      cy.get('[data-testid="burger-constructor"]').should('not.contain.text', 'Филе Люминесцентного тетраодонтимформа');

      // Добавление ингредиента по клику на кнопку
      cy.get('[data-testid="link-ingredient"]')
        .contains('Филе Люминесцентного тетраодонтимформа')
        .parents('li')
        .find('button')
        .click();

      // Проверка добавленного ингредиента  
      cy.get('[data-testid="burger-constructor"]').should('contain.text', 'Филе Люминесцентного тетраодонтимформа');
    });

    it('[#2] - тест создания заказа, закрытия модального окна (на "крестик"), очистки конструктора', function() {
      // В конструкторе не должно быть добавляемых ингредиентов
      cy.get('[data-testid="burger-constructor"]')
        .should('not.contain.text', 'Флюоресцентная булка R2-D3')
        .and('not.contain.text', 'Филе Люминесцентного тетраодонтимформа')
        .and('not.contain.text', 'Соус Spicy-X');
      
      // Добавление ингредиентов по клику на кнопку
      cy.get('[data-testid="link-ingredient"]')
        .contains('Флюоресцентная булка R2-D3')
        .parents('li')
        .find('button')
        .click();
      
      cy.get('[data-testid="link-ingredient"]')
        .contains('Филе Люминесцентного тетраодонтимформа')
        .parents('li')
        .find('button')
        .click();
      
      cy.get('[data-testid="link-ingredient"]')
        .contains('Соус Spicy-X')
        .parents('li')
        .find('button')
        .click();

      // Отправка заказа по клику на кнопку
      cy.get('[data-testid="burger-constructor"]')
        .find('button:contains("Оформить заказ")')
        .click();

      // Ожидание данных
      cy.wait('@postOrder');

      // Проверка открытия модального окна с результатом заказа
      cy.get('[data-testid="modal"]')
        .should('exist')
        .and('contain.text', '59069');
      
      // Проверка закрытия модального окна на "крестик"
      cy.get('[data-testid="icon-close-modal"]').click();
      cy.get('[data-testid="modal"]').should('not.exist');

      // Конструктор должен быть очищен от ингредиентов
      cy.get('[data-testid="burger-constructor"]')
        .should('not.contain.text', 'Флюоресцентная булка R2-D3')
        .and('not.contain.text', 'Филе Люминесцентного тетраодонтимформа')
        .and('not.contain.text', 'Соус Spicy-X');
    });
  });

  describe('Проверка просмотра ингредиентов', function() {
    it('[#1] - тест открытия и закрытия (на overlay) модального окна с описанием ингредиента', function() {
      // Список ингредиентов не должен быть пуст
      cy.get('[data-testid="ingredients-list"]')
        .should('contain.text', 'Флюоресцентная булка R2-D3')
        .and('contain.text', 'Филе Люминесцентного тетраодонтимформа')
        .and('contain.text', 'Соус Spicy-X');

      // Модальное окно должно быть закрыто
      cy.get('[data-testid="modal"]').should('not.exist');

      // Открытие модального окна с описанием ингредиента
      cy.get('[data-testid="link-ingredient"]')
        .contains('Флюоресцентная булка R2-D3')
        .click();

      // Проверка открытия модального окна с описанием ингредиента
      cy.get('[data-testid="modal"]')
        .should('exist')
        .and('contain.text', 'Флюоресцентная булка R2-D3');

      // Проверка закрытия модального окна на overlay
      cy.get('[data-testid="overlay-modal"]').click('left', { force: true });
      cy.get('[data-testid="modal"]').should('not.exist');
    });
  });
});