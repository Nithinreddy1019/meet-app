import { Link } from "react-router-dom"


interface HeadingProps {
    heading: string,
    subheading:string,
    toLink: string,
    toLabel: string
}


const Heading = ({heading, subheading, toLink, toLabel}: HeadingProps) => {
  return (
    <div className="flex flex-col items-center text-textlightb px-2 py-2">
      <h1 className="text-3xl font-semibold ">
        {heading}
      </h1>
      <div className="flex gap-1 text-sm">
        {subheading}
        <Link to={toLink} >
            <p className="underline text-sm hover:text-purple-300">{toLabel}</p>
        </Link>
      </div>
    </div>
  )
}

export default Heading
