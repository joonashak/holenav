import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import getRequest from "../utils/get-request.util";
import { DEV_KEY, ENABLE_DEVTOOLS } from "src/config";

/**
 * Guard to require dev key passed in headers to protect API when dev tools are enabled.
 * 
 * Using a dev key is not required for dev tools to function. This guard is meant as a
 * lightweight protection for exposed APIs that want to have dev tools enabled, e.g.,
 * staging APIs, etc.
 */
@Injectable()
export class DevKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Apply guard only if dev tools are enabled and dev key is set.
    if (!ENABLE_DEVTOOLS || !DEV_KEY) {
      return true;
    }

    const request = getRequest(context);
    const userDevKey = request.headers.devkey || null;
    return userDevKey === DEV_KEY;
  }
}
