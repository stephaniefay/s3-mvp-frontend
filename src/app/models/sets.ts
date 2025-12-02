import {Legalities} from './legalities';
import {SetImage} from './images';

export interface Sets {
  id: string,
  name: string,
  series: string,
  printedTotal: number,
  total: number,
  legalities: Legalities,
  ptcgoCode: string,
  releaseDate: string,
  updatedAt: string,
  images: SetImage
}
