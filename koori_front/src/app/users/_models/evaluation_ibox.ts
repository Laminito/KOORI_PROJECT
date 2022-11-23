import {Deserialize} from "../../deserializable.model";
export class Evaluation_ibox implements Deserialize{
  public id?: number;
  public evaluation:string = 'no comment';
  public note?:number;
  public IboxId?:number;
  public UserId?:number;
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
