import { Link } from "react-router";

export default function App() {
  return (
    <div className="flex flex-col gap-8">
      <p>Analyze any image - see if it contains some hidden data!</p>
      <div className="flex flex-col gap-4">
        <div>Select a process from the menu at the top, or click a list item below:</div>
        <ul>
          <li><Link to="image2image">Extract an image from another image</Link></li>
          <li><Link to="image2text">Extract text from another image</Link></li>
        </ul>
      </div>
    </div>
  )
}
