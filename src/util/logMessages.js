exports.deleted = (tableName, id) => {
  return `Deleted '${tableName}' with ID '${id}' successfully`;
};

exports.created = (tableName, id) => {
  return `Created new '${tableName}' successfully`;
};

exports.updated = (tableName, id) => {
  return `Updated '${tableName}' with ID '${id}' successfully`;
};

exports.fetched = (tableName, id) => {
  return `Fetched '${tableName}' with ID '${id}' successfully`;
};

exports.fetchedAll = (tableName) => {
    return `Fetched all '${tableName}' successfully`;
  };
