import { IBlockFields } from "./block-fields.interface";

export interface IBlock {
    Fields: IBlockFields;
    Hash: string;
}