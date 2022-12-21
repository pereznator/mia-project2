const app = require("./src/server");

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log(`Escuchando en puerto ${PORT}`);
});