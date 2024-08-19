// import * as ed from "@noble/ed25519";

// async function main() {
//   // Generate a secure random private key
//   const privKey = ed.utils.randomPrivateKey();

//   // Convert the message "hello world" to a Uint8Array
//   const message = new TextEncoder().encode("hello world");

//   // Generate the public key from the private key
//   const pubKey = await ed.getPublicKeyAsync(privKey);

//   // Sign the message
//   const signature = await ed.signAsync(message, privKey);

//   // Verify the signature
//   const isValid = await ed.verifyAsync(signature, message, pubKey);

//   // Output the result
//   console.log(isValid); // Should print `true` if the signature is valid
// }

// main();

//region Solana
import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

// const mnemonic = generateMnemonic();
const mnemonic =
  "rent grief assume rally rival atom wheel dream drift treat marriage all";
console.log("Mnemo => ", mnemonic);
const seed = mnemonicToSeedSync(mnemonic);
for (let i = 0; i < 4; i++) {
    const path = `m/44'/501'/${i}'/0'`; // This is the derivation path
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  console.log(Keypair.fromSecretKey(secret).publicKey.toBase58());
  // console.log(Keypair.fromSecretKey(secret).secretKey.toString());
}


//region Ether

// import bip39 from "bip39";
// import hdkey from "hdkey";
// import {
//   publicToAddress,
//   privateToAddress,
//   toChecksumAddress,
// } from "ethereumjs-util";

// // const mnemonic = bip39.generateMnemonic();  // Generate a new mnemonic
// const mnemonic =
//   "renew spy remain tumble wreck change depart cluster climb dawn certain flavor"; // Use this if you want to use a predefined mnemonic
// console.log("Mnemo => ", mnemonic);

// const seed = bip39.mnemonicToSeedSync(mnemonic); // Generate seed from mnemonic   
// const root = hdkey.fromMasterSeed(seed); // Create an HD wallet from the seed

// for (let i = 0; i < 4; i++) {
//   const path = `m/44'/60'/${i}'/0/0`; // Ethereum derivation path
//   const wallet = root.derive(path); // Derive wallet from path

//   const privateKey = wallet.privateKey.toString("hex");
//   const publicKey = wallet.publicKey.toString("hex");
//   const address = toChecksumAddress(
//     "0x" + publicToAddress(wallet.publicKey, true).toString("hex"),
//   );

//   console.log("Address:", address);
//   console.log("Public Key:", publicKey);
//   // console.log("Private Key:", privateKey);
// }
