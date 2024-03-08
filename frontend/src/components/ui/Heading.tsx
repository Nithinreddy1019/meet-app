import { Link } from "react-router-dom"

interface HeadingProps {
    title: string,
    subtitle: string,
    toLink: string,
    toTitle: string
}

const Heading = ({title, subtitle, toLink, toTitle}: HeadingProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-semibold text-back-text-light dark:text-back-text-dark">
        {title}
      </div>
      <div className="text-back-text-light dark:text-back-text-dark text-sm">
        {subtitle}
        <Link className="pl-2 underline" to={toLink}>{toTitle}</Link>
      </div>
    </div>
  )
}

export default Heading
