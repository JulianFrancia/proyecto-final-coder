import app from "./src/app.js";

const PORT = process.env.PORT || 8080;
const esAdmin = true;

app.listen(PORT, () => {
    console.log(`escuchando en ${PORT}!`)
})