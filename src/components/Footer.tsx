import { FaGithub } from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa6"

const Footer = () => {
  return (
    <div className="bg-pink-500 py-8 mt-2">
      <div className="text-center max-w-6xl mx-auto px-6">
        <h1 className="font-semibold text-2xl text-white mb-4">FakeStore</h1>
        <div className="text-gray-200 mb-6">
            ©{new Date().getFullYear()} All rights reserved.
        </div>
        <div className="flex justify-center text-xl space-x-6 text-gray-300">
            <a href=""><FaGithub /></a>
            <a href=""><FaLinkedin /> </a>
            <a href=""><FaGithub /></a>
        </div>
      </div>
    </div>
  )
}

export default Footer
