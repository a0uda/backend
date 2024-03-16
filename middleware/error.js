
module.exports = (err, req, res, next) => {

  console.log("ana f errorrrrrrrrrrrrrr",err)
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
 
};
