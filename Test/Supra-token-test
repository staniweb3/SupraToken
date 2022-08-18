const { expect } = require ("chai");
const { ethers } = require("hardhat");

describe("SupraToken", function () {
    let totalSupply = "10000000000000000000000"; // 10000 * 1e18
    let SupraToken, supraToken, owner, address1, address2, address3;

    beforeEach(async function () {
        /**
         * A contractFactory in ethers.js is an abstraction used to deploy new smart contracts
         * so SupraToken here is a factory for instances of our token contract.
         */

        SupraToken = await ethers.getContractFactory("SupraToken");

        /**
         * A signer in ethers.js is an object that represents an Ethereum account
         * It's used to send transactions to contracts and other contracts.
         */
        [owner, address1, address2, ...address3] = await ethers.getSigners();

        supraToken = await SupraToken.deploy(totalSupply);
    });

    describe("Deployment", function () {
        it("Should assign the total supply of tokens to the owner", async function () {
            const ownerBalance = await supraToken.balanceOf(owner.address);
            expect(await supraToken.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Transactions", function () {
        it("Should transfer tokens between accounts", async function () {
            const ownerBalance = await supraToken.balanceOf(owner.address);

            // Transfer 2000 tokens from owner to addr1
            await supraToken.transfer(address1.address, 2000);
            const address1Balance = await supraToken.balanceOf(address1.address);
            expect(address1Balance).to.equal(2000);
        

        // Transfer 2000 tokens from address1 to address2
        // We us .connect(signer) to send a transaction from another account
        await supraToken.connect(address1).transfer(address2.address, 2000);
        const address2Balance = await supraToken.balanceOf(address2.address);
        expect(address2Balance).to.equal(2000);

    });

        it("Should fail if sender doesn't have enough tokens", async function () {
            const initialOwnerBalance = await supraToken.balanceOf(owner.address);

            //Try to send 1 token from address1 (0 tokens) to owner (1000000 tokens)
            //`require` will evaluate false and revert the transactions

            await expect(
                supraToken.connect(address1).transfer(owner.address, 1)
            ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

            // Owner balance shouldn't have changed
            expect(await supraToken.balanceOf(owner.address)).to.equal(
                initialOwnerBalance
            );
        });
    });
});
