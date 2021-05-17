module.exports = {
  format_date: (dateString) => {
    // Format date as MM/DD/YYYY
    return new Date(dateString).toLocaleDateString();
  }
};
