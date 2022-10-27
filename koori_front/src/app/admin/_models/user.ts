
import {Deserialize} from "../../deserializable.model";
import {Profil} from "./profil";


export class User implements Deserialize{

  public id!: number;
  public Profil!: Profil;
  public nomComplet!: string;
  public email!: string;
  public profession!: string;
  public service!: string;
  public departement!: string;
  public direction!: string
  public avatar!: string;
  public UserEvaluation!: any;
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}

