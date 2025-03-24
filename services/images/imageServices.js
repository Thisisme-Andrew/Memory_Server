import { containerName } from './constants';
import { BlobServiceClient } from "@azure/storage-blob";

const filePath = "./test_image.jpeg";
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING);


// async function listContainers() {
//   let containers = blobServiceClient.listContainers();
//   for await (const container of containers) {
//       console.log(`Container Name: ${container.name}`);
//   }
// }
// listContainers();


export const uploadBlob = async (blobName) => {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  
  // await containerClient.createIfNotExists();

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.uploadFile(filePath);
  console.log(`File uploaded successfully. Request ID: ${uploadBlobResponse.requestId}`);
}

export const downloadBlob = async () =>  {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const downloadBlockBlobResponse = await blockBlobClient.downloadToFile("./downloaded-file.jpeg");
  console.log(`Downloaded successfully to "downloaded-file.jpeg".`);
}