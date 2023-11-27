import React from "react";
import { ConnectButton } from "web3uikit";

export default function Header() {
  return (
    <div>
      header
      <ConnectButton moralisAuth={false} />
    </div>
  );
}
