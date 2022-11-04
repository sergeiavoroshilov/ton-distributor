import BN from "bn.js";
import { Cell, beginCell, Address } from "ton";

// encode contract storage according to save_data() contract method
export function data(params: { ownerAddress: Address }): Cell {
  return beginCell().storeAddress(params.ownerAddress).endCell();
}

// message encoders for all ops (see contracts/imports/constants.fc for consts)

export function withdraw(params: { withdrawAmount: BN }): Cell {
  return beginCell().storeUint(1, 32).storeUint(0, 64).endCell();
}

export function transferOwnership(params: { newOwnerAddress: Address }): Cell {
  return beginCell().storeUint(4, 32).storeUint(0, 64).storeAddress(params.newOwnerAddress).endCell();
}
