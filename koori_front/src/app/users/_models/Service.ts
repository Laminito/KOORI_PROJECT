import {Deserialize} from "../../deserializable.model";
import { Demande } from "./demande";

  export class Service implements Deserialize{

     libelle!: string;
     description!: string;
     nom_des_clients!: string;
     type_de_service!:string;
     description_elements_service!:string;
     benefices_client!:string;
     indicateur_mesure_qualite!:string;
     engagement_niveaux_service!:string;
     plage_horaire!:string;
     livrables!:string;
     suivi_gestion_relation_client!:string;
     avatar!:any;
     liste_des_applications_metiers_supporte!:string;
     tarifs_et_Facturation!:string;
     Demandes!: Demande[]
     id!:number;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
  
}
