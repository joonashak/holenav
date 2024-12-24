import { mergeTests } from "@playwright/test";
import { alertFixture } from "./alert/alert.fixture";
import { authFixture } from "./auth.fixture";
import { folderFixture } from "./folder/folder.fixture";
import { mapFixture } from "./map/map.fixture";
import { signatureFixture } from "./signature/signature.fixture";

export const test = mergeTests(
  authFixture,
  mapFixture,
  folderFixture,
  signatureFixture,
  alertFixture,
);
