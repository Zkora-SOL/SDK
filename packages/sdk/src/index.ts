// packages/sdk/src/index.ts


export * from "./client";
export * from "./crypto";
export * from "./proof";
export * from "./tx";


// packages/sdk/src/client.ts
import { Connection, PublicKey } from "@solana/web3.js";


export class ZKoraClient {
constructor(
public readonly connection: Connection,
public readonly programIds: {
zkPay: PublicKey;
zkIdentity: PublicKey;
zkStorage: PublicKey;
}
) {}
}


// packages/sdk/src/crypto.ts
import nacl from "tweetnacl";


export function encryptData(data: Uint8Array, recipientPubkey: Uint8Array) {
const ephemeral = nacl.box.keyPair();
const nonce = nacl.randomBytes(24);
const encrypted = nacl.box(data, nonce, recipientPubkey, ephemeral.secretKey);


return {
encrypted,
nonce,
ephemeralPubkey: ephemeral.publicKey,
};
}


// packages/sdk/src/proof.ts
export interface ZKProof {
proof: Uint8Array;
publicSignals: Uint8Array;
}


export async function generateProof(
_input: Record<string, unknown>
): Promise<ZKProof> {
// Placeholder: integrate circom / noir / zkVM here
return {
proof: new Uint8Array(),
publicSignals: new Uint8Array(),
};
}


// packages/sdk/src/tx.ts
import {
Transaction,
TransactionInstruction,
PublicKey,
} from "@solana/web3.js";


export function buildEd25519Instruction(
message: Uint8Array,
signature: Uint8Array,
publicKey: Uint8Array
) {
return new TransactionInstruction({
programId: new PublicKey("Ed25519SigVerify111111111111111111111111111"),
keys: [],
data: Buffer.concat([signature, publicKey, message]),
});
}


export function withZKoraInstruction(
tx: Transaction,
ix: TransactionInstruction
) {
tx.add(ix);
return tx;
}
