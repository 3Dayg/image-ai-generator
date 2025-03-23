import AuthForm from "./components/AuthForm";
import Header from "./components/Header";
import { AuthContextProvider } from "./store/auth-context";

/**
 * https://youtu.be/qmJrTmI6aKA?si=BCleClNW9CGmPLo6&t=7365
 */
function App() {
  return (
    <AuthContextProvider>
    <div className="bg-stone-800 min-h-screen py-8">
        <Header />
        <main className="mt-12">
          <AuthForm />
        </main>
      </div>
    </AuthContextProvider>
  );
}

export default App
