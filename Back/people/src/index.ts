import server from "./server";

const PORT = 8002;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
