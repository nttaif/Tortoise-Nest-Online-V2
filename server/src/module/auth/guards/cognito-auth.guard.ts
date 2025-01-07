import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { AllConfigType } from '../../config/config.type';

@Injectable()
export class CognitoAuthGuard implements CanActivate {
  private readonly verifier: any;

  constructor(private readonly configService: ConfigService<AllConfigType>) {
    this.verifier = CognitoJwtVerifier.create({
        userPoolId : this.configService.getOrThrow (
            'cognito.userPoolId' as keyof AllConfigType,
            {
                infer : true,
            },
        ),
        clientId : this.configService.getOrThrow (
            'cognito.clientId' as keyof AllConfigType,
            {
                infer : true,
            },
        ),
        tokenUse : 'access',
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
        throw new UnauthorizedException ('No token provided');
    }

    try {
      const payload = await this.verifier.verify(token);
      // Attach the user payload to the request object
      request.user = payload;
      return true;
    } catch (error) {
      console.log(error);
        throw new UnauthorizedException ('Invalid token');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
      const [type, token] = request.headers.authorization?.split (' ') ?? [];
      return type === 'Bearer' ? token : undefined;
  }
}
