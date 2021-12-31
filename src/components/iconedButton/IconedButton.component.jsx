import { GrDocumentMissing } from "react-icons/gr";
import './iconedButton.styles.scss'

export default function IconedButton({ term, reactIconComponent, onClick, myStyle }) {

    return (
        <button className="iconed-button" onClick={onClick} style={myStyle} >
            {reactIconComponent !== '' ? reactIconComponent : <GrDocumentMissing className="react-icon"/>}
            <span className="button-term"> {term}</span>
        </button>
    );
}