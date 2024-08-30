import { headerData } from "../assets/headerData";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
        <>
            {headerData.map((item, index) => {
                return (
                    <p
                        key={index}
                        onClick={() => {
                            navigate(`${item.path}`);
                        }}
                    >
                        {item.name}
                    </p>
                );
            })}
        </>
    );
};

export default Header;
