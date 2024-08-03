import { IconType } from "react-icons";
import { GiBusStop, GiMountainRoad, GiPineTree, GiSelfLove } from "react-icons/gi";
import { MdFamilyRestroom, MdTempleHindu } from "react-icons/md";

export interface CardData {
    icon: IconType;
    label: string;
    description: string;
}

const CardData: CardData[] = [
    {
        label: 'Romantic',
        icon: GiSelfLove,
        description: 'This is a romantic package'
    },
    {
        label: 'Religious',
        icon: MdTempleHindu,
        description: 'This is a religious package'
    },
    {
        label: 'Adventure',
        icon: GiMountainRoad,
        description: 'This is a adventure package'
    },
    {
        label: 'Family',
        icon: MdFamilyRestroom,
        description: 'This is a Family package'
    },
    {
        label: 'Nature',
        icon: GiPineTree,
        description: 'This is a nature package'
    },
    {
        label: 'Hill Station',
        icon: GiBusStop,
        description: 'This is a hill station package'
    },
];

export default CardData;