// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { KeyVaultClient, KeyVaultClientOptions } from '@azure/keyvault';
// import { getAccessToken } from './azure-auth-config';

// @Injectable()
// export class KeyVaultProvider {
//   private client: KeyVaultClient;

//   constructor(private readonly configService: ConfigService) {
//     const options: KeyVaultClientOptions = {
//       vaultUrl: this.configService.get<string>('KEYVAULT_URI'),
//       credentials: {
//         getToken: async () => {
//           const token = await getAccessToken();
//           return token.accessToken;
//         },
//       },
//     };
//     this.client = new KeyVaultClient(options);
//   }

//   async getSecret(name: string) {
//     const secret = await this.client.getSecret(this.client.vaultUrl, name);
//     return secret.value;
//   }
// }
