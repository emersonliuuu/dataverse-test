import { useState, useEffect } from "react";
import {
  RuntimeConnector,
  METAMASK,
  CRYPTO_WALLET_TYPE,
  Apps,
  ModelNames,
} from "@dataverse/runtime-connector";
interface ConnectWalletProps {
  runtimeConnector: RuntimeConnector;
}

const ConnectWallet = (props: ConnectWalletProps) => {
  const [identity, setIdentity] = useState("");
  const { runtimeConnector } = props;

  const Wallet = async () => {
    console.log("Wallet");
    const did = await runtimeConnector.connectWallet({
      name: METAMASK,
      type: CRYPTO_WALLET_TYPE,
    });
    console.log(did, "did");

    // await runtimeConnector.switchNetwork(80001);
    await runtimeConnector.switchNetwork(137);
    const identity = await runtimeConnector.connectIdentity({
      wallet: { name: METAMASK, type: CRYPTO_WALLET_TYPE },
      appName: Apps.Dataverse,
      modelNames: [ModelNames.contentFolders],
    });
    console.log(identity);
    setIdentity(identity);
  };

  useEffect(() => {
    Wallet();
  }, []);

  return (
    <div>
      <button onClick={() => Wallet()}>
        {identity != ""
          ? identity.slice(0, 18) + "..." + identity.slice(-4)
          : "ConnectWallet"}
      </button>
    </div>
  );
};

export default ConnectWallet;
