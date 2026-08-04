interface PublicKeyValue {
	toString(): string;
}

interface SolanaProvider {
	publicKey?: PublicKeyValue | null;
	connect(): Promise<{ publicKey: PublicKeyValue }>;
}

interface TokenAccountResponse {
	result?: {
		value: Array<{
			account: {
				data: {
					parsed: {
						info: {
							tokenAmount: {
								uiAmountString: string;
							};
						};
					};
				};
			};
		}>;
	};
	error?: {
		message: string;
	};
}

declare global {
	interface Window {
		phantom?: { solana?: SolanaProvider };
		solana?: SolanaProvider;
	}
}

export type WalletState =
	| { status: "idle" }
	| { status: "connecting" }
	| { status: "no-wallet" }
	| { status: "not-configured"; address: string }
	| { status: "holder"; address: string; balance: number }
	| { status: "not-holder"; address: string; balance: number }
	| { status: "error"; message: string };

const parsedMinimum = Number(import.meta.env.VITE_HOLDER_MIN_BALANCE || 1);

export const holderConfig = {
	mintAddress: (import.meta.env.VITE_SOLANA_MINT_ADDRESS || "").trim(),
	rpcUrl:
		(import.meta.env.VITE_SOLANA_RPC_URL || "").trim() ||
		"https://api.mainnet-beta.solana.com",
	minimumBalance:
		Number.isFinite(parsedMinimum) && parsedMinimum > 0 ? parsedMinimum : 1,
	ticker: (import.meta.env.VITE_TOKEN_TICKER || "FABLE").trim(),
};

export const holderVerificationEnabled = holderConfig.mintAddress.length > 0;

function findProvider() {
	return window.phantom?.solana ?? window.solana ?? null;
}

export async function connectAndCheckHolder(): Promise<WalletState> {
	const provider = findProvider();
	if (!provider) return { status: "no-wallet" };

	try {
		const connection = await provider.connect();
		const address = connection.publicKey.toString();
		if (!holderVerificationEnabled) {
			return { status: "not-configured", address };
		}

		const response = await fetch(holderConfig.rpcUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				jsonrpc: "2.0",
				id: 1,
				method: "getTokenAccountsByOwner",
				params: [
					address,
					{ mint: holderConfig.mintAddress },
					{ encoding: "jsonParsed", commitment: "confirmed" },
				],
			}),
		});

		if (!response.ok)
			throw new Error("The Solana RPC endpoint did not respond");
		const payload = (await response.json()) as TokenAccountResponse;
		if (payload.error) throw new Error(payload.error.message);

		const balance =
			payload.result?.value.reduce((total, tokenAccount) => {
				const amount = Number(
					tokenAccount.account.data.parsed.info.tokenAmount.uiAmountString,
				);
				return total + (Number.isFinite(amount) ? amount : 0);
			}, 0) ?? 0;

		return balance >= holderConfig.minimumBalance
			? { status: "holder", address, balance }
			: { status: "not-holder", address, balance };
	} catch (error) {
		return {
			status: "error",
			message:
				error instanceof Error ? error.message : "Wallet connection failed",
		};
	}
}

export function compactAddress(address: string) {
	return `${address.slice(0, 4)}...${address.slice(-4)}`;
}
