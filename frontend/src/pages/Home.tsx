import PageTitle from "@/components/PageTitle";
import { VIEW_TRANSITION_SUPPORTED } from "@/logic/viewTransition";
import { Link } from "react-router";

export default function App() {
  return (
    <div className="flex flex-col gap-8">
      <header className='pb-4 flex flex-col gap-2'>
        <PageTitle>Steganographix by @thavixt</PageTitle>
      </header>
      <p>Analyze any image - see if it contains some hidden data!</p>
      <div className="flex flex-col gap-4">
        <div>
          Select a process from the menu at the top, or click a list item below:
        </div>
        <ul>
          <li>
            <Link viewTransition={VIEW_TRANSITION_SUPPORTED} to="/image2image">
              Extract an image from another image
            </Link>
          </li>
          <li>
            <Link viewTransition={VIEW_TRANSITION_SUPPORTED} to="/image2text">
              Extract text from another image
            </Link>
          </li>
        </ul>

        <div>Some more links:</div>
        <ul>
          <li>
            <Link viewTransition={VIEW_TRANSITION_SUPPORTED} to="/about">
              About this application
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
