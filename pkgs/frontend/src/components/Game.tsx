import { GAME_ID } from '@/utils/constants';
import { BiconomySmartAccountV2 } from "@biconomy/account";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './../styles/Home.module.css';
import Loading from './Loading';
import { TxData, createPlayGameTxData, getGameStatus, } from '@/hooks/useContract';
import { sendUserOp } from '@/hooks/biconomy';

interface Props {
  smartAccount: BiconomySmartAccountV2,
  address: string,
  opening: boolean,
  setOpening: any,
}

/**
 * Game Component
 * @param param0 
 * @returns 
 */
const Game: React.FC<Props> = ({ 
  smartAccount,
  address, 
  opening,
  setOpening
}) => {
  const [loading, setLoading] = useState<boolean>(false)

  /**
   * handleMint
   */
  const handleMint = async () => {
    try {
      setLoading(true)
      console.log("==================== start ====================")

      toast.info('Minting your NFT...', {
        position: "top-right",
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      // create txData
      const txData:TxData = await createPlayGameTxData(GAME_ID, address)
      // call mintNFT method
      const transactionHash = await sendUserOp(smartAccount, txData);
      // get Status
      const gameStatus = await getGameStatus(GAME_ID);
      // set Status
      setOpening(gameStatus);

      toast.success(`Success! Here is your transaction:${transactionHash} `, {
        position: "top-right",
        autoClose: 18000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

    } catch(err: any) {
      console.error("error occurred while playing game.. :", err)
    } finally {
      console.log("====================  end ====================")
      setLoading(false)
    }
  }


  return(
    <>
      {address && (
        <>
          { loading ? 
            <Loading/>
          : (
            <button 
              disabled={opening}
              onClick={handleMint} 
              className={styles.connect}
            >
              Let`s Play
            </button>
          )}
        </>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default Game;