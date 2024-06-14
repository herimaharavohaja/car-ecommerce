import { Car } from "./Car";
import { Image } from "./Image";

export type CarWithImageType = Car & {
    images: Image[];
}