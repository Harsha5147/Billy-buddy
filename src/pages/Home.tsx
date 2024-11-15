import React from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, FileText, Users, BarChart2 } from 'lucide-react'

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Billy</h1>
      <p className="text-xl mb-8">Your buddy against cyber bullying</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/chatbot" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <MessageCircle size={48} className="mx-auto mb-4 text-blue-500" />
          <h2 className="text-xl font-semibold mb-2">Chat with Billy</h2>
          <p>Get instant help and comfort</p>
        </Link>
        <Link to="/report" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <FileText size={48} className="mx-auto mb-4 text-green-500" />
          <h2 className="text-xl font-semibold mb-2">Report Incident</h2>
          <p>Anonymously report cyberbullying</p>
        </Link>
        <Link to="/community" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Users size={48} className="mx-auto mb-4 text-purple-500" />
          <h2 className="text-xl font-semibold mb-2">Join Community</h2>
          <p>Share experiences and support others</p>
        </Link>
        <Link to="/statistics" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <BarChart2 size={48} className="mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-semibold mb-2">View Statistics</h2>
          <p>See cybercrime data and hotspots</p>
        </Link>
      </div>
    </div>
  )
}

export default Home