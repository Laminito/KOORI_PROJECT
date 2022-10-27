import {Deserialize} from "../../deserializable.model";
import { Demande } from "./demande";

  export class Service implements Deserialize{


  public libelle!:string;
  public description!:string;
  public Nom_des_clients!:string;
  public type_de_service!:string;
  public description_elements_service!:string;
  public benefices_client!:string;
  public Engagement_niveaux_service!:string;
  public plage_horaire!:string;
  public livrables!:string;
  public suivi_gestion_relation_client!:string;
  public avatar!:any;
  public liste_des_applications_metiers_supporte!:string;

  public tarifs_et_Facturation!:string;
  public Demandes!:Demande[];
  public id!:number;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
