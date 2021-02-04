const roleAdmin = async (req, res, next) =>
{
  const { role } = req.user;
  console.log(req.user)
  if (role !== 'admin')
  {
    return res.json({
          message : "Access forbiden"
       });
  }
  next()
}

const roleHote = async (req, res, next) =>
{
  const { role } = req.user;
  console.log(req.user)
  if (role !== 'hote')
  {
    return res.json({
          message : "Access forbiden"
       });
  }
  next()
}

const roleLocataire =  async (req, res, next) =>
{
  const { role } = req.user;
  console.log(req.user)
  if (role !== 'locataire')
  {
    return res.json({
          message : "Access forbiden"
       });
  }
  next()
}

const roleAdminHote = async (req, res, next) => {
  const { role } = req.user;
  console.log(req.user)
  if (role == "locataire")
  {
    return res.json({
          message : "Access forbiden"
       });
  }
  next()
}
const roleAdminLocataire = async (req, res, next) => {
  const { role } = req.user;
  console.log(req.user)
  if (role == "hote")
  {
    return res.json({
          message : "Access forbiden"
       });
  }
  next()
}

module.exports = {
  roleAdmin, 
  roleHote,
  roleLocataire,
  roleAdminHote,
  roleAdminLocataire
 
};
