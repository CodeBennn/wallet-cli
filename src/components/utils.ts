import { MetaMask } from '@web3-react/metamask';
import type { Connector } from '@web3-react/types';
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect';

export function getName(connector: Connector) {
  if (connector instanceof MetaMask) return 'MetaMask';
  if (connector instanceof WalletConnectV2) return 'WalletConnect V2';
  return 'Unknown';
}
