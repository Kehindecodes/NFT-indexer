# NFT Indexer

![NFT Indexer](https://github.com/your-username/nft-indexer/blob/main/logo.png)

NFT Indexer is an application that utilizes the Alchemy SDK rigged to Alchemy's Enhanced APIs to display all non-fungible tokens (NFTs) associated with a specific Ethereum address. This project aims to provide users with an easy way to view their NFT collection and offers various features and improvements to enhance the user experience.

## Features

- NFT Collection: The NFT Indexer retrieves and displays all NFTs associated with a specified Ethereum address.
- Alchemy Integration: The application utilizes the Alchemy SDK rigged to Alchemy's Enhanced APIs to efficiently retrieve the required NFT data.
- Wallet Integration: Users can connect their wallets to check their NFT collection.
- Loading Indication: The application provides visual loading indicators to indicate when a request is in progress, improving the user experience.
- Error Handling: The application includes error checking for incorrectly formed requests and provides informative feedback to the user.
- Image and Grid Display: NFT images and the overall grid layout have been improved for a more polished look and feel.
- Metadata Display: The application retrieves and displays metadata associated with each NFT, providing additional information about the artwork or collectible.
- Performance Optimization: The application has been optimized to provide faster query response times, ensuring efficient data retrieval.

## Getting Started

To get started with the NFT Indexer on your local machine, follow these steps:

### Prerequisites

- Node.js (v14.0.0 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nft-indexer.git
   ```

2. Install the dependencies:

   ```bash
   cd nft-indexer
   npm install
   ```

### Usage

1. Obtain an Alchemy API key from [Alchemy](https://www.alchemy.com/).

2. Set your Alchemy API key as an environment variable. You can create a `.env` file in the root directory and add the following line:

   ```plaintext
   ALCHEMY_API_KEY=YOUR_ALCHEMY_API_KEY
   ```

3. Start the application:

   ```bash
   npm start
   ```

4. Open your web browser and navigate to `http://localhost:3000`.



Happy indexing with the NFT Indexer!
