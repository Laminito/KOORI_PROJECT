import {Deserialize} from "../../deserializable.model";

export class Temoignage implements Deserialize{
  
  public nomComplet?:string;
  public message?:string;
  public avatar?:any;
  public id?:number;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

}
