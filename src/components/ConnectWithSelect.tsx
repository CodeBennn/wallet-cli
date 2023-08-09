import type { Web3ReactHooks } from '@web3-react/core';
import type { MetaMask } from '@web3-react/metamask';
// import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2';
import { WalletConnect } from '@web3-react/walletconnect';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

import { CHAINS, getAddChainParameters } from '@connectors/chains';

function ChainSelect({
  activeChainId,
  switchChain,
  chainIds,
}: {
  activeChainId: number;
  switchChain: (chainId: number) => void;
  chainIds: number[] | [];
}) {
  return (
    <select
      value={activeChainId}
      onChange={event => {
        switchChain(Number(event.target.value));
      }}
      disabled={switchChain === undefined}
    >
      <option hidden disabled selected={activeChainId === undefined}>
        Select chain
      </option>
      <option value={-1} selected={activeChainId === -1}>
        Default
      </option>
      {chainIds.map(chainId => (
        <option key={chainId} value={chainId} selected={chainId === activeChainId}>
          {CHAINS[chainId]?.name ?? chainId}
        </option>
      ))}
    </select>
  );
}

export function ConnectWithSelect({
  connector,
  activeChainId,
  chainIds = Object.keys(CHAINS).map(Number),
  isActivating,
  isActive,
  error,
  setError,
}: {
  connector: MetaMask | WalletConnect;
  activeChainId: ReturnType<Web3ReactHooks['useChainId']>;
  chainIds?: ReturnType<Web3ReactHooks['useChainId']>[];
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
  error: Error | undefined;
  setError: Dispatch<SetStateAction<undefined | Error>>;
  //   setError: (error: Error | undefined) => void;
}) {
  const [desiredChainId, setDesiredChainId] = useState<number>(0);

  /**
   * When user connects eagerly (`desiredChainId` is undefined) or to the default chain (`desiredChainId` is -1),
   * update the `desiredChainId` value so that <select /> has the right selection.
   */
  useEffect(() => {
    if (activeChainId && (!desiredChainId || desiredChainId === -1)) {
      setDesiredChainId(activeChainId);
    }
  }, [desiredChainId, activeChainId]);

  const switchChain = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    async (desiredChainId: number) => {
      setDesiredChainId(desiredChainId);

      try {
        if (
          // If we're already connected to the desired chain, return
          desiredChainId === activeChainId ||
          // If they want to connect to the default chain and we're already connected, return
          (desiredChainId === -1 && activeChainId !== undefined)
        ) {
          setError(undefined);
          return;
        }

        if (desiredChainId === -1) {
          await connector.activate();
        } else if (connector instanceof WalletConnect) {
          await connector.activate(desiredChainId);
        } else {
          await connector.activate(getAddChainParameters(desiredChainId));
        }

        setError(undefined);
      } catch (_error) {
        setError(_error as Error);
      }
    },
    [connector, activeChainId, setError]
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ChainSelect
        activeChainId={desiredChainId}
        switchChain={switchChain}
        chainIds={chainIds as number[]}
      />

      <div style={{ marginBottom: '1rem' }} />
      {isActive ? (
        error ? (
          <button onClick={() => switchChain(desiredChainId)}>Try again?</button>
        ) : (
          <button
            onClick={() => {
              if (connector?.deactivate) {
                void connector.deactivate();
              } else {
                void connector.resetState();
              }
              setDesiredChainId(-1);
            }}
          >
            Disconnect
          </button>
        )
      ) : (
        <button
          onClick={() => switchChain(desiredChainId)}
          disabled={isActivating || !desiredChainId}
        >
          {error ? 'Try again?' : 'Connect'}
        </button>
      )}
    </div>
  );
}
