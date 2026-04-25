function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      
      <nav className="bg-primary text-white px-10 py-4 flex justify-between">
        <h1 className="text-2xl font-bold">Tharuka Portfolio</h1>
        <ul className="flex gap-6">
          <li>About</li>
          <li>Journal</li>
          <li>Career</li>
          <li>CV</li>
          <li>Certificates</li>
        </ul>
      </nav>

      <section className="text-center py-24 px-6">
        <h2 className="text-5xl font-bold text-primary mb-4">
          Premium Corporate Portfolio
        </h2>

        <p className="text-xl text-gray-600 mb-8">
          IT Undergraduate | Software Engineering | Future Tech Professional
        </p>

        <button className="bg-accent text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 duration-300">
          View My Portfolio
        </button>
      </section>

    </div>
  );
}

export default App;