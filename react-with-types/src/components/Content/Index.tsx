import { CoursePart } from "../../types";
import Part from "./Part";

interface ContentProps {
    courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => (
    courseParts.map(part => <Part part={part} key={part.name} />)
)

export default Content;