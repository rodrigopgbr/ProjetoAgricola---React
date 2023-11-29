import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';

// adicionar ao whitelist os modulos novos
export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'agrosystem-erp-web',
      storage,
      whitelist: ['auth', 'user'],
      transforms: [
        encryptTransform({
          secretKey: process.env.REACT_APP_SECRET,
          onError(error) {
            console.log(error);
          },
        }),
      ],
    },
    reducers
  );

  return persistedReducer;
};
