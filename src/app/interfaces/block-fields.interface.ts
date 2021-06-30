import { ITx } from "./tx.interface"

export interface IBlockFields {
    Index: number;
    PrevHash: string;
    Ts: number;
    Transactions: ITx[];
    Difficulty: number;
    Nonce: number;
}