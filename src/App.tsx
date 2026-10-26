import { CharacterCounter } from './components/CharacterCounter/CharacterCounter'

function App() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <CharacterCounter minWords={10} maxWords={100} targetReadingTime={1} />
    </main>
  )
}

export default App