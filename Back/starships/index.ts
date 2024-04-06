import server from "./src/server";

const PORT = 8004;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
