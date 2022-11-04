import chai, { expect } from 'chai';
import chaiBN from 'chai-bn';
import { Address, Cell, Slice } from 'ton';
import { SmartContract } from 'ton-contract-executor';
import { hex } from '../build/main.compiled.json';
import * as main from '../contracts/main';
import { internalMessage, randomAddress } from './helpers';
import BN from 'bn.js';
chai.use(chaiBN(BN));

describe('Initial tests', () => {
  let contract: SmartContract;
  let ownerAddress: Address;

  beforeEach(async () => {
    ownerAddress = randomAddress('owner');
    contract = await SmartContract.fromCell(
      Cell.fromBoc(hex)[0], // code cell from build output
      main.data({ ownerAddress }),
      { debug: true }
    );
  });

  it('should get the owner address', async () => {
    const call = await contract.invokeGetMethod('owner_address', []);
    const address = (call.result[0] as unknown as Slice).readAddress();
    expect(address?.equals(ownerAddress)).to.equal(true);
  });

  it('should get empty rules', async () => {
    const call = await contract.invokeGetMethod('rules', []);
    const rules = (call.result[0] as unknown as Cell);
    expect(rules).is.null;
  });

  it('should get the initial balance', async () => {
    const call = await contract.invokeGetMethod('balance', []);
    const balance = (call.result[0]);
    expect(balance).to.be.bignumber.equal(new BN(1000));
  });
});