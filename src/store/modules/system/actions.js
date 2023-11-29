export function stateDrawer(state) {
  return {
    type: '@system/STATE_DRAWER',
    payload: { state },
  };
}

export function updateDrawerItens(itens) {
  return {
    type: '@system/UPDATE_DRAWER_ITENS',
    payload: { itens },
  };
}

export function enableLoaderDrawer() {
  return { type: '@system/ENABLE_LOADER_DRAWER' };
}

export function disableLoaderDrawer() {
  return { type: '@system/DISABLE_LOADER_DRAWER' };
}

export function errorLoaderDrawer() {
  return { type: '@auth/ERROR_LOADER_DRAWER' };
}
