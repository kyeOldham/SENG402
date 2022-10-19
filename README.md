# SENG402
Differential Privacy Tools for Smart Contract

The backend directory has the contracts written in rust for the Secret Network

The deployer directory is where the contracts are deployed to the Secret Network local testnet

The diffprivacy-app directory has the frontend application that interacts with the Smart Contracts via Keplr wallet
- The contract address and codehash for the deployed contract must be used here

# Steps to run full solution

1. Run 'make build' in backend directory

2. Run local Secret Network testnet Docker container in the backend directory 
with 'docker run -it --rm -p 9091:9091 -p 26657:26657 -p 1317:1317 -p 5000:5000 --name localsecret ghcr.io/scrtlabs/localsecret:v1.4.0-cw-v1-beta.2'
- wait for blocks to start being created before next step
 
3. In the deployer directory run 'Npm run start'

4. Copy the outputted contract address and codehash to the contractAdress (line 27) and codeHash (line 28) variables in diffprivacy-app/components/Start.tsx
- This should be correct by default if its the first time the contract has been deployed

5. Install Keplr wallet to Google Chrome

6. Log into Keplr wallet with an existing account, this must be a test account created by the local testnet with sufficient funds
Use the following mnemonic seed: "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar"
- Make sure the Local Secret Testnet is not already added to Keplr, if it is remove it before running the web app

7. In the diffprivacy-app directory run 'yarn start', open the application at 'http://localhost:3000/'

8. Kepl wallet will suggest that you add the experimental testnet, approve this and add the testnet to Keplr.

9. In Keplr change the network to 'Local Testnet'

10. Refresh the application, and connect your Keplr wallet to the site. 

11. Utilize the applications functionality. Add values to Smart Contract, calculate the differentially private count and mean values.
