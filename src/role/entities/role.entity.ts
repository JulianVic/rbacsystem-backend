export class Role {
    roleKey: string;
    displayName: string;
    group?: string;
    details?: {
        sequence?: string;
        creationDate?: string;
        changeDate?: string;
        resourceOwner?: string;
    };
}
