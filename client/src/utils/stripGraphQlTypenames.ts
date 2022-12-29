import lodash from "lodash";
import deepdash from "deepdash-es";

const { omitDeep } = deepdash(lodash);

export const stripGraphQlTypenames = <T>(obj: T): T => omitDeep(obj, "__typename");
