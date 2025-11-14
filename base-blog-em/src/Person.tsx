import { PersonProps } from "./interfaces"

export function Person({ name, hair_color, eye_color }: PersonProps) {
    console.log("props", name, hair_color, eye_color)
    return (
        <li>
            {name}
            <ul>
                <li>hair: {hair_color}</li>
                <li>eyes: {eye_color}</li>
            </ul>
        </li>
    )
}
