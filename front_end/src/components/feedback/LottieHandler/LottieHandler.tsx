import Lottie from "lottie-react";
import Loading from '@assets/lottieFiles/loading.json'

const lottieFilesMap = {
    // girl,
    // flyingBook,
    Loading,
    // Advanture,
    // Action,
    // Fiction,
    // Science,
    // ScienceFiction,
    // Poem,
    // Classic,
    // Fantasy,
    // Romance,
    // Horror,
    // BooksAbout

};

type LottieHandlerProps = {
    type: keyof typeof lottieFilesMap;
    message?: string;
    className?: string;
    loop?: boolean;
    style?: React.CSSProperties
};
const LottieHandler = ({ type, message, className, loop, style }: LottieHandlerProps) => {
    const lottie = lottieFilesMap[type];
    // const messageStyle =
    //     type === "error"
    //         ? { fontSize: "19px", color: "red" }
    //         : { fontSize: "19px", marginTop: "30px" };

    return (
        <div className={` ${className}`
        }>
            <Lottie animationData={lottie} style={style} loop={loop} />
            {message && <h3 style={{ margin: '120px auto', textAlign: 'center', color: 'var(--main-color)' }}
            // style={messageStyle}
            > {message} </h3>}
        </div>

    )

};

export default LottieHandler;
