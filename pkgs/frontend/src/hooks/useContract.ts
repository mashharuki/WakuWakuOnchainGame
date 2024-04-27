import {GameInfo, TxData} from "@/utils/types";
import {Contract, ContractInterface, ethers} from "ethers";

var contractAddress: string;
var contract: Contract;

/**
 * 初期化メソッド
 */
export const createContract = (
  address: string,
  abi: ContractInterface,
  rpcUrl: string
) => {
  // create provider
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  // コントラクトのインスタンスを生成
  contract = new ethers.Contract(address, abi, provider);

  contractAddress = address;
};

/**
 * createPlayGameTxData method
 */
export const createPlayGameTxData = async (
  playerAddress: string,
  count: number
): Promise<TxData> => {
  // create NFT Cotntract's method call data
  const minTx = await contract.populateTransaction.playGame(
    playerAddress,
    count
  );
  console.log("txData :", minTx.data);

  const txData: TxData = {
    to: contractAddress,
    data: minTx.data,
  };

  // create newArray
  console.log("txData :", txData);

  return txData;
};

/**
 * getGameStatus method
 */
export const getGameStatus = async (gameId: number): Promise<boolean> => {
  // get gameStatus
  const result = await contract.getOpeningStatus(gameId);
  return result;
};

/**
 * getGameInfo method
 */
export const getGameInfo = async (): Promise<GameInfo> => {
  // get gameStatus
  const result: GameInfo = await contract.getActiveGameInfo();

  console.log("gameInfo:", result);

  return result;
};
