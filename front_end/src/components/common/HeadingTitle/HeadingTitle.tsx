import './HeadingTitle.css'
const HeadingTitle = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="headingTitle">
            <h1>{children}</h1>
        </div>
    )
}

export default HeadingTitle
