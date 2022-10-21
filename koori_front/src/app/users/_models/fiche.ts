import {Deserialize} from "../../deserializable.model";

import { Etape } from "./etape";

export class Fiche implements Deserialize{
  public id!: number;
  public avatar!:string;
  public titre!:string;
  public sous_titre!:string;
  public description!:string;
  public prerequis!:string;
  public dureeMin!:number;
  public dureeMax!:number;
  public equipeMin!:number;
  public equipeMax!: number;
  public outils!:string;
  public Etapes!: Etape[];
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
