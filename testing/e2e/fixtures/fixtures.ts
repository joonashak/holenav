import { mergeTests } from "@playwright/test";
import { authFixture } from "./auth.fixture";

export const test = mergeTests(authFixture);
