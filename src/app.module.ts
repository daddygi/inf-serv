import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import {
  Accounts,
  Announcements,
  Totals,
  UserInfo,
  UserPhoto,
} from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SecretClient } from '@azure/keyvault-secrets';
import { DefaultAzureCredential } from '@azure/identity';
import * as fs from 'fs';
import * as path from 'path';
// import { getAccessToken } from './auth/azure-auth-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      async useFactory(
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> {
        const keyVaultName = 'barangay-vault';
        // const token = await getAccessToken();

        const credential = new DefaultAzureCredential();
        const url = `https://${keyVaultName}.vault.azure.net`;
        const secretClient = new SecretClient(url, credential);

        const dbHost = await secretClient.getSecret('dbHost');
        const dbUsername = await secretClient.getSecret('dbUsername');
        const dbPassword = await secretClient.getSecret('dbPassword');
        const dbDatabase = await secretClient.getSecret('dbDatabase');
        const caCert = await secretClient.getSecret('CA-Cert');

        return {
          type: 'mysql',
          host: dbHost.value,
          username: dbUsername.value,
          password: dbPassword.value,
          database: dbDatabase.value,
          entities: [Accounts, UserInfo, Announcements, UserPhoto, Totals],
          synchronize: true,
          ssl: {
            ca: fs.readFileSync(path.resolve(__dirname, '../', caCert.value)),
            rejectUnauthorized: true,
          },
        };
      },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
