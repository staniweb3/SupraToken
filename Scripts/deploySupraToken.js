const hre = require ("hardhat");

async function main()  {
    const SupraToken = await hre.ethers.getContractFactory("SupraToken");

    //LKBToken constructor take initialSupply parameter. 10000 * 1e18;
    const supraToken = await SupraToken.deploy("10000000000000000000000");

    await supraToken.deployed();
    
    console.log("SupraToken deployed to: ", supraToken.address);
}

main().catch((error) => {
    console.error(error);
    process.exitcode = 1;
});
