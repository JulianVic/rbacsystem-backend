import { Injectable, ForbiddenException } from '@nestjs/common';
import { accessRequirements } from './access-requirements.config';
import { DecodedToken } from 'src/common/interfaces/token.interface';

@Injectable()
export class AccessControlService {
  private experienceLevels = ['junior', 'intermediate', 'senior'];

  authorizeAccess(decodedToken: DecodedToken): boolean {    
    // Extraer todos los roles del usuario
    const userRoles: string[] = [];
    const rolesUrn = decodedToken['urn:zitadel:iam:org:project:298723041083434695:roles'];
    
    if (rolesUrn && Object.keys(rolesUrn).length > 0) {
      userRoles.push(...Object.keys(rolesUrn));
    }

    if (userRoles.length === 0) {
      throw new ForbiddenException('No roles found');
    }

    
    const endpoint = decodedToken.endpoint;
    const endpointRequirements = accessRequirements[endpoint];
    if (!endpointRequirements) {
      throw new ForbiddenException('Endpoint not found in access control list');
    }
    console.log('Roles permitidos para este endpoint:', endpointRequirements);
    console.log('Roles del usuario:', userRoles);

    // Para cada rol del usuario
    for (const userRole of userRoles) {
      let experienceLevel: string = 'junior';
      
      // Intentar obtener el nivel de experiencia para este rol
      if (decodedToken[`${userRole}:exp`]) {
        experienceLevel = Buffer.from(decodedToken[`${userRole}:exp`], 'base64')
        .toString('utf-8');
      }
            
      // Verificar cada requerimiento del endpoint
      for (const requirement of endpointRequirements) {
        const requiredRole = requirement.role;
        const requiredExperienceLevel = requirement.experienceLevel;
                
        if (
          userRole === requiredRole &&
          this.experienceLevels.indexOf(experienceLevel) >=
          this.experienceLevels.indexOf(requiredExperienceLevel)
        ) {
          return true;
        }
      }
    }
    
    
    throw new ForbiddenException(
      `Access denied! Your roles (${userRoles.join(', ')}) do not have sufficient permissions to access ${endpoint}`,
    );
  }
}