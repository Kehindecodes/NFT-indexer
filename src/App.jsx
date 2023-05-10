import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Image,
	Input,
	SimpleGrid,
	Text,
	Container,
	extendTheme,
	ChakraProvider,
	Card,
	useToast,
	Alert,
	AlertIcon,
	AlertTitle,
} from '@chakra-ui/react';
import { Alchemy, Network } from 'alchemy-sdk';
import { useState } from 'react';
import { Oval } from 'react-loader-spinner';
const customTheme = extendTheme({
	colors: {
		background: '#0B2447',
		cardColor: '#19376D',
		btnColor: '#576CBC',
		secondary: '#A5D7E8',
	},
});

function App() {
	const [userAddress, setUserAddress] = useState('');
	const [results, setResults] = useState([]);
	const [hasQueried, setHasQueried] = useState(false);
	const [tokenDataObjects, setTokenDataObjects] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [showError, setShowError] = useState(false);
	const toast = useToast();
	const connectWallet = async () => {
		try {
			// Request account access
			const wallet = await window.ethereum.request({
				method: 'eth_requestAccounts',
			});
			setUserAddress(wallet[0]);
			console.log(wallet);

			console.log(wallet);
			console.log('Wallet connected');

			toast({
				title: 'wallet connected',
				description: 'wallet connected successfully',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
		} catch (error) {
			console.log('Failed to connect wallet');
			toast({
				title: 'Error',
				description: 'Failed to connect wallet',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	};

	async function getNFTsForOwner() {
		setIsLoading(true);
		const config = {
			apiKey: import.meta.env.VITE_API_KEY,
			network: Network.ETH_MAINNET,
		};

		const alchemy = new Alchemy(config);
		const data = await alchemy.nft.getNftsForOwner(userAddress);
		setResults(data);

		const tokenDataPromises = [];

		for (let i = 0; i < data.ownedNfts.length; i++) {
			const tokenData = alchemy.nft.getNftMetadata(
				data.ownedNfts[i].contract.address,
				data.ownedNfts[i].tokenId,
			);
			tokenDataPromises.push(tokenData);
		}

		setTokenDataObjects(await Promise.all(tokenDataPromises));
		setHasQueried(true);
		setIsLoading(false);
	}
	return (
		<ChakraProvider theme={customTheme}>
			<Box minHeight='100vh' w='100vw' bgColor='background'>
				<Box
					display='flex'
					justifyContent='flex-end'
					alignItems='center'
					height='50px'
					pt={5}
					px={10}>
					<Button
						bgColor='btnColor'
						size='md'
						onClick={connectWallet}
						focusBorderColor='none'
						color='white'
						borderRadius={20}
						_hover={{
							backgroundColor: '#8a9ce2',
							color: 'white',
						}}>
						{!userAddress ? 'Connected' : 'Connect Wallet'}
					</Button>
				</Box>
				<Center flexDirection={'column'} h={'75vh'}>
					<Flex
						alignItems={'center'}
						justifyContent='center'
						flexDirection={'column'}
						px={10}
						textAlign={'center'}>
						<Heading mb={0} fontSize={48} color='secondary'>
							NFT Indexer 🖼
						</Heading>
						<Text color='gray'>
							Plug in an address and this website will return all of its NFTs!
						</Text>
					</Flex>
					<Box w='100%' mt={10}>
						<Center>
							<Flex flexDirection={'column'}>
								{showError && (
									<Alert status='error' mb={4}>
										<AlertIcon />
										<AlertTitle>Error:</AlertTitle>
										Please enter an address
									</Alert>
								)}
								<Input
									color='black'
									textAlign='center'
									// p={4}
									bgColor='white'
									fontSize={24}
									value={userAddress}
									width={{ sm: '100%', md: '900px', lg: '900px' }}
									size='lg'
									borderRadius={20}
									mb={19}
									placeholder='Enter an address'
								/>

								<Button
									fontSize={20}
									onClick={getNFTsForOwner}
									mt={10}
									bgColor='btnColor'
									color='white'
									display={'block'}
									width='350px'
									textAlign={'center'}
									borderRadius={20}
									size={'lg'}
									m={'auto'}
									_hover={{
										backgroundColor: '#8a9ce2',
										color: 'white',
									}}>
									Fetch NFTs
								</Button>
							</Flex>
						</Center>
					</Box>
				</Center>
				<Box>
					{isLoading ? (
						<Center>
							<Oval
								height={80}
								width={80}
								color='#A5D7E8'
								wrapperStyle={{}}
								wrapperClass=''
								visible={true}
								ariaLabel='oval-loading'
								secondaryColor='#A5D7E8'
								strokeWidth={2}
								strokeWidthSecondary={2}
							/>
						</Center>
					) : hasQueried ? (
						<Box px={10}>
							<Heading
								my={25}
								color='secondary'
								fontSize={28}
								textAlign={'center'}>
								Your NFTs
							</Heading>
							<SimpleGrid
								columns={4}
								spacingX={9}
								spacingY={8}
								minChildWidth='230px'>
								{results.ownedNfts.map((e, i) => {
									return (
										<Card
											bg='#19376D'
											borderRadius={20}
											p='4'
											color='white'
											w={{ sm: '100%', md: '300px', lg: '300px' }}
											key={e.id}>
											<Box display='flex' alignItems='center'>
												<Image
													src={
														tokenDataObjects[i]?.rawMetadata?.image ??
														'https://via.placeholder.com/200'
													}
													alt={'Image'}
												/>
												<Box>
													<Box>
														<b>Name:</b>{' '}
														{tokenDataObjects[i].title?.length === 0
															? 'No Name'
															: tokenDataObjects[i].title}
													</Box>
												</Box>
											</Box>
										</Card>
									);
								})}
							</SimpleGrid>
						</Box>
					) : (
						''
					)}
				</Box>
			</Box>
		</ChakraProvider>
	);
}

export default App;
