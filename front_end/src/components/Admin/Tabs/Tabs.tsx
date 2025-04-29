import { TabPanel, TabView } from "primereact/tabview";
import { QuizLevel } from "@components/Admin/QuizLevel/QuizLevel";
import { QuizUnit } from "@components/Admin/QuizUnit/QuizUnit";
import QuizLesson from "@components/Admin/QuizLesson/QuizLesson";
import './Tabs.css'
type TType = {
    title: string,
    id: number
}
type TCompName = "QuizLevel" | "QuizUnit" | "QuizLesson"
const components: any = {
    QuizLevel: QuizLevel,
    QuizUnit: QuizUnit,
    QuizLesson: QuizLesson

}
function Tabs({ componentName, array }: { componentName: TCompName, array: TType[] }) {
    const Component = components[componentName];
    const length: number = array?.length!;
    const scrollableTabs = Array.from({ length: length }, (_, i) => ({
        id: array[i].id,
        title: `${i + 1}. ${array[i].title}`,
        content: <Component Id={array[i].id} />
    }))
    return (
        <div className="card">
            <TabView scrollable>
                {scrollableTabs.map((tab) => {
                    return (
                        <TabPanel key={tab.id} header={tab.title}>
                            <div className="m-0">{tab.content}</div>
                        </TabPanel>
                    );
                })}
            </TabView>
        </div>
    )
}
export default Tabs