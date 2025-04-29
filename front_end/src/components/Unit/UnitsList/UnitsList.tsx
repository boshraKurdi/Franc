import './UnitsList.css'
import { TUnit } from "@customtypes/unitType"
import UnitCard from "../UnitCard/UnitCard"
import { useAppSelector } from "@hooks/app"
const UnitsList = ({ units }: { units: TUnit[] }) => {
    const { language } = useAppSelector(state => state.language)
    const Cards = units?.map(to => <UnitCard {...to} />)
    return (
        <div className='units-grid'>
            {units?.length ? Cards : language === 'French' ? "Il n'y a pas encore de Unités" : "لم يتم اضافة المحاور بعد"}
        </div>
    )
}

export default UnitsList
