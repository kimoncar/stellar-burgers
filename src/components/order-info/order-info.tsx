import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getOrderSelector, getOrderThunk } from '../../slices/orderSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const ingredients: TIngredient[] = useSelector(
    (state) => state.ingredients.ingredientsData
  );
  const orderData = useSelector(getOrderSelector);
  const params = useParams();

  const orderNumber = Number(params.number);

  useEffect(() => {
    dispatch(getOrderThunk(orderNumber));
  }, [dispatch]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  console.log(orderInfo);

  return <OrderInfoUI orderInfo={orderInfo} />;
};
function useEffect(
  arg0: () => void,
  arg1: (import('redux-thunk').ThunkDispatch<
    {
      ingredients: import('../../slices/ingredientsSlice').IIngredientsState;
      constructorBurger: import('../../slices/constructorSlice').IConstructorState;
      user: import('../../slices/userSlice').IUserState;
      feed: import('../../slices/feedSlice').IFeedState;
      order: import('../../slices/orderSlice').IFeedState;
    },
    undefined,
    import('redux').UnknownAction
  > &
    import('redux').Dispatch<import('redux').UnknownAction>)[]
) {
  throw new Error('Function not implemented.');
}
