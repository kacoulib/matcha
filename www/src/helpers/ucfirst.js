module.exports = function ucfirst(s)
{
  return s ? s.charAt(0).toUpperCase() + s.substr(1) : s;
};