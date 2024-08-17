// src/hdkey.d.ts
declare module 'hdkey' {
    export default class HDKey {
      static fromMasterSeed(seedBuffer: Buffer, versions?: { private: number, public: number }): HDKey;
      derive(path: string): HDKey;
      publicKey: Buffer;
      privateKey: Buffer;
    }
  }
  