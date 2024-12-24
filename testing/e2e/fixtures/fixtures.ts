import { mergeTests } from "@playwright/test";
import { authFixture } from "./auth.fixture";
import { folderFixture } from "./folder/folder.fixture";
import { mapFixture } from "./map/map.fixture";

export const test = mergeTests(authFixture, mapFixture, folderFixture);
