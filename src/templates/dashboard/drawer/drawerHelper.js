class DrawerHelper {
  setFavorite = (item, id, newValue) => {
    if (item.id && item.id === id) {
      item.isFavorite = newValue;
    }
  };

  updateFavorite = (data, id, value) => {
    const r = data.filter(o => {
      if (o.nodes) {
        o.nodes = this.updateFavorite(o.nodes, id, value);
      }
      if (o.id === id && (o.isFavorite === 0 || o.isFavorite === 1)) {
        o.isFavorite = value;
      }
      return true;
    });
    return r;
  };
}

export default new DrawerHelper();
