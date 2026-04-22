import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // 1. 요청 헤더에서 토큰을 추출하거나 사용자 정보를 확인하는 로직
    // 2. 인증/권한 로직 수행 (예: validateRequest(request))
    
    return validateRequest(request); // true면 통과, false면 403 Forbidden
  }
}  