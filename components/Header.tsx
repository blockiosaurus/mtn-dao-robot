'use client'

import dynamic from "next/dynamic";

const WalletMultiButtonDynamic = dynamic(
    async () =>
        (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
);

const Header = () => {
    return (
        <div className="z-10 w-full items-center justify-between font-mono text-sm flex flex-col lg:flex-row gap-4 p-4">
            <p className="flex justify-center border border-gray-300 rounded-xl px-6 py-3 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
                Do Androids Dream of Digital Assets?
            </p>
            <div className="flex items-center justify-center dark:from-black dark:via-black">
                <WalletMultiButtonDynamic />
            </div>
        </div>
    );
};

export default Header;