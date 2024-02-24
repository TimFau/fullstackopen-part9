import { ReactNode } from 'react';
import { CoursePart } from './../../types';

interface PartProps {
    part: CoursePart
}

interface ParagraphProps {
    children: ReactNode;
}

const Part = ({ part }: PartProps) => {
    const PartContainer = ({ children }: ParagraphProps) => (
        <p className="part" style={{ display: "flex", flexDirection: "column" }}>
            <strong>{part.name} - {part.exerciseCount}</strong>
            {children}
        </p>
    )
    const renderPart = () => {
        switch (part.kind) {
            case "basic":
                return (
                    <PartContainer>
                        <span>{part.description}</span>
                    </PartContainer>
                );
            case "background":
                return (
                    <PartContainer>
                        <span>{part.description}</span>
                        <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
                    </PartContainer>
                );
            case "group":
                return (
                    <PartContainer>
                        <span>Project exercises: {part.groupProjectCount}</span>
                    </PartContainer>
                )
            case "special":
                return (
                    <PartContainer>
                        <span>{part.description}</span>
                        <span>Required skills: {part.requirements.join(', ')}</span>
                    </PartContainer>
                )
            default:
                console.error("Unkown kind")
                return null;
        }
    }
    return renderPart();
};

export default Part;