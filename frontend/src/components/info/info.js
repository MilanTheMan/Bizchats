import React, {useState, useEffect, useRef} from 'react';
const Info = (props) => {


    const [title, setTitle] = useState("jskldfjsdkl;fs");
    const [information, setInformation] = useState("testnsdko'fjsdklfjsdksjdl;kfs;jfl;kasdjfks;daj;flkdsjf;lksda;jfkl;sdjfl;ksdjslkd;jfaslkdjfslkd;fj;klsdfjskdl;gfjslkdfjaskdl;fjaskldfjas;dkfjskdlfj;sldfjasdl;kfjsd;lkfjsdlkfjasdfklsdjflkasdjfkasldfjsdkl;fjsk;lf");

    return(
        <div id={"info"}>
            <h1>{title}</h1>
            <div id={"info_container"}>
                <p>{information}</p>
            </div>
        </div>
    )
}

export default Info;