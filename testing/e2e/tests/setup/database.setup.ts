import { test as setup } from "@playwright/test";

setup("Prepare database", async ({ request }) => {
  await request.get("http://localhost:4001/dev/reset");
  await request.get("http://localhost:4001/clone-bay-mocking/reset");
});
