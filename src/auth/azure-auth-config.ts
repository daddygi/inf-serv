// const { PublicClientApplication } = require('@azure/msal-node');

// async function getAccessToken() {
//   const msalConfig = {
//     auth: {
//       clientId: '3221a184-2d3f-4c40-9d9e-83682da5dac2',
//       clientSecret: 'bRb8Q~aNqugV4W7OMAmYyiRFIaQuIafdGEi.Fa6v',
//     },
//   };

//   const msalApp = new PublicClientApplication(msalConfig);

//   const tokenRequest = {
//     scopes: [`https://barangay-vault.vault.azure.net/.default`],
//     authority:
//       'https://login.microsoftonline.com/6f731b06-089d-46f3-b7a6-b11ab2f47e4c',
//   };

//   const tokenResponse = await msalApp.acquireTokenByClientCredential(
//     tokenRequest,
//   );

//   const accessToken = tokenResponse.accessToken;
//   return accessToken;
// }

// export { getAccessToken };
