import { Injectable } from '@nestjs/common';

@Injectable()
export class ConnService {
    
    async resetLine(){
        return { message: 'Line reseted successfully' }
    }

    async testConnectivity(){
        return { message: 'Line tested successfully' }
    }
    
    async facture(){
        return { message: 'Facture generated successfully' }
    }

}
