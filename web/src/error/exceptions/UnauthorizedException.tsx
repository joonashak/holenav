export class UnauthorizedException extends Response {
  constructor() {
    super(null, { status: 401 });
  }
}
