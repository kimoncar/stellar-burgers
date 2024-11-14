import constructorSlice, { 
  addIngredient,
  initialState,
  moveDown,
  moveUp,
  nulledOrderModalData,
  removeIngredient
} from "../slices/constructorSlice";

// Редьюсер конструктора
const constructorSliceReducer = constructorSlice.reducer;

// Мокируем nanoid
jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn(() => 'mockIngredientId')
}));

describe('Проверяем constructorSlice', () => {
  /*
  describe('Проверяем исходное состояние', () => {
    it('[#1] - тест исходного состояния', () => {
      const store = testStore();
      expect(store.getState().constructorBurger).toEqual(initialState);
    });
  });
  */

  describe('Проверяем редьюсеры', () => {
    const testIngredientsData = [
      {
        "id": "mockIngredientId",
        "_id": "643d69a5c3f7b9001cfa093e",
        "name": "Филе Люминесцентного тетраодонтимформа",
        "type": "main",
        "proteins": 44,
        "fat": 26,
        "carbohydrates": 85,
        "calories": 643,
        "price": 988,
        "image": "https://code.s3.yandex.net/react/code/meat-03.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
        "__v": 0
      },
      {
        "id": "mockIngredientId",
        "_id": "643d69a5c3f7b9001cfa093f",
        "name": "Мясо бессмертных моллюсков Protostomia",
        "type": "main",
        "proteins": 433,
        "fat": 244,
        "carbohydrates": 33,
        "calories": 420,
        "price": 1337,
        "image": "https://code.s3.yandex.net/react/code/meat-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
        "__v": 0
      }
    ];

    const testIngredientData = {
      "id": "mockIngredientId",
      "_id": "643d69a5c3f7b9001cfa093f",
      "name": "Мясо бессмертных моллюсков Protostomia",
      "type": "main",
      "proteins": 433,
      "fat": 244,
      "carbohydrates": 33,
      "calories": 420,
      "price": 1337,
      "image": "https://code.s3.yandex.net/react/code/meat-02.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
      "__v": 0
    };

    it('[#1] - тест addIngredient', () => {
      const newState = constructorSliceReducer(initialState, addIngredient(testIngredientData));
      expect(newState.ingredients[0]).toEqual(testIngredientData);
      expect(newState.ingredients).toHaveLength(1);
    });

    it('[#2] - тест removeIngredient', () => {
      const testState = {
        ...initialState,
        ingredients: testIngredientsData
      };

      const newState = constructorSliceReducer(testState, removeIngredient(testIngredientData.id));
      expect(newState.ingredients).toEqual(initialState.ingredients);
      expect(newState.ingredients).toHaveLength(0);
    });

    it('[#3] - тест moveUp', () => {
      const testState = {
        ...initialState,
        ingredients: testIngredientsData
      };

      const newState = constructorSliceReducer(testState, moveUp(1));
      expect(newState.ingredients[0].name).toBe('Мясо бессмертных моллюсков Protostomia');
      expect(newState.ingredients[1].name).toBe('Филе Люминесцентного тетраодонтимформа');
    });

    it('[#4] - тест moveDown', () => {
      const testState = {
        ...initialState,
        ingredients: testIngredientsData
      };

      const newState = constructorSliceReducer(testState, moveDown(0));
      expect(newState.ingredients[0].name).toBe('Мясо бессмертных моллюсков Protostomia');
      expect(newState.ingredients[1].name).toBe('Филе Люминесцентного тетраодонтимформа');
    });

    it('[#5] - тест nulledOrderModalData', () => {
      const testState = {
        ...initialState,
        orderModalData: {
          _id: "test",
          status: "test",
          name: "test",
          createdAt: "test",
          updatedAt: "test",
          number: 1,
          ingredients: []
        }
      };

      const newState = constructorSliceReducer(testState, nulledOrderModalData());
      expect(newState.orderModalData).toBeNull();
    });
  });
});