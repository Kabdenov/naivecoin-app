import { ITxIn } from "./tx-in.interface"
import { ITxOut } from "./tx-out.interface"

export interface ITx{
    Id: string;
	TxIns: ITxIn[];
	TxOuts: ITxOut[];
}