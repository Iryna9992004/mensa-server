import { CanActivate, ExecutionContext, UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new UnauthorizedException();
            }
            const token = authHeader.split(' ')[1];
            const user = this.jwtService.verify(token);
            req.user = user;
            return true;
        } catch (e) {
            console.log('JwtAuthGuard error:', e);
            throw new UnauthorizedException({ message: 'User is not authorized' });
        }
    }
}
