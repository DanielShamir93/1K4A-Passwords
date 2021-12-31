import { GrDocumentMissing } from "react-icons/gr";
import './iconedButton.styles.scss'

export default function IconedButton({ term, reactIconComponent, onClick }) {

    return (
        <button className="iconed-button" onClick={onClick}>
            {reactIconComponent !== '' ? reactIconComponent : <GrDocumentMissing className="react-icon"/>}
            <span className="button-term"> {term}</span>
        </button>
    );
}