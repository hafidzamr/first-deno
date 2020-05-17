import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

// Setup Router
app.use(router.routes());
app.use(router.allowedMethods());

// Setup REST
router.get("/", (ctx) => {
  ctx.response.body = "Hello this is my first Deno land REST";
});

router.get("/post", async (ctx) => {
  const getData = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await getData.json();
  ctx.response.body = data;
});

router.get("/post/:id", async (ctx) => {
  const getPostData = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${ctx.params.id}`,
  );
  const data = await getPostData.json();
  ctx.response.body = data;
});

// Run Server
const port = 8000;
console.log(`http://localhost:${port}/`);
await app.listen({ port });
