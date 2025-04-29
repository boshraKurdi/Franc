import { TLevel } from "@customtypes/levelType"
import LevelCard from "../LevelCard/LevelCard"
import { useAppSelector } from "@hooks/app"
import './LevelsList.css'
const LevelsList = ({ levels }: { levels: TLevel[] }) => {
    const Cards = levels?.map((le, idx) => <LevelCard key={le.id}{...le} num={idx} />)
    const { language } = useAppSelector(state => state.language)

    return (
        <div className='levelList'>
            {levels?.length ? Cards : language === 'French' ? "Il n'y a pas encore de niveaux" : "لم يتم اضافة مستويات بعد"}
        </div>
    )
}

export default LevelsList
