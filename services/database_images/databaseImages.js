// import { containerName } from './constants';
// import { BlobServiceClient } from "@azure/storage-blob";

// const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING);

// export const createBlob = async (containerName) =>  {
//   const containerClient = blobServiceClient.getContainerClient(containerName);
//   await containerClient.createIfNotExists();
// }

// export const listContainers = async () => {
//   let containers = blobServiceClient.listContainers();
//   for await (const container of containers) {
//       console.log(`Container Name: ${container.name}`);
//   }
//   return containers;
// }

// export const uploadBlob = async (containerName, blobName, file) => {
//   const containerClient = blobServiceClient.getContainerClient(containerName);
  
//   await containerClient.createIfNotExists();

//   const blockBlobClient = containerClient.getBlockBlobClient(blobName);
//   const stream = Readable.from(file.buffer);
//   const uploadOptions = { blobHTTPHeaders: { blobContentType: file.mimetype } };
  
//   await blockBlobClient.uploadStream(stream, file.buffer.length, undefined, uploadOptions);
//   console.log(`File uploaded successfully. Request ID: ${uploadBlobResponse.requestId}`);
// }

// export const downloadBlob = async (containerName, blobName) =>  {
//   const containerClient = blobServiceClient.getContainerClient(containerName);
//   const blockBlobClient = containerClient.getBlockBlobClient(blobName);

//   const downloadBlockBlobResponse = await blockBlobClient.downloadToFile("./downloaded-file.jpeg");
//   console.log(`Downloaded successfully to "downloaded-file.jpeg".`);
// }