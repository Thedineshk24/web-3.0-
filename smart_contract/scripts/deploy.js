const main = async () => {
  const Transcations = await hre.ethers.getContractFactory("Transcations");
  const transactions = await Transcations.deploy();

  await transactions.deployed();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

runMain();