import TopicsCard from "../TopicCard/TopicsCard"
import { useAppSelector } from "@hooks/app"
import './TopicsList.css'
import { TTopic } from "@customtypes/topicType"
const TopicsList = ({ topics }: { topics: TTopic[] }) => {
    const { language } = useAppSelector(state => state.language)
    const Cards = topics?.map(to => <li key={to.id}><TopicsCard {...to} /></li>)
    return (
        <ul className='topicsList'>
            {topics?.length ? Cards : language === 'French' ? "Il n'y a pas encore de sujets" : "لم يتم اضافة المحاور بعد"}
        </ul>
    )
}

export default TopicsList
